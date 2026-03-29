import React from 'react';
import { AlertCircle, Trash2, X } from 'lucide-react';

export default function DeleteModal({ isOpen, onClose, onConfirm, title = "Delete Item", message = "Are you sure you want to delete this item? This action cannot be undone." }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-sm overflow-hidden transform transition-all">
        <div className="flex items-start justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded-full text-rose-600">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-lg font-semibold text-slate-800">{title}</h3>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-5">
          <p className="text-sm text-slate-600 leading-relaxed">{message}</p>
        </div>
        
        <div className="flex items-center justify-end gap-3 p-4 bg-slate-50 border-t border-slate-100">
          <button 
            onClick={onClose} 
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              onConfirm();
              onClose();
            }} 
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-rose-600 rounded-lg hover:bg-rose-700 transition-colors shadow-sm"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}
