"use client";

import data from "@/content/site.json";
import { Code2, Moon, Sun } from "lucide-react";
import Link from "next/link";
import type React from "react";

export function Cabecalho({
  isDark,
  onToggleTheme,
  onNavClick,
}: {
  isDark: boolean;
  onToggleTheme: () => void;
  onNavClick: (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => void;
}) {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border slide-down">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Marca */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center transition-transform duration-300 hover:scale-110">
            <Code2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl hidden sm:inline">
            {data.navegacao.logoTitulo}
          </span>
        </div>

        {/* Navegação + Tema */}
        <div className="flex items-center gap-4">
          {data.navegacao.links.map((l) => (
            <Link
              key={l.id}
              href={`#${l.id}`}
              onClick={(e) => onNavClick(e, l.id)}
              className="nav-link hover:text-primary"
            >
              {l.rotulo}
            </Link>
          ))}

          <button
            onClick={onToggleTheme}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-all duration-300 hover:scale-110 active:scale-95"
            aria-label={data.navegacao.toggleTemaAria}
          >
            {isDark ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
