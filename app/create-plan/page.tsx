import StudyForm from "@/components/StudyForm";
import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function CreatePlanPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <main className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 lg:px-10">
      <nav className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
          PrepWise AI
        </Link>
        <Link
          href="/plans"
          className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
        >
          Saved plans
        </Link>
      </nav>

      <section className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
          Create
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Build a study plan around your exam date.
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Add the subject, list the topics you need to cover, then let PrepWise draft a plan you can review and save.
        </p>
      </section>

      <StudyForm />
    </main>
  );
}
