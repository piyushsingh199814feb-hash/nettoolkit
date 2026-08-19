"use client";

import * as React from "react";
import { Icon } from "./Icon";
import { Button } from "./ui/Button";

interface FileUploadProps {
  accept?: string;
  multiple?: boolean;
  maxSizeMB?: number;
  onFiles: (files: File[]) => void;
  hint?: string;
}

export function FileUpload({
  accept,
  multiple = false,
  maxSizeMB = 50,
  onFiles,
  hint,
}: FileUploadProps) {
  const [dragging, setDragging] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function validateAndEmit(files: File[]) {
    setError(null);
    const filtered: File[] = [];
    for (const f of files) {
      if (f.size > maxSizeMB * 1024 * 1024) {
        setError(
          `"${f.name}" is larger than ${maxSizeMB}MB and was skipped.`,
        );
        continue;
      }
      filtered.push(f);
    }
    if (filtered.length) onFiles(filtered);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length) validateAndEmit(files);
  }

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={[
          "flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white px-6 py-10 text-center transition-colors",
          dragging
            ? "border-brand-500 bg-brand-50/40"
            : "border-ink-300 hover:border-ink-400",
        ].join(" ")}
      >
        <span className="grid h-12 w-12 place-items-center rounded-full bg-ink-100 text-ink-700">
          <Icon name="upload" size={22} />
        </span>
        <p className="mt-3 text-sm font-medium text-ink-900">
          Drop {multiple ? "files" : "a file"} here, or
        </p>
        <Button
          variant="primary"
          className="mt-3"
          onClick={() => inputRef.current?.click()}
        >
          Choose {multiple ? "files" : "file"}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) validateAndEmit(files);
            e.target.value = "";
          }}
        />
        {hint && <p className="mt-3 text-xs text-ink-500">{hint}</p>}
      </div>
      {error && (
        <p
          role="alert"
          className="mt-2 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  );
}
