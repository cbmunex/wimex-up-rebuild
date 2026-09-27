import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [tema, setTema] = useState(() => {
    return localStorage.getItem("wimexup_tema") || "claro";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (tema === "escuro") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("wimexup_tema", tema);
  }, [tema]);

  function alternarTema() {
    setTema((t) => (t === "claro" ? "escuro" : "claro"));
  }

  return (
    <ThemeContext.Provider value={{ tema, alternarTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
