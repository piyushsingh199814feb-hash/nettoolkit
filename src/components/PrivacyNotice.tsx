import { Icon } from "./Icon";

export function PrivacyNotice({
  message = "Your files are processed in your browser and are not uploaded to our servers.",
}: {
  message?: string;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
      <Icon
        name="shield"
        size={18}
        className="mt-0.5 shrink-0 text-emerald-600"
      />
      <p className="leading-relaxed">
        <strong className="font-semibold">Privacy-friendly:</strong> {message}
      </p>
    </div>
  );
}
