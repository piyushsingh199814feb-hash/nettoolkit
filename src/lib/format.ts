// Formatting helpers shared across calculators.

/** Format a number for display: locale-aware, with up to N decimals, trimming trailing zeros. */
export function formatNumber(value: number, decimals = 2): string {
  if (!Number.isFinite(value)) return "—";
  if (value === 0) return "0";
  const abs = Math.abs(value);
  if (abs >= 1e9) return value.toExponential(3);
  const fixed = value.toFixed(decimals);
  // Trim trailing zeros after a decimal point
  return fixed.replace(/\.?0+$/, "");
}

/** Format a duration in seconds as a human-readable string. */
export function formatDuration(totalSeconds: number): string {
  if (!Number.isFinite(totalSeconds)) return "—";
  if (totalSeconds <= 0) return "0 seconds";
  const s = Math.round(totalSeconds);
  if (s < 1) return "less than 1 second";
  if (s < 60) return `${s} second${s === 1 ? "" : "s"}`;

  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days === 1 ? "" : "s"}`);
  if (hours > 0) parts.push(`${hours} hour${hours === 1 ? "" : "s"}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes === 1 ? "" : "s"}`);
  if (seconds > 0 && days === 0 && hours === 0)
    parts.push(`${seconds} second${seconds === 1 ? "" : "s"}`);

  if (parts.length === 0) return "less than 1 second";
  return parts.join(" ");
}

/** Format a byte count in a human-readable way using decimal units. */
export function formatBytesAuto(bytes: number, decimals = 2): string {
  if (!Number.isFinite(bytes) || bytes < 0) return "—";
  if (bytes === 0) return "0 B";
  const k = 1000;
  const units = ["B", "KB", "MB", "GB", "TB", "PB"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bytes) / Math.log(k)),
  );
  return `${formatNumber(bytes / k ** i, decimals)} ${units[i]}`;
}

/** Format a bit count for display. */
export function formatBitsAuto(bits: number, decimals = 2): string {
  if (!Number.isFinite(bits) || bits < 0) return "—";
  if (bits === 0) return "0 bps";
  const k = 1000;
  const units = ["bps", "Kbps", "Mbps", "Gbps", "Tbps"];
  const i = Math.min(
    units.length - 1,
    Math.floor(Math.log(bits) / Math.log(k)),
  );
  return `${formatNumber(bits / k ** i, decimals)} ${units[i]}`;
}

/** Format a number of bytes to a specific decimal unit (KB, MB, GB, etc.). */
export function formatBytesIn(
  bytes: number,
  unit: "B" | "KB" | "MB" | "GB" | "TB",
  decimals = 3,
): string {
  const k = 1000;
  const map = { B: 0, KB: 1, MB: 2, GB: 3, TB: 4 } as const;
  const exp = map[unit];
  return `${formatNumber(bytes / k ** exp, decimals)} ${unit}`;
}
