"use client";

import { createStudyPlan } from "@/app/actions";
import { useState } from "react";

export default function StudyForm() {
  const [subject, setSubject] = useState("");
  const [topics, setTopics] = useState("");
  const [examDate, setExamDate] = useState("");
  const [studyPlan, setStudyPlan] = useState("");

  async function generateStudyPlan() {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
    "Content-Type": "application/json",
  },
      body: JSON.stringify({ subject ,topics , examDate }),
    });

    const data = await res.json();
    setStudyPlan(data.studyPlan);
  }

  return (
    <form action={createStudyPlan} className="space-y-4 mb-6">
      <input
      required
        name="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject title"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      <textarea 
      required
        name="topics"
        value={topics}
        onChange={(e) => setTopics(e.target.value)}
        placeholder="Topics to cover"
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      

      <input
      required
        type="date"
        name="examDate"
        value={examDate}
        onChange={(e) => setExamDate(e.target.value)}
        className="border p-3 w-full rounded text-white bg-zinc-900"
      />

      

      {/* Buttons with spacing */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={generateStudyPlan}
          className="bg-purple-600 text-white px-4 py-2 rounded"
        >
          Generate Study Plan with AI
        </button>

        <input
            type="hidden"
            name="studyPlan"
            value={studyPlan}
        />

        <button 
        type="submit"
        disabled={!studyPlan}
        className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Study Plan 
        </button>
      </div>

      {studyPlan && (
        <div className="border p-4 rounded bg-zinc-900 mt-4">
          <h2 className="font-bold mb-2">
            AI Suggested study plan for "{subject}"
          </h2>
          <p className="whitespace-pre-line">
            {studyPlan}
          </p>
        </div>
      )}
    </form>
  );
}