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
      "Download Time Calculator — Estimate File Download Time",
    seoDescription:
      "Calculate how long it will take to download a file based on its size and your internet speed. Free, accurate and supports MB, GB, Mbps, Gbps.",
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
      "Upload Time Calculator — Estimate File Upload Time",
    seoDescription:
      "Estimate the time required to upload a file based on its size and your upload speed. Free online upload time calculator with Mbps and MB/s support.",
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
      "Bandwidth Calculator — Estimate Required Network Bandwidth",
    seoDescription:
      "Calculate the bandwidth required for your network based on the number of users, data per user and usage time. Free bandwidth planning calculator.",
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
    seoTitle: "Mbps to MB/s Converter — Megabits to Megabytes",
    seoDescription:
      "Convert Mbps (megabits per second) to MB/s (megabytes per second) instantly. Includes formula, examples and clear explanation of the units.",
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
    seoTitle: "MB/s to Mbps Converter — Megabytes to Megabits",
    seoDescription:
      "Convert MB/s (megabytes per second) to Mbps (megabits per second) instantly. Includes formula, examples and clear explanation of the units.",
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
      "File Transfer Time Calculator — Internet, USB, LAN",
    seoDescription:
      "Calculate file transfer time across internet, Wi-Fi, USB, LAN or external drive. Free file transfer time estimator.",
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
      "Image Compressor — Compress JPG, PNG & WebP in Browser",
    seoDescription:
      "Compress images online without uploading them. Supports JPG, PNG and WebP. Quality control, before/after preview and instant download.",
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
    seoTitle: "Image Resizer — Resize JPG, PNG & WebP in Browser",
    seoDescription:
      "Resize images online without uploading. Set width and height, lock aspect ratio and export to your preferred format. Free and fast.",
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
    seoTitle: "JPG to PNG Converter — Convert in Browser",
    seoDescription:
      "Convert JPG images to PNG online without uploading. Lossless conversion processed locally in your browser. Free and instant.",
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
    seoTitle: "PNG to JPG Converter — Convert in Browser",
    seoDescription:
      "Convert PNG images to JPG online without uploading. Adjust quality to control the output file size. Free, fast and private.",
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
    seoTitle:
      "File Size Converter — Bytes, KB, MB, GB, TB + Binary Units",
    seoDescription:
      "Convert between bytes, KB, MB, GB, TB and binary units (KiB, MiB, GiB, TiB). Clear, accurate file size conversion with explanations.",
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
      "Aspect Ratio Calculator — Width, Height & Ratios",
    seoDescription:
      "Calculate the aspect ratio of any width and height, or solve for a missing dimension. Includes common ratios like 16:9, 4:3, 1:1, 9:16, 3:2, 21:9.",
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
