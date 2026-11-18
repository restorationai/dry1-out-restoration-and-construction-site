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
