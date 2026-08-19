"use client";

import * as React from "react";
import { FileUpload } from "@/components/FileUpload";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/Icon";
import { formatBytesAuto } from "@/lib/format";

type OutFormat = "image/jpeg" | "image/png" | "image/webp";

const FORMAT_OPTS: { value: OutFormat; label: string }[] = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/png", label: "PNG" },
  { value: "image/webp", label: "WebP" },
];

interface State {
  file: File;
  originalUrl: string;
  originalWidth: number;
  originalHeight: number;
  width: string;
  height: string;
  lockAspect: boolean;
  outputFormat: OutFormat;
  quality: number;
  result: { blob: Blob; url: string; width: number; height: number } | null;
  error?: string;
}

export function ImageResizer() {
  const [state, setState] = React.useState<State | null>(null);
  const [busy, setBusy] = React.useState(false);

  function reset() {
    if (state) {
      URL.revokeObjectURL(state.originalUrl);
      if (state.result) URL.revokeObjectURL(state.result.url);
    }
    setState(null);
  }

  async function onFiles(files: File[]) {
    const f = files[0];
    if (!f) return;
    setBusy(true);
    try {
      const url = URL.createObjectURL(f);
      const img = await loadImage(url);
      const outFmt: OutFormat =
        f.type === "image/png"
          ? "image/png"
          : f.type === "image/webp"
            ? "image/webp"
            : "image/jpeg";
      setState({
        file: f,
        originalUrl: url,
        originalWidth: img.naturalWidth,
        originalHeight: img.naturalHeight,
        width: String(img.naturalWidth),
        height: String(img.naturalHeight),
        lockAspect: true,
        outputFormat: outFmt,
        quality: 0.92,
        result: null,
      });
    } catch (e) {
      setState({
        file: f,
        originalUrl: "",
        originalWidth: 0,
        originalHeight: 0,
        width: "",
        height: "",
        lockAspect: true,
        outputFormat: "image/jpeg",
        quality: 0.92,
        result: null,
        error: e instanceof Error ? e.message : "Could not load image.",
      });
    } finally {
      setBusy(false);
    }
  }

  function onChangeWidth(v: string) {
    if (!state) return;
    const newW = Number(v);
    const updates: Partial<State> = { width: v };
    if (state.lockAspect && Number.isFinite(newW) && newW > 0) {
      const ratio = state.originalHeight / state.originalWidth;
      updates.height = String(Math.max(1, Math.round(newW * ratio)));
    }
    setState({ ...state, ...updates, result: null });
  }

  function onChangeHeight(v: string) {
    if (!state) return;
    const newH = Number(v);
    const updates: Partial<State> = { height: v };
    if (state.lockAspect && Number.isFinite(newH) && newH > 0) {
      const ratio = state.originalWidth / state.originalHeight;
      updates.width = String(Math.max(1, Math.round(newH * ratio)));
    }
    setState({ ...state, ...updates, result: null });
  }

  async function onResize() {
    if (!state) return;
    const w = Number(state.width);
    const h = Number(state.height);
    if (!Number.isFinite(w) || w <= 0 || !Number.isFinite(h) || h <= 0) return;
    setBusy(true);
    try {
      const img = await loadImage(state.originalUrl);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported in this browser.");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, w, h);
      const q =
        state.outputFormat === "image/png" ? undefined : state.quality;
      const blob = await canvasToBlob(canvas, state.outputFormat, q);
      if (state.result) URL.revokeObjectURL(state.result.url);
      const url = URL.createObjectURL(blob);
      setState({ ...state, result: { blob, url, width: w, height: h } });
    } catch (e) {
      setState({
        ...state,
        error: e instanceof Error ? e.message : "Resize failed.",
      });
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!state?.result) return;
    const a = document.createElement("a");
    a.href = state.result.url;
    const ext =
      state.outputFormat === "image/png"
        ? "png"
        : state.outputFormat === "image/webp"
          ? "webp"
          : "jpg";
    const base = state.file.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-${state.result.width}x${state.result.height}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (!state) {
    return (
      <FileUpload
        accept="image/*"
        maxSizeMB={50}
        onFiles={onFiles}
        hint="JPG, PNG, WebP — processed in your browser."
      />
    );
  }

  if (state.error) {
    return (
      <div>
        <Alert variant="danger" title="Could not load image">
          {state.error}
        </Alert>
        <Button onClick={reset} className="mt-3" variant="secondary">
          Try another file
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid gap-2 sm:grid-cols-[200px_1fr] sm:items-start">
        <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={state.originalUrl}
            alt="Original"
            className="block max-h-48 w-full object-contain"
          />
        </div>
        <div className="text-sm text-ink-700">
          <p className="truncate font-medium text-ink-900">{state.file.name}</p>
          <p className="text-xs text-ink-500">
            Original: {state.originalWidth}×{state.originalHeight}px ·{" "}
            {formatBytesAuto(state.file.size)}
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <Input
          label="Width (px)"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          value={state.width}
          onChange={(e) => onChangeWidth(e.target.value)}
        />
        <Input
          label="Height (px)"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          value={state.height}
          onChange={(e) => onChangeHeight(e.target.value)}
        />
        <div className="flex items-end">
          <label className="inline-flex select-none items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={state.lockAspect}
              onChange={(e) =>
                setState({ ...state, lockAspect: e.target.checked })
              }
              className="h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
            />
            Lock aspect ratio
          </label>
        </div>
        <Select
          label="Output format"
          value={state.outputFormat}
          onChange={(e) =>
            setState({
              ...state,
              outputFormat: e.target.value as OutFormat,
              result: null,
            })
          }
          options={FORMAT_OPTS}
        />
        {state.outputFormat !== "image/png" && (
          <div>
            <label className="label mb-1.5">
              Quality: {Math.round(state.quality * 100)}%
            </label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={state.quality}
              onChange={(e) =>
                setState({ ...state, quality: Number(e.target.value), result: null })
              }
              className="block h-11 w-full accent-brand-600"
              aria-label="Quality"
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={onResize} disabled={busy}>
          {busy ? "Resizing…" : "Resize image"}
        </Button>
        <Button onClick={reset} variant="ghost">
          Choose another
        </Button>
      </div>

      {state.result && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-4">
          <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="overflow-hidden rounded-lg border border-ink-200 bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={state.result.url}
                alt="Resized"
                className="block max-h-72 w-full object-contain"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-ink-900">
                {state.result.width}×{state.result.height}px
              </p>
              <p className="text-xs text-ink-500">
                {formatBytesAuto(state.result.blob.size)}
              </p>
              <Button onClick={download} className="mt-3" size="sm">
                <Icon name="download" size={14} />
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image."));
    img.src = src;
  });
}

function canvasToBlob(
  canvas: HTMLCanvasElement,
  type: string,
  quality?: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Encode failed."))),
      type,
      quality,
    );
  });
}
