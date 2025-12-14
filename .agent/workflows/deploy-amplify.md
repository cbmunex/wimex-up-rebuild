---
description: Deploy do Wimex-up no AWS Amplify via GitHub
---

# 🚀 Deploy no AWS Amplify via GitHub

## Pré-requisitos
- ✅ Repositório GitHub: `wimex-up-rebuild`
- ✅ Conta AWS com acesso ao Amplify
- ✅ Código local funcionando

---

## 📋 Passo a Passo

### **1. Preparar o Repositório Local**

#### 1.1 Verificar se Git está inicializado
```bash
git status
```

Se não estiver inicializado, execute:
```bash
git init
```

#### 1.2 Adicionar todos os arquivos
```bash
git add .
```

#### 1.3 Fazer commit das alterações
```bash
git commit -m "feat: Implementação completa com animações dinâmicas e lições interativas"
```

#### 1.4 Conectar ao repositório remoto
```bash
git remote add origin https://github.com/SEU_USUARIO/wimex-up-rebuild.git
```

**Substitua `SEU_USUARIO` pelo seu username do GitHub!**

#### 1.5 Verificar a conexão
```bash
git remote -v
```

#### 1.6 Enviar para o GitHub
```bash
git branch -M main
git push -u origin main
```

**Nota:** Se pedir autenticação, use um **Personal Access Token** (não senha):
- Vá em: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
- Gere um novo token com permissão `repo`

---

### **2. Configurar AWS Amplify Console**

#### 2.1 Acessar o Console da AWS
1. Entre em: https://console.aws.amazon.com/amplify/
2. Clique em **"Get Started"** (ou "Começar")

#### 2.2 Conectar Repositório
1. Selecione **"GitHub"** como provedor
2. Clique em **"Continue"**
3. Autorize o AWS Amplify a acessar sua conta GitHub
4. Selecione o repositório: **`wimex-up-rebuild`**
5. Selecione a branch: **`main`**
6. Clique em **"Next"**

---

### **3. Configurar Build Settings**

#### 3.1 Verificar/Editar amplify.yml
O Amplify detectará automaticamente o `amplify.yml` na raiz do projeto.

**Conteúdo atual do `amplify.yml`:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
```

#### 3.2 Configurações Importantes
- **App name:** `wimex-up` (ou o nome que preferir)
- **Environment name:** `production`
- **Build settings:** Deixe como detectado automaticamente
- Clique em **"Next"**

---

### **4. Configurar Variáveis de Ambiente (Opcional)**

Se você tiver variáveis de ambiente (ex: chaves de API), adicione aqui:

1. Na seção **"Advanced settings"**
2. Adicione variáveis como:
   - `REACT_APP_API_URL`
   - `REACT_APP_AWS_REGION`
   - etc.

**Para este projeto, não é necessário no momento.**

---

### **5. Review e Deploy**

#### 5.1 Revisar Configurações
- Verifique todas as configurações
- Clique em **"Save and Deploy"**

#### 5.2 Aguardar o Build
O Amplify irá:
1. ✅ Provisionar ambiente
2. ✅ Clonar repositório
3. ✅ Instalar dependências (`npm ci`)
4. ✅ Executar build (`npm run build`)
5. ✅ Fazer deploy

**Tempo estimado:** 3-5 minutos

---

### **6. Verificar Deploy**

#### 6.1 Acessar URL
Após o deploy, você receberá uma URL como:
```
https://main.d1234abcd5678.amplifyapp.com
```

#### 6.2 Testar Funcionalidades
- ✅ Login (mock auth)
- ✅ Dashboard
- ✅ Módulos
- ✅ Lições interativas
- ✅ Animações

---

## 🔧 Configurações Adicionais

### **Domínio Personalizado**

1. No Amplify Console, vá em **"Domain management"**
2. Clique em **"Add domain"**
3. Siga as instruções para conectar seu domínio

### **Configurar Redirects (SPA)**

Para que as rotas do React funcionem corretamente:

1. No Amplify Console, vá em **"Rewrites and redirects"**
2. Adicione a regra:
   - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
   - **Target address:** `/index.html`
   - **Type:** `200 (Rewrite)`

**Isso garante que URLs como `/dashboard` e `/lesson/1/1` funcionem após refresh.**

---

## 🔄 Atualizações Futuras

### Deploy Automático
Agora, **toda vez que você fizer push para `main`**, o Amplify automaticamente:
1. Detecta mudanças
2. Executa novo build
3. Faz deploy da nova versão

### Workflow de Atualização
```bash
# 1. Fazer alterações no código
# 2. Adicionar ao Git
git add .

# 3. Commit
git commit -m "feat: Nova funcionalidade X"

# 4. Push (deploy automático)
git push origin main
```

---

## 🐛 Troubleshooting

### Build Falhou?
1. Verifique os logs no Amplify Console
2. Erros comuns:
   - **Dependências faltando:** Verifique `package.json`
   - **Erro de build:** Teste localmente com `npm run build`
   - **Memória insuficiente:** Aumente no Amplify settings

### Página em Branco?
1. Verifique o console do navegador (F12)
2. Possíveis causas:
   - Rotas não configuradas (veja "Redirects" acima)
   - Erro de importação de assets
   - Variáveis de ambiente faltando

### Imagens Não Carregam?
- Verifique se estão em `public/` ou importadas via `import`
- Imagens em `src/assets/` precisam ser importadas
- Imagens em `public/` são acessadas via `/nome.png`

---

## 📝 Checklist Final

Antes do deploy, confirme:
- [ ] Código commitado no GitHub
- [ ] `amplify.yml` configurado
- [ ] Build local funciona (`npm run build`)
- [ ] Sem erros no console
- [ ] Todas as imagens/assets incluídos
- [ ] Redirects configurados no Amplify (para SPA)

---

## 🎉 Pronto!

Seu app estará disponível em:
```
https://main.XXXXXX.amplifyapp.com
```

**Compartilhe o link e teste em diferentes dispositivos!** 📱💻

---

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Amplify Console
2. Teste localmente primeiro
3. Consulte: https://docs.amplify.aws/
