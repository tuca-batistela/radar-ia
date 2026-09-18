"use client";

import { useState } from "react";
import { AREAS, LIMITE, mensagemErro } from "@/lib/format";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";

const inicial = {
  aluno: "",
  area: "",
  problema: "",
  solucao_ia: "",
};

export default function CaseForm({ onCreated }) {
  const [valores, setValores] = useState(inicial);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState("");

  function atualizar(campo, valor) {
    setValores((atual) => ({ ...atual, [campo]: valor }));
    setErro("");
    setOk("");
  }

  async function enviar(evento) {
    evento.preventDefault();

    const aluno = valores.aluno.trim();
    const area = valores.area.trim();
    const problema = valores.problema.trim();
    const solucao_ia = valores.solucao_ia.trim();

    if (!aluno || !area || !problema || !solucao_ia) {
      setErro("Preencha todos os campos antes de publicar.");
      return;
    }

    if (!isSupabaseConfigured || !supabase) {
      setErro(
        "As variáveis NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY não estão configuradas."
      );
      return;
    }

    setEnviando(true);
    setErro("");
    setOk("");

    const { error } = await supabase.from("casos_ia").insert({
      aluno,
      area,
      problema,
      solucao_ia,
    });

    setEnviando(false);

    if (error) {
      setErro(mensagemErro(error));
      return;
    }

    setValores(inicial);
    setOk("Caso publicado no mural.");
    await onCreated();
  }

  return (
    <section className="panel">
      <div className="panel-inner">
        <h2>Registrar um caso</h2>
        <p className="panel-copy">
          Descreva um problema do ofício e como a inteligência artificial ajuda
          a resolvê-lo.
        </p>

        <form onSubmit={enviar} noValidate>
          <div className="field">
            <label htmlFor="aluno">Nome</label>
            <input
              id="aluno"
              name="aluno"
              type="text"
              autoComplete="name"
              value={valores.aluno}
              onChange={(evento) => atualizar("aluno", evento.target.value)}
              disabled={enviando}
            />
          </div>

          <div className="field">
            <label htmlFor="area">Área</label>
            <select
              id="area"
              name="area"
              value={valores.area}
              onChange={(evento) => atualizar("area", evento.target.value)}
              disabled={enviando}
            >
              <option value="">Selecione a área</option>
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label htmlFor="problema">Problema do dia a dia</label>
            <textarea
              id="problema"
              name="problema"
              maxLength={LIMITE}
              value={valores.problema}
              onChange={(evento) => atualizar("problema", evento.target.value)}
              disabled={enviando}
            />
            <span className="counter">
              {valores.problema.length}/{LIMITE}
            </span>
          </div>

          <div className="field">
            <label htmlFor="solucao_ia">Como a IA ajuda</label>
            <textarea
              id="solucao_ia"
              name="solucao_ia"
              maxLength={LIMITE}
              value={valores.solucao_ia}
              onChange={(evento) =>
                atualizar("solucao_ia", evento.target.value)
              }
              disabled={enviando}
            />
            <span className="counter">
              {valores.solucao_ia.length}/{LIMITE}
            </span>
          </div>

          <div className="actions">
            <button className="button" type="submit" disabled={enviando}>
              {enviando ? "Enviando..." : "Publicar no mural"}
            </button>
          </div>
        </form>

        {erro ? (
          <div className="banner error form-status" role="alert">
            <p>{erro}</p>
          </div>
        ) : null}

        {ok ? (
          <div className="banner ok form-status" role="status">
            <p>{ok}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
