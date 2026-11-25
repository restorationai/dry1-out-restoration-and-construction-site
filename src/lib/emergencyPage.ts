// 24/7 LAW (Santino 2026-10-10, scripts/emergency_policy.py): the scaffold
// does not generate src/pages/emergency.astro for a client the policy gives
// no emergency scope (construction, environmental, a plumber without a 24/7
// fact). Header and Footer show their Emergency link only when the page
// exists; astro.config.mjs defines the flag from the page file at build time.
// An older astro.config without the define keeps the link (former behavior).
declare const __HAS_EMERGENCY_PAGE__: boolean | undefined;

export const hasEmergencyPage: boolean =
  typeof __HAS_EMERGENCY_PAGE__ === "undefined" ? true : __HAS_EMERGENCY_PAGE__;
