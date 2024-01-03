const turmas = [
  "Educação Infantil-Turma de 4 anos",
  "Educação Infantil-Turma de 5 anos",
  "1º ANO A",
  "2º ANO A",
  "3º ANO A",
  "3º ANO B",
  "4º ANO A",
  "4º ANO B",
  "5º ANO A",
  "6º ANO A",
  "6º ANO B",
  "7º ANO A",
  "7º ANO B",
  "8º ANO A",
  "8º ANO B",
  "9º ANO A",
  "9º ANO B",
];

const anos_escolares = [
  "Educação Infantil-Turma de 4 anos",
  "Educação Infantil-Turma de 5 anos",
  "1° ano do 1º ciclo do ensino fundamental",
  "2° ano do 1º ciclo do ensino fundamental",
  "3° ano do 1º ciclo do ensino fundamental",
  "4° ano do 2º ciclo do ensino fundamental",
  "5° ano do 2º ciclo do ensino fundamental",
  "6° ano do 3º ciclo do ensino fundamental",
  "7° ano do 3º ciclo do ensino fundamental",
  "8° ano do 4º ciclo do ensino fundamental",
  "9° ano do 4º ciclo do ensino fundamental",
];

export const CamposdeIdentificacao = [
  { label: "ID do Aluno", id: "id" },
  { label: "Nome Completo", id: "nome_do_aluno" },
  { label: "Data de Nascimento", id: "data_de_nascimento" },
  { label: "Documento (Certidão, CPF ou RG)", id: "certidao_cpf_rg" },
];

export const CamposdeDadosPessoais = [
  { label: "Nome da Mãe", id: "mae" },
  { label: "Nome do Pai", id: "pai" },
  { label: "Naturalidade", id: "naturalidade" },
  { label: "Telefone", id: "telefone" },
  {
    label: "Raça ou Cor",
    id: "Raça",
    type: "select",
    options: ["BRANCA", "PRETA", "PARDA", "AMARELA", "INDÍGENA", "NÃO DECLARA"],
  },
];

export const CamposdeEscolarizacao = [
  {
    label: "Turma em 2024",
    id: "turma_em_2024",
    type: "select",
    options: turmas,
  },
  {
    label: "Ano Escolar (Fundamental)",
    id: "ano_fundamental",
    type: "select",
    options: anos_escolares,
  },
  { label: "Turno", id: "turno", type: "select", options: ["Manhã", "Tarde"] },
  { label: "Observações Adicionais", id: "observações" },
];

export const CamposdeMovimentacaoEscolar = [
  {
    label: "Tipo de Movimentação do Aluno",
    id: "movimentacao",
    type: "select",
    options: ["A/C", "T", "MT"],
  },
  { label: "Data da Matrícula (Aluno Novo)", id: "data_matricula" },
  { label: "Data da Movimentação (Aluno Matriculado)", id: "data_movimento" },
  {
    label: "Escola de Transferência (Origem/Destino)",
    id: "transferencia_escola_destino",
  },
];

export const CamposdeDadosPessoaistoUpdate = [
  { label: "Nome da Mãe", id: "mae" },
  { label: "Nome do Pai", id: "pai" },
  { label: "Naturalidade", id: "naturalidade" },
  { label: "Telefone", id: "telefone" },
  { label: "Raça ou Cor", id: "Raça" },
];
export const CamposdeEscolarizacaotoUpdate = [
  { label: "Turma em 2024", id: "turma_em_2024" },
  { label: "Ano Escolar (Fundamental)", id: "ano_fundamental" },
  { label: "Turno", id: "turno" },
  { label: "Observações Adicionais", id: "observações" },
];
export const CamposdeMovimentacaoEscolarToUpdate = [
  { label: "Tipo de Movimentação do Aluno", id: "movimentacao" },
  { label: "Data da Matrícula", id: "data_matricula" },
  { label: "Data da Movimentação (Aluno Matriculado)", id: "data_movimento" },
  {
    label: "Escola de Transferência (Origem/Destino)",
    id: "transferencia_escola_destino",
  },
];

export function formatDate(isoString: string | null | undefined): string {
  if (!isoString) {
    return "";
  }
  const date = new Date(isoString);
  if (isNaN(date.getTime())) {
    // a data não é válida
    return "";
  }
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Janeiro é 0!
  const year = date.getUTCFullYear();

  return `${day}/${month}/${year}`;
}

export default function getMonthName(monthNumber: number) {
  const months = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro'
  ];
  return months[monthNumber];
}

export function isMobileNumber(phoneNumber: string): boolean {
  // Verifique se o número é um celular com base no padrão específico
  return /^\d{5}-\d{4}$/.test(phoneNumber);
}

export function formatInternationalNumber(
  phoneNumber: string,
  defaultAreaCode: string = "54"
): string {
  // Tente encontrar o código de área no número
  const match = phoneNumber.match(/\((\d{2})\)/);
  let areaCode = defaultAreaCode; // Usar código de área padrão se não encontrar um específico

  // Se encontrar um código de área, use-o
  if (match && match[1]) {
    areaCode = match[1];
    phoneNumber = phoneNumber.replace(/\(\d{2}\)/, ""); // Remova o código de área do número
  }

  // Remova qualquer caractere não numérico restante
  const numberWithoutDashes = phoneNumber.replace(/\D/g, "");

  // Retorne o número formatado com o código do país e o código de área
  return "55" + areaCode + numberWithoutDashes;
}



export const BoxStyleCadastro = {
  backgroundColor: "#ffffff",
  border: "10px solid",
  borderImageSlice: "1",
  borderWidth: "9px",
  borderImageSource: "linear-gradient(to left, #FDA188, #FDA188)",
  borderRadius: "3px",
  boxShadow: "0 9px 40px rgba(42, 42, 42)",
  fontSize: "16px",
  maxWidth: "752px",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  margin: "72px auto",
  padding: "0.5em 52px",
};

export const TituloDaPagina = {
  marginTop: "1.125rem",
  width: "100%",
  marginBottom: "auto",
  textAlign: "center",
  color: "#000000",
  fontSize: "2em",
  fontWeight: "600",
  lineHeight: "1.45",
};

export const SubtituloDaPagina = {
  color: "#264B67",
  fontSize: "1em",
  fontWeight: "500",
  lineHeight: "1.6",
};

export const ListStyle = {
  borderColor: "#83D0E4",
  borderBottom: "1px solid #83D0E4",
  padding: "14px",
  marginBottom: "auto",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
export const TituloSecaoStyle = {
  color: "#000000",
  fontSize: "1.25rem",
  marginBottom: "20px",
  fontWeight: "600",
  lineHeight: "1.45",
};
