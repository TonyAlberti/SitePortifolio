"use client";

import { SeloTecnologia } from "@/components/SeloTecnologia";
import data from "@/content/site.json";

/**
 * Seção "Experiência Técnica" — usa os grupos de habilidades
 * para aparecer quando o usuário clica em "Experiência".
 * Mantemos o id="experience" para a âncora do menu continuar funcionando.
 */
export function SecaoExperiencia() {
  const grupos = data.habilidades?.grupos ?? [];

  return (
    <section
      id="experience"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32"
    >
      <div className="space-y-12">
        <h2 className="text-3xl sm:text-4xl font-bold fade-in-up">
          {data.habilidades?.titulo || "Experiência Técnica"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {grupos.map(
            (group: { categoria: string; skills: string[] }, index: number) => (
              <div
                key={group.categoria}
                className="space-y-4 fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-lg font-semibold text-primary">
                  {group.categoria}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <SeloTecnologia key={skill} nome={skill} />
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
