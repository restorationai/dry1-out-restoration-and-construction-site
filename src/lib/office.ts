// The secondary office (offices collection, scripts/office_pages.py) that
// serves a city page, by its served_area_slugs. Undefined for single-office
// clients and for cities the main office covers.
import { getCollection } from "astro:content";
import { brand } from "./brand";

export async function officeForArea(areaSlug: string) {
  let offices: Awaited<ReturnType<typeof getCollection<"offices">>> = [];
  try {
    offices = await getCollection("offices");
  } catch {
    return undefined;
  }
  return offices.find((o) => (o.data.served_area_slugs || []).includes(areaSlug))?.data;
}

// The phone a page shows (Kyle/Crew 10-19): a page that belongs to a second
// office (its office page, or a city page it serves) sets
// Astro.locals.servingOffice, and every call button on that page dials the
// office's own line. Everywhere else: the main number.
export function pagePhone(locals: unknown): { phone: string; phoneRaw: string } {
  const o = (locals as { servingOffice?: { phone?: string; phone_display?: string } } | undefined)
    ?.servingOffice;
  return o?.phone && o?.phone_display
    ? { phone: o.phone_display, phoneRaw: o.phone }
    : { phone: String(brand.phone), phoneRaw: String(brand.phoneRaw) };
}

// MULTI-OFFICE region (Santino 11-21): a city page names its office's local
// region in the top bar and footer (~/lib/region pageServiceRegion): the
// serving office's own region, else the main office's (brand.mainOfficeRegion).
// Nothing set = nothing changes.
export function setPageRegion(locals: unknown, office?: { region?: string | null } | null): void {
  const main = String((brand as unknown as Record<string, unknown>).mainOfficeRegion ?? "").trim();
  const r = String(office?.region ?? "").trim() || (main.includes("{{") ? "" : main);
  if (r) (locals as Record<string, unknown>).pageRegion = r;
}
