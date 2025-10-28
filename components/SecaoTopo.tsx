"use client";

import { Button } from "@/components/ui/button";
import data from "@/content/site.json";
import { asset } from "@/lib/asset-path"; // <-- novo
import { Code2, Github, Linkedin } from "lucide-react";
import Image from "next/image";

export function SecaoHeroi() {
  // Sourcing da imagem a partir do JSON, com fallback seguro
  const fotoSrc = asset(
    (data as any)?.perfil?.fotoHero?.src || "/FotoPerfilSite.jpg"
  ); // <-- mudou
  const fotoAlt =
    (data as any)?.perfil?.fotoHero?.alt ||
    "Foto de perfil — Desenvolvedor Frontend";

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Coluna esquerda */}
        <div className="space-y-6 fade-in-up">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance">
              Construindo experiências digitais
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground">
              {data.perfil.resumoHero}
            </p>
          </div>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {data.perfil.resumoDetalhe}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 btn-hover cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Ver projetos
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="
                btn-hover cursor-pointer bg-transparent
                border border-border
                text-foreground hover:text-foreground hover:bg-foreground/10
                dark:text-white dark:hover:text-white dark:hover:bg-white/10
              "
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
            >
              Fale comigo
            </Button>
          </div>

          <div className="flex gap-4 pt-4">
            <a
              href={data.perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>

            <a
              href={data.perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Coluna direita: retrato */}
        <div
          className="hidden lg:block fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {fotoSrc ? (
            <div className="relative w-full max-w-[520px] mx-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10">
                <Image
                  src={fotoSrc}
                  alt={fotoAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 520px"
                  priority
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5 dark:ring-white/10 rounded-2xl" />
              </div>
            </div>
          ) : (
            <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-border flex items-center justify-center transition-all duration-500 hover:shadow-lg hover:border-primary/50">
              <div className="text-center space-y-4">
                <Code2 className="w-24 h-24 mx-auto text-primary/40 icon-float" />
                <p className="text-muted-foreground">
                  Frontend • React • TypeScript
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
