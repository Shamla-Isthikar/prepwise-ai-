"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const fd = new FormData(e.currentTarget);
    const body: Record<string, string> = {
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    };
    if (mode === "signup") body.name = fd.get("name") as string;

    const res = await fetch(`/api/auth?action=${mode}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      const data = await res.json().catch(() => ({
        error: "Something went wrong. Please try again.",
      }));
      setError(data.error ?? "Something went wrong");
    }
  }

  return (
    <main className="grid min-h-screen w-full place-items-center px-5 py-10">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-white/70 bg-white shadow-2xl shadow-slate-200/80 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight">PrepWise AI</p>
            <h1 className="mt-12 text-4xl font-bold tracking-tight">
              Study plans that feel less chaotic.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Generate focused schedules, save them for later, and keep your exam prep organized from the first session.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {["Plan", "Focus", "Save"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/5 px-3 py-4">
                <p className="text-sm font-semibold text-teal-100">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-700">
              {mode === "login" ? "Welcome back" : "Start planning"}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              {mode === "login" ? "Sign in to PrepWise AI" : "Create your account"}
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {mode === "login"
                ? "Open your study dashboard and continue building better prep routines."
                : "Create a workspace for AI-generated study plans and saved schedules."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === "signup" && (
              <label className="space-y-2">
                <span className="text-sm font-medium text-slate-700">Name</span>
                <input
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
                />
              </label>
            )}
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                name="password"
                type="password"
                placeholder="At least 8 characters"
                required
                minLength={8}
                className="w-full rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
              />
            </label>

            {error && (
              <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-md bg-teal-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Please wait..." : mode === "login" ? "Sign in" : "Sign up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            {mode === "login" ? (
              <>
                No account?{" "}
                <button
                  onClick={() => { setMode("signup"); setError(""); }}
                  className="font-semibold text-teal-700 underline-offset-4 hover:underline"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className="font-semibold text-teal-700 underline-offset-4 hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </section>
    </main>
  );
}
