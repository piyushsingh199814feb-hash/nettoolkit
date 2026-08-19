"use client";

import * as React from "react";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/Icon";
import { formatBytesAuto } from "@/lib/format";

interface Item {
  id: string;
  file: File;
  originalUrl: string;
  originalSize: number;
  compressedBlob: Blob | null;
  compressedUrl: string | null;
  compressedSize: number | null;
  outputType: string;
  width: number;
  height: number;
  durationMs: number;
  status: "compressing" | "done" | "error";
  errorMsg?: string;
}

const FORMAT_OPTIONS = [
  { value: "image/jpeg", label: "JPG" },
  { value: "image/webp", label: "WebP" },
  { value: "image/png", label: "PNG" },
];

export function ImageCompressor() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [quality, setQuality] = React.useState(0.75);
  const [format, setFormat] = React.useState("image/jpeg");
  const [maxWidth, setMaxWidth] = React.useState<string>("");
  const [processing, setProcessing] = React.useState(false);

  function onFiles(files: File[]) {
    if (!files.length) return;
    setProcessing(true);
    const additions: Item[] = files.map((f) => ({
      id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
      file: f,
      originalUrl: URL.createObjectURL(f),
      originalSize: f.size,
      compressedBlob: null,
      compressedUrl: null,
      compressedSize: null,
      outputType: f.type || "image/jpeg",
      width: 0,
      height: 0,
      durationMs: 0,
      status: "compressing",
    }));
    setItems((prev) => [...additions, ...prev]);

    additions.forEach((it) => {
      compressOne(it, additions).then((updated) => {
        setItems((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p)),
        );
      });
    });
  }

  async function compressOne(it: Item, _all: Item[]): Promise<Item> {
    const start = performance.now();
    try {
      const img = await loadImage(it.originalUrl);
      let { width, height } = img;
      if (maxWidth) {
        const mw = Number(maxWidth);
        if (Number.isFinite(mw) && mw > 0 && width > mw) {
          height = Math.round((height * mw) / width);
          width = mw;
        }
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported in this browser");
      ctx.drawImage(img, 0, 0, width, height);

      const out = await canvasToBlob(canvas, it.outputType, quality);
      const url = URL.createObjectURL(out);
      return {
        ...it,
        compressedBlob: out,
        compressedUrl: url,
        compressedSize: out.size,
        width,
        height,
        durationMs: performance.now() - start,
        status: "done",
      };
    } catch (e) {
      return {
        ...it,
        status: "error",
        errorMsg: e instanceof Error ? e.message : "Compression failed.",
        durationMs: performance.now() - start,
      };
    }
  }

  async function reCompressAll() {
    setProcessing(true);
    const updates = await Promise.all(
      items.map(async (it) => {
        if (it.status === "error") return it;
        // Revoke previous URL
        if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
        const next = await compressOne(
          { ...it, outputType: format },
          items,
        );
        return next;
      }),
    );
    setItems(updates);
    setProcessing(false);
  }

  function clearAll() {
    items.forEach((it) => {
      URL.revokeObjectURL(it.originalUrl);
      if (it.compressedUrl) URL.revokeObjectURL(it.compressedUrl);
    });
    setItems([]);
  }

  function downloadOne(it: Item) {
    if (!it.compressedBlob || !it.compressedUrl) return;
    const a = document.createElement("a");
    a.href = it.compressedUrl;
    const ext =
      it.outputType === "image/png"
        ? "png"
        : it.outputType === "image/webp"
          ? "webp"
          : "jpg";
    const base = it.file.name.replace(/\.[^.]+$/, "");
    a.download = `${base}-compressed.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function downloadAll() {
    items
      .filter((it) => it.status === "done")
      .forEach((it, idx) => setTimeout(() => downloadOne(it), idx * 200));
  }

  return (
    <div>
      <FileUpload
        accept="image/png,image/jpeg,image/webp,image/*"
        multiple
        maxSizeMB={50}
        onFiles={onFiles}
        hint="JPG, PNG, WebP — processed entirely in your browser."
      />

      {items.length > 0 && (
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <div>
            <label className="label mb-1.5">
              Output format
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm text-ink-900 outline-none focus:border-brand-500"
            >
              {FORMAT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="label mb-1.5">
              Quality: {Math.round(quality * 100)}%
            </label>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="block h-11 w-full accent-brand-600"
              aria-label="Quality"
            />
          </div>
          <div>
            <label className="label mb-1.5">Max width (optional)</label>
            <input
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              value={maxWidth}
              onChange={(e) => setMaxWidth(e.target.value)}
              placeholder="e.g. 1920"
              className="h-11 w-full rounded-lg border border-ink-300 bg-white px-3 text-sm text-ink-900 placeholder-ink-400 outline-none focus:border-brand-500"
            />
          </div>
        </div>
      )}

      {items.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Button
            onClick={reCompressAll}
            disabled={processing}
            size="sm"
          >
            {processing ? "Processing…" : "Re-compress all"}
          </Button>
          <Button onClick={downloadAll} variant="secondary" size="sm">
            Download all
          </Button>
          <Button onClick={clearAll} variant="ghost" size="sm">
            Clear
          </Button>
          <span className="ml-auto text-xs text-ink-500">
            {items.length} file{items.length === 1 ? "" : "s"}
          </span>
        </div>
      )}

      {items.length > 0 && (
        <ul className="mt-6 space-y-4">
          {items.map((it) => (
            <li key={it.id} className="rounded-xl border border-ink-200 p-3 sm:p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="truncate text-sm font-medium text-ink-900">
                  {it.file.name}
                </p>
                <p className="text-xs text-ink-500">
                  {it.width}×{it.height}px
                </p>
              </div>
              {it.status === "compressing" && (
                <p className="mt-3 text-sm text-ink-600">Compressing…</p>
              )}
              {it.status === "error" && (
                <div className="mt-3">
                  <Alert variant="danger" title="Could not process image">
                    {it.errorMsg}
                  </Alert>
                </div>
              )}
              {it.status === "done" && it.compressedUrl && (
                <>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="mb-1 text-xs font-medium text-ink-500">
                        Original ({formatBytesAuto(it.originalSize)})
                      </p>
                      <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={it.originalUrl}
                          alt={`Original ${it.file.name}`}
                          className="block max-h-72 w-full object-contain"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-ink-500">
                        Compressed ({formatBytesAuto(it.compressedSize ?? 0)})
                      </p>
                      <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={it.compressedUrl}
                          alt={`Compressed ${it.file.name}`}
                          className="block max-h-72 w-full object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 font-medium text-emerald-700">
                      {reductionPct(it.originalSize, it.compressedSize ?? 0)}% smaller
                    </span>
                    <span className="text-ink-500">
                      {formatBytesAuto(it.originalSize)} →{" "}
                      {formatBytesAuto(it.compressedSize ?? 0)}
                    </span>
                    <span className="ml-auto text-xs text-ink-500">
                      Processed in {Math.round(it.durationMs)} ms
                    </span>
                    <Button onClick={() => downloadOne(it)} size="sm">
                      <Icon name="download" size={14} />
                      Download
                    </Button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
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
  quality: number,
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not encode image."));
      },
      type,
      quality,
    );
  });
}

function reductionPct(orig: number, comp: number): number {
  if (orig <= 0) return 0;
  return Math.max(0, Math.round(((orig - comp) / orig) * 100));
}
