export const DEFAULT_ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

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

/**
 * Encodes a given number (like a timestamp) into a string using the allowed characters.
 *
 * @param {number} timeStamp - The number to encode (e.g., timestamp).
 * @param {string} characters - The allowed characters for encoding.
 * @returns {string} The encoded string.
 */
export const encodeTimestamp = (timeStamp: number, characters: string): string => {
  const charactersLength = characters.length;
  let encoded = "";

  while (timeStamp > 0) {
    encoded = characters[timeStamp % charactersLength] + encoded;
    timeStamp = Math.floor(timeStamp / charactersLength);
  }

  return encoded;
};
