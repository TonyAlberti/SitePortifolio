import data from "@/content/site.json";

type Pilar = {
  titulo: string;
  texto: string;
};

type SiteData = {
  sobre?: {
    titulo?: string;
    texto?: string;
    pilares?: Pilar[];
  };
};

export function SecaoSobre() {
  const pilaresPadrao: Pilar[] = [
    {
      titulo: "Código limpo",
      texto:
        "Componentes coesos, nomes expressivos e testes quando fizer sentido. Prioridade para clareza e manutenibilidade.",
    },
    {
      titulo: "Performance",
      texto:
        "Otimização de render, lazy loading e atenção a métricas (LCP/CLS). Sem micro-otimização prematura.",
    },
    {
      titulo: "Colaboração",
      texto:
        "Workflow claro com designers e backend. Comunicação objetiva e documentação do que importa.",
    },
  ];

  const site = (data as SiteData) || {};
  const titulo = site.sobre?.titulo ?? "Sobre mim";

  const texto =
    site.sobre?.texto ??
    "Sou desenvolvedor frontend com base sólida em React, TypeScript e Next.js. Gosto de assumir desafios, entender o problema antes do código e entregar interfaces acessíveis e performáticas. Busco oportunidades onde eu possa aprender rápido, colaborar de forma madura e gerar resultado.";

  const pilares: Pilar[] =
    Array.isArray(site.sobre?.pilares) && site.sobre!.pilares!.length > 0
      ? site.sobre!.pilares!
      : pilaresPadrao;

  return (
    <section id="about" className="bg-card border-y border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="space-y-12">
          {/* Cabeçalho */}
          <div className="space-y-4 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold">{titulo}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl">{texto}</p>
          </div>

          {/* Pilares */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            role="list"
            aria-label="Pilares de atuação"
          >
            {pilares.map((p, i) => (
              <div
                key={`${p.titulo}-${i}`}
                role="listitem"
                className="p-6 rounded-xl bg-background border border-border hover:border-primary transition-all duration-500 card-hover"
              >
                <h3 className="font-semibold text-lg mb-2">{p.titulo}</h3>
                <p className="text-muted-foreground">{p.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
