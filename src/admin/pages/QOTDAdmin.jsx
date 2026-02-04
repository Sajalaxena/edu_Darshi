import { useState } from "react";
import SingleQuestionForm from "./SingleQuestionForm";
import BulkQuestionUpload from "./BulkQuestionUpload";
import QuestionsTable from "./QuestionsTable";

export default function AdminQOTD() {
  const [tab, setTab] = useState("single");
  const [editData, setEditData] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="container mx-auto px-6 py-10 max-w-5xl">
      <h2 className="text-2xl font-bold mb-6">
        Question of the Day – Admin
      </h2>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        <button
          onClick={() => setTab("single")}
          className={`px-4 py-2 rounded-lg ${
            tab === "single" ? "bg-indigo-600 text-white" : "bg-slate-100"
          }`}
        >
          Add / Edit Question
        </button>

        <button
          onClick={() => setTab("bulk")}
          className={`px-4 py-2 rounded-lg ${
            tab === "bulk" ? "bg-indigo-600 text-white" : "bg-slate-100"
          }`}
        >
          Bulk Upload
        </button>
      </div>

      {/* SINGLE QUESTION + TABLE */}
      {tab === "single" && (
        <>
          <SingleQuestionForm
            editData={editData}
            onSaved={() => {
              setEditData(null);
              setRefreshKey((k) => k + 1);
            }}
          />

          <div className="mt-10">
            <QuestionsTable
              key={refreshKey}
              onEdit={(q) => setEditData(q)}
            />
          </div>
        </>
      )}

      {tab === "bulk" && <BulkQuestionUpload />}
    </div>
  );
}
