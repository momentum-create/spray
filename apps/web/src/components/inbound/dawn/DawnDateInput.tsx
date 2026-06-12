"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { dawnCopy } from "@/content/inbound/dawn-copy.en";

type DateParts = { y: string; m: string; d: string };

type Props = {
  value: string;
  onChange: (iso: string) => void;
  min?: string;
  className?: string;
  disabled?: boolean;
};

const MONTHS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
] as const;

function parseIso(iso: string): DateParts {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return { y: "", m: "", d: "" };
  const [y, m, d] = iso.split("-");
  return { y, m, d };
}

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function clampToMin(iso: string, min?: string): string {
  if (!min || iso >= min) return iso;
  return min;
}

function toIso(parts: DateParts): string | null {
  if (!parts.y || !parts.m || !parts.d) return null;
  return `${parts.y}-${parts.m}-${parts.d}`;
}

export function DawnDateInput({ value, onChange, min, className, disabled }: Props) {
  const baseId = useId();
  const [parts, setParts] = useState<DateParts>(() => parseIso(value));

  useEffect(() => {
    setParts(parseIso(value));
  }, [value]);

  const minParts = min ? parseIso(min) : null;

  const years = useMemo(() => {
    const startYear = minParts?.y ? Number(minParts.y) : new Date().getFullYear();
    const endYear = startYear + 2;
    const list: string[] = [];
    for (let year = startYear; year <= endYear; year++) list.push(String(year));
    return list;
  }, [min]);

  const months = useMemo(() => {
    if (!minParts?.y || !parts.y || parts.y !== minParts.y) return MONTHS;
    const minMonth = Number(minParts.m);
    return MONTHS.filter((month) => Number(month.value) >= minMonth);
  }, [minParts, parts.y]);

  const days = useMemo(() => {
    const year = parts.y ? Number(parts.y) : minParts?.y ? Number(minParts.y) : new Date().getFullYear();
    const month = parts.m ? Number(parts.m) : 1;
    const maxDay = parts.m ? daysInMonth(year, month) : 31;
    let startDay = 1;
    if (
      minParts?.y &&
      minParts?.m &&
      minParts?.d &&
      parts.y === minParts.y &&
      parts.m === minParts.m
    ) {
      startDay = Number(minParts.d);
    }
    return Array.from({ length: maxDay - startDay + 1 }, (_, i) =>
      String(startDay + i).padStart(2, "0"),
    );
  }, [minParts, parts.m, parts.y]);

  const update = (next: DateParts) => {
    if (next.d && next.m && next.y) {
      const max = daysInMonth(Number(next.y), Number(next.m));
      if (Number(next.d) > max) next = { ...next, d: String(max).padStart(2, "0") };
    }
    setParts(next);
    const iso = toIso(next);
    if (iso) onChange(clampToMin(iso, min));
    else onChange("");
  };

  const selectClass = "dawn-input w-full";

  return (
    <div className={className} lang="en">
      <div className="grid grid-cols-3 gap-2" data-testid="dawn-date-input">
        <div>
          <label htmlFor={`${baseId}-month`} className="mb-1 block text-[10px] text-black/50">
            {dawnCopy.dateField.month}
          </label>
          <select
            id={`${baseId}-month`}
            className={selectClass}
            value={parts.m}
            disabled={disabled}
            onChange={(e) => update({ ...parts, m: e.target.value })}
          >
            <option value="">{dawnCopy.dateField.month}</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${baseId}-day`} className="mb-1 block text-[10px] text-black/50">
            {dawnCopy.dateField.day}
          </label>
          <select
            id={`${baseId}-day`}
            className={selectClass}
            value={parts.d}
            disabled={disabled}
            onChange={(e) => update({ ...parts, d: e.target.value })}
          >
            <option value="">{dawnCopy.dateField.day}</option>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`${baseId}-year`} className="mb-1 block text-[10px] text-black/50">
            {dawnCopy.dateField.year}
          </label>
          <select
            id={`${baseId}-year`}
            className={selectClass}
            value={parts.y}
            disabled={disabled}
            onChange={(e) => update({ ...parts, y: e.target.value })}
          >
            <option value="">{dawnCopy.dateField.year}</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
