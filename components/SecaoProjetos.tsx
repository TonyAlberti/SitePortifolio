"use client";

import { SeloTecnologia } from "@/components/SeloTecnologia";
import data from "@/content/site.json";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// ---------------- Modal de Galeria ----------------
function ModalGaleria({
  imagens,
  aberto,
  onFechar,
}: {
  imagens: ReadonlyArray<string>;
  aberto: boolean;
  onFechar: () => void;
}) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!aberto) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onFechar();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % imagens.length);
      if (e.key === "ArrowLeft")
        setIdx((i) => (i - 1 + imagens.length) % imagens.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [aberto, imagens.length, onFechar]);

  const prox = useCallback(
    () => setIdx((i) => (i + 1) % imagens.length),
    [imagens.length]
  );
  const ant = useCallback(
    () => setIdx((i) => (i - 1 + imagens.length) % imagens.length),
    [imagens.length]
  );

  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onFechar}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-5xl bg-card border border-border rounded-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-video">
          <Image
            src={imagens[idx]}
            alt={`Imagem ${idx + 1}`}
            fill
            className="object-contain bg-black/50"
            sizes="(max-width: 768px) 100vw, 1024px"
            priority
          />
        </div>

        {imagens.length > 1 && (
          <>
            <button
              onClick={ant}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition"
              aria-label="Imagem anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={prox}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition"
              aria-label="Próxima imagem"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        <button
          onClick={onFechar}
          className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition"
          aria-label="Fechar galeria"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// ---------------- Seção Projetos ----------------
export function SecaoProjetos() {
  // Mapeia os campos do JSON para os nomes que o componente já usa
  const projetos = data.projetos.itens.map((p) => ({
    title: p.titulo,
    description: p.descricao,
    tags: p.tags,
    repo: p.repo,
    status: p.status as "Concluído" | "Em construção" | undefined,
    imagens: p.imagens as ReadonlyArray<string>,
  }));

  const [aberto, setAberto] = useState(false);
  const [galeria, setGaleria] = useState<string[]>([]);

  const abrirGaleria = (imagens: ReadonlyArray<string>) => {
    if (!imagens?.length) return;
    setGaleria([...imagens]);
    setAberto(true);
  };

  const fecharGaleria = () => {
    setAberto(false);
    setGaleria([]);
  };

  return (
    <section id="projects" className="bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="space-y-12">
          <h2 className="text-3xl sm:text-4xl font-bold fade-in-up">
            {data.projetos.titulo}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projetos.map((project, index) => {
              const temImagens = project.imagens?.length > 0;

              return (
                <div
                  key={project.title}
                  className="p-6 rounded-xl bg-background border border-border hover:border-primary transition-all duration-500 hover:shadow-lg fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* título e descrição */}
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* chips */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <SeloTecnologia key={tag} nome={tag} />
                    ))}
                  </div>

                  {/* status */}
                  {project.status && (
                    <span
                      className={`inline-block mb-4 px-2 py-1 text-xs font-semibold rounded border
                      ${
                        project.status === "Em construção"
                          ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/30"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                      }`}
                    >
                      {project.status}
                    </span>
                  )}

                  {/* botões */}
                  <div className="flex items-center gap-4">
                    {temImagens ? (
                      <button
                        type="button"
                        onClick={() => abrirGaleria(project.imagens)}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all duration-300 hover:gap-3"
                        aria-label={`Ver imagens de ${project.title}`}
                      >
                        Ver imagens <ExternalLink className="w-4 h-4" />
                      </button>
                    ) : (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-all duration-300 hover:gap-3"
                      >
                        Ver projeto <ExternalLink className="w-4 h-4" />
                      </a>
                    )}

                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={`Abrir GitHub de ${project.title}`}
                    >
                      <Github className="w-4 h-4" />
                      <span className="underline-offset-4 hover:underline">
                        GitHub
                      </span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <ModalGaleria
        imagens={galeria}
        aberto={aberto}
        onFechar={fecharGaleria}
      />
    </section>
  );
}
