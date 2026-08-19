"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatNumber } from "@/lib/format";
import {
  speedToBitsPerSecond,
  bpsToMBps,
  bitsPerSecondToSpeed,
} from "@/lib/units";

export type ConverterKind =
  | "mbps-to-mb-s"
  | "mb-s-to-mbps"
  | "kbps-to-kb-s"
  | "kb-s-to-kbps"
  | "gbps-to-gb-s"
  | "gb-s-to-gbps";

interface ConverterProps {
  /** Conversion kind — determines the input/output behaviour. */
  kind: ConverterKind;
  /** Initial value. */
  defaultValue?: string;
  defaultUnit?: string;
  presets?: number[];
  /** Override the input label. */
  inputLabel?: string;
}

const KIND_META: Record<
  ConverterKind,
  {
    inputLabel: string;
    inputUnits: { value: string; label: string }[];
    defaultUnit: string;
    resultTitle: string;
    resultUnitLabel: string;
    resultSecondary?: (n: number) => string;
  }
> = {
  "mbps-to-mb-s": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "Kbps", label: "Kbps" },
      { value: "Mbps", label: "Mbps" },
      { value: "Gbps", label: "Gbps" },
    ],
    defaultUnit: "Mbps",
    resultTitle: "Megabytes per second",
    resultUnitLabel: "MB/s",
    resultSecondary: (n: number) => `≈ ${formatNumber(n * 8, 2)} Mbps`,
  },
  "mb-s-to-mbps": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "KB/s", label: "KB/s" },
      { value: "MB/s", label: "MB/s" },
      { value: "GB/s", label: "GB/s" },
    ],
    defaultUnit: "MB/s",
    resultTitle: "Megabits per second",
    resultUnitLabel: "Mbps",
    resultSecondary: (n: number) => `≈ ${formatNumber(n / 8, 4)} MB/s`,
  },
  "kbps-to-kb-s": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "Kbps", label: "Kbps" },
      { value: "Mbps", label: "Mbps" },
    ],
    defaultUnit: "Kbps",
    resultTitle: "Kilobytes per second",
    resultUnitLabel: "KB/s",
    resultSecondary: (n: number) => `≈ ${formatNumber(n * 8, 2)} Kbps`,
  },
  "kb-s-to-kbps": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "KB/s", label: "KB/s" },
      { value: "MB/s", label: "MB/s" },
    ],
    defaultUnit: "KB/s",
    resultTitle: "Kilobits per second",
    resultUnitLabel: "Kbps",
    resultSecondary: (n: number) => `≈ ${formatNumber(n / 8, 2)} KB/s`,
  },
  "gbps-to-gb-s": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "Mbps", label: "Mbps" },
      { value: "Gbps", label: "Gbps" },
    ],
    defaultUnit: "Gbps",
    resultTitle: "Gigabytes per second",
    resultUnitLabel: "GB/s",
    resultSecondary: (n: number) => `≈ ${formatNumber(n * 8, 2)} Gbps`,
  },
  "gb-s-to-gbps": {
    inputLabel: "Speed",
    inputUnits: [
      { value: "MB/s", label: "MB/s" },
      { value: "GB/s", label: "GB/s" },
    ],
    defaultUnit: "GB/s",
    resultTitle: "Gigabits per second",
    resultUnitLabel: "Gbps",
    resultSecondary: (n: number) => `≈ ${formatNumber(n / 8, 4)} GB/s`,
  },
};

function compute(kind: ConverterKind, v: number, unit: string): number | null {
  if (!Number.isFinite(v) || v < 0) return null;
  switch (kind) {
    case "mbps-to-mb-s":
    case "kbps-to-kb-s":
    case "gbps-to-gb-s": {
      const u = unit as "Kbps" | "Mbps" | "Gbps";
      const bps = speedToBitsPerSecond(v, u);
      if (kind === "mbps-to-mb-s") return bpsToMBps(bps);
      if (kind === "kbps-to-kb-s") return bps / 8 / 1000; // KB/s
      // gbps-to-gb-s
      return bps / 8 / 1000 ** 3;
    }
    case "mb-s-to-mbps":
    case "kb-s-to-kbps":
    case "gb-s-to-gbps": {
      const factor =
        unit === "GB/s" ? 1000 ** 2 : unit === "MB/s" ? 1000 : 1;
      const bytesPerSec = v * factor;
      const bps = bytesPerSec * 8;
      if (kind === "mb-s-to-mbps") return bitsPerSecondToSpeed(bps, "Mbps");
      if (kind === "kb-s-to-kbps") return bps / 1000; // Kbps
      // gb-s-to-gbps
      return bitsPerSecondToSpeed(bps, "Gbps");
    }
  }
}

export function Converter({
  kind,
  defaultValue = "",
  defaultUnit,
  presets,
  inputLabel,
}: ConverterProps) {
  const meta = KIND_META[kind];
  const [val, setVal] = React.useState<string>(
    defaultValue || (kind === "mb-s-to-mbps" ? "12.5" : "100"),
  );
  const [unit, setUnit] = React.useState<string>(
    defaultUnit ?? meta.defaultUnit,
  );
  const [touched, setTouched] = React.useState(false);

  const v = Number(val);
  const err =
    touched && (!Number.isFinite(v) || v < 0)
      ? "Enter a non-negative number."
      : "";

  const result = !err ? compute(kind, v, unit) : null;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
      }}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <Input
          label={inputLabel ?? meta.inputLabel}
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          errorText={err}
        />
        <Select
          label="Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          options={meta.inputUnits}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit">Convert</Button>
        <button
          type="button"
          onClick={() => {
            setVal("");
            setTouched(false);
          }}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Reset
        </button>
      </div>

      {presets && presets.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-ink-500">
          <span>Quick picks:</span>
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setVal(String(p));
                setUnit(meta.defaultUnit);
                setTouched(true);
              }}
              className="rounded-full border border-ink-200 bg-white px-2.5 py-1 font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
            >
              {formatNumber(p, p < 1 ? 2 : 0)} {meta.defaultUnit}
            </button>
          ))}
        </div>
      )}

      {!err && result !== null && Number.isFinite(result) && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            {meta.resultTitle}
          </p>
          <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
            {formatNumber(result, 4)}
            <span className="ml-2 text-xl font-medium text-brand-700">
              {meta.resultUnitLabel}
            </span>
          </p>
          {meta.resultSecondary && (
            <p className="mt-1 text-sm text-brand-900/80">
              {meta.resultSecondary(result)}
            </p>
          )}
        </div>
      )}

      {touched && err && (
        <div className="mt-4">
          <Alert variant="danger" title="Please check your input">
            {err}
          </Alert>
        </div>
      )}
    </form>
  );
}
