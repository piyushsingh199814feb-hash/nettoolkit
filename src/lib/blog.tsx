import type { ReactNode } from "react";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string; // ISO date
  readTime: number; // minutes
  author: string;
  /** Internal links to related tools (slugs). */
  relatedTools: string[];
  /** Body content as React nodes — gives full layout control. */
  content: ReactNode;
  /** FAQ for structured data + on-page Q&A. */
  faqs: { question: string; answer: string }[];
  seoTitle?: string;
  seoDescription?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "mbps-vs-mb-s",
    slug: "mbps-vs-mb-s",
    title: "Mbps vs MB/s: The Difference That Explains Your Slow Downloads",
    description:
      "Your 100 Mbps plan delivers only 12.5 MB/s in real life. Here's exactly why, and how to read any internet speed you'll ever see.",
    category: "Internet",
    publishedAt: "2026-08-30",
    readTime: 7,
    author: "NetToolKit",
    relatedTools: ["mbps-to-mb-s", "mb-s-to-mbps", "download-time-calculator"],
    seoTitle: "Mbps vs MB/s: The Difference Explained | NetToolKit",
    seoDescription:
      "Mbps and MB/s measure different things. Learn the exact conversion, why your downloads are slower than your plan, and how to read any speed number.",
    content: (
      <>
        <p>
          If you have ever paid for a &ldquo;100 Mbps&rdquo; internet plan and
          then watched your browser report a download speed of around{" "}
          <strong>12.5 MB/s</strong>, you are not being cheated by your ISP
          (well, not in this specific way). The two numbers use{" "}
          <strong>different units</strong>, and that is the source of
          basically every &ldquo;why is my internet so slow?&rdquo; question
          on the internet.
        </p>
        <h2>Bits and bytes: the actual difference</h2>
        <p>
          Every piece of digital information is made of <strong>bits</strong>.
          A bit is a single 0 or 1. Eight bits make a{" "}
          <strong>byte</strong> &mdash; enough to store a single character of
          text. When you see:
        </p>
        <ul>
          <li>
            <strong>Mbps</strong> &mdash; that is <em>megabits</em> per
            second
          </li>
          <li>
            <strong>MB/s</strong> &mdash; that is <em>megabytes</em> per
            second
          </li>
        </ul>
        <p>
          The capital <strong>B</strong> means byte (8 bits). The lowercase{" "}
          <strong>b</strong> means bit. Multiply by 8 to go from bits to
          bytes. So:
        </p>
        <p>
          <code>100 Mbps &divide; 8 = 12.5 MB/s</code>
        </p>
        <h2>Why your ISP advertises in Mbps</h2>
        <p>
          Internet service providers prefer the bigger-looking number. &ldquo;100
          Mbps&rdquo; sounds more impressive than &ldquo;12.5 MB/s&rdquo;,
          even though they describe the same speed. It is also more accurate in
          a technical sense: the underlying transport of the internet (TCP/IP
          packets, ethernet frames) is measured in bits. Operating systems,
          browsers and download tools convert the speed into the more
          user-friendly bytes-per-second for display.
        </p>
        <h2>Real-world speeds</h2>
        <p>
          The table below shows what a few common plan speeds actually look
          like in a download tool:
        </p>
        <ul>
          <li>10 Mbps &rarr; 1.25 MB/s</li>
          <li>25 Mbps &rarr; 3.13 MB/s</li>
          <li>50 Mbps &rarr; 6.25 MB/s</li>
          <li>100 Mbps &rarr; 12.5 MB/s</li>
          <li>500 Mbps &rarr; 62.5 MB/s</li>
          <li>1 Gbps &rarr; 125 MB/s</li>
        </ul>
        <h2>Why you rarely get the full speed</h2>
        <p>
          Even when your plan says 100 Mbps, the speed you see in a
          downloader is usually <strong>70&ndash;90%</strong> of the
          theoretical maximum. The reasons include:
        </p>
        <ul>
          <li>
            <strong>Protocol overhead</strong> &mdash; TCP/IP headers, TLS
            encryption and acknowledgements all eat a small slice of every
            connection.
          </li>
          <li>
            <strong>Server bottlenecks</strong> &mdash; the website or CDN
            serving the file might be slower than your connection.
          </li>
          <li>
            <strong>Wi-Fi quality</strong> &mdash; especially on 2.4 GHz or
            with walls between you and the router.
          </li>
          <li>
            <strong>Network congestion</strong> &mdash; evenings are usually
            slower because everyone is streaming.
          </li>
        </ul>
        <h2>How to use this in real life</h2>
        <p>
          A <strong>100 Mbps</strong> connection is enough to stream 4K video
          (which only needs about 25 Mbps) and to download a 5 GB game in
          under 7 minutes. The huge numbers in fibre plans (300, 500, 1000
          Mbps) really only matter if you have many devices using the
          network at once, or you regularly download multi-gigabyte files.
        </p>
        <h2>Convert any speed in seconds</h2>
        <p>
          Skip the mental math. Use the{" "}
          <a href="/tools/mbps-to-mb-s">Mbps to MB/s converter</a> to go from
          a plan speed to a real-world download speed, or the{" "}
          <a href="/tools/mb-s-to-mbps">MB/s to Mbps converter</a> for the
          reverse.
        </p>
        <p>
          And if you want to know how long an actual download will take at
          your speed, the{" "}
          <a href="/tools/download-time-calculator">Download Time
          Calculator</a> does the rest of the math for you.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Why is my 100 Mbps plan only showing 12.5 MB/s?",
        answer:
          "Because your plan is sold in megabits (Mbps) and your download tool shows megabytes (MB/s). Divide by 8: 100 ÷ 8 = 12.5. Your connection is delivering exactly what you paid for.",
      },
      {
        question: "Is Mbps faster than MB/s?",
        answer:
          "They measure different things, so the comparison isn't direct. 1 MB/s = 8 Mbps. To find your real download speed in MB/s, divide your plan's Mbps by 8.",
      },
      {
        question: "Why is my actual download speed slower than my plan?",
        answer:
          "Real-world downloads are typically 70-90% of the theoretical maximum due to protocol overhead, server load, Wi-Fi quality and network congestion. Even a perfect fibre line rarely hits 100% of its rated speed.",
      },
      {
        question: "Do I really need 1 Gbps?",
        answer:
          "Probably not for a single user. 100 Mbps is enough for 4K streaming and most downloads. 1 Gbps only becomes useful with many simultaneous users or very large file downloads (50 GB+ games, raw video files).",
      },
    ],
  },
  {
    id: "how-long-to-download-50gb-game",
    slug: "how-long-to-download-50gb-game",
    title: "How Long Does It Really Take to Download a 50 GB Game? A Practical Guide",
    description:
      "Modern games are huge. Here's how long a 50 GB download actually takes on common internet speeds, with real numbers and what to expect.",
    category: "Internet",
    publishedAt: "2026-08-30",
    readTime: 6,
    author: "NetToolKit",
    relatedTools: ["download-time-calculator", "file-size-converter"],
    seoTitle: "How Long to Download 50 GB: Real-World Times | NetToolKit",
    seoDescription:
      "Real download times for a 50 GB file at every common internet speed, plus tips for faster downloads and what affects real-world speed.",
    content: (
      <>
        <p>
          Triple-A games have grown from about 30 GB a decade ago to{" "}
          <strong>50&ndash;200 GB</strong> today. Call of Duty, Baldur&apos;s
          Gate 3, modern Final Fantasy titles and most new PlayStation and
          Xbox games are routinely over 100 GB. That has made &ldquo;how long
          will this download take?&rdquo; one of the most-asked internet
          questions in the world.
        </p>
        <h2>Real download times for 50 GB</h2>
        <p>
          The numbers below assume a healthy connection with normal overhead
          (~80% of theoretical maximum). Your mileage will vary.
        </p>
        <ul>
          <li>10 Mbps &mdash; about 14 hours</li>
          <li>25 Mbps &mdash; about 5 hours 33 minutes</li>
          <li>50 Mbps &mdash; about 2 hours 47 minutes</li>
          <li>100 Mbps &mdash; about 1 hour 23 minutes</li>
          <li>200 Mbps &mdash; about 42 minutes</li>
          <li>500 Mbps &mdash; about 17 minutes</li>
          <li>1 Gbps &mdash; about 8 minutes</li>
        </ul>
        <p>
          For reference, a 100 GB game (which is more common for AAA titles
          now) doubles all of these.
        </p>
        <h2>Why the &ldquo;official&rdquo; download time is shorter than reality</h2>
        <p>
          When Steam or PlayStation shows a remaining time, they calculate
          based on the <strong>current transfer rate</strong>. But the rate
          constantly changes &mdash; it starts fast, dips as the connection
          negotiates, stabilises, and can spike or drop throughout. The
          number you see is essentially a moving average, often optimistic.
        </p>
        <h2>Why large downloads feel slower than they should</h2>
        <p>
          Most download tools use multiple parallel connections for big
          files. That helps, but each connection still has the protocol
          overhead, and the bottleneck shifts from your network to the
          server. Around 80&ndash;90% efficiency is the realistic ceiling for
          any single download.
        </p>
        <h2>What makes a download faster or slower</h2>
        <ul>
          <li>
            <strong>The server</strong> &mdash; a slow origin server will
            cap your speed no matter how fast your line is. Most large
            platforms use CDNs (Cloudflare, Akamai, Fastly) that are usually
            fast.
          </li>
          <li>
            <strong>The time of day</strong> &mdash; peak hours (7&ndash;11
            PM) are the slowest. Early morning downloads are often 2&ndash;3x
            faster.
          </li>
          <li>
            <strong>Wired vs wireless</strong> &mdash; Wi-Fi loses maybe
            10&ndash;30% of your speed depending on distance and
            interference. For huge downloads, plug in an ethernet cable.
          </li>
          <li>
            <strong>Other devices on your network</strong> &mdash; someone
            streaming 4K Netflix in the next room will eat 25 Mbps you
            thought you had.
          </li>
        </ul>
        <h2>Speed up the download yourself</h2>
        <ul>
          <li>
            Use a <strong>wired ethernet</strong> connection if you can. It
            removes Wi-Fi as a variable.
          </li>
          <li>
            Schedule downloads for <strong>off-peak hours</strong> (early
            morning, late night).
          </li>
          <li>
            Pause other heavy network activity &mdash; cloud backups, 4K
            streams, video calls.
          </li>
          <li>
            On Steam specifically, the <strong>download region</strong>
            setting has a big effect. Choose the closest server.
          </li>
        </ul>
        <h2>Work it out exactly</h2>
        <p>
          If you want to know the exact time for your connection and a
          specific file size, the{" "}
          <a href="/tools/download-time-calculator">Download Time
          Calculator</a> handles every combination of file size and speed
          unit. For a quick conversion of MB to GB or vice versa, use the{" "}
          <a href="/tools/file-size-converter">File Size Converter</a>.
        </p>
      </>
    ),
    faqs: [
      {
        question: "How long to download 50 GB on 100 Mbps?",
        answer:
          "About 1 hour 23 minutes assuming normal overhead. With a perfect line and good conditions it can be faster; with Wi-Fi and peak-hour congestion it can easily take 2 hours.",
      },
      {
        question: "Is 50 Mbps enough to download modern games?",
        answer:
          "Yes, but expect 2-3 hour waits for 50 GB titles. 100 Mbps is the sweet spot for most households — fast enough for any single download but not overkill.",
      },
      {
        question: "Why does Steam's remaining time estimate change so much?",
        answer:
          "Steam updates the estimate as the actual transfer rate changes. Early in a download it often overshoots; later it stabilises. The number is a moving average, not a fixed prediction.",
      },
      {
        question: "Does Wi-Fi slow down large downloads?",
        answer:
          "Yes, typically 10-30% compared to a wired ethernet connection, depending on distance from the router, walls, and interference. For multi-GB downloads, plugging in an ethernet cable is worth it.",
      },
    ],
  },
  {
    id: "jpeg-vs-png-vs-webp",
    slug: "jpeg-vs-png-vs-webp",
    title: "JPEG vs PNG vs WebP: Which Image Format Should You Use?",
    description:
      "Choosing the wrong image format can double your page weight. Here's a clear decision tree for which format to use, and when.",
    category: "Files",
    publishedAt: "2026-08-30",
    readTime: 8,
    author: "NetToolKit",
    relatedTools: ["image-compressor", "jpg-to-png", "png-to-jpg"],
    seoTitle: "JPEG vs PNG vs WebP: Which to Use | NetToolKit",
    seoDescription:
      "A practical guide to picking the right image format for photos, graphics and the web. Includes browser support and the WebP gotcha.",
    content: (
      <>
        <p>
          A single image can be the difference between a fast, snappy
          website and a slow, frustrating one. Choose{" "}
          <strong>JPEG</strong> when you should have chosen{" "}
          <strong>WebP</strong> and you waste 30% of your bandwidth. Choose{" "}
          <strong>PNG</strong> when you should have chosen{" "}
          <strong>JPEG</strong> and the same image is 5&ndash;10x larger than
          it needs to be. The choice is not subtle once you know the
          rules.
        </p>
        <h2>Quick decision tree</h2>
        <ul>
          <li>
            <strong>Photograph (lots of colors, no transparency)</strong>{" "}
            &rarr; <strong>JPEG</strong>, or <strong>WebP</strong> if you want
            smaller files
          </li>
          <li>
            <strong>Logo, icon, illustration with transparency</strong>{" "}
            &rarr; <strong>PNG</strong>, or <strong>WebP</strong> for
            smaller files
          </li>
          <li>
            <strong>Screenshot with sharp text</strong> &rarr;{" "}
            <strong>PNG</strong> (lossless preserves text edges)
          </li>
          <li>
            <strong>Animated image</strong> &rarr;{" "}
            <strong>WebP</strong> (or GIF if you must support ancient
            browsers)
          </li>
          <li>
            <strong>For the web in 2026</strong> &rarr; <strong>WebP</strong>{" "}
            in 95% of cases
          </li>
        </ul>
        <h2>JPEG: the classic photograph format</h2>
        <p>
          JPEG is <strong>lossy</strong> &mdash; it discards some image data
          to achieve small file sizes. For photos with natural colour
          variation, the loss is invisible at 75&ndash;90% quality. For
          graphics with sharp edges, text or flat areas, JPEG creates
          visible artefacts (blocky edges, ringing around text).
        </p>
        <p>
          JPEG does not support transparency, which is a deal-breaker for
          logos and overlays.
        </p>
        <h2>PNG: lossless and transparent</h2>
        <p>
          PNG is <strong>lossless</strong> &mdash; it stores every pixel
          exactly. It also supports full alpha-channel transparency, which
          is why it is the standard for logos, icons and screenshots.
        </p>
        <p>
          The cost is file size. A photograph saved as PNG is usually{" "}
          <strong>5&ndash;10x larger</strong> than the same image saved as
          JPEG. That is fine for a small logo. It is a real problem for
          photo galleries and screenshots of long documents.
        </p>
        <h2>WebP: the modern default</h2>
        <p>
          WebP was created by Google specifically to replace JPEG and PNG
          on the web. It supports both lossy and lossless compression,
          transparency, and animation. At equivalent visual quality, WebP
          is usually <strong>25&ndash;35% smaller</strong> than JPEG and
          25&ndash;50% smaller than PNG.
        </p>
        <p>
          Browser support: <strong>97%+</strong> of users in 2026. The only
          realistic holdouts are old Internet Explorer and very old mobile
          browsers &mdash; effectively nobody today.
        </p>
        <h2>How to actually pick</h2>
        <p>
          In practice, the answer for most websites in 2026 is{" "}
          <strong>always WebP unless you have a specific reason not to</strong>.
          The exceptions are:
        </p>
        <ul>
          <li>
            You need pixel-perfect archival of a screenshot or design
            &rarr; PNG
          </li>
          <li>
            You are uploading to a platform that does not accept WebP (some
            older CMS systems) &rarr; JPEG
          </li>
          <li>
            You are exporting a logo for print &rarr; PNG or vector
          </li>
        </ul>
        <h2>Quality settings that actually work</h2>
        <p>
          A few practical recommendations:
        </p>
        <ul>
          <li>
            <strong>JPEG for web photos:</strong> 75&ndash;85% quality. Below
            70% you start seeing artefacts.
          </li>
          <li>
            <strong>WebP for web photos:</strong> equivalent of 75&ndash;85%
            JPEG quality.
          </li>
          <li>
            <strong>PNG for graphics:</strong> always lossless, but use a
            tool to strip unnecessary metadata. Tools like{" "}
            <a href="/tools/image-compressor">our image compressor</a> can
            shave 10&ndash;30% off PNG file sizes without losing any quality.
          </li>
        </ul>
        <h2>Convert any time</h2>
        <p>
          The{" "}
          <a href="/tools/image-compressor">Image Compressor</a> handles all
          three formats, lets you dial in the quality, and processes
          everything in your browser (no upload to a server). For direct
          format conversions, the{" "}
          <a href="/tools/jpg-to-png">JPG to PNG</a> and{" "}
          <a href="/tools/png-to-jpg">PNG to JPG</a> tools do the obvious in
          one click.
        </p>
      </>
    ),
    faqs: [
      {
        question: "Should I use JPEG or WebP for my website?",
        answer:
          "WebP in 2026, in almost all cases. It produces 25-35% smaller files than JPEG at equivalent visual quality, and 97%+ of browsers support it.",
      },
      {
        question: "When should I use PNG instead of JPEG?",
        answer:
          "PNG is best for graphics, logos, icons, screenshots and any image that needs transparency. PNG is lossless so it preserves sharp edges, but it's 5-10x larger than JPEG for photographs.",
      },
      {
        question: "Does WebP support transparency?",
        answer:
          "Yes. WebP supports full alpha-channel transparency, just like PNG, but with much smaller file sizes. It's a true replacement for both JPEG and PNG in 2026.",
      },
      {
        question: "Is WebP supported in all browsers?",
        answer:
          "97%+ of users in 2026. The only holdouts are very old Internet Explorer and ancient mobile browsers. For all practical purposes, WebP works everywhere.",
      },
    ],
  },
  {
    id: "image-aspect-ratios-explained",
    slug: "image-aspect-ratios-explained",
    title: "Image Aspect Ratios Explained: 16:9, 4:3, 1:1, and When to Use Each",
    description:
      "Why your photos keep getting cropped, and how to pick the right aspect ratio for any platform — with a simple explanation of what each ratio means.",
    category: "Files",
    publishedAt: "2026-08-30",
    readTime: 6,
    author: "NetToolKit",
    relatedTools: ["aspect-ratio-calculator", "image-resizer"],
    seoTitle: "Image Aspect Ratios Explained | NetToolKit",
    seoDescription:
      "A clear, practical guide to 16:9, 4:3, 1:1, 9:16, 3:2 and 21:9 — what each means, where each is used, and how to calculate any aspect ratio.",
    content: (
      <>
        <p>
          Aspect ratio is the proportional relationship between an
          image&apos;s width and its height. It is the reason a 1920&times;1080
          photo and a 1280&times;720 video look exactly the same shape, and the
          reason Instagram crops your square photo into something
          awkward.
        </p>
        <h2>What aspect ratio actually means</h2>
        <p>
          The ratio is written as <code>width:height</code>. A 16:9 image is
          wider than it is tall by a factor of 1.78. A 9:16 image (the
          vertical version) is taller than wide by the same factor. A 1:1
          is a square. The exact pixel count does not matter &mdash; the
          proportion does.
        </p>
        <h2>The common ratios and where each is used</h2>
        <ul>
          <li>
            <strong>16:9</strong> &mdash; HD video, modern monitors, YouTube
            thumbnails, most TV shows and movies. The default for landscape
            content. Common sizes: 1920&times;1080, 1280&times;720, 3840&times;2160 (4K).
          </li>
          <li>
            <strong>4:3</strong> &mdash; older TVs, some compact cameras,
            iPad screens in landscape. Almost no one targets this for new
            content anymore, but it is still common in document scanning.
          </li>
          <li>
            <strong>1:1</strong> &mdash; a perfect square. Instagram
            posts, profile pictures, classic Polaroid. Most versatile for
            social media.
          </li>
          <li>
            <strong>9:16</strong> &mdash; the vertical version of 16:9. Used
            for TikTok, Instagram Reels, YouTube Shorts, full-screen
            vertical video on phones. The dominant format for new short-form
            video.
          </li>
          <li>
            <strong>3:2</strong> &mdash; classic 35mm photography ratio.
            Used by most mirrorless and DSLR cameras. The default for photos
            from any modern camera.
          </li>
          <li>
            <strong>21:9</strong> &mdash; ultrawide. Used for cinematic
            video and ultrawide monitors. Rare for photography.
          </li>
        </ul>
        <h2>How to find an unknown aspect ratio</h2>
        <p>
          Take the width and height and divide both by their greatest common
          divisor. For 1920&times;1080:
        </p>
        <p>
          <code>1920 &divide; 120 = 16, 1080 &divide; 120 = 9</code> &rarr; 16:9
        </p>
        <p>
          For 4032&times;3024 (a typical phone photo):
        </p>
        <p>
          <code>4032 &divide; 1008 = 4, 3024 &divide; 1008 = 3</code> &rarr; 4:3
        </p>
        <h2>What to use for each platform</h2>
        <p>
          If you only remember three ratios, remember these:
        </p>
        <ul>
          <li>
            <strong>YouTube video</strong> &mdash; 16:9
          </li>
          <li>
            <strong>Instagram post</strong> &mdash; 1:1 (works in feed), 4:5
            (taller, more screen real estate), or 9:16 (Reels)
          </li>
          <li>
            <strong>Twitter/X post</strong> &mdash; 16:9
          </li>
        </ul>
        <h2>Why social media crops your photo</h2>
        <p>
          Each platform forces a specific aspect ratio in its display. When
          you upload a 3:2 photo to Instagram, the platform either:
        </p>
        <ul>
          <li>
            <strong>Crops</strong> it to fit its preferred ratio (1:1 or
            4:5), losing parts of your photo
          </li>
          <li>
            <strong>Letterboxes</strong> it with a coloured background, which
            often looks unprofessional
          </li>
        </ul>
        <p>
          The fix: shoot or crop to the target ratio before uploading. Most
          photo apps have a &ldquo;crop to aspect&rdquo; feature. For batch
          resizing, the <a href="/tools/image-resizer">Image Resizer</a>{" "}
          lets you set exact width and height in any ratio.
        </p>
        <h2>How to solve a missing dimension</h2>
        <p>
          If you know one side of the ratio and want the other, multiply. To
          get a height for a 400-pixel-wide image at 16:9:{" "}
          <code>400 &times; 9 &divide; 16 = 225</code>. To get a width for a
          1080-pixel-tall image at 9:16:{" "}
          <code>1080 &times; 9 &divide; 16 = 607.5</code>. Round to the
          nearest pixel.
        </p>
        <h2>Do it without doing the math</h2>
        <p>
          The <a href="/tools/aspect-ratio-calculator">Aspect Ratio
          Calculator</a> takes any width and height and gives you the
          simplified ratio (16:9, 4:3, etc.) plus a decimal form (1.778).
          It also solves the reverse &mdash; enter a width and a target ratio
          and it tells you the matching height.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What is the most common aspect ratio?",
        answer:
          "16:9 is the most common for video and modern displays. 3:2 is the most common for photography (it's the classic 35mm film ratio used by most modern cameras).",
      },
      {
        question: "What aspect ratio is Instagram?",
        answer:
          "Instagram supports 1:1 (square), 4:5 (portrait), and 9:16 (vertical/Reels) for posts. The platform will crop or letterbox anything else.",
      },
      {
        question: "How do I find the aspect ratio of an image?",
        answer:
          "Divide both dimensions by their greatest common divisor. For 1920×1080, both divide by 120, giving you 16:9. For 4032×3024, both divide by 1008, giving you 4:3.",
      },
      {
        question: "What's the difference between 16:9 and 4:3?",
        answer:
          "16:9 is wider (modern widescreen), 4:3 is closer to square (older TVs and some cameras). 16:9 is now standard for video, monitors and most displays.",
      },
    ],
  },
  {
    id: "compress-images-for-web",
    slug: "compress-images-for-web",
    title: "How to Compress Images for the Web Without Losing Quality",
    description:
      "Practical image compression for the web — the right formats, the right quality settings, and a workflow that cuts page weight in half.",
    category: "Files",
    publishedAt: "2026-08-30",
    readTime: 7,
    author: "NetToolKit",
    relatedTools: ["image-compressor", "image-resizer", "jpg-to-png", "png-to-jpg"],
    seoTitle: "Compress Images for the Web | NetToolKit",
    seoDescription:
      "Cut image file sizes in half without visible quality loss. Format choice, quality settings, dimensions and a practical workflow.",
    content: (
      <>
        <p>
          Images are usually 50&ndash;80% of a webpage&apos;s total weight. A
          single unoptimised hero image can be larger than the entire HTML,
          CSS and JavaScript combined. Compressing your images is the
          single highest-impact thing you can do to make a site faster.
        </p>
        <h2>Why image compression matters</h2>
        <p>
          Smaller images mean faster page loads, less data for mobile users,
          better Core Web Vitals scores and better Google rankings. A
          one-second improvement in page load time can lift conversions by
          7&ndash;10% on a typical e-commerce site.
        </p>
        <h2>The 4 levers to pull</h2>
        <p>
          You have four independent controls. Pull all of them:
        </p>
        <ol>
          <li>
            <strong>Format</strong> &mdash; use WebP for photos and
            graphics. Use AVIF if you can (smaller still, but newer
            support).
          </li>
          <li>
            <strong>Quality</strong> &mdash; 75&ndash;85% for photos is
            the sweet spot. Lower than 70% shows artefacts.
          </li>
          <li>
            <strong>Dimensions</strong> &mdash; never serve a 4000-pixel
            image where a 1200-pixel one would do. Resize before
            uploading.
          </li>
          <li>
            <strong>Metadata</strong> &mdash; strip EXIF, GPS, camera info.
            Most photos carry 50&ndash;200 KB of metadata you do not need.
          </li>
        </ol>
        <h2>What to target</h2>
        <p>
          Practical size targets for the web:
        </p>
        <ul>
          <li>
            <strong>Hero / banner images</strong> &mdash; under 200 KB
          </li>
          <li>
            <strong>Article images</strong> &mdash; under 100 KB each
          </li>
          <li>
            <strong>Thumbnails</strong> &mdash; under 30 KB
          </li>
          <li>
            <strong>Logos and icons</strong> &mdash; under 10 KB (use SVG if
            possible)
          </li>
        </ul>
        <h2>Quality settings that work</h2>
        <p>
          The right quality setting depends on what the image is:
        </p>
        <ul>
          <li>
            <strong>Photographs:</strong> 75&ndash;85% JPEG or equivalent
            WebP. Below 70% and JPEG starts showing blocky artefacts around
            high-contrast edges.
          </li>
          <li>
            <strong>Logos and flat graphics:</strong> lossless PNG or
            lossless WebP. The file is already small, and lossy compression
            creates visible edges and colour banding.
          </li>
          <li>
            <strong>Background images:</strong> you can go lower, 60&ndash;70%
            quality, because the eye does not pick up subtle artefacts on
            backgrounds.
          </li>
        </ul>
        <h2>Dimensions matter more than quality</h2>
        <p>
          A 4000-pixel-wide image at 80% quality is still 1.5 MB. The same
          image at 1200 pixels is 250 KB at the same quality. Always resize
          to the actual display size before uploading. Browsers will
          downscale a large image to display, but they will still download
          the full-size file.
        </p>
        <p>
          For most modern websites, the max width you actually need is:
        </p>
        <ul>
          <li>
            <strong>Full-width hero</strong> &mdash; 1920 pixels
          </li>
          <li>
            <strong>Article content</strong> &mdash; 1200 pixels
          </li>
          <li>
            <strong>Thumbnail</strong> &mdash; 400&ndash;600 pixels
          </li>
          <li>
            <strong>Mobile-first</strong> &mdash; never serve larger than
            2x the largest display size, so 1200 pixels for a 600-pixel
            display.
          </li>
        </ul>
        <h2>A practical workflow</h2>
        <ol>
          <li>
            <strong>Resize first.</strong> Use an image editor or the{" "}
            <a href="/tools/image-resizer">Image Resizer</a> to get the
            image to the right pixel dimensions.
          </li>
          <li>
            <strong>Compress second.</strong> Use the{" "}
            <a href="/tools/image-compressor">Image Compressor</a> to
            re-encode at 75&ndash;85% quality.
          </li>
          <li>
            <strong>Check the result.</strong> Open the compressed image
            and compare it side-by-side with the original. You should not
            see a difference at 100% zoom.
          </li>
          <li>
            <strong>Convert format if needed.</strong> For graphics with
            transparency, use the{" "}
            <a href="/tools/jpg-to-png">JPG to PNG</a> or{" "}
            <a href="/tools/png-to-jpg">PNG to JPG</a> converter to switch
            formats.
          </li>
        </ol>
        <h2>Common mistakes to avoid</h2>
        <ul>
          <li>
            <strong>Don&apos;t compress twice.</strong> Each re-encode loses
            a little quality. Compress once, save the result, use that.
          </li>
          <li>
            <strong>Don&apos;t resize up.</strong> Making a 200-pixel image
            1000 pixels does not add detail, it just adds blur. Always
            resize down, never up.
          </li>
          <li>
            <strong>Don&apos;t skip the metadata.</strong> Strip EXIF and
            GPS for privacy as much as for size. Phone photos can leak your
            home address if you upload them unchanged.
          </li>
        </ul>
        <h2>Quick wins for any site</h2>
        <p>
          If you do nothing else, do these two:
        </p>
        <ol>
          <li>Convert all your JPEGs to WebP. Same quality, 30% smaller.</li>
          <li>
            Resize every image to its actual display size. Most sites have
            images 2&ndash;5x larger than they need to be.
          </li>
        </ol>
        <p>
          Both of these together will typically cut a webpage&apos;s image
          weight in half. The tools in the sidebar can do both in your
          browser, no upload required.
        </p>
      </>
    ),
    faqs: [
      {
        question: "What quality should I use for JPEG images on the web?",
        answer:
          "75-85% quality is the sweet spot for photographs. Below 70% JPEG shows visible blocky artefacts. Above 90% the file size grows faster than the quality improvement.",
      },
      {
        question: "Is WebP better than JPEG for the web?",
        answer:
          "Yes. WebP produces 25-35% smaller files than JPEG at equivalent visual quality, and is supported by 97%+ of browsers in 2026. Use WebP unless you have a specific reason not to.",
      },
      {
        question: "How much can I compress an image without losing quality?",
        answer:
          "For photographs, 75-85% quality is usually indistinguishable from the original at normal viewing sizes. For graphics and logos, use lossless formats (PNG or lossless WebP) — they don't lose quality at all but produce larger files.",
      },
      {
        question: "Should I resize images before uploading?",
        answer:
          "Always. A 4000-pixel image at 80% quality is still 1.5 MB. The same image at 1200 pixels is 250 KB. Most sites have images 2-5x larger than they need to be.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export const BLOG_POSTS_BY_SLUG: Record<string, BlogPost> = BLOG_POSTS.reduce(
  (acc, p) => {
    acc[p.slug] = p;
    return acc;
  },
  {} as Record<string, BlogPost>,
);
