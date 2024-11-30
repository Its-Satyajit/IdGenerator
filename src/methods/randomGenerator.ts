import { BaseIdGenerator } from "./baseGenerator";

/**
 * A concrete ID generator that produces random IDs.
 * This class extends the `BaseIdGenerator` and provides methods to generate random IDs of specified lengths.
 */
export class RandomIdGenerator extends BaseIdGenerator {
  /**
   * Generates a random ID of the specified length. By default, it generates a 16-character ID.
   * @param {number} [size=16] The length of the ID to generate.
   * @returns {string} A random string of the specified length.
   * @example
   * const randomId = new RandomIdGenerator().generate(10);
   */
  generate(size: number = 16): string {
    return this.generateCustomId(size);
  }

  /**
   * Generates a custom length random ID.
   * This method is used internally by the `generate` method to produce IDs of varying lengths.
   * @param {number} length The length of the ID to generate.
   * @returns {string} A random string of the specified length.
   * @private
   */
  private generateCustomId(length: number): string {
    const bytes = this.getRandomBytes(length * 2);
    const alphabet = BaseIdGenerator.DEFAULT_ALPHABET;
    const alphabetLength = alphabet.length;

    let result = "";
    for (let i = 0; i < bytes.length && result.length < length; i++) {
      const randomValue = bytes[i];
      if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
        result += alphabet[randomValue % alphabetLength];
      }
    }

    while (result.length < length) {
      const additionalBytes = this.getRandomBytes(1);
      const randomValue = additionalBytes[0];
      if (randomValue < Math.floor(256 / alphabetLength) * alphabetLength) {
        result += alphabet[randomValue % alphabetLength];
      }
    }

    return result;
  }
}
