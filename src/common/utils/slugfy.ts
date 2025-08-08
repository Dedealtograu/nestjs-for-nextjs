export function slugfy(text: string): string {
  return text
    .normalize('NFKD') // Separa acentos de letras (ex: á -> a + ´)
    .toLocaleLowerCase() // Coloca tudo em minúsculo
    .replace(/[\u0300-\u036f]/g, '') // Remove os acentos
    .replace(/[^a-z0-9]/g, ' ') // Troca os caracteres especiais por espaços
    .trim() // Remove espaços iniciais e finais
    .replace(/\s+/g, '-') // Substitui espaços por hifens
}
