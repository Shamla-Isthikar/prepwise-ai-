"use client";

import { deleteStudyPlan } from "@/app/actions";

type StudyPlan = {
  id: string;
  subject: string;
  topics: string;
  examDate: Date;
  studyPlan: string;
};

export default function PlanCard({
  plan,
}: {
  plan: StudyPlan;
}) {
  const examDate = new Date(plan.examDate).toLocaleDateString("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <article className="overflow-hidden rounded-lg border border-white/70 bg-white/90 shadow-xl shadow-slate-200/60 backdrop-blur">
      <div className="flex flex-col gap-5 border-b border-slate-100 p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Study plan
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
            {plan.subject}
          </h2>
        </div>
        <div className="rounded-md bg-amber-50 px-4 py-3 text-left sm:text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-amber-700">
            Exam date
          </p>
          <p className="mt-1 font-semibold text-slate-950">{examDate}</p>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
        <section className="border-b border-slate-100 p-5 lg:border-b-0 lg:border-r sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Topics
          </h3>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
            {plan.topics}
          </p>
        </section>

        <section className="p-5 sm:p-6">
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Generated plan
          </h3>
          <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-700">
            {plan.studyPlan}
          </p>
        </section>
      </div>

      <div className="flex justify-end border-t border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
        <button
          onClick={() => deleteStudyPlan(plan.id)}
          className="rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-700 shadow-sm transition hover:border-red-300 hover:bg-red-50"
        >
          Delete
        </button>
      </div>
    </article>
  );
}
