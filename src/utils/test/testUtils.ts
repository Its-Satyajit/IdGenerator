/**
 * Validate UUID format
 * @param uuid UUID string to validate
 * @returns Validation result
 */
export function validateUuidFormat(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}

/**
 * Validate UUID v7 specific format
 * @param uuid UUID string to validate
 * @returns Validation result
 */
export function validateUuidV7Format(uuid: string): boolean {
  const uuidV7Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidV7Regex.test(uuid);
}

/**
 * Check UUID v7 version and variant bits
 * @param uuid UUID string to check
 * @returns Validation result
 */
export function validateUuidV7VersionAndVariant(uuid: string): boolean {
  const parts = uuid.split("-");
  return (
    parts[2][0] === "7" && // Version bit
    ["8", "9", "a", "b"].includes(parts[3][0]) // Variant bits
  );
}

/**
 * Generate multiple IDs using a generator function
 * @param generator Function to generate IDs
 * @param count Number of IDs to generate
 * @returns Array of generated IDs
 */
export function generateMultipleIds(generator: () => string, count: number): string[] {
  return Array.from({ length: count }, () => generator());
}

/**
 * Check uniqueness of generated IDs
 * @param ids Array of generated IDs
 * @returns Whether all IDs are unique
 */
export function areIdsUnique(ids: string[]): boolean {
  return new Set(ids).size === ids.length;
}

/**
 * Performance test for ID generation
 * @param generator Function to generate IDs
 * @param count Number of IDs to generate
 * @param maxDuration Maximum allowed duration in milliseconds
 * @returns Performance test result
 */
export function measureIdGenerationPerformance(
  generator: () => string,
  count: number = 1000,
  maxDuration: number = 1000
): { duration: number; passed: boolean } {
  const start = performance.now();
  for (let i = 0; i < count; i++) {
    generator();
  }
  const end = performance.now();
  const duration = end - start;

  return {
    duration,
    passed: duration < maxDuration,
  };
}

/**
 * Validate alphanumeric characters
 * @param id ID to validate
 * @returns Whether ID contains only alphanumeric characters
 */
export function isAlphanumeric(id: string): boolean {
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;
  return alphanumericRegex.test(id);
}
