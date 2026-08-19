"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatNumber } from "@/lib/format";

type Mode = "from-dimensions" | "from-width" | "from-height";

const PRESETS: { label: string; w: number; h: number }[] = [
  { label: "16:9", w: 16, h: 9 },
  { label: "4:3", w: 4, h: 3 },
  { label: "1:1", w: 1, h: 1 },
  { label: "9:16", w: 9, h: 16 },
  { label: "3:2", w: 3, h: 2 },
  { label: "21:9", w: 21, h: 9 },
];

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function AspectRatioCalculator() {
  const [mode, setMode] = React.useState<Mode>("from-dimensions");
  const [w, setW] = React.useState("1920");
  const [h, setH] = React.useState("1080");
  const [touched, setTouched] = React.useState(false);

  const W = Number(w);
  const H = Number(h);

  const wErr = touched && (!Number.isFinite(W) || W <= 0) ? "Enter a positive number." : "";
  const hErr = touched && (!Number.isFinite(H) || H <= 0) ? "Enter a positive number." : "";

  const valid = !wErr && !hErr;

  const ratio = valid ? W / H : NaN;
  const g = valid ? gcd(W, H) : 1;
  const ratioLabel = valid ? `${W / g}:${H / g}` : "—";
  const decimal = valid ? formatNumber(ratio, 4) : "—";

  // In "from-width" mode, compute height from width and current height (which holds the ratio multiplier H of W=current)
  // For simplicity: store ratio as W:H from a preset, then user enters width -> compute height
  const [ratioW, setRatioW] = React.useState("16");
  const [ratioH, setRatioH] = React.useState("9");
  const rW = Number(ratioW);
  const rH = Number(ratioH);
  const rErr =
    touched && (!Number.isFinite(rW) || rW <= 0 || !Number.isFinite(rH) || rH <= 0)
      ? "Enter positive numbers."
      : "";

  const computedH = mode === "from-width" && valid && !rErr ? (W * rH) / rW : NaN;
  const computedW = mode === "from-height" && valid && !rErr ? (H * rW) / rH : NaN;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
      }}
      noValidate
    >
      <div className="mb-4 flex flex-wrap gap-2">
        <ModeBtn active={mode === "from-dimensions"} onClick={() => setMode("from-dimensions")}>
          From width & height
        </ModeBtn>
        <ModeBtn active={mode === "from-width"} onClick={() => setMode("from-width")}>
          From width & ratio
        </ModeBtn>
        <ModeBtn active={mode === "from-height"} onClick={() => setMode("from-height")}>
          From height & ratio
        </ModeBtn>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Width"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={w}
          onChange={(e) => setW(e.target.value)}
          errorText={mode === "from-height" ? "" : wErr}
        />
        <Input
          label={mode === "from-width" ? "Ratio (H)" : mode === "from-height" ? "Height" : "Height"}
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          value={h}
          onChange={(e) => setH(e.target.value)}
          errorText={mode === "from-width" ? "" : mode === "from-height" ? hErr : hErr}
        />
      </div>

      {(mode === "from-width" || mode === "from-height") && (
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Ratio W"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={ratioW}
            onChange={(e) => setRatioW(e.target.value)}
            helpText="The width part of the ratio (e.g. 16 for 16:9)"
            errorText={touched && rErr ? rErr : ""}
          />
          <Input
            label="Ratio H"
            type="number"
            min="0"
            step="any"
            inputMode="decimal"
            value={ratioH}
            onChange={(e) => setRatioH(e.target.value)}
            helpText="The height part of the ratio (e.g. 9 for 16:9)"
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-ink-500">Presets:</span>
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setRatioW(String(p.w));
              setRatioH(String(p.h));
              setTouched(true);
            }}
            className="rounded-full border border-ink-200 bg-white px-2.5 py-1 text-xs font-medium text-ink-700 hover:border-brand-300 hover:text-brand-700"
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit">Calculate</Button>
        <button
          type="button"
          onClick={() => {
            setW("");
            setH("");
            setTouched(false);
          }}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Reset
        </button>
      </div>

      {valid && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
          {mode === "from-dimensions" && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Aspect ratio
              </p>
              <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
                {ratioLabel}
              </p>
              <p className="mt-1 text-sm text-brand-900/80">
                {decimal} (decimal)
              </p>
            </>
          )}
          {mode === "from-width" && !rErr && Number.isFinite(computedH) && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Computed height
              </p>
              <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
                {formatNumber(computedH, 2)} px
              </p>
              <p className="mt-1 text-sm text-brand-900/80">
                {formatNumber(W, 0)} × {formatNumber(computedH, 0)} at {ratioW}:{ratioH}
              </p>
            </>
          )}
          {mode === "from-height" && !rErr && Number.isFinite(computedW) && (
            <>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
                Computed width
              </p>
              <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
                {formatNumber(computedW, 2)} px
              </p>
              <p className="mt-1 text-sm text-brand-900/80">
                {formatNumber(computedW, 0)} × {formatNumber(H, 0)} at {ratioW}:{ratioH}
              </p>
            </>
          )}
        </div>
      )}

      {touched && (wErr || hErr || rErr) && (
        <div className="mt-4">
          <Alert variant="danger" title="Please check your inputs">
            {wErr || hErr || rErr}
          </Alert>
        </div>
      )}
    </form>
  );
}

function ModeBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-brand-600 bg-brand-600 text-white"
          : "border-ink-200 bg-white text-ink-700 hover:border-ink-300 hover:bg-ink-50",
      ].join(" ")}
    >
      {children}
    </button>
  );
}
