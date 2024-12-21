/**
 * Formata o valor do input de swap, permitindo apenas números, vírgula ou ponto como separadores decimais.
 * Converte automaticamente vírgula para ponto ao final da edição.
 *
 * @param value - O valor do input fornecido pelo usuário.
 * @returns O valor formatado.
 */
export const formatInputValue = (value: string): string => {
  // Permite números, vírgula e ponto enquanto o usuário digita
  const sanitized = value.replace(/[^0-9.,]/g, "");
  // Converte vírgula para ponto apenas ao finalizar
  return sanitized.replace(",", ".");
};
