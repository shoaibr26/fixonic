import { X, ArrowRight, Smartphone, Laptop, Monitor } from "lucide-react";
import Modal from "./Modal";

const RepairDetailModal = ({ repair, onClose }) => {
  const statusColors = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Accepted: "bg-navy-50 text-navy-700 border-navy-100",
    "In Process": "bg-navy-50 text-navy-700 border-navy-100 shadow-sm",
    Ready: "bg-lime-50 text-lime-700 border-lime-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };

  if (!repair) return null;

  return (
    <Modal
      isOpen={!!repair}
      onClose={onClose}
      size="max-w-2xl"
    >
      <div className="relative">
        <div className="absolute top-0 right-0 p-8 z-10">
          <button
            onClick={onClose}
            className="p-2 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-10 pb-0">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-navy-50 rounded-2xl mb-6">
            <span className="text-[10px] font-black text-navy-400 uppercase tracking-widest">
              Repair ID
            </span>
            <span className="text-sm font-black text-navy-900">
              #{repair.id}
            </span>
          </div>
          <h2 className="text-4xl font-black text-navy-900 mb-2">
            {repair.brand} {repair.model}
          </h2>
          <p className="text-gray-500 font-medium flex items-center gap-2">
            <ArrowRight className="w-4 h-4 text-lime-500" /> Submitted on{" "}
            {repair.date}
          </p>
        </div>

        <div className="p-10 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Device Info
              </div>
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-2xl border-2 ${repair.device === "Mobile" ? "bg-rose-50 text-rose-600 border-rose-100" :
                      repair.device === "Laptop" ? "bg-blue-50 text-blue-600 border-blue-100" :
                        "bg-indigo-50 text-indigo-600 border-indigo-100"
                    }`}
                >
                  {repair.device === "Mobile" ? (
                    <Smartphone className="w-6 h-6" />
                  ) : repair.device === "Laptop" ? (
                    <Laptop className="w-6 h-6" />
                  ) : (
                    <Monitor className="w-6 h-6" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="font-black text-lg text-navy-900 truncate">
                    {repair.brand}
                  </div>
                  <div className="font-medium text-gray-500 text-sm truncate">
                    {repair.model}
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Reported Issue
              </div>
              <div className="font-bold text-navy-900 text-lg leading-tight mb-2">
                {repair.issue}
              </div>
              <div
                className={`text-xs font-bold px-3 py-1 rounded-lg inline-block border ${statusColors[repair.status]}`}
              >
                {repair.status}
              </div>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                Service Price
              </div>
              <div className="text-2xl font-black text-navy-900 mb-1">
                {repair.price || 0} PKR
              </div>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Total Estimate
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Customer Details</div>
              <div className="font-bold text-navy-900">{repair.customerId?.name || repair.customer || 'N/A'}</div>
              <div className="text-xs text-gray-500 mt-1">{repair.address}</div>
            </div>
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Assigned Vendor</div>
              <div className="font-bold text-navy-900">{repair.vendorId?.name || 'Not Assigned Yet'}</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Repair Timeline
              </div>
            </div>
            <div className="bg-gray-50 rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center justify-between relative">
                {/* Simple timeline visual for demo */}
                {[
                  "Pending",
                  "Accepted",
                  "In Process",
                  "Ready",
                  "Completed",
                ].map((step, i) => {
                  const isCompleted =
                    [
                      "Pending",
                      "Accepted",
                      "In Process",
                      "Ready",
                      "Completed",
                    ].indexOf(repair.status) >= i;
                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center relative z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-4 transition-all ${isCompleted
                            ? "bg-lime-500 border-lime-500 text-navy-900"
                            : "bg-white border-gray-200 text-gray-300"
                          }`}
                      >
                        {i + 1}
                      </div>
                      <span
                        className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${isCompleted ? "text-navy-900" : "text-gray-300"}`}
                      >
                        {step}
                      </span>
                    </div>
                  );
                })}
                <div className="absolute top-4 left-0 w-full h-1 bg-gray-200 -z-0">
                  <div
                    className="h-full bg-lime-500 transition-all duration-500"
                    style={{
                      width: `${(["Pending", "Accepted", "In Process", "Ready", "Completed"].indexOf(repair.status) / 4) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-10 py-8 border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="text-gray-400 font-bold hover:text-navy-900 transition-colors text-sm uppercase tracking-widest"
          >
            Close Details
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RepairDetailModal;
