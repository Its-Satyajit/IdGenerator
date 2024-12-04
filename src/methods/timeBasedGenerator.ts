import { BaseIdGenerator } from "./baseGenerator";
import { RandomIdGenerator } from "./randomGenerator";

/**
 * A concrete ID generator that produces sortable time-based IDs.
 * This class extends the `BaseIdGenerator` and generates IDs in the format `base36(timestamp)-base62(random)`.
 */

export class TimeBasedGenerator extends BaseIdGenerator {
  /**
   * Generates a sortable time-based ID.
   * The format of the ID is `base36(timestamp)-base62(random)`.
   * @returns A time-based ID string.
   * @example
   * const timeBasedId = new TimeBasedGenerator().generate();
   */

  generate(): string {
    const timestamp = Date.now().toString(36);
    const random = new RandomIdGenerator().generate(8);
    return `${timestamp}-${random}`;
  }

  validate(id: string): boolean {
    console.log(id);
    return true;
  }
}
