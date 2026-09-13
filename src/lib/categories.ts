import type { CategoryInfo } from "./types";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "internet",
    name: "Internet Tools",
    description:
      "Calculators and converters for download, upload, bandwidth and network speeds.",
    slug: "internet",
    intro: [
      "Internet speed is one of the most misunderstood numbers people deal with regularly. The plan you pay for is measured in megabits per second (Mbps), the file sizes you see are measured in megabytes (MB), and the actual speed your download reaches almost never matches either number exactly. The tools in this category exist to close that gap: instead of guessing, you can plug in the real numbers and get a real answer.",
      "Use the download and upload time calculators when you need to know how long a specific transfer will actually take — moving a video project to a client, backing up a folder to cloud storage, or just wondering whether that 40 GB game update will finish before dinner. The bandwidth calculator is more useful for planning ahead: if you're setting up a home office, a small studio, or a household with several people streaming and video-calling at once, it tells you roughly how much connection you need to support that load without everything slowing to a crawl.",
      "All of these tools use the same underlying math — file size divided by connection speed, converted to consistent units — but they're built around the specific question you're actually asking, rather than making you do the unit conversion yourself first. Every result also comes with a note on real-world overhead, because a theoretical maximum and a lived experience are rarely the same thing.",
    ],
  },
  {
    id: "file",
    name: "File Tools",
    description:
      "Process images, convert formats and inspect files directly in your browser.",
    slug: "file",
    intro: [
      "The tools in this category work on the actual file, not just the numbers around it. Both the image compressor and image resizer run entirely client-side, using your browser's built-in Canvas API to decode, transform and re-encode images without ever sending them to a server. That matters for two reasons: it's faster, since there's no upload or download step, and it's more private, since your photos never leave your device.",
      "Reach for the image compressor when a file is the right size and shape but too heavy — a phone photo you want to email, or a product image that's slowing down a webpage. Reach for the resizer when the dimensions themselves are wrong, whether that's fitting an avatar into a square, a banner into a fixed pixel width, or a batch of photos into a consistent size before uploading them somewhere. The two are often used together: resize first to the dimensions you actually need, then compress to trim the remaining file size.",
      "Because everything runs in-browser, there are no file-size limits imposed by an upload quota and no waiting on a server queue. The trade-off is that very old browsers or very large images (multi-hundred-megapixel files) can be slower, since your own device is doing the work — for the vast majority of everyday photos, it's close to instant.",
    ],
  },
  {
    id: "converters",
    name: "Converters",
    description:
      "Convert between units, formats and standards — fast and accurate.",
    slug: "converters",
    intro: [
      "Converters solve a narrower problem than calculators: you already have a number or a file, and you need it expressed a different way. The unit converters here handle the single most common source of confusion in networking — the difference between bits and bytes. Internet plans are sold in megabits per second (Mbps); the download progress bar in your browser shows megabytes per second (MB/s). Since there are 8 bits in a byte, those two numbers differ by a factor of 8, which is exactly why a \"100 Mbps\" plan tops out around 12.5 MB/s in practice.",
      "The file size converter handles a related but separate confusion: decimal versus binary units. Storage manufacturers advertise drives in decimal gigabytes (1 GB = 1,000,000,000 bytes), while Windows and macOS often report capacity in binary gibibytes labelled as \"GB\" (1 GiB = 1,073,741,824 bytes). That's the entire reason a \"1 TB\" drive shows up as roughly 931 GB in your file explorer — nothing is missing, it's just two different definitions of the same word.",
      "The image format converters (JPG to PNG and PNG to JPG) round out this category: they solve the format mismatch problem, not the compression problem. If you need a smaller file, use the image compressor instead; if you specifically need a different container format — for transparency, for compatibility with an older tool, or because a form only accepts one file type — that's what these converters are for.",
    ],
  },
  {
    id: "calculators",
    name: "Calculators",
    description:
      "Everyday digital calculators for file sizes, aspect ratios and more.",
    slug: "calculators",
    intro: [
      "This category holds the tools that don't fit neatly under \"internet\" or \"file\" but come up constantly in everyday digital work — right now, that's the aspect ratio calculator, with more planned as the toolkit grows. Aspect ratio is the relationship between an image or video's width and height, expressed as a simple ratio like 16:9 or 4:3, and it comes up any time you're resizing something and need to keep it looking correct rather than stretched or squashed.",
      "The calculator works in both directions: give it a known ratio and one dimension, and it solves for the other; or give it a width and height, and it tells you the simplified ratio and the closest standard format it matches (widescreen video, classic photo, square social post, and so on). That's useful when you're cropping a photo for a specific platform, setting up a video export, or just trying to figure out why an image looks slightly off after resizing.",
      "As more everyday calculations get added to the toolkit — the kind of quick math people usually reach for a search engine to do — they'll live here rather than being scattered across unrelated categories.",
    ],
  },
];

export const CATEGORY_MAP: Record<string, CategoryInfo> = CATEGORIES.reduce(
  (acc, c) => {
    acc[c.id] = c;
    return acc;
  },
  {} as Record<string, CategoryInfo>,
);
