// src/services/authService.js
// src/services/authService.js
const API_URL = process.env.REACT_APP_API_URL || '/api';

function salvarToken(token) {
  localStorage.setItem('wimexup_token', token);
}

function obterToken() {
  return localStorage.getItem('wimexup_token');
}

function removerToken() {
  localStorage.removeItem('wimexup_token');
}

/**
 * Criar novo usuário na nossa API própria
 */
export async function createUserAccount(userData) {
  const { email, password, nome, cpf } = userData;

  const res = await fetch(`${API_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, email, senha: password, cpf }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || 'Erro ao criar conta.');
  }

  salvarToken(data.token);

  return {
    success: true,
    userId: data.user.id,
    requiresConfirmation: false,
  };
}

/**
 * Confirmação de e-mail — ainda não implementada no backend próprio,
 * então por enquanto já retorna como concluída
 */
export async function confirmUserEmail(email, code) {
  return { success: true, isSignUpComplete: true };
}

/**
 * Fazer login
 */
export async function loginUser(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha: password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.erro || 'Email ou senha incorretos.');
  }

  salvarToken(data.token);

  return {
    success: true,
    isSignedIn: true,
    user: data.user,
  };
}

/**
 * Fazer logout
 */
export async function logoutUser() {
  removerToken();
  return { success: true };
}

/**
 * Verificar se usuário está autenticado
 */
export async function checkAuth() {
  const token = obterToken();
  if (!token) {
    return { isAuthenticated: false, isSubscribed: false, user: null };
  }

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      removerToken();
      return { isAuthenticated: false, isSubscribed: false, user: null };
    }

    const data = await res.json();

    return {
      isAuthenticated: true,
      isSubscribed: data.user.status_assinatura === 'ativo',
      user: data.user,
    };
  } catch (error) {
    return { isAuthenticated: false, isSubscribed: false, user: null };
  }
}

/**
 * Obter dados do usuário atual
 */
export async function getUserData() {
  const token = obterToken();
  if (!token) return null;

  try {
    const res = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) return null;

    const data = await res.json();

    return {
      userId: data.user.id,
      email: data.user.email,
      name: data.user.nome,
      plan: data.user.plano,
      subscriptionStatus: data.user.status_assinatura,
    };
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
}
