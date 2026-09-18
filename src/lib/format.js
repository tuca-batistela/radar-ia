export const AREAS = [
  "Saúde",
  "Educação",
  "Jurídico",
  "Gestão",
  "Engenharia",
  "Finanças",
  "Marketing",
  "Outra",
];

export const LIMITE = 280;

export function formatarData(iso) {
  if (!iso) return "";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function mensagemErro(error) {
  if (!error) return "Não foi possível concluir a operação.";
  if (typeof error === "string") return error;
  return error.message || "Não foi possível concluir a operação.";
}
