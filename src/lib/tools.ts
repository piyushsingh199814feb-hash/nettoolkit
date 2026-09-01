import type { ToolMeta } from "./types";

export type { ToolMeta };

/**
 * Single source of truth for all tools.
 * To add a new tool: add an entry here and create its page under /tools/<slug>.
 */
export const TOOLS: ToolMeta[] = [
  // ---------- Internet ----------
  {
    id: "download-time-calculator",
    name: "Download Time Calculator",
    slug: "download-time-calculator",
    category: "internet",
    description:
      "Estimate how long it will take to download a file based on its size and your internet speed. Supports KB, MB, GB and TB with Kbps, Mbps and Gbps connections.",
    shortDescription: "Estimate download time from file size and speed.",
    icon: "download",
    keywords: [
      "download time",
      "download calculator",
      "how long to download",
      "file download",
      "mbps download time",
    ],
    relatedTools: [
      "upload-time-calculator",
      "file-transfer-time-calculator",
      "bandwidth-calculator",
      "mbps-to-mb-s",
    ],
    seoTitle:
      "Download Time Calculator — How Long Will It Take? (2026)",
    seoDescription:
      "Free download time calculator. Enter file size & internet speed, get instant results in seconds, minutes, or hours. Works for any file size. No signup, no ads.",
    featured: true,
    popular: true,
  },
  {
    id: "upload-time-calculator",
    name: "Upload Time Calculator",
    slug: "upload-time-calculator",
    category: "internet",
    description:
      "Calculate how long it takes to upload a file at a given connection speed. Includes MB/s equivalent and supports large file sizes.",
    shortDescription: "Estimate upload time from file size and speed.",
    icon: "upload",
    keywords: [
      "upload time",
      "upload calculator",
      "file upload",
      "upload speed",
    ],
    relatedTools: [
      "download-time-calculator",
      "file-transfer-time-calculator",
      "bandwidth-calculator",
      "mb-s-to-mbps",
    ],
    seoTitle:
      "Upload Time Calculator — Estimate Upload Time Instantly (2026)",
    seoDescription:
      "Free upload time calculator. Calculate how long any file will take to upload based on file size and your upload speed. No signup, no ads, no uploads.",
    featured: true,
    popular: true,
  },
  {
    id: "bandwidth-calculator",
    name: "Bandwidth Calculator",
    slug: "bandwidth-calculator",
    category: "internet",
    description:
      "Calculate the bandwidth required to support a number of concurrent users with a given data usage over time.",
    shortDescription:
      "Estimate bandwidth needs from user count and data usage.",
    icon: "bandwidth",
    keywords: [
      "bandwidth calculator",
      "network bandwidth",
      "concurrent users",
      "bandwidth requirement",
    ],
    relatedTools: [
      "download-time-calculator",
      "upload-time-calculator",
      "mbps-to-mb-s",
    ],
    seoTitle:
      "Bandwidth Calculator — Plan Your Network in 30 Seconds (2026)",
    seoDescription:
      "Free bandwidth calculator. Calculate required bandwidth, monthly data usage, and download times. Works for any speed or file size.",
    popular: true,
  },
  {
    id: "mbps-to-mb-s",
    name: "Mbps to MB/s Converter",
    slug: "mbps-to-mb-s",
    category: "converters",
    description:
      "Convert megabits per second (Mbps) to megabytes per second (MB/s). Includes the formula and a clear explanation of the difference.",
    shortDescription: "Convert Mbps to megabytes per second (MB/s).",
    icon: "speed",
    keywords: [
      "mbps to mb/s",
      "megabits to megabytes",
      "mbps converter",
      "speed converter",
    ],
    relatedTools: [
      "mb-s-to-mbps",
      "download-time-calculator",
      "upload-time-calculator",
    ],
    seoTitle:
      "Mbps to MB/s Converter — Megabits to Megabytes (2026)",
    seoDescription:
      "Convert Mbps to MB/s instantly. Free megabits to megabytes converter with formula, examples, and full explanation. No signup.",
    popular: true,
  },
  {
    id: "mb-s-to-mbps",
    name: "MB/s to Mbps Converter",
    slug: "mb-s-to-mbps",
    category: "converters",
    description:
      "Convert megabytes per second (MB/s) to megabits per second (Mbps). Useful for understanding actual download speeds reported by browsers and apps.",
    shortDescription: "Convert MB/s to megabits per second (Mbps).",
    icon: "speed",
    keywords: [
      "mb/s to mbps",
      "megabytes to megabits",
      "mb/s converter",
      "speed converter",
    ],
    relatedTools: [
      "mbps-to-mb-s",
      "download-time-calculator",
      "upload-time-calculator",
    ],
    seoTitle: "MB/s to Mbps Converter — Free & Instant (2026)",
    seoDescription:
      "Convert megabytes per second to megabits per second (MB/s to Mbps) in one click. Includes formula, examples, and reverse converter. Free, no signup.",
  },
  {
    id: "file-transfer-time-calculator",
    name: "File Transfer Time Calculator",
    slug: "file-transfer-time-calculator",
    category: "internet",
    description:
      "Estimate how long a file transfer will take across internet, Wi-Fi, USB, LAN or external drive connections.",
    shortDescription:
      "Estimate file transfer time across different media.",
    icon: "transfer",
    keywords: [
      "file transfer time",
      "transfer calculator",
      "usb transfer time",
      "lan transfer",
    ],
    relatedTools: [
      "download-time-calculator",
      "upload-time-calculator",
      "file-size-converter",
    ],
    seoTitle:
      "File Transfer Time Calculator — USB, LAN, Wi-Fi (2026)",
    seoDescription:
      "Free file transfer time calculator for any medium: USB, external drive, LAN, Wi-Fi. Enter size and speed, get instant results.",
    popular: true,
  },

  // ---------- File ----------
  {
    id: "image-compressor",
    name: "Image Compressor",
    slug: "image-compressor",
    category: "file",
    description:
      "Compress JPG, PNG and WebP images directly in your browser. Compare before/after, control quality and download the result.",
    shortDescription: "Compress JPG, PNG and WebP images in your browser.",
    icon: "image",
    keywords: [
      "image compressor",
      "compress jpg",
      "compress png",
      "reduce image size",
      "webp compressor",
    ],
    relatedTools: [
      "image-resizer",
      "jpg-to-png",
      "png-to-jpg",
      "file-size-converter",
    ],
    seoTitle:
      "Image Compressor — Compress JPG, PNG, WebP in Browser (2026)",
    seoDescription:
      "Free image compressor that works entirely in your browser. Reduce JPG, PNG, WebP file size by up to 90% without losing quality. No upload, no signup.",
    featured: true,
    popular: true,
    clientSide: true,
  },
  {
    id: "image-resizer",
    name: "Image Resizer",
    slug: "image-resizer",
    category: "file",
    description:
      "Resize images to any width and height in your browser. Lock aspect ratio and export to JPG, PNG or WebP.",
    shortDescription: "Resize images in your browser to any dimension.",
    icon: "resize",
    keywords: [
      "image resizer",
      "resize image",
      "resize jpg",
      "resize png",
      "image dimensions",
    ],
    relatedTools: [
      "image-compressor",
      "jpg-to-png",
      "png-to-jpg",
      "aspect-ratio-calculator",
    ],
    seoTitle: "Image Resizer — Resize Any Image in Seconds (2026)",
    seoDescription:
      "Free online image resizer. Resize JPG, PNG, WebP to any dimension. Everything happens in your browser — your photos never leave your device.",
    popular: true,
    clientSide: true,
  },
  {
    id: "jpg-to-png",
    name: "JPG to PNG Converter",
    slug: "jpg-to-png",
    category: "converters",
    description:
      "Convert JPG images to PNG format directly in your browser. Lossless conversion with full transparency support.",
    shortDescription: "Convert JPG images to PNG in your browser.",
    icon: "image-jpg",
    keywords: ["jpg to png", "jpeg to png", "convert jpg", "image converter"],
    relatedTools: [
      "png-to-jpg",
      "image-compressor",
      "image-resizer",
      "file-size-converter",
    ],
    seoTitle: "JPG to PNG Converter — Convert Images in Browser (2026)",
    seoDescription:
      "Free JPG to PNG and PNG to JPG converter. Convert image formats instantly in your browser. No upload, no signup, no quality loss.",
    popular: true,
    clientSide: true,
  },
  {
    id: "png-to-jpg",
    name: "PNG to JPG Converter",
    slug: "png-to-jpg",
    category: "converters",
    description:
      "Convert PNG images to JPG format directly in your browser. Adjust quality to control output file size.",
    shortDescription: "Convert PNG images to JPG in your browser.",
    icon: "image-png",
    keywords: ["png to jpg", "convert png", "image converter"],
    relatedTools: [
      "jpg-to-png",
      "image-compressor",
      "image-resizer",
      "file-size-converter",
    ],
    seoTitle: "PNG to JPG Converter — Free, Fast & Private (2026)",
    seoDescription:
      "Free PNG to JPG converter that works in your browser. Adjust quality to control file size. No upload, no signup, instant download.",
    popular: true,
    clientSide: true,
  },

  // ---------- Calculators ----------
  {
    id: "file-size-converter",
    name: "File Size Converter",
    slug: "file-size-converter",
    category: "converters",
    description:
      "Convert between bytes, KB, MB, GB, TB and their binary counterparts (KiB, MiB, GiB, TiB). Clear distinction between decimal and binary units.",
    shortDescription: "Convert between file size units (B, KB, MB, GB, TB).",
    icon: "filesize",
    keywords: [
      "file size converter",
      "bytes to mb",
      "mb to gb",
      "kib to kb",
      "binary units",
    ],
    relatedTools: [
      "download-time-calculator",
      "image-compressor",
      "bandwidth-calculator",
    ],
    seoTitle: "File Size Converter — Bytes, KB, MB, GB, TB (2026)",
    seoDescription:
      "Free file size converter. Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes. Includes binary units (KiB, MiB, GiB).",
    popular: true,
  },
  {
    id: "aspect-ratio-calculator",
    name: "Aspect Ratio Calculator",
    slug: "aspect-ratio-calculator",
    category: "calculators",
    description:
      "Calculate the aspect ratio of a width and height, or solve for a missing dimension given a ratio. Includes common ratios like 16:9, 4:3, 1:1 and more.",
    shortDescription:
      "Calculate aspect ratios and solve for missing dimensions.",
    icon: "aspect",
    keywords: [
      "aspect ratio",
      "aspect ratio calculator",
      "16:9 ratio",
      "image aspect ratio",
    ],
    relatedTools: ["image-resizer", "file-size-converter"],
    seoTitle:
      "Aspect Ratio Calculator — 16:9, 4:3, 1:1, and More (2026)",
    seoDescription:
      "Free aspect ratio calculator. Calculate width, height, and aspect ratios for any image, video, or screen. Includes common ratios and visual preview.",
    popular: true,
  },
];

export const TOOL_MAP: Record<string, ToolMeta> = TOOLS.reduce(
  (acc, t) => {
    acc[t.slug] = t;
    return acc;
  },
  {} as Record<string, ToolMeta>,
);

export const TOOLS_BY_CATEGORY = TOOLS.reduce<
  Record<string, ToolMeta[]>
>((acc, t) => {
  if (!acc[t.category]) acc[t.category] = [];
  acc[t.category].push(t);
  return acc;
}, {});

export function getTool(slug: string): ToolMeta | undefined {
  return TOOL_MAP[slug];
}

export function getRelatedTools(slug: string): ToolMeta[] {
  const t = TOOL_MAP[slug];
  if (!t) return [];
  return t.relatedTools
    .map((s) => TOOL_MAP[s])
    .filter((x): x is ToolMeta => Boolean(x));
}

export function searchTools(q: string): ToolMeta[] {
  const term = q.trim().toLowerCase();
  if (!term) return TOOLS;
  return TOOLS.filter((t) => {
    return (
      t.name.toLowerCase().includes(term) ||
      t.shortDescription.toLowerCase().includes(term) ||
      t.description.toLowerCase().includes(term) ||
      t.keywords.some((k) => k.toLowerCase().includes(term))
    );
  });
}
