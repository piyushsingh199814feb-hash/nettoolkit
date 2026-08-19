"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatDuration, formatNumber, formatBytesIn } from "@/lib/format";
import {
  sizeToBytes,
  speedToBitsPerSecond,
  bpsToMBps,
  transferTimeSeconds,
} from "@/lib/units";
import type { SizeUnit, SpeedUnit } from "@/lib/units";

const SIZE_UNITS: { value: SizeUnit; label: string }[] = [
  { value: "KB", label: "KB" },
  { value: "MB", label: "MB" },
  { value: "GB", label: "GB" },
  { value: "TB", label: "TB" },
  { value: "B", label: "B" },
];

const SPEED_UNITS: { value: SpeedUnit; label: string }[] = [
  { value: "Mbps", label: "Mbps" },
  { value: "Kbps", label: "Kbps" },
  { value: "Gbps", label: "Gbps" },
];

interface Props {
  /** Used to label the primary action. */
  verb: "download" | "upload" | "transfer";
  /** Initial values. */
  defaults?: {
    size?: number;
    sizeUnit?: SizeUnit;
    speed?: number;
    speedUnit?: SpeedUnit;
  };
}

export function TransferTimeCalculator({ verb, defaults }: Props) {
  const [size, setSize] = React.useState<string>(
    String(defaults?.size ?? (verb === "upload" ? 100 : 500)),
  );
  const [sizeUnit, setSizeUnit] = React.useState<SizeUnit>(
    defaults?.sizeUnit ?? "MB",
  );
  const [speed, setSpeed] = React.useState<string>(
    String(defaults?.speed ?? 50),
  );
  const [speedUnit, setSpeedUnit] = React.useState<SpeedUnit>(
    defaults?.speedUnit ?? "Mbps",
  );
  const [submitted, setSubmitted] = React.useState(false);
  const [touched, setTouched] = React.useState(false);

  const sizeNum = Number(size);
  const speedNum = Number(speed);

  const sizeError =
    touched && (!Number.isFinite(sizeNum) || sizeNum <= 0)
      ? "Enter a positive number."
      : "";
  const speedError =
    touched && (!Number.isFinite(speedNum) || speedNum <= 0)
      ? "Enter a positive number."
      : "";

  const bytes = sizeToBytes(sizeNum, sizeUnit);
  const bps = speedToBitsPerSecond(speedNum, speedUnit);
  const bytesPerSec = bps / 8;
  const mbPerSec = bpsToMBps(bps);
  const seconds = transferTimeSeconds(bytes, bytesPerSec);

  const onCalc = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!sizeError && !speedError) setSubmitted(true);
  };

  const verbCap = verb[0].toUpperCase() + verb.slice(1);

  return (
    <form onSubmit={onCalc} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label mb-1.5">File size</label>
          <div className="grid grid-cols-[1fr_92px] gap-2">
            <Input
              inputMode="decimal"
              type="number"
              min="0"
              step="any"
              value={size}
              onChange={(e) => {
                setSize(e.target.value);
                setSubmitted(false);
              }}
              aria-label="File size value"
              errorText={sizeError}
            />
            <Select
              aria-label="File size unit"
              value={sizeUnit}
              onChange={(e) => {
                setSizeUnit(e.target.value as SizeUnit);
                setSubmitted(false);
              }}
              options={SIZE_UNITS}
            />
          </div>
        </div>

        <div>
          <label className="label mb-1.5">Connection speed</label>
          <div className="grid grid-cols-[1fr_92px] gap-2">
            <Input
              inputMode="decimal"
              type="number"
              min="0"
              step="any"
              value={speed}
              onChange={(e) => {
                setSpeed(e.target.value);
                setSubmitted(false);
              }}
              aria-label="Connection speed value"
              errorText={speedError}
            />
            <Select
              aria-label="Connection speed unit"
              value={speedUnit}
              onChange={(e) => {
                setSpeedUnit(e.target.value as SpeedUnit);
                setSubmitted(false);
              }}
              options={SPEED_UNITS}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit">Calculate {verb} time</Button>
        <button
          type="button"
          onClick={() => {
            setSize("");
            setSpeed("");
            setSubmitted(false);
            setTouched(false);
          }}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Reset
        </button>
      </div>

      {submitted && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Estimated {verb} time
          </p>
          <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
            {formatDuration(seconds)}
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-500">File size</dt>
              <dd className="font-medium text-ink-900">
                {formatNumber(sizeNum, 2)} {sizeUnit} (
                {formatBytesIn(bytes, sizeUnit === "B" ? "B" : sizeUnit, 3)})
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">Connection speed</dt>
              <dd className="font-medium text-ink-900">
                {formatNumber(speedNum, 2)} {speedUnit}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">Equivalent</dt>
              <dd className="font-medium text-ink-900">
                {formatNumber(mbPerSec, 3)} MB/s
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-xs text-ink-500">
            {verbCap} time = file size ÷ (speed × 1,000,000 ÷ 8). Real-world
            throughput is typically 5–20% lower due to protocol overhead.
          </p>
        </div>
      )}

      {touched && (sizeError || speedError) && (
        <div className="mt-4">
          <Alert variant="danger" title="Please check your inputs">
            {sizeError || speedError}
          </Alert>
        </div>
      )}
    </form>
  );
}
