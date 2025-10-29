import { Button } from "@/components/ui/button";
import data from "@/content/site.json";
import { Github, Linkedin } from "lucide-react";

/**
 * Seção "Contato" consumindo JSON.
 */
export function SecaoContato() {
  return (
    <section id="contact" className="bg-primary text-primary-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="text-center space-y-8">
          <div className="space-y-4 fade-in-up">
            <h2 className="text-3xl sm:text-4xl font-bold">
              {data.contato.titulo}
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              {data.contato.descricao}
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <a
              href={data.perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 bg-transparent btn-hover"
              >
                {data.contato.ctaSecundarioRotulo}
              </Button>
            </a>
          </div>

          <div
            className="flex justify-center gap-6 pt-8 fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <a
              href={data.perfil.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={data.perfil.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
