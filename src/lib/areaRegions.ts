/**
 * Service areas grouped by office (Cole 2026-11-18: one column San Diego /
 * Vista, one column Bay Area / Hayward, cities listed under their own
 * office instead of one jumbled alphabetical list). Groups come from
 * src/data/area-regions.json; the office city leads its group, the rest are
 * alphabetical. Any area not in the map lands in a trailing "More Areas"
 * group so a newly added city is never silently dropped.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import regionData from '~/data/area-regions.json';

type Area = CollectionEntry<'serviceAreas'>;
export interface AreaRegion { label: string; office: string | null; areas: Area[] }

export async function getAreaRegions(): Promise<AreaRegion[]> {
  const all = (await getCollection('serviceAreas')) as Area[];
  const bySlug = new Map(all.map((a) => [a.data.area_slug, a]));
  const used = new Set<string>();
  const out: AreaRegion[] = [];
  for (const r of regionData.regions) {
    const areas = r.slugs
      .map((s) => bySlug.get(s))
      .filter((a): a is Area => !!a)
      .sort((a, b) => {
        if (a.data.area_slug === r.office_slug) return -1;
        if (b.data.area_slug === r.office_slug) return 1;
        return a.data.city.localeCompare(b.data.city);
      });
    areas.forEach((a) => used.add(a.data.area_slug));
    if (areas.length) out.push({ label: r.label, office: r.office, areas });
  }
  const rest = all
    .filter((a) => !used.has(a.data.area_slug))
    .sort((a, b) => a.data.city.localeCompare(b.data.city));
  if (rest.length) out.push({ label: 'More Areas', office: null, areas: rest });
  return out;
}

/**
 * Nearby-coverage links stay inside the page's own region, nearest first
 * (Cole 2026-11-18: "in our vista page it recommends nearby area as
 * Berkeley which is in the Bay Area"). The planner picked neighbours
 * alphabetically across both offices, so a San Diego page could link
 * Berkeley and a Bay Area page Carlsbad. Here the page keeps as many area
 * links as the plan gave it, but they are re-picked as the nearest cities
 * in the SAME region that have a page (the same service page when it
 * exists, else the city hub). Non-area links (services, contact, the
 * page's own city) keep their place.
 */
const REGION_OF = new Map<string, string>();
for (const r of regionData.regions) for (const s of r.slugs) REGION_OF.set(s, r.label);
const COORDS = (regionData as { coords?: Record<string, [number, number]> }).coords || {};

function dist(a: string, b: string): number {
  const p = COORDS[a], q = COORDS[b];
  if (!p || !q) return Number.MAX_SAFE_INTEGER;
  const dy = p[0] - q[0], dx = (p[1] - q[1]) * Math.cos((p[0] * Math.PI) / 180);
  return dx * dx + dy * dy;
}

const areaOf = (path: string): string | null => {
  const m = /^\/service-areas\/([^/]+)\//.exec(path);
  return m ? m[1] : null;
};

export async function localAreaLinks(pageArea: string, paths: string[] = [], serviceSlug?: string): Promise<string[]> {
  const own = REGION_OF.get(pageArea);
  if (!own) return paths;
  const [areas, locations] = await Promise.all([getCollection('serviceAreas'), getCollection('locations')]);
  const exists = new Set<string>([
    ...areas.map((a) => `/service-areas/${a.data.area_slug}/`),
    ...locations.map((l) => `/service-areas/${l.data.area_slug}/${l.data.service_slug}/`),
  ]);
  const keep: string[] = [];
  let want = 0;
  for (const p of paths) {
    const a = areaOf(p);
    if (!a || a === pageArea) keep.push(p);
    else want++;
  }
  const picked: string[] = [];
  const candidates = [...REGION_OF.entries()]
    .filter(([s, r]) => r === own && s !== pageArea)
    .map(([s]) => s)
    .sort((a, b) => dist(pageArea, a) - dist(pageArea, b));
  for (const s of candidates) {
    if (picked.length >= want) break;
    const svc = serviceSlug ? `/service-areas/${s}/${serviceSlug}/` : '';
    const href = svc && exists.has(svc) ? svc : exists.has(`/service-areas/${s}/`) ? `/service-areas/${s}/` : '';
    if (href) picked.push(href);
  }
  return [...keep, ...picked];
}
