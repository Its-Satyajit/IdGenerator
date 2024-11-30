// src/id-generators/random-generator.ts

import { BaseIdGenerator } from "./baseGenerator";

export class RandomIdGenerator extends BaseIdGenerator {
  /**
   * Generates a fixed 16-character random ID by default
   * @param size The length of the ID to generate
   * @returns A random string of specified length
   */
  generate(size: number = 16): string {
    return this.generateCustomId(size);
  }

  /**
   * Generates a custom length random ID
   * @param length The length of the ID to generate
   * @returns A random string of the specified length
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
