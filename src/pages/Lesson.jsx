import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import immigrationBg from "../assets/immigration-scenario.png";

// 🌍 Banco de Dados de Cenários
const LESSON_DB = {
    "1": {
        title: "Immigration Control",
        background: immigrationBg, // Imagem Local Importada
        agentImg: "https://images.unsplash.com/photo-1543165365-07971ac5dc97?auto=format&fit=crop&q=80&w=400",
        steps: [
            {
                agentText: "Good morning. May I see your passport, please?",
                keywords: ["here", "sure", "is", "passport"],
                tip: "Diga 'Here it is' ou 'Sure, here you go'."
            },
            {
                agentText: "Thank you. What is the purpose of your visit?",
                keywords: ["visit", "vacation", "tourism", "business"],
                tip: "Diga 'I am on vacation' ou 'Strictly for tourism'."
            },
            {
                agentText: "How long do you intend to stay?",
                keywords: ["days", "weeks", "staying", "month"],
                tip: "Diga 'Two weeks' ou 'Ten days'."
            }
        ]
    },
    "2": {
        title: "Hotel Check-in",
        background: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1920",
        agentImg: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
        steps: [
            {
                agentText: "Welcome to the Grand Hotel. Do you have a reservation?",
                keywords: ["yes", "reservation", "have", "do"],
                tip: "Responda 'Yes, I have a reservation'."
            },
            {
                agentText: "Can I have your ID and credit card, please?",
                keywords: ["here", "sure", "card", "id"],
                tip: "Entregue dizendo 'Here you go'."
            }
        ]
    },
    "3": {
        title: "Restaurant Order",
        background: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1920",
        agentImg: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
        steps: [
            {
                agentText: "Hi! Are you ready to order?",
                keywords: ["yes", "ready", "order", "think"],
                tip: "Diga 'Yes, I am ready'."
            },
            {
                agentText: "What would you like to eat?",
                keywords: ["pasta", "burger", "salad", "steak", "chicken"],
                tip: "Peça um prato. Ex: 'I will have the burger'."
            }
        ]
    }
};

export default function Lesson() {
    const navigate = useNavigate();
    const { lessonId } = useParams();

    // Carrega dados da lição (fallback para 1 se inválido)
    const currentLessonId = LESSON_DB[lessonId] ? lessonId : "1";
    const lessonData = LESSON_DB[currentLessonId];
    const steps = lessonData.steps;

    // Estados
    const [stepIndex, setStepIndex] = useState(0);
    const [status, setStatus] = useState("IDLE"); // IDLE, LISTENING, PROCESSING, SUCCESS, ERROR, COMPLETED
    const [transcript, setTranscript] = useState("");
    const currentStep = steps[stepIndex] || {};

    const synth = window.speechSynthesis;
    const recognitionRef = useRef(null);

    // 🔊 Inicializa Speech Recognition
    useEffect(() => {
        if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.lang = "en-US";
            recognitionRef.current.interimResults = false;

            recognitionRef.current.onresult = (event) => {
                const text = event.results[0][0].transcript;
                setTranscript(text);
                validateAnswer(text);
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech Error:", event.error);
                setStatus("IDLE");
            };

            // Quando termina de escutar, se não validou ainda, volta pra IDLE
            recognitionRef.current.onend = () => {
                if (status === "LISTENING") {
                    // Pequeno delay para processar resultado antes de resetar (se houver)
                }
            };
        }
    }, [stepIndex]);

    // 🗣️ Agente fala ao entrar no passo
    useEffect(() => {
        if (stepIndex < steps.length && status === "IDLE") {
            // Pequeno delay para carregar imagem antes de falar
            const timer = setTimeout(() => {
                speak(steps[stepIndex].agentText);
            }, 500);
            return () => clearTimeout(timer);
        } else if (stepIndex >= steps.length) {
            setStatus("COMPLETED");
        }
    }, [stepIndex, status]);

    const speak = (text, lang = "en-US") => {
        if (synth.speaking) synth.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang;
        utterance.rate = 0.9;
        synth.speak(utterance);
    };

    const validateAnswer = (text) => {
        const lowerText = text.toLowerCase();
        const step = steps[stepIndex];
        if (!step) return;

        const hasKeyword = step.keywords.some((word) => lowerText.includes(word));

        if (hasKeyword) {
            setStatus("SUCCESS");
            speak("Perfect! Next.", "en-US");
            setTimeout(() => {
                setTranscript("");
                setStepIndex((prev) => prev + 1);
                setStatus("IDLE");
            }, 2000);
        } else {
            setStatus("ERROR");
            speak(`Ops. ${step.tip}`, "pt-BR");
        }
    };

    const startListening = () => {
        if (recognitionRef.current) {
            try {
                recognitionRef.current.start();
                setStatus("LISTENING");
            } catch (e) { /* ignore */ }
        } else {
            alert("Navegador sem suporte a voz.");
        }
    };

    const handleRetry = () => {
        setStatus("IDLE");
        setTranscript("");
        speak(steps[stepIndex].agentText);
    };

    if (status === "COMPLETED") {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white relative">
                <div className="absolute inset-0 bg-blue-900/40"></div>
                <div className="z-10 text-center p-8 bg-slate-900/80 rounded-3xl border border-wimex-blue backdrop-blur-md">
                    <div className="text-6xl mb-4">🎉</div>
                    <h1 className="text-3xl font-bold mb-2">{lessonData.title} Completed!</h1>
                    <p className="text-slate-300 mb-6">Excellent job practicing your English.</p>
                    <button onClick={() => navigate("/dashboard")} className="px-8 py-3 bg-wimex-blue rounded-full font-bold hover:scale-105 transition-all">Back to Dashboard</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white relative overflow-hidden font-sans">

            {/* 📉 Background Dinâmico com Parallax */}
            <div
                className={`absolute inset-0 z-0 bg-slate-800 bg-cover bg-center animate-parallax transition-all duration-1000 ${status === 'ERROR' ? 'grayscale blur-sm' : ''}`}
                style={{ backgroundImage: `url("${lessonData.background}")` }}
            >
                {/* Overlay com gradiente dinâmico */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60"></div>

                {/* Partículas flutuantes */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-white/10 rounded-full animate-particle-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${i * 0.8}s`,
                                animationDuration: `${8 + Math.random() * 4}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* 🎩 Agente Dinâmico com Animações */}
            <div className="relative z-10 top-20 flex flex-col items-center w-full max-w-lg mx-auto animate-fade-in">
                {/* Avatar com respiração e movimento */}
                <div className={`w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-white/20 shadow-2xl overflow-hidden bg-slate-800 transition-all duration-500 animate-breathe ${status === 'LISTENING' ? 'scale-110 ring-4 ring-wimex-blue/50 animate-pulse' : 'animate-sway'}`}>
                    <img
                        src={lessonData.agentImg}
                        alt="Agent"
                        className="w-full h-full object-cover"
                    />
                    {/* Indicador de fala (onda sonora) */}
                    {status === 'LISTENING' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-wimex-blue/20">
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-1 bg-wimex-blue rounded-full animate-pulse"
                                        style={{
                                            height: `${20 + Math.random() * 20}px`,
                                            animationDelay: `${i * 0.1}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Box de Diálogo com animação */}
                <div className="mt-8 bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-center shadow-lg animate-fade-in-up mx-4 relative">
                    {/* Indicador de digitação quando agente está "pensando" */}
                    <p className="text-xl md:text-2xl font-semibold text-white drop-shadow-md">
                        "{currentStep?.agentText}"
                    </p>

                    {/* Barra de progresso da lição */}
                    <div className="mt-4 w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-wimex-blue to-wimex-metallic transition-all duration-500"
                            style={{ width: `${((stepIndex + 1) / steps.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* 🎙️ Controles */}
            <div className="absolute bottom-12 left-0 right-0 z-20 flex flex-col items-center px-4">
                {transcript && (
                    <div className="mb-8 px-6 py-3 bg-black/70 backdrop-blur-xl rounded-full border border-slate-600 text-slate-200 italic animate-slide-in">
                        You: "{transcript}"
                    </div>
                )}

                {status !== 'ERROR' && status !== 'SUCCESS' && (
                    <div className="relative">
                        {/* Ripple effect quando escutando */}
                        {status === 'LISTENING' && (
                            <>
                                <div className="absolute inset-0 rounded-full bg-red-500/30 animate-ping"></div>
                                <div className="absolute inset-0 rounded-full bg-red-500/20 animate-pulse"></div>
                            </>
                        )}
                        <button
                            onClick={startListening}
                            disabled={status === 'LISTENING'}
                            className={`relative w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(0,102,255,0.4)] transition-all ${status === 'LISTENING' ? 'bg-red-500 animate-pulse scale-110' : 'bg-wimex-blue hover:bg-blue-500 hover:scale-105 animate-breathe'}`}
                        >
                            <span className="text-3xl">🎤</span>
                        </button>
                    </div>
                )}

                {status === 'SUCCESS' && (
                    <div className="px-8 py-3 bg-green-500 rounded-full text-white font-bold animate-bounce shadow-lg">
                        Correct! ✅
                    </div>
                )}
            </div>

            {/* 👨‍🏫 Mentor Avatar (Erro) */}
            {status === 'ERROR' && (
                <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-slate-900 border border-wimex-blue p-8 rounded-3xl max-w-sm text-center relative shadow-2xl">
                        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-wimex-blue rounded-full border-4 border-slate-900 flex items-center justify-center">
                            <span className="text-4xl">💡</span>
                        </div>
                        <h3 className="mt-8 text-xl font-bold text-wimex-blue mb-2">Mentor Tip</h3>
                        <p className="text-slate-300 mb-6">{currentStep?.tip}</p>
                        <button onClick={handleRetry} className="w-full py-3 bg-wimex-blue rounded-full font-bold hover:bg-blue-500 transition-colors">Try Again</button>
                    </div>
                </div>
            )}

        </div>
    );
}
