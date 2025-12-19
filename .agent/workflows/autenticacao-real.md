# 🔐 Implementação de Autenticação Real com Pagamento

## Arquitetura do Sistema

### **Fluxo Completo:**
1. Usuário acessa `/matricula`
2. Preenche dados e realiza pagamento
3. Sistema cria conta no Cognito
4. Envia email de confirmação
5. Usuário confirma email e faz login
6. Acessa Dashboard e Lições

---

## Componentes Necessários

### **1. AWS Cognito (Autenticação)**
- User Pool para gerenciar usuários
- Email verification
- Password policies
- MFA (opcional)

### **2. Gateway de Pagamento**
Opções:
- **Stripe** (Recomendado - Internacional)
- **Mercado Pago** (Brasil)
- **PagSeguro** (Brasil)

### **3. Backend (API)**
- AWS Lambda + API Gateway
- Validar pagamento
- Criar usuário no Cognito
- Enviar email de boas-vindas

---

## Passo a Passo de Implementação

### **FASE 1: Configurar AWS Cognito**

#### 1.1 Criar User Pool
```bash
amplify add auth
```

Configurações:
- ✅ Email como username
- ✅ Email verification obrigatório
- ✅ Password: mínimo 8 caracteres, maiúsculas, números
- ✅ Atributos customizados: `subscription_status`, `payment_id`

#### 1.2 Deploy do Auth
```bash
amplify push
```

---

### **FASE 2: Criar Página de Matrícula**

#### 2.1 Formulário de Matrícula (`Matricula.jsx`)
Campos:
- Nome completo
- Email
- Telefone
- CPF (opcional)
- Plano escolhido
- Forma de pagamento

#### 2.2 Integração com Gateway de Pagamento

**Opção A: Stripe (Recomendado)**
```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

**Opção B: Mercado Pago**
```bash
npm install @mercadopago/sdk-react
```

---

### **FASE 3: Criar Backend (Lambda Functions)**

#### 3.1 Function: `processPayment`
- Recebe dados do pagamento
- Valida com gateway
- Retorna status

#### 3.2 Function: `createUser`
- Recebe confirmação de pagamento
- Cria usuário no Cognito
- Define atributos customizados
- Envia email de boas-vindas

#### 3.3 Function: `checkSubscription`
- Middleware para verificar status da assinatura
- Bloqueia acesso se não pago

---

### **FASE 4: Atualizar Login.jsx**

#### 4.1 Remover Mock Auth
```jsx
// ANTES (Mock)
localStorage.setItem("wimex_user", "true");

// DEPOIS (Real)
import { signIn } from 'aws-amplify/auth';

const { isSignedIn, nextStep } = await signIn({ 
  username: email, 
  password 
});
```

#### 4.2 Adicionar Verificação de Assinatura
```jsx
const user = await getCurrentUser();
const attributes = await fetchUserAttributes();

if (attributes['custom:subscription_status'] !== 'active') {
  navigate('/pagamento-pendente');
}
```

---

### **FASE 5: Proteger Rotas**

#### 5.1 Criar HOC `ProtectedRoute`
```jsx
function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const user = await getCurrentUser();
      const attrs = await fetchUserAttributes();
      
      setIsAuthenticated(true);
      setIsSubscribed(attrs['custom:subscription_status'] === 'active');
    } catch {
      navigate('/login');
    }
  }

  if (!isAuthenticated) return <Loading />;
  if (!isSubscribed) return <Navigate to="/pagamento-pendente" />;
  
  return children;
}
```

#### 5.2 Aplicar nas Rotas
```jsx
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />
```

---

## Implementação Detalhada

### **1. Configurar Amplify Auth**

```bash
# Inicializar Auth
amplify add auth

# Escolher:
# - Default configuration with Social Provider
# - Email
# - No, I am done
# - Email

# Deploy
amplify push
```

---

### **2. Criar Página de Matrícula com Stripe**

```jsx
// src/pages/Matricula.jsx
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_YOUR_KEY');

function CheckoutForm({ plan }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // 1. Criar Payment Intent no backend
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      body: JSON.stringify({ plan, email, name })
    });
    const { clientSecret } = await response.json();

    // 2. Confirmar pagamento
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: { name, email }
      }
    });

    if (error) {
      alert('Erro no pagamento: ' + error.message);
    } else if (paymentIntent.status === 'succeeded') {
      // 3. Criar usuário no Cognito
      await createUserAccount(email, name, paymentIntent.id);
      navigate('/login?registered=true');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button disabled={!stripe || loading}>
        {loading ? 'Processando...' : 'Pagar e Criar Conta'}
      </button>
    </form>
  );
}
```

---

### **3. Criar Lambda para Processar Pagamento**

```javascript
// amplify/backend/function/processPayment/src/index.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const AWS = require('aws-sdk');
const cognito = new AWS.CognitoIdentityServiceProvider();

exports.handler = async (event) => {
  const { email, name, plan, paymentIntentId } = JSON.parse(event.body);

  try {
    // 1. Verificar pagamento no Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status !== 'succeeded') {
      return { statusCode: 400, body: 'Pagamento não confirmado' };
    }

    // 2. Criar usuário no Cognito
    const tempPassword = generateRandomPassword();
    
    await cognito.adminCreateUser({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'name', Value: name },
        { Name: 'custom:subscription_status', Value: 'active' },
        { Name: 'custom:payment_id', Value: paymentIntentId },
        { Name: 'custom:plan', Value: plan }
      ],
      TemporaryPassword: tempPassword,
      MessageAction: 'SUPPRESS' // Não enviar email automático
    }).promise();

    // 3. Enviar email customizado com senha
    await sendWelcomeEmail(email, name, tempPassword);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, body: error.message };
  }
};
```

---

### **4. Atualizar Login.jsx**

```jsx
// src/pages/Login.jsx
import { signIn, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Fazer login
      const { isSignedIn, nextStep } = await signIn({ 
        username: email, 
        password 
      });

      if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
        navigate('/alterar-senha');
        return;
      }

      // 2. Verificar assinatura
      const attributes = await fetchUserAttributes();
      
      if (attributes['custom:subscription_status'] !== 'active') {
        alert('Sua assinatura está inativa. Entre em contato com o suporte.');
        return;
      }

      // 3. Redirecionar para dashboard
      navigate('/dashboard');
      
    } catch (error) {
      if (error.name === 'UserNotFoundException') {
        alert('Usuário não encontrado. Faça sua matrícula primeiro!');
      } else if (error.name === 'NotAuthorizedException') {
        alert('Email ou senha incorretos.');
      } else {
        alert('Erro ao fazer login: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    // ... JSX do formulário
  );
}
```

---

## Checklist de Implementação

### **Fase 1: Setup Básico** ✅
- [ ] `amplify add auth`
- [ ] Configurar User Pool
- [ ] `amplify push`
- [ ] Testar criação manual de usuário

### **Fase 2: Gateway de Pagamento**
- [ ] Escolher gateway (Stripe/Mercado Pago)
- [ ] Criar conta no gateway
- [ ] Obter chaves de API
- [ ] Instalar SDK

### **Fase 3: Backend**
- [ ] `amplify add function` (processPayment)
- [ ] Implementar lógica de pagamento
- [ ] Implementar criação de usuário
- [ ] Testar localmente

### **Fase 4: Frontend**
- [ ] Criar página Matricula.jsx
- [ ] Integrar formulário de pagamento
- [ ] Atualizar Login.jsx (remover mock)
- [ ] Criar ProtectedRoute HOC

### **Fase 5: Deploy e Testes**
- [ ] `amplify push`
- [ ] Testar fluxo completo
- [ ] Testar pagamento real
- [ ] Verificar emails

---

## Próximos Passos Imediatos

**Quer que eu comece implementando?**

1. **Configurar Amplify Auth** (5 min)
2. **Escolher gateway de pagamento** (Stripe ou Mercado Pago?)
3. **Criar estrutura básica**

**Qual gateway de pagamento você prefere?**
- 🌍 **Stripe** (Internacional, mais usado)
- 🇧🇷 **Mercado Pago** (Brasil, PIX)
- 🇧🇷 **PagSeguro** (Brasil)

Me diga e eu começo a implementar! 🚀
