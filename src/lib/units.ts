// Pure utility functions for unit conversions used across calculators.

export type SizeUnit = "B" | "KB" | "MB" | "GB" | "TB";
export type BinarySizeUnit = "B" | "KiB" | "MiB" | "GiB" | "TiB";

export type SpeedUnit = "Kbps" | "Mbps" | "Gbps";

/** Convert a size value into bytes (decimal — powers of 1000). */
export function sizeToBytes(value: number, unit: SizeUnit): number {
  const v = Number(value);
  if (!Number.isFinite(v)) return 0;
  switch (unit) {
    case "B":
      return v;
    case "KB":
      return v * 1000;
    case "MB":
      return v * 1000 ** 2;
    case "GB":
      return v * 1000 ** 3;
    case "TB":
      return v * 1000 ** 4;
  }
}

/** Convert bytes to the given decimal size unit. */
export function bytesToSize(bytes: number, unit: SizeUnit): number {
  const b = Number(bytes);
  if (!Number.isFinite(b)) return 0;
  switch (unit) {
    case "B":
      return b;
    case "KB":
      return b / 1000;
    case "MB":
      return b / 1000 ** 2;
    case "GB":
      return b / 1000 ** 3;
    case "TB":
      return b / 1000 ** 4;
  }
}

/** Convert a binary unit value into bytes. */
export function binaryToBytes(value: number, unit: BinarySizeUnit): number {
  const v = Number(value);
  if (!Number.isFinite(v)) return 0;
  switch (unit) {
    case "B":
      return v;
    case "KiB":
      return v * 1024;
    case "MiB":
      return v * 1024 ** 2;
    case "GiB":
      return v * 1024 ** 3;
    case "TiB":
      return v * 1024 ** 4;
  }
}

/** Convert bytes into the given binary unit. */
export function bytesToBinary(bytes: number, unit: BinarySizeUnit): number {
  const b = Number(bytes);
  if (!Number.isFinite(b)) return 0;
  switch (unit) {
    case "B":
      return b;
    case "KiB":
      return b / 1024;
    case "MiB":
      return b / 1024 ** 2;
    case "GiB":
      return b / 1024 ** 3;
    case "TiB":
      return b / 1024 ** 4;
  }
}

/** Convert a speed value (in bits per second) given its unit prefix. */
export function speedToBitsPerSecond(value: number, unit: SpeedUnit): number {
  const v = Number(value);
  if (!Number.isFinite(v)) return 0;
  switch (unit) {
    case "Kbps":
      return v * 1000;
    case "Mbps":
      return v * 1000 ** 2;
    case "Gbps":
      return v * 1000 ** 3;
  }
}

/** Convert a value in bits per second to the given speed unit. */
export function bitsPerSecondToSpeed(
  bps: number,
  unit: SpeedUnit,
): number {
  const b = Number(bps);
  if (!Number.isFinite(b)) return 0;
  switch (unit) {
    case "Kbps":
      return b / 1000;
    case "Mbps":
      return b / 1000 ** 2;
    case "Gbps":
      return b / 1000 ** 3;
  }
}

/** Bits per second → megabytes per second (decimal). */
export function bpsToMBps(bps: number): number {
  return bps / 8 / 1000 ** 2;
}

/** Megabytes per second → bits per second. */
export function mbPerSecToBps(mbps: number): number {
  return mbps * 8 * 1000 ** 2;
}

/** Compute time in seconds to transfer `bytes` at `bytesPerSecond`. */
export function transferTimeSeconds(
  bytes: number,
  bytesPerSecond: number,
): number {
  if (bytesPerSecond <= 0) return Infinity;
  return bytes / bytesPerSecond;
}
