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
  return (
    <div className="border p-4 rounded shadow bg-zinc-900">
      <h2 className="text-xl font-bold mb-2">
        {plan.subject}
      </h2>

      <p className="mb-2">
        <strong>Topics:</strong>
      </p>

      <p className="whitespace-pre-line mb-4">
        {plan.topics}
      </p>

      <p className="mb-2">
        <strong>Exam Date:</strong>{" "}
        {new Date(plan.examDate)
          .toISOString()
          .slice(0, 10)}
      </p>

      <hr className="my-4" />

      <h3 className="font-bold mb-2">
        Generated Study Plan
      </h3>

      <p className="whitespace-pre-line">
        {plan.studyPlan}
      </p>

      <button
        onClick={() => deleteStudyPlan(plan.id)}
        className="bg-red-500 text-white px-3 py-1 rounded mt-4"
      >
        Delete
      </button>
    </div>
  );
}