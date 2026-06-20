import PlanCard from "./PlanCard";

type StudyPlan = {
  id: string;
  subject: string;
  topics: string;
  examDate: Date;
  studyPlan: string;
};

export default function PlanList({ plans }: { plans: StudyPlan[] }) {
  return (
    <div className="space-y-4">
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}