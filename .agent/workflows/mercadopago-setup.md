# 🛒 Guia de Configuração: Mercado Pago

## 📋 Passo a Passo para Obter Credenciais

### **1. Criar Conta no Mercado Pago**

1. Acesse: https://www.mercadopago.com.br/developers
2. Faça login ou crie uma conta
3. Vá em **"Suas integrações"** → **"Criar aplicação"**

---

### **2. Obter Chaves de API**

1. No painel de desenvolvedores, clique em **"Credenciais"**
2. Você verá duas chaves:
   - **Public Key** (começa com `APP_USR-...`)
   - **Access Token** (começa com `APP_USR-...`)

3. **IMPORTANTE:** Use as chaves de **TESTE** primeiro!
   - Modo Teste: Para desenvolvimento
   - Modo Produção: Para vendas reais

---

### **3. Configurar no Projeto**

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Mercado Pago - TESTE
REACT_APP_MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# Mercado Pago - PRODUÇÃO (usar depois)
# REACT_APP_MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

**⚠️ NUNCA commite o `.env.local` no Git!**

Adicione ao `.gitignore`:
```
.env.local
.env
```

---

### **4. Cartões de Teste**

Para testar pagamentos, use estes cartões:

**Aprovado:**
- Número: `5031 4332 1540 6351`
- CVV: `123`
- Validade: Qualquer data futura
- Nome: Qualquer nome

**Recusado:**
- Número: `5031 7557 3453 0604`

**Pendente:**
- Número: `5031 4332 1540 6351`
- CVV: `123`

Mais cartões: https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing

---

### **5. Configurar Webhook (Opcional)**

Para receber notificações de pagamento:

1. No painel do Mercado Pago → **"Webhooks"**
2. Configure a URL: `https://SEU-DOMINIO.amplifyapp.com/api/webhook/mercadopago`
3. Selecione eventos: `payment`, `merchant_order`

---

## 🔧 Implementação no Código

### **Arquivo: `src/services/mercadoPagoService.js`**

```javascript
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

// Inicializar Mercado Pago
initMercadoPago(process.env.REACT_APP_MP_PUBLIC_KEY);

/**
 * Criar preferência de pagamento
 */
export async function createPaymentPreference(orderData) {
  const { plan, email, nome, total, installments } = orderData;

  try {
    // Chamar backend para criar preferência
    const response = await fetch('/api/mercadopago/create-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: [{
          title: `Wimex-up - Plano ${plan}`,
          quantity: 1,
          unit_price: parseFloat(total),
          currency_id: 'BRL'
        }],
        payer: {
          name: nome,
          email: email
        },
        back_urls: {
          success: `${window.location.origin}/pagamento-sucesso`,
          failure: `${window.location.origin}/pagamento-falha`,
          pending: `${window.location.origin}/pagamento-pendente`
        },
        auto_return: 'approved',
        installments: parseInt(installments),
        metadata: {
          plan,
          email,
          nome
        }
      })
    });

    const data = await response.json();
    return data.preferenceId;
  } catch (error) {
    console.error('Error creating preference:', error);
    throw new Error('Erro ao criar pagamento');
  }
}
```

---

## 🚀 Fluxo de Pagamento

### **1. Usuário preenche matrícula**
- Dados pessoais
- Escolhe plano
- Cria conta (email/senha)

### **2. Clicar em "Pagar"**
- Cria preferência no Mercado Pago
- Abre modal de pagamento
- Usuário escolhe: PIX, Cartão ou Boleto

### **3. Após Pagamento Aprovado**
- Mercado Pago redireciona para `/pagamento-sucesso`
- Backend cria usuário no Cognito
- Envia email de boas-vindas
- Usuário faz login

---

## 💳 Taxas do Mercado Pago

### **Sem Mensalidade**
- Conta grátis
- Sem custo de setup

### **Taxas por Transação:**
- **PIX:** ~0,99%
- **Cartão de Crédito:** ~4,99%
- **Boleto:** ~R$ 3,49 fixo

### **Exemplo:**
- Venda de R$ 149,90 no cartão
- Taxa: R$ 7,48
- Você recebe: R$ 142,42

---

## 📝 Checklist de Configuração:

- [ ] Criar conta no Mercado Pago Developers
- [ ] Obter Public Key e Access Token (TESTE)
- [ ] Criar arquivo `.env.local` com as chaves
- [ ] Adicionar `.env.local` ao `.gitignore`
- [ ] Testar com cartões de teste
- [ ] Quando funcionar, trocar para chaves de PRODUÇÃO

---

## 🔗 Links Úteis:

- **Painel de Desenvolvedores:** https://www.mercadopago.com.br/developers
- **Documentação:** https://www.mercadopago.com.br/developers/pt/docs
- **Cartões de Teste:** https://www.mercadopago.com.br/developers/pt/docs/checkout-api/testing
- **SDK React:** https://github.com/mercadopago/sdk-react

---

**Próximo passo:** Obter suas credenciais e configurar o `.env.local`! 🚀
