// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2">
        <span>
          © {new Date().getFullYear()} WIMEX-UP English. Todos os direitos reservados.
        </span>
        <span>Versão beta para testes em AWS Amplify.</span>
      </div>
    </footer>
  );
}
