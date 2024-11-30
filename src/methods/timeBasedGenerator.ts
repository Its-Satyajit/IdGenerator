import { BaseIdGenerator } from "./baseGenerator";
import { RandomIdGenerator } from "./randomGenerator";

export class TimeBasedGenerator extends BaseIdGenerator {
  /**
   * Generates a sortable time-based ID
   * Format: base36(timestamp)-base62(random)
   * @returns A time-based ID string
   */
  generate(): string {
    const timestamp = Date.now().toString(36);
    const random = new RandomIdGenerator().generate(8);
    return `${timestamp}-${random}`;
  }
}
