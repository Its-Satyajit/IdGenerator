import { IdGenerator } from "../mod";
import {
  areIdsUnique,
  generateMultipleIds,
  isAlphanumeric,
  measureIdGenerationPerformance,
  validateUuidFormat,
  validateUuidV7Format,
  validateUuidV7VersionAndVariant,
} from "../utils/test/testUtils";

describe("IdGenerator", () => {
  describe("Random ID Generator", () => {
    const DEFAULT_LENGTH = 16;
    const CUSTOM_LENGTH = 24;

    test(`generates default ${DEFAULT_LENGTH}-character random ID`, () => {
      const randomId = IdGenerator.random();
      expect(randomId).toHaveLength(DEFAULT_LENGTH);
      expect(typeof randomId).toBe("string");
    });

    test(`generates random ID with custom length of ${CUSTOM_LENGTH}`, () => {
      const randomId = IdGenerator.random(CUSTOM_LENGTH);
      expect(randomId).toHaveLength(CUSTOM_LENGTH);
    });

    test("generates unique random IDs", () => {
      const ids = generateMultipleIds(IdGenerator.random, 100);
      expect(areIdsUnique(ids)).toBeTruthy();
    });

    test("uses only alphanumeric characters", () => {
      const randomId = IdGenerator.random();
      expect(isAlphanumeric(randomId)).toBeTruthy();
    });
  });

  describe("UUID V7 Generator", () => {
    test("generates valid UUID format", () => {
      const uuidV7 = IdGenerator.uuidV7();
      expect(validateUuidFormat(uuidV7)).toBeTruthy();
    });

    test("generates valid UUID v7 format", () => {
      const uuidV7 = IdGenerator.uuidV7();
      expect(validateUuidV7Format(uuidV7)).toBeTruthy();
    });

    test("validates UUID v7 version and variant", () => {
      const uuidV7 = IdGenerator.uuidV7();
      expect(validateUuidV7VersionAndVariant(uuidV7)).toBeTruthy();
    });

    test("generates unique UUID v7", () => {
      const ids = generateMultipleIds(IdGenerator.uuidV7, 100);
      expect(areIdsUnique(ids)).toBeTruthy();
    });
  });

  describe("Short UUID V7 Generator", () => {
    const SHORT_UUID_LENGTH = 22;

    test(`generates ${SHORT_UUID_LENGTH}-character short UUID v7`, () => {
      const shortUuidV7 = IdGenerator.shortUuidV7();
      expect(shortUuidV7).toHaveLength(SHORT_UUID_LENGTH);
    });

    test("uses only alphanumeric characters", () => {
      const shortUuidV7 = IdGenerator.shortUuidV7();
      expect(isAlphanumeric(shortUuidV7)).toBeTruthy();
    });

    test("generates unique short UUID v7", () => {
      const ids = generateMultipleIds(IdGenerator.shortUuidV7, 100);
      expect(areIdsUnique(ids)).toBeTruthy();
    });
  });

  describe("Time-Based ID Generator", () => {
    test("generates time-based ID with correct format", () => {
      const timeId = IdGenerator.timeId();
      const timeIdRegex = /^[0-9a-z]+-[a-zA-Z0-9]{8}$/;
      expect(timeIdRegex.test(timeId)).toBeTruthy();
    });

    test("generates unique time-based IDs", () => {
      const ids = generateMultipleIds(IdGenerator.timeId, 100);
      expect(areIdsUnique(ids)).toBeTruthy();
    });
  });

  describe("Collision Resistance", () => {
    const GENERATION_COUNT = 1000;

    test(`generates unique IDs across ${GENERATION_COUNT} generations`, () => {
      const generators = [
        IdGenerator.random,
        IdGenerator.uuidV7,
        IdGenerator.shortUuidV7,
        IdGenerator.timeId,
      ];

      generators.forEach((generator) => {
        const ids = generateMultipleIds(generator, GENERATION_COUNT);
        expect(areIdsUnique(ids)).toBeTruthy();
      });
    });
  });

  describe("Performance", () => {
    const PERFORMANCE_COUNT = 1000;
    const MAX_DURATION = 1000; // 1 second

    test("generates IDs quickly", () => {
      const generators = [
        IdGenerator.random,
        IdGenerator.uuidV7,
        IdGenerator.shortUuidV7,
        IdGenerator.timeId,
      ];

      generators.forEach((generator) => {
        const performanceResult = measureIdGenerationPerformance(
          generator,
          PERFORMANCE_COUNT,
          MAX_DURATION
        );

        expect(performanceResult.passed).toBeTruthy();
      });
    });
  });
});
