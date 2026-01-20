import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onCancel} size="max-w-sm">
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-black text-navy-900 mb-2">{title}</h3>
        <p className="text-gray-500 text-sm font-medium leading-relaxed mb-8">
          {message}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onCancel}
            className="py-4 px-6 bg-gray-50 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-colors uppercase tracking-widest text-xs"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="py-4 px-6 bg-red-500 text-white font-black rounded-2xl shadow-xl shadow-red-500/20 hover:bg-red-600 transition-all uppercase tracking-widest text-xs"
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDialog;
