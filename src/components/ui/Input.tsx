import * as React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helpText?: string;
  errorText?: string;
  trailingAddon?: React.ReactNode;
  leadingAddon?: React.ReactNode;
  inputClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  function Input(
    {
      label,
      helpText,
      errorText,
      trailingAddon,
      leadingAddon,
      className = "",
      inputClassName = "",
      id,
      ...rest
    },
    ref,
  ) {
    const reactId = React.useId();
    const fieldId = id ?? `in-${reactId}`;
    const helpId = helpText ? `${fieldId}-h` : undefined;
    const errId = errorText ? `${fieldId}-e` : undefined;
    return (
      <div className={className}>
        {label && (
          <label htmlFor={fieldId} className="label mb-1.5">
            {label}
          </label>
        )}
        <div
          className={[
            "flex h-11 items-stretch overflow-hidden rounded-lg border bg-white transition-colors",
            errorText
              ? "border-red-400 focus-within:border-red-500"
              : "border-ink-300 focus-within:border-brand-500",
          ].join(" ")}
        >
          {leadingAddon && (
            <span className="flex items-center bg-ink-50 px-3 text-sm text-ink-600">
              {leadingAddon}
            </span>
          )}
          <input
            ref={ref}
            id={fieldId}
            aria-invalid={Boolean(errorText) || undefined}
            aria-describedby={[helpId, errId].filter(Boolean).join(" ") || undefined}
            className={[
              "min-w-0 flex-1 bg-transparent px-3 text-base text-ink-900 placeholder-ink-400 outline-none",
              "sm:text-sm",
              inputClassName,
            ].join(" ")}
            {...rest}
          />
          {trailingAddon && (
            <span className="flex items-center bg-ink-50 px-3 text-sm text-ink-600">
              {trailingAddon}
            </span>
          )}
        </div>
        {helpText && (
          <p id={helpId} className="help">
            {helpText}
          </p>
        )}
        {errorText && (
          <p
            id={errId}
            className="mt-1 text-xs font-medium text-red-600"
            role="alert"
          >
            {errorText}
          </p>
        )}
      </div>
    );
  },
);
