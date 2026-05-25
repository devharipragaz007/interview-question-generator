const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${import.meta.env.VITE_GEMINI_MODEL}:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`;

export async function fetchInterviewQuestions(jobTitle) {
  const prompt = `Generate exactly 3 thoughtful and specific interview questions for a ${jobTitle} role.
Each question should assess a different core competency relevant to that role.
Return ONLY a JSON array of 3 strings - no explanations, no extra text.
Example format: ["Question 1?", "Question 2?", "Question 3?"]`;

  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.7 },
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) {
    throw new Error("No response received from the API.");
  }

  const cleanText = rawText.replace(/```json|```/g, "").trim();
  const questions = JSON.parse(cleanText);

  if (!Array.isArray(questions) || questions.length === 0) {
    throw new Error("Unexpected response format from API.");
  }

  return questions;
}