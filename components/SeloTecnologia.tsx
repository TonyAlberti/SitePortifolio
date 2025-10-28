"use client";

import { MARCAS } from "@/components/marcas";
import * as React from "react";

/**
 * Badge/Chip de tecnologia com:
 * - cor oficial no hover (via CSS var --brand);

 */
export function SeloTecnologia({ nome }: { nome: string }) {
  const marca = MARCAS[nome]; // pode ser undefined se não mapeado
  const cor = marca?.cor ?? "#3b82f6";

  return (
    <span
      style={{ ["--brand" as any]: cor } as React.CSSProperties}
      className={`
        group inline-flex items-center gap-2 px-4 py-2 rounded-lg
        bg-muted text-muted-foreground font-medium
        transition-all duration-300
        hover:[background:var(--brand)] hover:[color:white]
        hover:shadow-md hover:scale-105
      `}
    >
      {marca ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          className={`
            w-0 h-4 opacity-0 -translate-x-1
            transition-all duration-300
            group-hover:w-4 group-hover:opacity-100 group-hover:translate-x-0
          `}
          fill="currentColor"
        >
          <path d={marca.path} />
        </svg>
      ) : null}
      {nome}
    </span>
  );
}
