// src/services/mercadoPagoService.js
import { initMercadoPago } from '@mercadopago/sdk-react';

// Inicializar Mercado Pago com a chave pública
const publicKey = process.env.REACT_APP_MP_PUBLIC_KEY;

if (publicKey) {
    initMercadoPago(publicKey);
} else {
    console.warn('⚠️ Mercado Pago Public Key não configurada. Adicione REACT_APP_MP_PUBLIC_KEY no .env.local');
}

/**
 * Criar preferência de pagamento no Mercado Pago
 */
export async function createPaymentPreference(orderData) {
    const { plan, email, nome, total, monthly, installments, cpf } = orderData;

    try {
        // Em produção, isso deve chamar uma API Lambda
        // Por enquanto, vamos simular a criação da preferência

        const preferenceData = {
            items: [
                {
                    id: `wimex-${plan}`,
                    title: `Wimex-up - Plano ${plan === 'recorrente' ? 'Recorrente' : 'Vitalício'}`,
                    description: `Curso de inglês online - ${installments}x de R$ ${monthly}`,
                    quantity: 1,
                    unit_price: parseFloat(monthly),
                    currency_id: 'BRL'
                }
            ],
            payer: {
                name: nome,
                email: email,
                identification: {
                    type: 'CPF',
                    number: cpf.replace(/\D/g, '')
                }
            },
            back_urls: {
                success: `${window.location.origin}/pagamento-sucesso`,
                failure: `${window.location.origin}/pagamento-falha`,
                pending: `${window.location.origin}/pagamento-pendente`
            },
            auto_return: 'approved',
            payment_methods: {
                installments: parseInt(installments),
                default_installments: parseInt(installments)
            },
            statement_descriptor: 'WIMEX-UP',
            metadata: {
                plan,
                email,
                nome,
                cpf,
                total_amount: total
            }
        };

        // TODO: Chamar API Lambda para criar preferência
        // const response = await fetch('/api/mercadopago/create-preference', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(preferenceData)
        // });
        // const data = await response.json();
        // return data.preferenceId;

        // Por enquanto, retornar dados simulados
        console.log('Preference Data:', preferenceData);

        return {
            preferenceId: 'SIMULATED-' + Date.now(),
            initPoint: 'https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=SIMULATED'
        };

    } catch (error) {
        console.error('Error creating payment preference:', error);
        throw new Error('Erro ao criar preferência de pagamento');
    }
}

/**
 * Processar pagamento PIX
 */
export async function createPixPayment(orderData) {
    const { plan, email, nome, total, cpf } = orderData;

    try {
        const pixData = {
            transaction_amount: parseFloat(total),
            description: `Wimex-up - Plano ${plan}`,
            payment_method_id: 'pix',
            payer: {
                email: email,
                first_name: nome.split(' ')[0],
                last_name: nome.split(' ').slice(1).join(' '),
                identification: {
                    type: 'CPF',
                    number: cpf.replace(/\D/g, '')
                }
            },
            metadata: {
                plan,
                email,
                nome
            }
        };

        // TODO: Chamar API Lambda para criar pagamento PIX
        // const response = await fetch('/api/mercadopago/create-pix', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(pixData)
        // });
        // const data = await response.json();
        // return {
        //   qrCode: data.point_of_interaction.transaction_data.qr_code,
        //   qrCodeBase64: data.point_of_interaction.transaction_data.qr_code_base64,
        //   paymentId: data.id
        // };

        // Simulação
        console.log('PIX Data:', pixData);

        return {
            qrCode: '00020126580014br.gov.bcb.pix...',
            qrCodeBase64: 'iVBORw0KGgoAAAANSUhEUgAA...',
            paymentId: 'PIX-' + Date.now()
        };

    } catch (error) {
        console.error('Error creating PIX payment:', error);
        throw new Error('Erro ao criar pagamento PIX');
    }
}

/**
 * Verificar status do pagamento
 */
export async function checkPaymentStatus(paymentId) {
    try {
        // TODO: Chamar API Lambda para verificar status
        // const response = await fetch(`/api/mercadopago/payment/${paymentId}`);
        // const data = await response.json();
        // return {
        //   status: data.status, // 'approved', 'pending', 'rejected'
        //   statusDetail: data.status_detail
        // };

        // Simulação
        return {
            status: 'approved',
            statusDetail: 'accredited'
        };

    } catch (error) {
        console.error('Error checking payment status:', error);
        throw new Error('Erro ao verificar status do pagamento');
    }
}

/**
 * Processar webhook do Mercado Pago
 */
export async function processWebhook(webhookData) {
    const { type, data } = webhookData;

    if (type === 'payment') {
        const paymentId = data.id;

        // Verificar status do pagamento
        const paymentStatus = await checkPaymentStatus(paymentId);

        if (paymentStatus.status === 'approved') {
            // TODO: Criar usuário no Cognito
            // TODO: Enviar email de boas-vindas
            console.log('Payment approved:', paymentId);
        }
    }
}
