"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createStudyPlan(formData: FormData) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  const subject = formData.get("subject") as string;
  const topics = formData.get("topics") as string;
  const examDate = formData.get("examDate") as string;
  const studyPlan = formData.get("studyPlan") as string;

  if (!subject || !topics || !examDate || !studyPlan) {
    throw new Error("All fields are required.");
  }

  await prisma.studyPlan.create({
    data: {
      subject,
      topics,
      examDate: new Date(examDate),
      studyPlan,
      userId: user.sub,
    },
  });

  revalidatePath("/plans");
  redirect("/plans");
}

export async function getStudyPlans() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  return await prisma.studyPlan.findMany({
    where: {
      userId: user.sub,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function deleteStudyPlan(id: string) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth");
  }

  await prisma.studyPlan.delete({
    where: {
      id,
    },
  });

  revalidatePath("/plans");
}