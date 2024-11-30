import { RandomIdGenerator } from "./methods/randomGenerator";
import { ShortUuidV7Generator } from "./methods/shortUuidV7Generator";
import { TimeBasedGenerator } from "./methods/timeBasedGenerator";
import { UuidV7Generator } from "./methods/uuidV7Generator";

/**
 * A utility class for generating various types of IDs.
 * @class IdGenerator
 */
export class IdGenerator {
  /**
   * Generates a random ID.
   * @method random
   * @static
   * @param {number} [size=16] - Optional length of the ID.
   * @returns {string} Random ID string.
   * @example
   * const randomId = IdGenerator.random(10);
   */
  static random(size?: number): string {
    return new RandomIdGenerator().generate(size);
  }

  /**
   * Generates a full UUID v7.
   * @method uuidV7
   * @static
   * @returns {string} UUID v7 string.
   * @example
   * const uuidV7 = IdGenerator.uuidV7();
   */
  static uuidV7(): string {
    return new UuidV7Generator().generate();
  }

  /**
   * Generates a short UUID v7 (22 characters).
   * @method shortUuidV7
   * @static
   * @returns {string} Short UUID v7 string.
   * @example
   * const shortUuidV7 = IdGenerator.shortUuidV7();
   */
  static shortUuidV7(): string {
    return new ShortUuidV7Generator().generate();
  }

  /**
   * Generates a time-based ID.
   * @method timeId
   * @static
   * @returns {string} Time-based ID string.
   * @example
   * const timeId = IdGenerator.timeId();
   */
  static timeId(): string {
    return new TimeBasedGenerator().generate();
  }
}
