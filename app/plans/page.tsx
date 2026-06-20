import { getStudyPlans } from "@/app/actions";
import PlanList from "@/components/PlanList";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";


export default async function PlansPage() {
  

  const user = await getCurrentUser();

if (!user) {
  redirect("/auth");
}

const plans = await getStudyPlans();

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        My Study Plans
      </h1>

      <PlanList plans={plans} />
    </main>
  );
}