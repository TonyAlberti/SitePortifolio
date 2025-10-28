// content/projetos.ts
export type Projeto = {
  title: string;
  description: string;
  tags: string[];
  repo: string;
  live?: string;
};

export const PROJETOS: Projeto[] = [
  {
    title: "CineBase",
    description:
      "Projeto fullstack usando React, Tailwind CSS, Zustand e Go com GraphQL.",

    tags: ["React", "TypeScript", "Tailwind CSS", "Go", "Next.js"],
    repo: "https://github.com/TonyAlberti/CineBase",
  },
  {
    title: "Point_of_Sale",
    description: "Ponto de venda feito com React, Tailwind e TypeScript.",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/TonyAlberti/Point_of_Sale",
  },
  {
    title: "Sistema Financeiro Pessoal",
    description:
      "Sistema de controle financeiro com múltiplas contas e dupla entrada (ainda em construçâo).",
    tags: ["React", "TypeScript", "Tailwind CSS"],
    repo: "https://github.com/TonyAlberti/sistema-financeiro-pessoal",
  },
];
