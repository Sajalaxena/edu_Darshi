// SingleQuestionForm.jsx
import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function SingleQuestionForm() {
  const [form, setForm] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    explanation: "",
    scheduledDate: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    await fetch(`${API}/question/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: form.question,
        options: [
          form.option1,
          form.option2,
          form.option3,
          form.option4,
        ].filter(Boolean),
        correctAnswer: form.correctAnswer,
        explanation: form.explanation,
        scheduledDate: form.scheduledDate,
      }),
    });

    alert("Question added");
  }

  return (
    <div className="bg-white p-6 rounded-xl border space-y-4">
      <textarea
        name="question"
        placeholder="Question"
        className="input"
        onChange={handleChange}
      />

      {["option1", "option2", "option3", "option4"].map((o) => (
        <input
          key={o}
          name={o}
          placeholder={o}
          className="input"
          onChange={handleChange}
        />
      ))}

      <input
        name="correctAnswer"
        placeholder="Correct Answer"
        className="input"
        onChange={handleChange}
      />

      <textarea
        name="explanation"
        placeholder="Explanation"
        className="input"
        onChange={handleChange}
      />

      <input
        type="date"
        name="scheduledDate"
        className="input"
        onChange={handleChange}
      />

      <button onClick={submit} className="btn-primary">
        Save Question
      </button>
    </div>
  );
}
