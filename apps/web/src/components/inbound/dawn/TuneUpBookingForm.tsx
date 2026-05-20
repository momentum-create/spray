"use client";

import { useState } from "react";
import { dawnCopy, tuneUpCourses } from "@/content/inbound/dawn-copy.en";
import { formatJpy } from "@/content/inbound/products.en";

export function TuneUpBookingForm() {
  const [courseId, setCourseId] = useState(tuneUpCourses[0].id);
  const [dropOff, setDropOff] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <p className="rounded-sm border border-[#108043] bg-[#f4faf6] px-4 py-6 text-sm text-[#108043]">
        {dawnCopy.tuneUp.success}
      </p>
    );
  }

  return (
    <form
      className="space-y-8"
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
    >
      <fieldset>
        <legend className="mb-4 text-sm font-medium text-black">Select service</legend>
        <div className="space-y-3">
          {tuneUpCourses.map((course) => (
            <label
              key={course.id}
              className={`flex cursor-pointer gap-4 border p-4 transition ${
                courseId === course.id
                  ? "border-black bg-[#fafafa]"
                  : "border-[#e8e8e8] hover:border-black/30"
              }`}
            >
              <input
                type="radio"
                name="course"
                value={course.id}
                checked={courseId === course.id}
                onChange={() => setCourseId(course.id)}
                className="mt-1"
              />
              <span className="flex-1">
                <span className="block text-sm font-medium text-black">
                  {course.name} — {formatJpy(course.priceJpy)}
                </span>
                <span className="mt-1 block text-xs text-black/60">{course.description}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black">
            {dawnCopy.tuneUp.dropOff}
          </span>
          <input
            type="date"
            required
            value={dropOff}
            onChange={(e) => setDropOff(e.target.value)}
            className="dawn-input w-full"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-black">
            {dawnCopy.tuneUp.pickUp}
          </span>
          <input
            type="date"
            required
            value={pickUp}
            onChange={(e) => setPickUp(e.target.value)}
            className="dawn-input w-full"
          />
        </label>
      </div>

      <p className="text-sm leading-relaxed text-black/60">{dawnCopy.tuneUp.note}</p>

      <button type="submit" className="dawn-btn-primary w-full sm:w-auto sm:min-w-[240px]">
        {dawnCopy.tuneUp.submit}
      </button>
    </form>
  );
}
