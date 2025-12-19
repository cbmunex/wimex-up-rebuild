# 🚀 Guia Rápido: Implementação de Autenticação Real

## ✅ O que já foi feito:

1. **AWS Amplify Auth** - Já configurado no projeto
2. **authService.js** - Serviço de autenticação criado
3. **ProtectedRoute.jsx** - Componente de rota protegida criado
4. **Página de Matrícula** - Já existe e está bem estruturada

---

## 📋 Próximos Passos:

### **1. Configurar Atributos Customizados no Cognito**

Execute:
```bash
amplify update auth
```

Adicione os atributos customizados:
- `custom:cpf` (String)
- `custom:subscription_status` (String)
- `custom:plan` (String)
- `custom:payment_id` (String)

Depois:
```bash
amplify push
```

---

### **2. Integrar Gateway de Pagamento**

**Opção A: Mercado Pago (Recomendado para Brasil)**

```bash
npm install @mercadopago/sdk-react
```

**Opção B: Stripe**

```bash
npm install @stripe/stripe-js @stripe/react-stripe-js
```

---

### **3. Atualizar Matricula.jsx**

Substituir a função `handlePay` por:

```javascript
import { createUserAccount } from '../services/authService';

async function handlePay(e) {
  e.preventDefault();
  setProcessing(true);

  try {
    // 1. Processar pagamento (integrar com gateway)
    const paymentResult = await processPayment({
      method: paymentMethod,
      amount: values.total,
      plan,
      email
    });

    if (!paymentResult.success) {
      throw new Error('Pagamento não aprovado');
    }

    // 2. Criar usuário no Cognito
    const userResult = await createUserAccount({
      email,
      password,
      nome,
      cpf,
      plan,
      paymentId: paymentResult.paymentId
    });

    // 3. Redirecionar para confirmação de email
    if (userResult.requiresConfirmation) {
      navigate('/confirmar-email', { state: { email } });
    } else {
      navigate('/login?registered=true');
    }

  } catch (error) {
    setError(error.message);
  } finally {
    setProcessing(false);
  }
}
```

---

### **4. Atualizar Login.jsx**

Substituir por:

```javascript
import { loginUser } from '../services/authService';

async function handleLogin(e) {
  e.preventDefault();
  setLoading(true);

  try {
    const result = await loginUser(email, password);

    if (result.success) {
      navigate('/dashboard');
    }
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
}
```

---

### **5. Proteger Rotas no App.js**

```javascript
import ProtectedRoute from './components/ProtectedRoute';

// Nas rotas:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

<Route path="/lesson/:moduleId/:lessonId" element={
  <ProtectedRoute>
    <Lesson />
  </ProtectedRoute>
} />
```

---

### **6. Criar Página de Confirmação de Email**

```javascript
// src/pages/ConfirmarEmail.jsx
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmUserEmail } from '../services/authService';

export default function ConfirmarEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleConfirm(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await confirmUserEmail(email, code);
      navigate('/login?confirmed=true');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl">
        <h1 className="text-2xl font-bold text-white mb-4">Confirme seu Email</h1>
        <p className="text-slate-400 mb-6">
          Enviamos um código de 6 dígitos para <strong>{email}</strong>
        </p>

        <form onSubmit={handleConfirm} className="space-y-4">
          <div>
            <label className="text-sm text-slate-300">Código de Confirmação</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-white text-center text-2xl tracking-widest"
              placeholder="000000"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading || code.length !== 6}
            className="w-full py-3 bg-wimex-blue rounded-full font-bold hover:scale-105 transition-all disabled:opacity-50"
          >
            {loading ? 'Confirmando...' : 'Confirmar Email'}
          </button>
        </form>
      </div>
    </div>
  );
}
```

---

## 🔧 Comandos para Executar Agora:

```bash
# 1. Atualizar Auth com atributos customizados
amplify update auth

# 2. Fazer push das alterações
amplify push

# 3. Instalar gateway de pagamento (escolha um)
npm install @mercadopago/sdk-react
# OU
npm install @stripe/stripe-js @stripe/react-stripe-js

# 4. Testar localmente
npm start
```

---

## 📝 Checklist de Implementação:

- [ ] Configurar atributos customizados no Cognito
- [ ] Escolher e integrar gateway de pagamento
- [ ] Atualizar `Matricula.jsx` com `createUserAccount`
- [ ] Atualizar `Login.jsx` com `loginUser`
- [ ] Criar página `ConfirmarEmail.jsx`
- [ ] Proteger rotas com `ProtectedRoute`
- [ ] Testar fluxo completo
- [ ] Deploy no Amplify

---

## 🎯 Fluxo Completo:

1. Usuário preenche matrícula
2. Escolhe plano
3. Realiza pagamento (Mercado Pago/Stripe)
4. Sistema cria conta no Cognito
5. Email de confirmação enviado
6. Usuário confirma email
7. Faz login
8. Acessa Dashboard e Lições

---

**Quer que eu comece implementando algum desses passos?** 🚀

**Qual gateway de pagamento prefere: Mercado Pago ou Stripe?**
