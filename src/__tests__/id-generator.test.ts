// src/__tests__/id-generator.test.ts

import { IdGenerator } from "../mod";

describe("IdGenerator", () => {
  describe("Random ID Generator", () => {
    test("generates default 16-character random ID", () => {
      const randomId = IdGenerator.random();
      expect(randomId).toHaveLength(16);
      expect(typeof randomId).toBe("string");
    });

    test("generates random ID with custom length", () => {
      const customLength = 24;
      const randomId = IdGenerator.random(customLength);
      expect(randomId).toHaveLength(customLength);
    });

    test("generates unique random IDs", () => {
      const id1 = IdGenerator.random();
      const id2 = IdGenerator.random();
      expect(id1).not.toBe(id2);
    });

    test("uses only alphanumeric characters", () => {
      const randomId = IdGenerator.random();
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      expect(alphanumericRegex.test(randomId)).toBeTruthy();
    });
  });

  describe("UUID V7 Generator", () => {
    test("generates valid UUID v7 format", () => {
      const uuidV7 = IdGenerator.uuidV7();
      const uuidV7Regex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(uuidV7Regex.test(uuidV7)).toBeTruthy();
    });

    test("generates unique UUID v7", () => {
      const uuid1 = IdGenerator.uuidV7();
      const uuid2 = IdGenerator.uuidV7();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe("Short UUID V7 Generator", () => {
    test("generates 22-character short UUID v7", () => {
      const shortUuidV7 = IdGenerator.shortUuidV7();
      expect(shortUuidV7).toHaveLength(22);
    });

    test("uses only alphanumeric characters", () => {
      const shortUuidV7 = IdGenerator.shortUuidV7();
      const alphanumericRegex = /^[a-zA-Z0-9]+$/;
      expect(alphanumericRegex.test(shortUuidV7)).toBeTruthy();
    });

    test("generates unique short UUID v7", () => {
      const uuid1 = IdGenerator.shortUuidV7();
      const uuid2 = IdGenerator.shortUuidV7();
      expect(uuid1).not.toBe(uuid2);
    });
  });

  describe("Time-Based ID Generator", () => {
    test("generates time-based ID with correct format", () => {
      const timeId = IdGenerator.timeId();
      const timeIdRegex = /^[0-9a-z]+-[a-zA-Z0-9]{8}$/;
      expect(timeIdRegex.test(timeId)).toBeTruthy();
    });

    test("generates unique time-based IDs", () => {
      const id1 = IdGenerator.timeId();
      const id2 = IdGenerator.timeId();
      expect(id1).not.toBe(id2);
    });
  });

  describe("Collision Resistance", () => {
    const generateMultipleIds = (generator: () => string, count: number): string[] => {
      return Array.from({ length: count }, () => generator());
    };

    test("generates unique IDs across multiple generations", () => {
      const generators = [
        IdGenerator.random,
        IdGenerator.uuidV7,
        IdGenerator.shortUuidV7,
        IdGenerator.timeId,
      ];

      generators.forEach((generator) => {
        const count = 1000;
        const ids = generateMultipleIds(generator, count);
        const uniqueIds = new Set(ids);

        expect(uniqueIds.size).toBe(count);
      });
    });
  });

  describe("Performance", () => {
    test("generates IDs quickly", () => {
      const generators = [
        IdGenerator.random,
        IdGenerator.uuidV7,
        IdGenerator.shortUuidV7,
        IdGenerator.timeId,
      ];

      generators.forEach((generator) => {
        const start = performance.now();
        for (let i = 0; i < 1000; i++) {
          generator();
        }
        const end = performance.now();

        expect(end - start).toBeLessThan(1000); // Should complete in less than 1 second
      });
    });
  });
});
