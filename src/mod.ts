import { RandomIdGenerator } from "./methods/randomGenerator";
import { ShortUuidV7Generator } from "./methods/shortUuidV7Generator";
import { TimeBasedGenerator } from "./methods/timeBasedGenerator";
import { UuidV7Generator } from "./methods/uuidV7Generator";

export class IdGenerator {
  /**
   * Generates a random ID (default 16 characters)
   * @param size Optional length of the ID
   * @returns Random ID string
   */
  static random(size?: number): string {
    return new RandomIdGenerator().generate(size);
  }

  /**
   * Generates a full UUID v7
   * @returns UUID v7 string
   */
  static uuidV7(): string {
    return new UuidV7Generator().generate();
  }

  /**
   * Generates a short UUID v7 (22 characters)
   * @returns Short UUID v7 string
   */
  static shortUuidV7(): string {
    return new ShortUuidV7Generator().generate();
  }

  /**
   * Generates a time-based ID
   * @returns Time-based ID string
   */
  static timeId(): string {
    return new TimeBasedGenerator().generate();
  }
}
