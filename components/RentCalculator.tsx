"use client";

import { useState, useMemo } from "react";
import NEIGHBOURHOODS from "@/lib/data";

const APT_LABELS = ["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms"];

function formatNaira(value: number): string {
  return "₦" + value.toLocaleString("en-NG");
}

function formatInputWithCommas(value: string): string {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("en-NG");
}

type AffordabilityStatus = "comfortable" | "stretched" | "tight" | "over budget";

function getStatus(
  maxMonthlyRent: number,
  rentRange: [number, number]
): AffordabilityStatus {
  const [min, max] = rentRange;
  const avg = (min + max) / 2;
  if (maxMonthlyRent >= max) return "comfortable";
  if (maxMonthlyRent >= avg) return "stretched";
  if (maxMonthlyRent >= min) return "tight";
  return "over budget";
}

const statusConfig: Record<
  AffordabilityStatus,
  { bg: string; text: string; label: string }
> = {
  comfortable: {
    bg: "bg-comfortable-bg",
    text: "text-comfortable-text",
    label: "Comfortable",
  },
  stretched: {
    bg: "bg-stretched-bg",
    text: "text-stretched-text",
    label: "Stretched",
  },
  tight: {
    bg: "bg-tight-bg",
    text: "text-tight-text",
    label: "Tight",
  },
  "over budget": {
    bg: "bg-over-budget-bg",
    text: "text-over-budget-text",
    label: "Over Budget",
  },
};

export default function RentCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [incomeDisplay, setIncomeDisplay] = useState<string>("");
  const [earners, setEarners] = useState<1 | 2>(1);
  const [ratioPercent, setRatioPercent] = useState<number>(30);
  const [aptTypeIndex, setAptTypeIndex] = useState<0 | 1 | 2 | 3>(1);

  const calculations = useMemo(() => {
    const totalIncome = monthlyIncome * earners;
    const maxMonthlyRent = Math.round((totalIncome * ratioPercent) / 100);
    const annualRent = maxMonthlyRent * 12;
    const agencyFee = Math.round(annualRent * 0.1);
    const legalFee = Math.round(annualRent * 0.1);
    const cautionFee = Math.round(annualRent * 0.1);
    const totalUpfront = annualRent + agencyFee + legalFee + cautionFee;

    return {
      totalIncome,
      maxMonthlyRent,
      annualRent,
      agencyFee,
      legalFee,
      cautionFee,
      totalUpfront,
    };
  }, [monthlyIncome, earners, ratioPercent]);

  const neighbourhoodStatuses = useMemo(() => {
    return NEIGHBOURHOODS.map((n) => ({
      ...n,
      status: getStatus(calculations.maxMonthlyRent, n.rents[aptTypeIndex]),
    }));
  }, [calculations.maxMonthlyRent, aptTypeIndex]);

  function handleIncomeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value.replace(/\D/g, "");
    const num = raw ? parseInt(raw, 10) : 0;
    setMonthlyIncome(num);
    setIncomeDisplay(formatInputWithCommas(e.target.value));
  }

  const hasIncome = monthlyIncome > 0;

  return (
    <div className="w-full">
      {/* Section 1: Inputs */}
      <div className="rounded-xl border border-border bg-surface p-5 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
          {/* Monthly Income */}
          <div>
            <label
              htmlFor="monthly-income"
              className="block text-sm font-medium mb-1.5 text-foreground-muted"
            >
              Monthly income (₦)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-foreground-muted">
                ₦
              </span>
              <input
                id="monthly-income"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 500,000"
                value={incomeDisplay}
                onChange={handleIncomeChange}
                className="w-full rounded-lg border border-border bg-background py-3 pl-8 pr-4 text-base font-medium text-foreground outline-none transition-all duration-200 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 placeholder:text-foreground-muted/50"
              />
            </div>
          </div>

          {/* Earners */}
          <div>
            <label
              htmlFor="earners"
              className="block text-sm font-medium mb-1.5 text-foreground-muted"
            >
              Number of earners
            </label>
            <select
              id="earners"
              value={earners}
              onChange={(e) => setEarners(Number(e.target.value) as 1 | 2)}
              className="w-full rounded-lg border border-border bg-background py-3 px-4 text-base font-medium text-foreground outline-none cursor-pointer transition-all duration-200 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238589a5' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              <option value={1}>1 person</option>
              <option value={2}>2 people</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Apartment Type */}
          <div>
            <label
              htmlFor="apt-type"
              className="block text-sm font-medium mb-1.5 text-foreground-muted"
            >
              Apartment type
            </label>
            <select
              id="apt-type"
              value={aptTypeIndex}
              onChange={(e) =>
                setAptTypeIndex(Number(e.target.value) as 0 | 1 | 2 | 3)
              }
              className="w-full rounded-lg border border-border bg-background py-3 px-4 text-base font-medium text-foreground outline-none cursor-pointer transition-all duration-200 focus:border-accent-purple focus:ring-1 focus:ring-accent-purple/30 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238589a5' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 12px center",
              }}
            >
              {APT_LABELS.map((label, i) => (
                <option key={i} value={i}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          {/* Ratio Slider */}
          <div>
            <label
              htmlFor="ratio-slider"
              className="block text-sm font-medium mb-1.5 text-foreground-muted"
            >
              Rent-to-income ratio:{" "}
              <span className="font-semibold gradient-text">
                {ratioPercent}%
              </span>
            </label>
            <div className="pt-2.5 pb-1">
              <input
                id="ratio-slider"
                type="range"
                min={20}
                max={45}
                step={1}
                value={ratioPercent}
                onChange={(e) => setRatioPercent(Number(e.target.value))}
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-foreground-muted">20%</span>
                <span className="text-xs text-foreground-muted">45%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results - only shown when income > 0 */}
      {hasIncome ? (
        <div className="animate-fade-in">
          {/* Section 2: Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div className="summary-card rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-medium mb-1 text-foreground-muted">
                Max monthly rent
              </p>
              <p className="text-2xl font-bold tracking-tight gradient-text">
                {formatNaira(calculations.maxMonthlyRent)}
              </p>
            </div>
            <div className="summary-card rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-medium mb-1 text-foreground-muted">
                Annual rent budget
              </p>
              <p className="text-2xl font-bold tracking-tight gradient-text">
                {formatNaira(calculations.annualRent)}
              </p>
            </div>
            <div className="summary-card glow-card rounded-xl border border-border bg-surface p-5">
              <p className="text-sm font-medium mb-1 text-foreground-muted">
                Total upfront cost
              </p>
              <p className="text-2xl font-bold tracking-tight gradient-text">
                {formatNaira(calculations.totalUpfront)}
              </p>
            </div>
          </div>

          {/* Section 3: Move-in Cost Breakdown */}
          <div className="mt-6 rounded-xl border border-border bg-surface p-5 sm:p-6">
            <h3 className="text-base font-semibold mb-4">
              Move-in cost breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground-muted">
                  Annual rent (1 year upfront)
                </span>
                <span className="text-sm font-medium">
                  {formatNaira(calculations.annualRent)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground-muted">
                  Agency fee (10%)
                </span>
                <span className="text-sm font-medium">
                  {formatNaira(calculations.agencyFee)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground-muted">
                  Legal fee (10%)
                </span>
                <span className="text-sm font-medium">
                  {formatNaira(calculations.legalFee)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-foreground-muted">
                  Caution / security deposit (10%)
                </span>
                <span className="text-sm font-medium">
                  {formatNaira(calculations.cautionFee)}
                </span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between items-center">
                <span className="text-sm font-bold">Total to move in</span>
                <span className="text-base font-bold gradient-text">
                  {formatNaira(calculations.totalUpfront)}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Neighbourhood Cards */}
          <div className="mt-6">
            <h3 className="text-base font-semibold mb-4">
              Lagos neighbourhoods for a{" "}
              {APT_LABELS[aptTypeIndex].toLowerCase()}
            </h3>
            <div className="space-y-3">
              {neighbourhoodStatuses.map((n) => {
                const config = statusConfig[n.status];
                const [min, max] = n.rents[aptTypeIndex];
                return (
                  <div
                    key={n.name}
                    className="neighbourhood-card rounded-xl border border-border bg-surface p-4 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">
                        {n.name}
                      </p>
                      <p className="text-xs mt-0.5 text-foreground-muted">
                        {n.area} · {formatNaira(min)} – {formatNaira(max)}/mo
                      </p>
                    </div>
                    <span
                      className={`shrink-0 inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold ${config.bg} ${config.text}`}
                    >
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-xs leading-relaxed text-foreground-muted">
            Rent data sourced from Nigeria Property Centre &amp; TheAfricanvestor.
            Lagos rents rose 12–18% year-on-year in 2026. The 30% rule is a
            guide — adjust based on your actual fixed expenses.
          </p>
        </div>
      ) : (
        /* Empty State */
        <div className="mt-12 mb-8 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4 bg-surface border border-border">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#emptyGrad)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="emptyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a371f7" />
                  <stop offset="100%" stopColor="#3ecfda" />
                </linearGradient>
              </defs>
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <p className="text-sm font-medium text-foreground-muted">
            Enter your monthly income above to see what you can afford.
          </p>
        </div>
      )}
    </div>
  );
}
