// src/id-generator-factory.ts

import { BaseIdGenerator } from "./baseGenerator";
import { RandomIdGenerator } from "./randomGenerator";
import { ShortUuidV7Generator } from "./shortUuidV7Generator";
import { TimeBasedGenerator } from "./timeBasedGenerator";
import { UuidV7Generator } from "./uuidV7Generator";

export enum IdGeneratorType {
  RANDOM,
  UUID_V7,
  SHORT_UUID_V7,
  TIME_BASED,
}

export class IdGeneratorFactory {
  /**
   * Create an ID generator based on the specified type
   * @param type The type of ID generator to create
   * @returns An instance of the specified ID generator
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
