/**
 * Converts an IoT module product name into a URL-safe slug.
 * e.g. "LTE Cat 1bis" → "lte-cat-1bis"
 */
export function toIotSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

/**
 * Finds a product id by slug.
 */
export function fromIotSlug(slug: string, products: { id: number; name: string }[]): number | null {
  const match = products.find(
    (p) => toIotSlug(p.name) === slug || p.id.toString() === slug
  );
  return match?.id ?? null;
}
