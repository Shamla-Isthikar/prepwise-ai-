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
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome, {user.name}
      </h1>

      <p className="text-zinc-400 mb-8">
        Generate AI-powered study plans and save them for later.
      </p>

      <div className="flex gap-4">
        <Link
          href="/create-plan"
          className="bg-blue-600 px-4 py-2 rounded"
        >
          Create Study Plan
        </Link>

        <Link
          href="/plans"
          className="bg-green-600 px-4 py-2 rounded"
        >
          View Plans
        </Link>
      </div>
      <div className="mt-8">
        <LogoutButton />
      </div>
    </main>
  );
}