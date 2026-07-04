/**
 * Prefijo de subruta cuando el sitio vive en https://<usuario>.github.io/<repo>/.
 * next/image y <Link> lo aplican solos; usar esto para assets referenciados
 * a mano (p. ej. /resume.pdf).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBasePath(p: string): string {
  return `${BASE_PATH}${p}`;
}
