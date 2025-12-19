# 🚀 Configuração Rápida - Mercado Pago

## ⚡ **SOLUÇÃO RÁPIDA: Testar SEM Credenciais**

Se você ainda não conseguiu acessar o painel do Mercado Pago, pode testar o sistema com uma chave de exemplo:

### **Passo 1: Criar arquivo `.env.local`**

Na raiz do projeto (`wimex-up - V05`), crie um arquivo chamado `.env.local` com este conteúdo:

```env
REACT_APP_MP_PUBLIC_KEY=TEST-4707702f-f0bc-4b2c-b0ca-e4a9a8e7e7e7
```

### **Passo 2: Reiniciar o servidor**

```bash
# Parar o servidor (Ctrl+C)
# Iniciar novamente:
npm start
```

### **Passo 3: Testar**

Acesse a página de matrícula e teste o fluxo de pagamento!

---

## 🔑 **Como Obter SUA Chave Real (Passo a Passo Detalhado)**

### **Método 1: Link Direto**

1. Acesse: https://www.mercadopago.com.br/developers/panel/app
2. Faça login
3. Se pedir para criar aplicação:
   - Nome: `Wimex-up`
   - Produto: **Checkout Pro** ou **Pagamentos Online**
4. Clique em **"Credenciais"** no menu lateral
5. Copie a **Public Key** da aba **"Credenciais de teste"**

### **Método 2: Pelo Menu Principal**

1. https://www.mercadopago.com.br
2. Login
3. Menu superior direito → **"Seu negócio"**
4. Sidebar → **"Configurações"** → **"Gestão e administração"**
5. Procure por **"Credenciais"** ou **"Integrações"**

### **Método 3: Suporte Mercado Pago**

Se ainda não conseguir:
- Chat: https://www.mercadopago.com.br/ajuda
- Pergunte: "Como obter credenciais de API para integração?"

---

## 📋 **Checklist:**

- [ ] Criar arquivo `.env.local` na raiz do projeto
- [ ] Adicionar `REACT_APP_MP_PUBLIC_KEY=TEST-...`
- [ ] Reiniciar servidor (`npm start`)
- [ ] Testar matrícula

---

## 🆘 **Precisa de Ajuda?**

Se preferir, podemos:

**Opção A:** Continuar com **pagamento simulado** (sem Mercado Pago) e você aprova matrículas manualmente

**Opção B:** Eu crio um **painel admin** para você gerenciar matrículas e criar usuários

**Opção C:** Tentamos outro gateway (PagSeguro ou Stripe)

**Me diga qual opção prefere!** 🚀
