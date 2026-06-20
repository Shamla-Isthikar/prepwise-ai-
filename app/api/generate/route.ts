import { groq } from "@/lib/groq";

export async function POST(req: Request) {
  const { subject, topics, examDate } = await req.json();

  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content:
          "You are an expert study planner. Create a clear day-by-day study schedule for a student preparing for an exam"+
            "Break the topics into manageable tasks , include revision sessions "+
            "the student should finish the schedule by the following exam date. The schedule should be detailed and include specific tasks for each day." ,
      },
      {
        role: "user",
        content: `
                Subject: ${subject}
                Topics:${topics}
                Exam Date:${examDate} 
                
                create a study plan based on the above information. The study plan should be detailed and include specific tasks for each day leading up to the exam date.`
      },
    ],
  });

  return Response.json({
        studyPlan: completion.choices[0].message.content,  });
}