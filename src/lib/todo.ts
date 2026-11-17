/**
 * Content placeholders. Any value that starts with "TODO_" (TODO_METRIC, TODO_DATE, TODO_LINK, ...) is a fact
 * Arshed still has to supply. They are all listed in TODO_CONTENT.md.
 *
 * - Production builds leave placeholder content out entirely, so the live site never shows a made-up value
 *   or a "TODO" marker.
 * - With NEXT_PUBLIC_SHOW_TODO=1 (default in `next dev`) they render as a dashed amber marker, so gaps are
 *   easy to see while editing.
 */
export const SHOW_TODO =
  process.env.NEXT_PUBLIC_SHOW_TODO === "1" ||
  (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_SHOW_TODO !== "0");

export function isTodo(value: string | null | undefined): boolean {
  return !value || value.includes("TODO_");
}

/** The value when it is real, otherwise null. */
export function known<T extends string>(value: T | null | undefined): T | null {
  return isTodo(value) ? null : (value as T);
}
