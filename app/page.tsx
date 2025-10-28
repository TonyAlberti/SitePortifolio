"use client";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { SecaoContato } from "@/components/SecaoContato";
import { SecaoExperiencia } from "@/components/SecaoExperiencia";
import { SecaoHabilidades } from "@/components/SecaoHabilidades";
import { SecaoHeroi } from "@/components/SecaoHeroi";
import { SecaoProjetos } from "@/components/SecaoProjetos";
import { SecaoSobre } from "@/components/SecaoSobre";
import type React from "react";
import { useEffect, useState } from "react";
export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);
  const toggleTheme = () => {
    if (!mounted) return;
    const html = document.documentElement;
    if (isDark) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };
  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  // Evita piscar de tema incorreto na montagem inicial
  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Cabecalho
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onNavClick={handleNavClick}
      />
      <SecaoHeroi />
      <SecaoSobre />
      <SecaoExperiencia />
      <SecaoProjetos />
      <SecaoHabilidades />
      <SecaoContato />
      <Rodape />
    </div>
  );
}
