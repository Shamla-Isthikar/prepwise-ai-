import StudyForm from "@/components/StudyForm";
import { getCurrentUser } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function CreatePlanPage() {

    const user = await getCurrentUser();

if (!user) {
  redirect("/auth");
}
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Create Study Plan
      </h1>

      <StudyForm />
    </main>
  );
}