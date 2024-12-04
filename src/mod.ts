import { base64Generator } from "./methods/base64Generator";
import { customIDGenerator } from "./methods/customIDGenerator";
import { generateRandomId } from "./methods/randomIDGenerator";
import { generateShortUuidV7 } from "./methods/shortUuidV7Generator";
import { generateTimeBasedId } from "./methods/timeBasedGenerator";
import { generateUuidV7 } from "./methods/uuidV7Generator";

/**
 * A utility object for generating various types of IDs.
 */
export const id = {
  /**
   * Generates a random ID.
   * @param {number} [size=16] - Optional length of the ID.
   * @returns {string} Random ID string.
   * @example
   * const randomId = id.random(10);
   */
  random: (size?: number) => generateRandomId(size),

  /**
   * Generates a full UUID v7.
   * @returns {string} UUID v7 string.
   * @example
   * const uuidV7 = id.uuidV7();
   */
  uuidV7: () => generateUuidV7(),

  /**
   * Generates a short UUID v7 (22 characters).
   * @returns {string} Short UUID v7 string.
   * @example
   * const shortUuidV7 = id.shortUuidV7();
   */
  shortUuidV7: () => generateShortUuidV7(),

  /**
   * Generates a time-based ID.
   * @returns {string} Time-based ID string.
   * @example
   * const timeId = id.timeId();
   */
  timeId: () => generateTimeBasedId(),

  /**
   * Generates a random unique ID with the specified length and characters.
   * Appends a timestamp to ensure uniqueness.
   *
   * @param {number} length - The length of the generated ID.
   * @param {string} characters - The string of characters from which the ID is generated.
   * @returns {string} A randomly generated string of the specified length with a timestamp.
   * @example
   * const customId = id.custom(10, 'abcdefghijklmnoxyzABCDEFGHIJKLMNVWXYZ012');
   */
  custom: (length: number, characters: string) => customIDGenerator(length, characters),

  /**
   * Optimized Base64 ID generator.
   * Generates a random string and returns it in Base64 format, optimized for performance.
   * @param {number} length - Length of the ID.
   * @returns {string} Base64 ID string.
   * @example
   * const base64Id = id.base64(10);
   */
  base64: (length: number) => base64Generator(length),

  /**
   * Base62 ID generator (not implemented yet).
   * @param {number} length - Length of the ID.
   * @returns {string} Base62 ID string.
   */
  base62: (length: number) => `not Implemented Yet id ${length} `,

  /**
   * Hash ID generator (not implemented yet).
   * @param {string | Uint8Array} input - Input to hash.
   * @returns {string} Hash ID string.
   */
  hash: (input: string | Uint8Array) => `not Implemented Yet id ${input} `,

  /**
   * Nano ID generator (not implemented yet).
   * @returns {string} Nano ID string.
   */
  nano: () => `not Implemented Yet `,

  /**
   * URL ID generator (not implemented yet).
   * @param {number} length - Length of the ID.
   * @returns {string} URL ID string.
   */
  url: (length: number) => `not Implemented Yet id ${length} `,

  /**
   * UUID v1 generator (not implemented yet).
   * @returns {string} UUID v1 string.
   */
  uuidV1: () => `not Implemented Yet id  `,

  /**
   * UUID v4 generator (not implemented yet).
   * @returns {string} UUID v4 string.
   */
  uuidV4: () => `not Implemented Yet id  `,
};

console.log(id.base64(6));
