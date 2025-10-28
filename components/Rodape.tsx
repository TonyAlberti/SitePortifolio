import data from "@/content/site.json";

/**
 * Rodapé
 */
export function Rodape() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} {data.rodape.texto}
          </p>
          <div className="flex gap-6">
            <a
              href="#contact"
              className="hover:text-foreground transition-colors duration-300"
            >
              Contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
