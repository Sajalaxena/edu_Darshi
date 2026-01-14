// BulkQuestionUpload.jsx
import { useState } from "react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function BulkQuestionUpload() {
  const [file, setFile] = useState(null);

  async function upload() {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    await fetch(`${API}/question/admin/upload`, {
      method: "POST",
      body: formData,
    });

    alert("Questions uploaded successfully");
  }

  return (
    <div className="bg-white p-6 rounded-xl border">
      <p className="text-sm text-slate-600 mb-3">
        Upload Excel or CSV file (non-technical friendly)
      </p>

      <input
        type="file"
        accept=".xlsx,.csv"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={upload} className="btn-primary mt-4">
        Upload File
      </button>
    </div>
  );
}
