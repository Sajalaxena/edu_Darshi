import { useState } from "react";
import SingleQuestionForm from "./SingleQuestionForm";
import BulkQuestionUpload from "./BulkQuestionUpload";
import QuestionsTable from "./QuestionsTable";
export default function AdminQOTD() {
  const [tab, setTab] = useState("single");

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      <h2 className="text-2xl font-bold mb-6">Question of the Day – Admin</h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTab("single")}
          className={`px-4 py-2 rounded-lg ${
            tab === "single" ? "bg-indigo-600 text-white" : "bg-slate-100"
          }`}
        >
          Add Single Question
        </button>

        <button
          onClick={() => setTab("bulk")}
          className={`px-4 py-2 rounded-lg ${
            tab === "bulk" ? "bg-indigo-600 text-white" : "bg-slate-100"
          }`}
        >
          Bulk Upload (Excel / CSV)
        </button>
        <button
          onClick={() => setTab("Questions List")}
          className={`px-4 py-2 rounded-lg ${
            tab === "Questions List"
              ? "bg-indigo-600 text-white"
              : "bg-slate-100"
          }`}
        >
          Questions List{" "}
        </button>
      </div>

      {tab === "single" && <SingleQuestionForm />}
      {tab === "bulk" && <BulkQuestionUpload />}
      {tab === "Questions List" && <QuestionsTable />}
    </div>
  );
}
