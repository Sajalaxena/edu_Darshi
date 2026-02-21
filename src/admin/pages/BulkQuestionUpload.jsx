import { useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle } from "lucide-react";

const API = import.meta.env.VITE_API_BASE_URL;

export default function BulkQuestionUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function upload() {
    if (!file) return alert("Select file");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      await fetch(`${API}/question/admin/upload`, {
        method: "POST",
        body: formData,
      });

      alert("Questions uploaded successfully");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Failed to upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="admin-card max-w-2xl">
      <h3 className="text-base font-semibold text-slate-800 mb-6 flex items-center gap-2">
        <FileSpreadsheet size={18} className="text-green-600" /> Bulk Questions Upload
      </h3>

      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
        <h4 className="text-sm font-semibold text-blue-900 mb-1 flex items-center gap-2">
          Instructions
        </h4>
        <p className="text-sm text-blue-800 leading-relaxed">
          Upload an Excel (.xlsx) or CSV file. The file should contain columns for Question, Option A, Option B, Option C, Option D, Correct Answer, Explanation, Date, and Optional Video link.
        </p>
      </div>

      <div className="flex flex-col gap-4 items-start">
        <div className="w-full relative group cursor-pointer">
          <input
            type="file"
            accept=".xlsx,.csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`w-full py-12 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-colors group-hover:bg-slate-50 ${file ? "border-green-300 bg-green-50" : "border-slate-300 bg-slate-50/50"}`}>
            {file ? (
              <>
                <CheckCircle size={32} className="text-green-500 mb-3" />
                <span className="font-semibold text-slate-800">{file.name}</span>
                <span className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(2)} KB</span>
                <span className="text-sm text-green-600 mt-3 font-medium cursor-pointer underline hover:text-green-700 relative z-20" onClick={(e) => { e.preventDefault(); setFile(null); }}>
                  Remove File
                </span>
              </>
            ) : (
              <>
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  <UploadCloud size={24} className="text-indigo-500" />
                </div>
                <span className="font-semibold text-slate-700">Click to browse or drag file here</span>
                <span className="text-sm text-slate-500 mt-1">Supports XLSX, CSV up to 10MB</span>
              </>
            )}
          </div>
        </div>

        <div className="w-full flex justify-end mt-2 pt-4 border-t border-slate-100">
          <button
            onClick={upload}
            disabled={!file || uploading}
            className="admin-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadCloud size={18} /> {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}
