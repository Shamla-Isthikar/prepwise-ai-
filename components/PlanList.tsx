import Link from "next/link";
import PlanCard from "./PlanCard";

type StudyPlan = {
  id: string;
  subject: string;
  topics: string;
  examDate: Date;
  studyPlan: string;
};

export default function PlanList({ plans }: { plans: StudyPlan[] }) {
  if (plans.length === 0) {
    return (
      <section className="rounded-lg border border-dashed border-slate-300 bg-white/80 px-6 py-14 text-center shadow-sm">
        <p className="text-xl font-bold text-slate-950">No saved plans yet</p>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-600">
          Create your first AI study plan and it will show up here for review.
        </p>
        <Link
          href="/create-plan"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
        >
          Create study plan
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-5">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
