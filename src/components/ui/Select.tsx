import * as React from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: { value: string; label: string }[];
  helpText?: string;
  errorText?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    { label, options, helpText, errorText, className = "", id, ...rest },
    ref,
  ) {
    const reactId = React.useId();
    const fieldId = id ?? `sel-${reactId}`;
    return (
      <div className={className}>
        {label && (
          <label htmlFor={fieldId} className="label mb-1.5">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={fieldId}
          aria-invalid={Boolean(errorText) || undefined}
          className={[
            "h-11 w-full appearance-none rounded-lg border bg-white px-3 pr-9 text-sm text-ink-900 outline-none transition-colors",
            "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23475569%22 stroke-width=%221.75%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')] bg-[length:18px_18px] bg-[right_10px_center] bg-no-repeat",
            errorText
              ? "border-red-400 focus:border-red-500"
              : "border-ink-300 focus:border-brand-500",
          ].join(" ")}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {helpText && <p className="help">{helpText}</p>}
        {errorText && (
          <p className="mt-1 text-xs font-medium text-red-600" role="alert">
            {errorText}
          </p>
        )}
      </div>
    );
  },
);
