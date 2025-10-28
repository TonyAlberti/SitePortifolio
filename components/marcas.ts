import {
  siGo,
  siNextdotjs,
  siNodedotjs,
  siReact,
  siTailwindcss,
  siTypescript,
} from "simple-icons/icons";

type SI = { title: string; hex: string; path: string };

const pick = (icon: SI) => ({
  nome: icon.title,
  cor: `#${icon.hex}`,
  path: icon.path,
});

export type Marca = {
  nome: string;
  cor: string;
  path: string;
};

/**
 * Mapa por "label" exatamente como será exibido nos badges.
 * Se quiser mudar o texto ex.: "Node" → "Node.js"
 */
export const MARCAS: Record<string, Marca> = {
  React: pick(siReact),
  "Next.js": pick(siNextdotjs),
  TypeScript: pick(siTypescript),
  Go: pick(siGo),
  "Tailwind CSS": pick(siTailwindcss),
  "Node.js": pick(siNodedotjs),
};
