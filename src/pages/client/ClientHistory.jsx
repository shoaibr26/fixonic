import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Smartphone,
  Laptop,
  Search,
  Filter,
  ArrowLeft,
  ArrowUpRight,
  X,
} from "lucide-react";
import { useData } from "../../context/DataContext";
import RepairDetailModal from "../../components/RepairDetailModal";

const ClientHistory = () => {
  const navigate = useNavigate();
  const { repairs } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selectedRepair, setSelectedRepair] = useState(null);

  // Show all repairs (dummy data)
  const allRequests = repairs || [];

  const filteredRequests = allRequests.filter((req) => {
    const searchTermLower = searchTerm.toLowerCase();
    const device = req.device?.toLowerCase() || "";
    const brand = req.brand?.toLowerCase() || "";
    const model = req.model?.toLowerCase() || "";
    const id = req.id?.toLowerCase() || "";

    const matchesSearch =
      device.includes(searchTermLower) ||
      brand.includes(searchTermLower) ||
      model.includes(searchTermLower) ||
      id.includes(searchTermLower);

    const matchesFilter = filterStatus === "All" || req.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const statusColors = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Accepted: "bg-navy-50 text-navy-700 border-navy-100",
    "In Process": "bg-navy-50 text-navy-700 border-navy-100 shadow-sm",
    Ready: "bg-lime-50 text-lime-700 border-lime-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-navy-900 transition-colors mb-4 font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </button>
          <h2 className="text-3xl font-black text-navy-900 tracking-tight">
            Repair History
          </h2>
          <p className="text-gray-500 font-medium">
            View detailed logs of all your service requests.
          </p>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by ID, Device, Model..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl font-bold text-navy-900 placeholder:text-gray-400 focus:ring-2 focus:ring-lime-500 transition-all outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {["All", "Completed", "In Process", "Pending", "Rejected"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-wider whitespace-nowrap transition-all ${
                  filterStatus === status
                    ? "bg-navy-900 text-white"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                }`}
              >
                {status}
              </button>
            ),
          )}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-6 rounded-[2rem] border border-gray-100 hover:border-lime-500/30 hover:shadow-xl hover:shadow-gray-200/50 transition-all group"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${
                    req.device === "Mobile"
                      ? "bg-navy-50 text-navy-900"
                      : "bg-lime-50 text-lime-600"
                  }`}
                >
                  {req.device === "Mobile" ? (
                    <Smartphone className="w-8 h-8" />
                  ) : (
                    <Laptop className="w-8 h-8" />
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-black text-navy-900 truncate">
                      {req.brand} {req.model}
                    </h3>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${statusColors[req.status]}`}
                    >
                      {req.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                    <span>
                      ID: <span className="text-navy-900">#{req.id}</span>
                    </span>
                    <span>•</span>
                    <span>{req.date}</span>
                    <span>•</span>
                    <span className="truncate">{req.issue}</span>
                  </div>
                </div>

                {/* Action */}
                <button
                  onClick={() => setSelectedRepair(req)}
                  className="w-full md:w-auto px-6 py-3 rounded-xl bg-gray-50 text-navy-900 font-bold text-sm hover:bg-navy-900 hover:text-white transition-all flex items-center justify-center gap-2 group-hover:translate-x-1"
                >
                  View Details <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
              <Filter className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-navy-900 mb-2">
              No Repairs Found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>

      {/* Repair Detail Modal */}
      <RepairDetailModal
        repair={selectedRepair}
        onClose={() => setSelectedRepair(null)}
      />
    </div>
  );
};

export default ClientHistory;
