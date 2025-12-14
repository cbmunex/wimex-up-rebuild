// src/components/Footer.jsx
import logoVideo from "../assets/logo.mp4";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-slate-400 grid md:grid-cols-3 gap-4">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-700 shadow-lg shadow-wimex-blue/10">
              <video
                src={logoVideo}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                poster="/logo-frame.png"
              />
            </div>
            <div>
              <span className="text-xl text-wimex-blue font-bold tracking-widest block drop-shadow-sm">WIMEX-UP</span>
              <span className="text-xs font-semibold text-slate-300">English Course</span>
            </div>
          </div>
          <div className="text-xs text-slate-500 max-w-xs">WIMEX-UP — Inglês prático para a vida real.</div>
        </div>

        <div className="text-xs text-slate-400">
          <div className="font-semibold text-sm text-white mb-2">Explore</div>
          <ul className="space-y-1">
            <li>Metodologia</li>
            <li>Planos</li>
            <li>Depoimentos</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div className="text-xs text-slate-400">
          <div className="font-semibold text-sm text-white mb-2">Contato</div>
          <div>Suporte: suporte@wimex-up.com</div>
          <div className="mt-2">© {new Date().getFullYear()} WIMEX-UP. Todos os direitos reservados.</div>
        </div>
      </div>
    </footer>
  );
}
