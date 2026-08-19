import type { CategoryInfo } from "./types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "internet",
    name: "Internet Tools",
    description:
      "Calculators and converters for download, upload, bandwidth and network speeds.",
    slug: "internet",
  },
  {
    id: "file",
    name: "File Tools",
    description:
      "Process images, convert formats and inspect files directly in your browser.",
    slug: "file",
  },
  {
    id: "converters",
    name: "Converters",
    description:
      "Convert between units, formats and standards — fast and accurate.",
    slug: "converters",
  },
  {
    id: "calculators",
    name: "Calculators",
    description:
      "Everyday digital calculators for file sizes, aspect ratios and more.",
    slug: "calculators",
  },
];

export const CATEGORY_MAP: Record<string, CategoryInfo> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, CategoryInfo>,
);
