"use client";

import { createStudyPlan } from "@/app/actions";
import { useState } from "react";

export default function StudyForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyPlan, setStudyPlan] = useState("");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  async function generateStudyPlan() {
    setError("");
    setGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject, topics, examDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Could not generate a study plan.");
        return;
      }

      setStudyPlan(data.studyPlan);
    } finally {
      setGenerating(false);
    }
  }

  return (
    <form action={createStudyPlan} className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-lg border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-200/70 backdrop-blur sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-950">Plan details</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Give the AI enough context to organize your prep time sensibly.
          </p>
        </div>

        <div className="space-y-5">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Subject</span>
            <input
              required
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Biology, Calculus, History..."
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Topics to cover</span>
            <textarea
              required
              name="topics"
              value={topics}
              onChange={(e) => setTopics(e.target.value)}
              placeholder="List chapters, weak areas, practice papers, or key concepts."
              rows={8}
              className="w-full resize-y rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-700">Exam date</span>
            <input
              required
              type="date"
              name="examDate"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
            />
          </label>
        </div>

        {error && (
          <p className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </p>
        )}

        <input type="hidden" name="studyPlan" value={studyPlan} />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={generateStudyPlan}
            disabled={generating || !subject || !topics || !examDate}
            className="inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {generating ? "Generating..." : "Generate with AI"}
          </button>

          <button
            type="submit"
            disabled={!studyPlan}
            className="inline-flex items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Save study plan
          </button>
        </div>
      </section>

      <section className="rounded-lg border border-white/70 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-300/70 sm:p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-200">
              Preview
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight">
              {studyPlan ? `AI plan for ${subject}` : "Your generated plan will appear here"}
            </h2>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-teal-100">
            Draft
          </span>
        </div>

        {studyPlan ? (
          <div className="max-h-[38rem] overflow-auto rounded-md border border-white/10 bg-white/[0.06] p-5">
            <p className="whitespace-pre-line text-sm leading-7 text-slate-100">
              {studyPlan}
            </p>
          </div>
        ) : (
          <div className="grid min-h-80 place-items-center rounded-md border border-dashed border-white/20 bg-white/[0.04] p-6 text-center">
            <div>
              <p className="text-lg font-semibold">No plan generated yet</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-slate-300">
                Fill in the details, generate a draft, then save it once it looks useful.
              </p>
            </div>
          </div>
        )}
      </section>
    </form>
  );
}
