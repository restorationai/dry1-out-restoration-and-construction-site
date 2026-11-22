// Brand config — hydrated at scaffold time by build_site.py from
// plan-input.json and the client record. All {{TOKENS}} are replaced
// by the scaffold step; this file should not be hand-edited after that.

export const brand = {
  slug: "dry1-out-restoration-and-construction",
  displayName: "Dry 1 Out Restoration and Construction",
  shortName: "Dry 1 Out",
  legalName: "Dry 1 Out Restoration and Construction",
  // Registered DBA / trade name — filled by rename_site_sync.py the moment
  // the state approves the client's DBA filing (empty until then). When set,
  // the footer carries the "[legal] doing business as [DBA]" line and schema
  // declares it as the business name, so Google/BrightLocal find the new
  // name corroborated on the site before and during the GBP rename.
  dbaName: "",
  domain: "dry1out.com",
  canonicalUrl: "https://dry1out.com",
  phone: "(888) 379-1688",
  phoneRaw: "+18883791688",
  hideMobileHeaderCall: false,
  // A2P/SMS-registration legal entity. When set, the estimate forms render
  // the carrier-compliant consent checkbox naming this entity (exact wording
  // matters to reviewers — do not paraphrase). Empty = generic consent only.
  smsConsentEntity: "",
  // Sitewide call-tracking number (2026-08-24). When BOTH fields are set,
  // a tiny inline script in BaseLayout swaps every visible phone mention
  // and tel: link to this number AFTER the page renders. The HTML source,
  // the JSON-LD in schema.ts, and anything crawlers/citation-checkers read
  // keep the canonical NAP number above — humans dial the tracked line,
  // Google sees consistent NAP. Empty = feature off (default at scaffold;
  // filled by the call-tracking provisioning step).
  // Jason 2026-11-22 ("That's fine", yes to our toll-free offer): ONE
  // toll-free website tracker (877) 770-7892 replaces the 888 visitors saw;
  // it rings the main line (888) 379-1688. Channel lines keep forwarding but
  // stay off the site (call_tracking.py tollfree-site).
  trackingPhone: "(877) 770-7892",
  trackingPhoneRaw: "+18777707892",
  email: "Info@dry1out.com",
  hours: "24/7",
  // AVAILABILITY 24/7 (Santino 2026-11-21, scripts/availability.py): calls are
  // answered 24/7 (the AI receptionist), every trade, default true; false only
  // when the client said not to. Separate from the emergency-SERVICE rule
  // (emergency_policy.py, the `hours` gate above). openingHoursSpec = the
  // schema hours (scripts/schema_hours.py): 24/7 when available, else the
  // real Google hours, else none.
  available247: true,
  openingHoursSpec: [{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "00:00", "closes": "23:59"}] as { days: string[]; opens: string; closes: string }[],
  foundedYear: "1998",
  primaryCity: "Vista",
  mainOfficeRegion: "San Diego County",
  homeRegion: "Hayward & Vista, CA",
  // Coverage name on the general (non-city) pages and the homepage FAQ
  // (Cole 2026-11-18: "make sure the info says Vista and Hayward for all
  // combined pages"). City pages keep their own city.
  marketArea: "Vista & Hayward, CA",
  primaryState: "CA",
  // SERVICE REGION (Santino 2026-11-19): multi-metro clients name the region
  // on every region-wide surface (see src/lib/region.ts); city pages and the
  // address/NAP keep the city. Empty = one-metro client, city wording.
  serviceRegion: "Hayward & Vista, CA",
  serviceRegionDetail: "",
  // primaryCity/primaryState = the #1 MARKETING city (headlines, coverage
  // copy). addressCity/addressState = where the business PHYSICALLY is.
  // They are usually the same and often diverge (DISS: Farrell PA office,
  // Youngstown OH target) — only the address pair may go in a PostalAddress.
  addressCity: "Vista",
  addressState: "CA",
  streetAddress: "1235 Activity Dr",
  postalCode: "92081",
  lat: "",
  lng: "",
  placeId: "ChIJh3y1Q-iumqsRn1E-rGgHmcU",
  googleCid: "",
  imagesBase: "https://images.dry1out.com",
  googleMapsApiKey: "",
  // Analytics — set post-scaffold (scripts/analytics_set.py / create_ga4.py); no-op if empty
  ga4MeasurementId: "",
  clarityProjectId: "",
  // Client-owned tags (Cole 2026-10-26: "can we add our Google and meta tags to the website?")
  clientGoogleTagId: "AW-17829072059",
  metaPixelId: "818323828294572",
  logoUrl: "/images/logo.png",
  licenseNumbers: ["#993442"] as string[],
  licenseAuthority: "",
  // State license-verification page — the footer links the license number here.
  licenseLookupUrl: "https://www.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx",
  licenseType: "",
  // Operator-confirmed "licensed & insured" attestation from plan-input.json —
  // lets the TrustStrip show the badge before a license number is on file.
  licensedInsuredAttested: true as boolean,
  certifications: ["IICRC Certified Firm", "IICRC WRT (Water)", "IICRC ASD (Structural Drying)", "IICRC AMRT (Mold)", "IICRC FSRT (Fire & Smoke)"] as string[],
  trustBadges: ["IICRC Certified Firm", "Licensed & Insured", "24/7 Emergency Service", "Locally Owned & Operated"] as string[],
  jobPhotos: [] as string[],
  sameAsUrls: ["https://maps.google.com/maps?cid=14238419843056292255", "https://www.bbb.org/us/ca/san-diego/profile/water-remediation/semper-dry-construction-and-restoration-inc-1126-1000145245", "https://www.bing.com/maps?ss=ypid.YN655632EDADBDC642"] as string[],
  // GBP rating fields — synced from the live Google Business Profile by
  // scripts/sync_brand_reviews.py; never hand-edited (real ratings only).
  gbpRatingValue: "5.0",
  gbpReviewCount: "26",
  gbpReviews: [
    { author: "Kimberly", rating: 5, text: "A creaking floor near the kitchen ended up being water-damaged subfloor and Dry 1 Out's crew handled it fast and clean, highly recommend!", when: "November 2026" },
    { author: "Ricky", rating: 5, text: "Felt reassured hearing how they'd have handled my relative's flooded basement, quick work and clear communication the whole way. Highly recommend!", when: "November 2026" },
    { author: "Carlos", rating: 5, text: "Great info on smoke smell as a warning sign very helpful!", when: "November 2026" },
    { author: "Fernando", rating: 5, text: "Great owner with absolutely great deals", when: "November 2026" },
    { author: "Desyre", rating: 5, text: "Quick, friendly conversation with Dry 1 Out Restoration and Construction about how to protect a home from water damage. I'd feel comfortable calling them for restoration in Vista.", when: "November 2026" },
    { author: "Cesar", rating: 5, text: "Excellent service love the owner", when: "October 2026" },
  ] as { author: string; rating: number; text: string; when: string }[],
  tagline: "24/7 restoration services in Vista and Hayward, CA.",
  // optional custom insurance positioning line (Hero renders only when set)
  insuranceTrustLine: "",
  ctaLabel: "24/7 Emergency Line",
  // Vertical trade-identity copy — resolved at scaffold time from
  // templates/{vertical}/vertical-tokens.json (see scripts/verticals.py).
  // Components must use these instead of hardcoding a trade phrase.
  // vertical gates layout too: restoration is call-first, so the homepage
  // hero renders NO estimate form there (Santino 2026-09-11).
  vertical: "restoration",
  tradeNoun: "restoration",
  specialistPhrase: "Damage Restoration Specialists",
  announcementSuffix: "24/7 Emergency Response",
  homeAboutBlurb: "Dry 1 Out Restoration and Construction serves North San Diego County from Vista and the Bay Area from Hayward with professional damage restoration for homes and businesses. From the first emergency call to the final walkthrough, our team manages the entire recovery — and we answer the phone 24/7, so help is on the way the moment something goes wrong.",
} as const;

export const entityId = `${brand.canonicalUrl}/#identity`;
