/**
 * Programmatic SEO data for parametric tool pages.
 *
 * Example use case: generating hundreds of long-tail pages like
 *   /download-time/1gb
 *   /download-time/100mbps
 *   /image-compress/jpg-70-percent
 *
 * This module defines the data shape and helpers; pages can opt in to
 * generate them with a simple `generateStaticParams` + dynamic page.
 *
 * To activate: import `downloadTimeParams` and pass it as
 * `generateStaticParams` in a new dynamic route such as
 * `app/download-time/[slug]/page.tsx`. See the README of the spec.
 */

export type SizeVariant = { label: string; size: number; unit: "MB" | "GB" | "TB" };
export type SpeedVariant = { label: string; speed: number; unit: "Kbps" | "Mbps" | "Gbps" };

export interface ParametricEntry {
  /** URL slug segment. */
  slug: string;
  /** SEO-friendly page title suffix. */
  title: string;
  /** SEO-friendly meta description. */
  description: string;
  /** Optional file size in MB. */
  sizeMb?: number;
  /** Optional connection speed in Mbps. */
  speedMbps?: number;
}

export const POPULAR_SIZES: SizeVariant[] = [
  { label: "100mb", size: 100, unit: "MB" },
  { label: "500mb", size: 500, unit: "MB" },
  { label: "1gb", size: 1, unit: "GB" },
  { label: "2gb", size: 2, unit: "GB" },
  { label: "5gb", size: 5, unit: "GB" },
  { label: "10gb", size: 10, unit: "GB" },
  { label: "25gb", size: 25, unit: "GB" },
  { label: "50gb", size: 50, unit: "GB" },
  { label: "100gb", size: 100, unit: "GB" },
];

export const POPULAR_SPEEDS: SpeedVariant[] = [
  { label: "5mbps", speed: 5, unit: "Mbps" },
  { label: "10mbps", speed: 10, unit: "Mbps" },
  { label: "25mbps", speed: 25, unit: "Mbps" },
  { label: "50mbps", speed: 50, unit: "Mbps" },
  { label: "100mbps", speed: 100, unit: "Mbps" },
  { label: "200mbps", speed: 200, unit: "Mbps" },
  { label: "500mbps", speed: 500, unit: "Mbps" },
  { label: "1gbps", speed: 1, unit: "Gbps" },
  { label: "2gbps", speed: 2, unit: "Gbps" },
];

/** Build the slug `download-time-<size>@<speed>` style variants. */
export function downloadTimeParams(): ParametricEntry[] {
  const out: ParametricEntry[] = [];
  for (const s of POPULAR_SIZES) {
    for (const sp of POPULAR_SPEEDS) {
      const sizeMb = s.unit === "GB" ? s.size * 1000 : s.unit === "TB" ? s.size * 1_000_000 : s.size;
      const speedMbps = sp.unit === "Gbps" ? sp.speed * 1000 : sp.speed;
      out.push({
        slug: `${s.label}-at-${sp.label}`,
        title: `Download time for ${s.label.toUpperCase()} at ${sp.label.toUpperCase()}`,
        description: `How long does it take to download ${s.label.toUpperCase()} on a ${sp.label.toUpperCase()} connection? Free calculator.`,
        sizeMb,
        speedMbps,
      });
    }
  }
  return out;
}
