import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function Home() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return (
    <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-10">
      <nav className="mb-8 flex items-center justify-between gap-4">
        <Link href="/" className="text-lg font-bold tracking-tight text-slate-950">
          PrepWise AI
        </Link>
        <LogoutButton />
      </nav>

      <section className="grid flex-1 items-center gap-8 lg:grid-cols-[1.12fr_0.88fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <p className="w-fit rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-sm font-medium text-teal-800 shadow-sm">
              AI study planning workspace
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
                Welcome back, {user.name}
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                Turn scattered topics into a clear plan, keep every saved schedule in one place, and move into exam prep with a calmer dashboard.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/create-plan"
              className="inline-flex items-center justify-center rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800"
            >
              Create study plan
            </Link>

            <Link
              href="/plans"
              className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50"
            >
              View saved plans
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-white/70 bg-white/85 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur">
          <div className="rounded-md bg-slate-950 p-5 text-white">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm font-medium text-teal-200">Today&apos;s focus</p>
              <span className="rounded-full bg-teal-400/15 px-3 py-1 text-xs font-semibold text-teal-100">
                Ready
              </span>
            </div>
            <div className="space-y-4">
              {["Map your syllabus", "Generate a balanced routine", "Save and revisit plans"].map((item, index) => (
                <div key={item} className="flex gap-4 rounded-md border border-white/10 bg-white/5 p-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-amber-300 text-sm font-bold text-slate-950">
                    {index + 1}
                  </span>
                  <div>
                    <h2 className="font-semibold">{item}</h2>
                    <p className="mt-1 text-sm leading-6 text-slate-300">
                      Keep the next step visible and your study time easier to trust.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
