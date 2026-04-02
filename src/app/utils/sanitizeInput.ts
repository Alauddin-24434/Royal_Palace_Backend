// src/app/utils/sanitizeInput.ts
import sanitizeHtml from "sanitize-html";

/**
 * Strict sanitize that:
 * - removes HTML/XSS payloads from strings
 * - recursively sanitizes arrays/objects
 * - removes object properties whose keys start with '$' or contain '.'
 * - collapses empty objects to undefined (so DB/query won't receive empty operator objects)
 */

export function sanitizeInput<T = any>(value: T): T | undefined {
  // strings
  if (typeof value === "string") {
    const cleaned = sanitizeHtml(value, {
      allowedTags: [],
      allowedAttributes: {},
    }).trim();
    return cleaned as unknown as T;
  }

  // numbers / booleans / null / undefined - return as is
  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null ||
    value === undefined
  ) {
    return value as unknown as T;
  }

  // arrays
  if (Array.isArray(value)) {
    const arr = value
      .map((v) => sanitizeInput(v))
      .filter((v) => v !== undefined); // drop undefined entries
    return arr as unknown as T;
  }

  // objects
  if (typeof value === "object" && value !== null) {
    const out: Record<string, any> = {};
    for (const rawKey of Object.keys(value as Record<string, any>)) {
      // skip keys that start with $ (mongo operators) or contain dot notation
      if (rawKey.startsWith("$") || rawKey.includes(".")) continue;

      const v = (value as any)[rawKey];
      const sanitizedValue = sanitizeInput(v);

      if (sanitizedValue !== undefined) {
        out[rawKey] = sanitizedValue;
      }
    }

    // If after sanitization object has no keys -> return undefined
    if (Object.keys(out).length === 0) return undefined;

    return out as T;
  }

  // fallback
  return undefined;
}
