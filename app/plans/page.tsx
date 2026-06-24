import { getStudyPlans } from "@/app/actions";
import PlanList from "@/components/PlanList";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PlansPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const plans = await getStudyPlans();

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
          PrepWise AI
        </Link>
        <Link
          href="/create-plan"
          className="rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
        >
          New plan
        </Link>
      </nav>

      <section className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
            Library
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            My study plans
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Review saved schedules, scan upcoming exam dates, and remove plans you no longer need.
          </p>
        </div>
        <div className="rounded-lg border border-white/70 bg-white/85 px-5 py-4 shadow-sm">
          <p className="text-sm text-slate-500">Saved plans</p>
          <p className="mt-1 text-3xl font-bold text-slate-950">{plans.length}</p>
        </div>
      </section>

      <PlanList plans={plans} />
    </main>
  );
}
