/**
 * Minimal className joiner. Deliberately not pulling in clsx +
 * tailwind-merge for one helper — this just filters/joins truthy
 * class strings, which is all the components using it need.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
