import { useNavigate } from "react-router-dom";

export default function Module() {
    const navigate = useNavigate();

    const lessons = [
        {
            id: 1,
            title: "Immigration Control",
            desc: "Simulador de entrevista na imigração do aeroporto.",
            img: "https://images.unsplash.com/photo-1543165365-07971ac5dc97?auto=format&fit=crop&q=80&w=400",
            link: "/lesson/1/1"
        },
        {
            id: 2,
            title: "Hotel Check-in",
            desc: "Check-in no hotel, reserva e documentos.",
            img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
            link: "/lesson/1/2"
        },
        {
            id: 3,
            title: "Restaurant Order",
            desc: "Pedindo comida e bebida como um local.",
            img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
            link: "/lesson/1/3"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white font-sans p-6 md:p-12">
            <button
                onClick={() => navigate("/dashboard")}
                className="text-slate-400 hover:text-white mb-8 flex items-center gap-2"
            >
                ← Voltar ao Dashboard
            </button>

            <h1 className="text-4xl font-bold mb-2">Travel Module</h1>
            <p className="text-slate-400 mb-12">Cenários reais para você praticar sua fala.</p>

            <div className="grid gap-6 max-w-4xl">
                {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6 hover:border-wimex-blue transition-all group">
                        <div className="w-full md:w-64 h-40 bg-slate-800 rounded-xl overflow-hidden relative shadow-lg">
                            <img src={lesson.img} alt={lesson.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                                <div className="w-12 h-12 bg-wimex-blue/90 rounded-full flex items-center justify-center shadow-lg shadow-wimex-blue/50 group-hover:scale-110 transition-transform">
                                    <span className="text-white text-xl">▶</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <span className="text-wimex-blue text-xs font-bold uppercase tracking-wider mb-2 block">Lesson 0{lesson.id} (Interactive)</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{lesson.title}</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                {lesson.desc}
                            </p>
                            <button
                                onClick={() => navigate(lesson.link)}
                                className="px-6 py-3 bg-gradient-to-r from-wimex-blue to-wimex-blue-dark text-white font-bold rounded-full shadow-lg shadow-wimex-blue/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                Start Simulation
                            </button>
                        </div>
                    </div>
                ))}

                {/* Placeholder for more */}
                <div className="text-center p-8 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500">
                    Em breve mais cenários...
                </div>

            </div>
        </div>
    );
}
