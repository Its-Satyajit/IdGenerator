import { BaseIdGenerator } from "./baseGenerator";
import { RandomIdGenerator } from "./randomGenerator";
import { ShortUuidV7Generator } from "./shortUuidV7Generator";
import { TimeBasedGenerator } from "./timeBasedGenerator";
import { UuidV7Generator } from "./uuidV7Generator";

/**
 * Enum representing the different types of ID generators.
 * @enum {IdGeneratorType}
 */
export enum IdGeneratorType {
  RANDOM,
  UUID_V7,
  SHORT_UUID_V7,
  TIME_BASED,
}
/**
 * Factory class for creating different types of ID generators.
 */
export class IdGeneratorFactory {
  /**
   * Creates an ID generator based on the specified type.
   * @param {IdGeneratorType} type The type of ID generator to create. Defaults to `RANDOM` if not provided.
   * @returns {BaseIdGenerator} An instance of the specified ID generator.
   * @example
   * const idGenerator = IdGeneratorFactory.create(IdGeneratorType.UUID_V7);
   */
  static create(type: IdGeneratorType = IdGeneratorType.RANDOM): BaseIdGenerator {
    switch (type) {
      case IdGeneratorType.RANDOM:
        return new RandomIdGenerator();
      case IdGeneratorType.UUID_V7:
        return new UuidV7Generator();
      case IdGeneratorType.SHORT_UUID_V7:
        return new ShortUuidV7Generator();
      case IdGeneratorType.TIME_BASED:
        return new TimeBasedGenerator();
      default:
        return new RandomIdGenerator();
    }
  }
}
