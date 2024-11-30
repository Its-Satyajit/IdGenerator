// src/id-generators/base-generator.ts
export abstract class BaseIdGenerator {
  protected static readonly DEFAULT_ALPHABET =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  /**
   * Generate a unique identifier
   * @param size The length of the ID to generate
   * @returns A unique identifier
   */
  abstract generate(size?: number): string;

  /**
   * Utility method to get random values
   * @param length Number of random bytes to generate
   * @returns Uint8Array of random bytes
   */
  protected getRandomBytes(length: number): Uint8Array {
    const bytes = new Uint8Array(length);
    crypto.getRandomValues(bytes);
    return bytes;
  }

  /**
   * Convert a number to a specific base using the default alphabet
   * @param num Number to convert
   * @param alphabet Alphabet to use for conversion
   * @returns Converted string
   */
  protected toBase(
    num: bigint,
    alphabet: string = BaseIdGenerator.DEFAULT_ALPHABET
  ): string {
    if (num === BigInt(0)) return alphabet[0];

    let result = "";
    const base = BigInt(alphabet.length);

    while (num > BigInt(0)) {
      const remainder = Number(num % base);
      result = alphabet[remainder] + result;
      num = num / base;
    }

    return result;
  }
}
