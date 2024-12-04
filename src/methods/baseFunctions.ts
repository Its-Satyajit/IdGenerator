export const DEFAULT_ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

export function getRandomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

export function toBase(num: bigint, alphabet: string = DEFAULT_ALPHABET): string {
  if (num === BigInt(0)) return alphabet;

  let result = "";
  const base = BigInt(alphabet.length);

  while (num > BigInt(0)) {
    const remainder = Number(num % base);
    result = alphabet[remainder] + result;
    num = num / base;
  }

  return result;
}
