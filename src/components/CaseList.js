import { formatarData } from "@/lib/format";

export default function CaseList({ casos, carregando, erro }) {
  const total = casos.length;
  const rotulo = total === 1 ? "1 caso publicado" : `${total} casos publicados`;

  return (
    <section className="panel">
      <div className="panel-inner">
        <div className="list-head">
          <h2>Mural</h2>
          <p className="count">{carregando ? "Carregando..." : rotulo}</p>
        </div>

        {erro ? (
          <div className="banner error" role="alert">
            <p>{erro}</p>
          </div>
        ) : null}

        {!carregando && !erro && total === 0 ? (
          <p className="empty">
            Nenhum caso publicado ainda. Seja o primeiro.
          </p>
        ) : null}

        <div className="cases">
          {casos.map((caso) => (
            <article className="case" key={caso.id}>
              <div className="case-meta">
                <span className="case-name">{caso.aluno}</span>
                <span className="badge">{caso.area}</span>
                <time className="when" dateTime={caso.created_at}>
                  {formatarData(caso.created_at)}
                </time>
              </div>
              <h3>Problema</h3>
              <p>{caso.problema}</p>
              <h3>Solução</h3>
              <p>{caso.solucao_ia}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
