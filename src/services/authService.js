// src/services/authService.js
import { signUp, confirmSignUp, signIn, signOut, getCurrentUser, fetchUserAttributes } from 'aws-amplify/auth';

/**
 * Criar novo usuário no Cognito após pagamento confirmado
 */
export async function createUserAccount(userData) {
    const { email, password, nome, cpf, plan, paymentId } = userData;

    try {
        const { isSignUpComplete, userId, nextStep } = await signUp({
            username: email,
            password,
            options: {
                userAttributes: {
                    email,
                    name: nome,
                    'custom:cpf': cpf,
                    'custom:subscription_status': 'active',
                    'custom:plan': plan,
                    'custom:payment_id': paymentId
                },
                autoSignIn: true
            }
        });

        console.log('User created:', userId);

        return {
            success: true,
            userId,
            requiresConfirmation: nextStep.signUpStep === 'CONFIRM_SIGN_UP'
        };
    } catch (error) {
        console.error('Error creating user:', error);

        if (error.name === 'UsernameExistsException') {
            throw new Error('Este email já está cadastrado. Faça login ou recupere sua senha.');
        }

        throw new Error('Erro ao criar conta: ' + error.message);
    }
}

/**
 * Confirmar email do usuário
 */
export async function confirmUserEmail(email, code) {
    try {
        const { isSignUpComplete, nextStep } = await confirmSignUp({
            username: email,
            confirmationCode: code
        });

        return { success: true, isSignUpComplete };
    } catch (error) {
        console.error('Error confirming email:', error);
        throw new Error('Código de confirmação inválido.');
    }
}

/**
 * Fazer login
 */
export async function loginUser(email, password) {
    try {
        const { isSignedIn, nextStep } = await signIn({
            username: email,
            password
        });

        if (nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED') {
            return {
                success: false,
                requiresNewPassword: true
            };
        }

        // Verificar status da assinatura
        const attributes = await fetchUserAttributes();
        const subscriptionStatus = attributes['custom:subscription_status'];

        if (subscriptionStatus !== 'active') {
            await signOut();
            throw new Error('Sua assinatura está inativa. Entre em contato com o suporte.');
        }

        return {
            success: true,
            isSignedIn,
            user: attributes
        };
    } catch (error) {
        console.error('Login error:', error);

        if (error.name === 'UserNotFoundException') {
            throw new Error('Usuário não encontrado. Faça sua matrícula primeiro!');
        } else if (error.name === 'NotAuthorizedException') {
            throw new Error('Email ou senha incorretos.');
        }

        throw new Error('Erro ao fazer login: ' + error.message);
    }
}

/**
 * Fazer logout
 */
export async function logoutUser() {
    try {
        await signOut();
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        throw new Error('Erro ao fazer logout.');
    }
}

/**
 * Verificar se usuário está autenticado
 */
export async function checkAuth() {
    try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        const subscriptionStatus = attributes['custom:subscription_status'];

        return {
            isAuthenticated: true,
            isSubscribed: subscriptionStatus === 'active',
            user: attributes
        };
    } catch (error) {
        return {
            isAuthenticated: false,
            isSubscribed: false,
            user: null
        };
    }
}

/**
 * Obter dados do usuário atual
 */
export async function getUserData() {
    try {
        const user = await getCurrentUser();
        const attributes = await fetchUserAttributes();

        return {
            userId: user.userId,
            username: user.username,
            email: attributes.email,
            name: attributes.name,
            cpf: attributes['custom:cpf'],
            plan: attributes['custom:plan'],
            subscriptionStatus: attributes['custom:subscription_status']
        };
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}
