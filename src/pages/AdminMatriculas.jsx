// src/pages/AdminMatriculas.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserAccount } from '../services/authService';
import Header from '../components/Header';

export default function AdminMatriculas() {
    const navigate = useNavigate();
    const [matriculas, setMatriculas] = useState([]);
    const [adminPassword, setAdminPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [processing, setProcessing] = useState(null);
    const [filter, setFilter] = useState('pendente'); // 'pendente', 'aprovado', 'rejeitado', 'todos'

    // Senha admin (em produção, usar Cognito Admin Group)
    const ADMIN_PASSWORD = 'wimex2024admin'; // TROCAR EM PRODUÇÃO!

    useEffect(() => {
        if (isAuthenticated) {
            loadMatriculas();
        }
    }, [isAuthenticated, filter]);

    function loadMatriculas() {
        const stored = JSON.parse(localStorage.getItem('wimex-matriculas') || '[]');

        let filtered = stored;
        if (filter !== 'todos') {
            filtered = stored.filter(m => (m.status || 'pendente') === filter);
        }

        setMatriculas(filtered);
    }

    function handleAdminLogin(e) {
        e.preventDefault();
        if (adminPassword === ADMIN_PASSWORD) {
            setIsAuthenticated(true);
            localStorage.setItem('wimex-admin-auth', 'true');
        } else {
            alert('Senha incorreta!');
        }
    }

    async function handleAprovar(matricula) {
        if (!confirm(`Aprovar matrícula de ${matricula.nome}?`)) return;

        setProcessing(matricula.matricula);

        try {
            // 1. Criar usuário no Cognito
            const senha = gerarSenhaTemporaria();

            await createUserAccount({
                email: matricula.account.email,
                password: senha,
                nome: matricula.nome,
                cpf: matricula.cpf,
                plan: matricula.plan,
                paymentId: matricula.matricula
            });

            // 2. Atualizar status da matrícula
            const stored = JSON.parse(localStorage.getItem('wimex-matriculas') || '[]');
            const updated = stored.map(m =>
                m.matricula === matricula.matricula
                    ? { ...m, status: 'aprovado', approvedAt: new Date().toISOString(), tempPassword: senha }
                    : m
            );
            localStorage.setItem('wimex-matriculas', JSON.stringify(updated));

            // 3. Enviar email com senha (simulado)
            console.log(`
        ===== EMAIL PARA ${matricula.account.email} =====
        Olá ${matricula.nome}!
        
        Sua matrícula foi aprovada! 🎉
        
        Dados de acesso:
        Email: ${matricula.account.email}
        Senha temporária: ${senha}
        
        Acesse: ${window.location.origin}/login
        
        Você será solicitado a trocar a senha no primeiro login.
        ================================================
      `);

            alert(`Matrícula aprovada!\n\nSenha temporária: ${senha}\n\n(Copie e envie para o aluno)`);
            loadMatriculas();

        } catch (error) {
            alert('Erro ao aprovar: ' + error.message);
        } finally {
            setProcessing(null);
        }
    }

    function handleRejeitar(matricula) {
        if (!confirm(`Rejeitar matrícula de ${matricula.nome}?`)) return;

        const motivo = prompt('Motivo da rejeição (opcional):');

        const stored = JSON.parse(localStorage.getItem('wimex-matriculas') || '[]');
        const updated = stored.map(m =>
            m.matricula === matricula.matricula
                ? { ...m, status: 'rejeitado', rejectedAt: new Date().toISOString(), rejectReason: motivo }
                : m
        );
        localStorage.setItem('wimex-matriculas', JSON.stringify(updated));

        loadMatriculas();
    }

    function gerarSenhaTemporaria() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$';
        let senha = '';
        for (let i = 0; i < 12; i++) {
            senha += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return senha;
    }

    function handleLogout() {
        setIsAuthenticated(false);
        setAdminPassword('');
        localStorage.removeItem('wimex-admin-auth');
    }

    // Tela de Login Admin
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-slate-900 p-8 rounded-2xl border border-wimex-blue">
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">🔐 Admin - Matrículas</h1>

                    <form onSubmit={handleAdminLogin} className="space-y-4">
                        <div>
                            <label className="text-sm text-slate-300">Senha Admin</label>
                            <input
                                type="password"
                                value={adminPassword}
                                onChange={(e) => setAdminPassword(e.target.value)}
                                className="w-full px-4 py-3 bg-black border border-slate-700 rounded-lg text-white"
                                placeholder="Digite a senha admin"
                                autoFocus
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-wimex-blue rounded-full font-bold hover:scale-105 transition-all"
                        >
                            Entrar
                        </button>
                    </form>

                    <p className="text-xs text-slate-500 mt-4 text-center">
                        Senha padrão: wimex2024admin
                    </p>
                </div>
            </div>
        );
    }

    // Painel Admin
    return (
        <div className="min-h-screen bg-black text-white">
            <Header />
            <div className="h-20" />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold">📋 Gerenciar Matrículas</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                    >
                        Sair
                    </button>
                </div>

                {/* Filtros */}
                <div className="flex gap-2 mb-6">
                    {['pendente', 'aprovado', 'rejeitado', 'todos'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg transition-colors ${filter === f
                                    ? 'bg-wimex-blue text-black font-bold'
                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)} ({
                                JSON.parse(localStorage.getItem('wimex-matriculas') || '[]')
                                    .filter(m => f === 'todos' || (m.status || 'pendente') === f).length
                            })
                        </button>
                    ))}
                </div>

                {/* Lista de Matrículas */}
                {matriculas.length === 0 ? (
                    <div className="text-center py-12 text-slate-400">
                        <p className="text-xl mb-2">📭</p>
                        <p>Nenhuma matrícula {filter !== 'todos' && filter}</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {matriculas.map(m => (
                            <div
                                key={m.matricula}
                                className="bg-slate-900 border border-slate-700 rounded-xl p-6"
                            >
                                <div className="grid md:grid-cols-3 gap-4">
                                    {/* Dados do Aluno */}
                                    <div>
                                        <h3 className="font-bold text-lg mb-2">{m.nome}</h3>
                                        <p className="text-sm text-slate-400">📧 {m.account.email}</p>
                                        <p className="text-sm text-slate-400">📱 {m.telefone}</p>
                                        <p className="text-sm text-slate-400">🆔 {m.cpf}</p>
                                        <p className="text-xs text-slate-500 mt-2">Matrícula: {m.matricula}</p>
                                    </div>

                                    {/* Plano */}
                                    <div>
                                        <p className="text-sm text-slate-400 mb-1">Plano:</p>
                                        <p className="font-semibold">{m.plan === 'recorrente' ? 'Recorrente' : 'Vitalício'}</p>
                                        <p className="text-sm text-slate-400 mt-2">Pagamento:</p>
                                        <p className="font-semibold">{m.payment.installments}x R$ {m.payment.monthly}</p>
                                        <p className="text-xs text-slate-500">Total: R$ {m.payment.total}</p>
                                        {m.addProfile && (
                                            <p className="text-xs text-amber-400 mt-2">+ Perfil Extra: {m.profileExtra?.nome}</p>
                                        )}
                                    </div>

                                    {/* Ações */}
                                    <div className="flex flex-col gap-2">
                                        <div className={`px-3 py-1 rounded-full text-sm font-bold text-center ${(m.status || 'pendente') === 'aprovado' ? 'bg-green-500/20 text-green-400' :
                                                (m.status || 'pendente') === 'rejeitado' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {(m.status || 'pendente').toUpperCase()}
                                        </div>

                                        {(m.status || 'pendente') === 'pendente' && (
                                            <>
                                                <button
                                                    onClick={() => handleAprovar(m)}
                                                    disabled={processing === m.matricula}
                                                    className="px-4 py-2 bg-green-500 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
                                                >
                                                    {processing === m.matricula ? 'Processando...' : '✅ Aprovar'}
                                                </button>
                                                <button
                                                    onClick={() => handleRejeitar(m)}
                                                    className="px-4 py-2 bg-red-500/20 border border-red-500 rounded-lg hover:bg-red-500/30 transition-colors"
                                                >
                                                    ❌ Rejeitar
                                                </button>
                                            </>
                                        )}

                                        {m.status === 'aprovado' && m.tempPassword && (
                                            <div className="text-xs bg-slate-800 p-2 rounded">
                                                <p className="text-slate-400">Senha temp:</p>
                                                <p className="font-mono text-green-400">{m.tempPassword}</p>
                                            </div>
                                        )}

                                        {m.status === 'rejeitado' && m.rejectReason && (
                                            <div className="text-xs bg-slate-800 p-2 rounded">
                                                <p className="text-slate-400">Motivo:</p>
                                                <p className="text-red-400">{m.rejectReason}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="text-xs text-slate-500 mt-4 border-t border-slate-700 pt-2">
                                    Criado em: {new Date(m.createdAt).toLocaleString('pt-BR')}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
