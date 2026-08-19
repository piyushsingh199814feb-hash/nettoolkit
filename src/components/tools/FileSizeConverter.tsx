"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatNumber } from "@/lib/format";
import {
  sizeToBytes,
  bytesToSize,
  binaryToBytes,
  bytesToBinary,
  type SizeUnit,
  type BinarySizeUnit,
} from "@/lib/units";

const DECIMAL_UNITS: { value: SizeUnit; label: string }[] = [
  { value: "B", label: "Bytes (B)" },
  { value: "KB", label: "KB (1,000 B)" },
  { value: "MB", label: "MB (1,000 KB)" },
  { value: "GB", label: "GB (1,000 MB)" },
  { value: "TB", label: "TB (1,000 GB)" },
];

const BINARY_UNITS: { value: BinarySizeUnit; label: string }[] = [
  { value: "B", label: "Bytes (B)" },
  { value: "KiB", label: "KiB (1,024 B)" },
  { value: "MiB", label: "MiB (1,024 KiB)" },
  { value: "GiB", label: "GiB (1,024 MiB)" },
  { value: "TiB", label: "TiB (1,024 GiB)" },
];

export function FileSizeConverter() {
  const [val, setVal] = React.useState("1");
  const [system, setSystem] = React.useState<"decimal" | "binary">("decimal");
  const [unit, setUnit] = React.useState<SizeUnit | BinarySizeUnit>("GB");
  const [touched, setTouched] = React.useState(false);

  const v = Number(val);
  const err =
    touched && (!Number.isFinite(v) || v < 0)
      ? "Enter a non-negative number."
      : "";

  const units = system === "decimal" ? DECIMAL_UNITS : BINARY_UNITS;

  // Convert input to bytes
  const bytes = !err
    ? system === "decimal"
      ? sizeToBytes(v, unit as SizeUnit)
      : binaryToBytes(v, unit as BinarySizeUnit)
    : NaN;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
      }}
      noValidate
    >
      <div className="mb-4 flex gap-2">
        <button
          type="button"
          onClick={() => {
            setSystem("decimal");
            setUnit("GB");
          }}
          aria-pressed={system === "decimal"}
          className={[
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            system === "decimal"
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50",
          ].join(" ")}
        >
          Decimal (KB, MB, GB)
        </button>
        <button
          type="button"
          onClick={() => {
            setSystem("binary");
            setUnit("GiB");
          }}
          aria-pressed={system === "binary"}
          className={[
            "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
            system === "binary"
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50",
          ].join(" ")}
        >
          Binary (KiB, MiB, GiB)
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
        <Input
          label="Value"
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
          onChange={(e) => setUnit(e.target.value as SizeUnit)}
          options={units}
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

      {!err && Number.isFinite(bytes) && (
        <div className="mt-6 space-y-3">
          <div className="rounded-xl border border-brand-200 bg-brand-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
              All values
            </p>
            <p className="mt-1 text-sm text-brand-900/80">
              {formatNumber(v, 6)} {unit} = {formatNumber(bytes, 0)} bytes
            </p>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <UnitRow
              label="Decimal"
              primary={
                <>
                  {formatNumber(bytesToSize(bytes, "B"), 0)} B
                </>
              }
              rows={[
                ["KB", formatNumber(bytesToSize(bytes, "KB"), 4)],
                ["MB", formatNumber(bytesToSize(bytes, "MB"), 4)],
                ["GB", formatNumber(bytesToSize(bytes, "GB"), 4)],
                ["TB", formatNumber(bytesToSize(bytes, "TB"), 6)],
              ]}
            />
            <UnitRow
              label="Binary"
              primary={
                <>
                  {formatNumber(bytesToBinary(bytes, "B"), 0)} B
                </>
              }
              rows={[
                ["KiB", formatNumber(bytesToBinary(bytes, "KiB"), 4)],
                ["MiB", formatNumber(bytesToBinary(bytes, "MiB"), 4)],
                ["GiB", formatNumber(bytesToBinary(bytes, "GiB"), 4)],
                ["TiB", formatNumber(bytesToBinary(bytes, "TiB"), 6)],
              ]}
            />
          </div>
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

function UnitRow({
  label,
  primary,
  rows,
}: {
  label: string;
  primary: React.ReactNode;
  rows: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-ink-200 bg-white p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-ink-500">
        {label}
      </p>
      <ul className="mt-2 space-y-1 text-sm">
        {rows.map(([u, v]) => (
          <li key={u} className="flex items-center justify-between">
            <span className="text-ink-600">{u}</span>
            <span className="font-mono font-medium text-ink-900">{v}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
