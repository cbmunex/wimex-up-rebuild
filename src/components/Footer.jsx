// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-8 text-sm text-slate-400 grid md:grid-cols-3 gap-4">
        <div>
          <picture>
            <img src="/logo.png" alt="WIMEX-UP" className="w-36 mb-2" />
          </picture>
          <div className="text-xs text-slate-500">WIMEX-UP — Inglês prático para a vida real.</div>
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
