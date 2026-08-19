"use client";

import * as React from "react";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { formatNumber, formatBitsAuto } from "@/lib/format";

type Period = "second" | "minute" | "hour" | "day";
type ResultUnit = "Mbps" | "Kbps" | "Gbps";

const PERIOD_LABEL: Record<Period, string> = {
  second: "per second",
  minute: "per minute",
  hour: "per hour",
  day: "per day",
};

const PERIOD_TO_SECONDS: Record<Period, number> = {
  second: 1,
  minute: 60,
  hour: 3600,
  day: 86400,
};

const RESULT_UNITS: { value: ResultUnit; label: string }[] = [
  { value: "Kbps", label: "Kbps" },
  { value: "Mbps", label: "Mbps" },
  { value: "Gbps", label: "Gbps" },
];

export function BandwidthCalculator() {
  const [users, setUsers] = React.useState("50");
  const [perUser, setPerUser] = React.useState("5"); // MB
  const [perUserUnit, setPerUserUnit] = React.useState<"MB" | "KB">("MB");
  const [period, setPeriod] = React.useState<Period>("hour");
  const [resultUnit, setResultUnit] = React.useState<ResultUnit>("Mbps");
  const [touched, setTouched] = React.useState(false);

  const n = Number(users);
  const p = Number(perUser);

  const usersErr =
    touched && (!Number.isFinite(n) || n <= 0) ? "Enter a positive integer." : "";
  const perErr =
    touched && (!Number.isFinite(p) || p <= 0) ? "Enter a positive number." : "";

  // Total bytes per period
  const perUserBytes = perUserUnit === "MB" ? p * 1000 ** 2 : p * 1000;
  const totalBytes = n * perUserBytes;
  const totalBits = totalBytes * 8;
  const secondsInPeriod = PERIOD_TO_SECONDS[period];

  // Required bandwidth in bits per second
  const bps = totalBits / secondsInPeriod;

  // Convert to result unit
  const result =
    resultUnit === "Gbps"
      ? bps / 1000 ** 3
      : resultUnit === "Mbps"
        ? bps / 1000 ** 2
        : bps / 1000;

  const valid = !usersErr && !perErr;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setTouched(true);
      }}
      noValidate
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Number of concurrent users"
          type="number"
          min="1"
          step="1"
          inputMode="numeric"
          value={users}
          onChange={(e) => setUsers(e.target.value)}
          errorText={usersErr}
          helpText="How many users are active at the same time."
        />
        <div>
          <label className="label mb-1.5">Data usage per user</label>
          <div className="grid grid-cols-[1fr_92px] gap-2">
            <Input
              inputMode="decimal"
              type="number"
              min="0"
              step="any"
              value={perUser}
              onChange={(e) => setPerUser(e.target.value)}
              aria-label="Data per user value"
              errorText={perErr}
            />
            <Select
              aria-label="Data per user unit"
              value={perUserUnit}
              onChange={(e) => setPerUserUnit(e.target.value as "MB" | "KB")}
              options={[
                { value: "MB", label: "MB" },
                { value: "KB", label: "KB" },
              ]}
            />
          </div>
          <p className="help">Average data each user consumes in the period.</p>
        </div>
        <Select
          label="Usage period"
          value={period}
          onChange={(e) => setPeriod(e.target.value as Period)}
          options={[
            { value: "second", label: "per second" },
            { value: "minute", label: "per minute" },
            { value: "hour", label: "per hour" },
            { value: "day", label: "per day" },
          ]}
          helpText="The time window in which the data is consumed."
        />
        <Select
          label="Show result in"
          value={resultUnit}
          onChange={(e) => setResultUnit(e.target.value as ResultUnit)}
          options={RESULT_UNITS}
        />
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button type="submit">Calculate bandwidth</Button>
        <button
          type="button"
          onClick={() => {
            setUsers("");
            setPerUser("");
            setTouched(false);
          }}
          className="text-sm font-medium text-ink-600 hover:text-ink-900"
        >
          Reset
        </button>
      </div>

      {valid && Number.isFinite(bps) && (
        <div className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">
            Required bandwidth
          </p>
          <p className="mt-1 text-3xl font-semibold text-brand-900 sm:text-4xl">
            {formatNumber(result, 3)} {resultUnit}
          </p>
          <p className="mt-1 text-sm text-brand-900/80">
            ({formatBitsAuto(bps, 3)})
          </p>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-ink-500">Users</dt>
              <dd className="font-medium text-ink-900">{formatNumber(n, 0)}</dd>
            </div>
            <div>
              <dt className="text-ink-500">Data per user</dt>
              <dd className="font-medium text-ink-900">
                {formatNumber(p, 2)} {perUserUnit} {PERIOD_LABEL[period]}
              </dd>
            </div>
            <div>
              <dt className="text-ink-500">Total data</dt>
              <dd className="font-medium text-ink-900">
                {formatBitsAuto(totalBits, 2)} {PERIOD_LABEL[period]}
              </dd>
            </div>
          </dl>
        </div>
      )}

      {touched && (usersErr || perErr) && (
        <div className="mt-4">
          <Alert variant="danger" title="Please check your inputs">
            {usersErr || perErr}
          </Alert>
        </div>
      )}
    </form>
  );
}
