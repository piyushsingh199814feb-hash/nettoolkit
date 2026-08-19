"use client";

import * as React from "react";
import { FileUpload } from "@/components/FileUpload";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { Icon } from "@/components/Icon";
import { formatBytesAuto } from "@/lib/format";

type Direction = "jpg-to-png" | "png-to-jpg";

interface Props {
  direction: Direction;
  /** Source format mime type to accept. */
  accept: string;
  /** Target mime type. */
  outputType: "image/png" | "image/jpeg";
  /** Quality for lossy outputs (ignored for PNG). */
  quality?: number;
  /** Title for the result. */
  resultTitle: string;
  /** Helper text for the file picker. */
  pickerHint: string;
}

export function ImageFormatConverter({
  direction,
  accept,
  outputType,
  quality = 0.92,
  resultTitle,
  pickerHint,
}: Props) {
  const [file, setFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [result, setResult] = React.useState<{
    blob: Blob;
    url: string;
    size: number;
  } | null>(null);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (result) URL.revokeObjectURL(result.url);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onFiles(files: File[]) {
    const f = files[0];
    if (!f) return;
    setError(null);
    setBusy(true);
    try {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (result) URL.revokeObjectURL(result.url);
      const url = URL.createObjectURL(f);
      const img = await loadImage(url);
      setFile(f);
      setPreviewUrl(url);
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      setResult(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read image.");
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    if (result) URL.revokeObjectURL(result.url);
    setFile(null);
    setPreviewUrl(null);
    setWidth(0);
    setHeight(0);
    setResult(null);
    setError(null);
  }

  async function onConvert() {
    if (!file || !previewUrl) return;
    setBusy(true);
    setError(null);
    try {
      const img = await loadImage(previewUrl);
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Canvas unsupported.");
      // Fill white background for JPG (no transparency)
      if (outputType === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0);
      const blob = await canvasToBlob(
        canvas,
        outputType,
        outputType === "image/png" ? undefined : quality,
      );
      if (result) URL.revokeObjectURL(result.url);
      const url = URL.createObjectURL(blob);
      setResult({ blob, url, size: blob.size });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  function download() {
    if (!result || !file) return;
    const a = document.createElement("a");
    a.href = result.url;
    const ext = outputType === "image/png" ? "png" : "jpg";
    const base = file.name.replace(/\.[^.]+$/, "");
    a.download = `${base}.${ext}`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  if (!file) {
    return (
      <FileUpload
        accept={accept}
        maxSizeMB={50}
        onFiles={onFiles}
        hint={pickerHint}
      />
    );
  }

  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs font-medium text-ink-500">
            Original ({formatBytesAuto(file.size)})
          </p>
          <div className="overflow-hidden rounded-lg border border-ink-200 bg-ink-50">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl ?? ""}
              alt="Original"
              className="block max-h-72 w-full object-contain"
            />
          </div>
        </div>
        <div>
          <p className="mb-1 text-xs font-medium text-ink-500">
            {result ? `${resultTitle} (${formatBytesAuto(result.size)})` : `${resultTitle} (preview)`}
          </p>
          <div className="grid h-full place-items-center overflow-hidden rounded-lg border border-dashed border-ink-300 bg-white p-6 text-center text-sm text-ink-500">
            {result ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={result.url}
                alt="Converted"
                className="block max-h-72 w-full object-contain"
              />
            ) : (
              <span>Click {direction === "jpg-to-png" ? "Convert to PNG" : "Convert to JPG"} to generate the result.</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button onClick={onConvert} disabled={busy}>
          {busy
            ? "Converting…"
            : direction === "jpg-to-png"
              ? "Convert to PNG"
              : "Convert to JPG"}
        </Button>
        {result && (
          <Button onClick={download} variant="secondary">
            <Icon name="download" size={14} />
            Download
          </Button>
        )}
        <Button onClick={reset} variant="ghost">
          Choose another
        </Button>
        <span className="ml-auto text-xs text-ink-500">
          {width}×{height}px
        </span>
      </div>

      {error && (
        <div className="mt-3">
          <Alert variant="danger" title="Conversion error">
            {error}
          </Alert>
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
