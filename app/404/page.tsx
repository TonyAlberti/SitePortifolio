"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFoundRedirect() {
  // Redireciona qualquer rota 404 para a home no GitHub Pages (SPA fallback)
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
