"use client";

import { useCallback, useEffect, useState } from "react";
import CaseForm from "@/components/CaseForm";
import CaseList from "@/components/CaseList";
import { mensagemErro } from "@/lib/format";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

export default function Mural() {
  const [casos, setCasos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");

  const carregarCasos = useCallback(async () => {
    if (!isSupabaseConfigured || !supabase) {
      setCarregando(false);
      setErroLista("");
      return;
    }

    setCarregando(true);
    setErroLista("");

    const { data, error } = await supabase
      .from("casos_ia")
      .select("id, aluno, area, problema, solucao_ia, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      setCasos([]);
      setErroLista(mensagemErro(error));
      setCarregando(false);
      return;
    }

    setCasos(data ?? []);
    setCarregando(false);
  }, []);

  useEffect(() => {
    carregarCasos();
  }, [carregarCasos]);

  return (
    <div className="page">
      <header className="masthead">
        <h1>Radar de Casos de Uso de IA</h1>
        <div className="rule" aria-hidden="true" />
        <p className="lede">
          Mural da turma — o que a inteligência artificial já resolve (ou pode
          resolver) no seu ofício
        </p>
      </header>

      {!isSupabaseConfigured ? (
        <div className="banner error" role="alert">
          <p>
            Configure as variáveis NEXT_PUBLIC_SUPABASE_URL e
            NEXT_PUBLIC_SUPABASE_ANON_KEY no arquivo .env.local para gravar e
            listar os casos.
          </p>
        </div>
      ) : null}

      <main className="layout">
        <CaseForm onCreated={carregarCasos} />
        <CaseList casos={casos} carregando={carregando} erro={erroLista} />
      </main>

      <footer className="site-footer">
        Exercício de aula · Cursor + Supabase + Vercel
      </footer>
    </div>
  );
}
