/**
 * Formata o valor do input de swap, permitindo apenas números e vírgula como separador decimal.
 * Substitui automaticamente pontos por vírgulas e garante que apenas uma vírgula seja permitida.
 * 
 * @param value - O valor do input fornecido pelo usuário.
 * @returns O valor formatado.
 */
export const formatInputValue = (value: string): string => {
  // Remove caracteres inválidos e substitui ponto por vírgula
  const sanitized = value.replace(/[^0-9.,]/g, ""); // Permite números, pontos e vírgulas
  const normalized = sanitized.replace(".", ","); // Substitui ponto por vírgula
  const parts = normalized.split(",");
  // Garante que apenas uma vírgula esteja presente
  return parts.length > 2
    ? parts[0] + "," + parts.slice(1).join("")
    : normalized;
};
