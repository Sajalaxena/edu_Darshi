import React, { useState } from "react";
import { UploadCloud, FileSpreadsheet, CheckCircle, X } from "lucide-react";
import toast from "react-hot-toast";

export default function BulkUploadModal({ isOpen, onClose, endpoint, title, instructions, onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  if (!isOpen) return null;

  async function upload() {
    if (!file) return toast.error("Please select a file first");

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(errJson.message || "Upload failed");
      }

      toast.success(`${title} uploaded successfully`);
      setFile(null);
      if (onUploadSuccess) onUploadSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to upload");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <FileSpreadsheet size={20} className="text-green-600" /> {title}
          </h3>
          <button onClick={onClose} disabled={uploading} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors disabled:opacity-50">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-6">
            <h4 className="text-sm font-semibold text-blue-900 mb-1">Instructions</h4>
            <p className="text-sm text-blue-800 leading-relaxed whitespace-pre-wrap">{instructions}</p>
          </div>

          <div className="flex flex-col gap-4 items-start w-full">
            <div className="w-full relative group cursor-pointer">
              <input
                type="file"
                accept=".xlsx,.csv"
                onChange={(e) => setFile(e.target.files[0])}
                disabled={uploading}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
              />
              <div className={`w-full py-12 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center transition-colors group-hover:bg-slate-50 ${file ? "border-green-300 bg-green-50" : "border-slate-300 bg-slate-50/50"}`}>
                {file ? (
                  <>
                    <CheckCircle size={32} className="text-green-500 mb-3" />
                    <span className="font-semibold text-slate-800">{file.name}</span>
                    <span className="text-xs text-slate-500 mt-1">{(file.size / 1024).toFixed(2)} KB</span>
                    <button 
                      className="text-sm text-green-600 mt-3 font-medium underline hover:text-green-700 relative z-20 cursor-pointer" 
                      onClick={(e) => { e.preventDefault(); setFile(null); }}
                      disabled={uploading}
                    >
                      Remove File
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                      <UploadCloud size={24} className="text-indigo-500" />
                    </div>
                    <span className="font-semibold text-slate-700">Click to browse or drag file here</span>
                    <span className="text-sm text-slate-500 mt-1">Supports XLSX, CSV files</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-5 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={onClose} 
            disabled={uploading}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={upload}
            disabled={!file || uploading}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadCloud size={16} /> {uploading ? "Uploading..." : "Upload File"}
          </button>
        </div>
      </div>
    </div>
  );
}
