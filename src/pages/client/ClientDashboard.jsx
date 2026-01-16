import { Link } from "react-router-dom";
import { useState } from "react";
import { BRANDS } from "../../data/mockData";
import {
  Laptop,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Upload,
  X,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContextHooks";
import { useData } from "../../context/DataContext";

const ClientDashboard = () => {
  const { user } = useAuth();
  const { repairs, addRepair, deleteRepair } = useData();
  const [step, setStep] = useState(1);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [repairToDelete, setRepairToDelete] = useState(null);
  const requests = (repairs || []).filter((r) =>
    ["Pending", "In Process"].includes(r.status),
  );
  const [bookingData, setBookingData] = useState({
    device: "",
    brand: "",
    model: "",
    issue: "",
    address: "",
    image: null,
  });

  const handleBooking = (e) => {
    e.preventDefault();
    const newReq = {
      id: `REP-${Math.floor(Math.random() * 900) + 100}`,
      customer: user?.name,
      device: bookingData.device,
      brand: bookingData.brand,
      model: bookingData.model,
      issue: bookingData.issue,
      address: bookingData.address,
      status: "Pending",
      date: new Date().toISOString().split("T")[0],
      vendor: null,
      history: ["Pending"],
    };
    addRepair(newReq);
    setStep(1);
    setBookingData({
      device: "",
      brand: "",
      model: "",
      issue: "",
      address: "",
      image: null,
    });
  };

  const statusColors = {
    Pending: "bg-amber-50 text-amber-700 border-amber-100",
    Accepted: "bg-navy-50 text-navy-700 border-navy-100",
    "In Process": "bg-navy-50 text-navy-700 border-navy-100 shadow-sm",
    Ready: "bg-lime-50 text-lime-700 border-lime-100",
    Completed: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Rejected: "bg-red-50 text-red-700 border-red-100",
  };

  const getProgress = (status) => {
    const stages = ["Pending", "Accepted", "In Process", "Ready", "Completed"];
    const index = stages.indexOf(status);
    if (status === "Rejected") return 0;
    return ((index + 1) / stages.length) * 100;
  };

  return (
    <div className="pb-20">
      {/* Booking Wizard */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-navy-100 overflow-hidden border border-gray-100 relative">
        <div className="bg-navy-900 px-10 py-12 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <img
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80"
              alt="Repair Background"
              className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-overlay"
            />
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-lime-500/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-[80px]"></div>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
              Book Your Repair
            </h2>
            <p className="text-lg text-gray-400 font-medium">
              Fast, reliable service at your doorstep. Let's get your device
              running like new.
            </p>
          </div>
        </div>

        {/* Floating Steps */}
        <div className="relative -mt-8 px-8 mb-12">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 max-w-3xl mx-auto border border-gray-100 flex items-center justify-between relative z-20">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className="flex-1 flex flex-col items-center relative"
              >
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg transition-all duration-500 relative z-10 ${
                    step >= s
                      ? "bg-lime-500 text-navy-900 shadow-lg shadow-lime-500/30 scale-110"
                      : "bg-gray-50 text-gray-300"
                  }`}
                >
                  {s}
                </div>
                <span
                  className={`text-[10px] font-black uppercase tracking-widest mt-3 transition-colors duration-300 ${
                    step >= s ? "text-navy-900" : "text-gray-300"
                  }`}
                >
                  {s === 1 ? "Device" : s === 2 ? "Details" : "Confirm"}
                </span>

                {/* Progress Bar Line */}
                {s < 3 && (
                  <div className="absolute top-7 left-1/2 w-full h-1 bg-gray-100 -z-0">
                    <div
                      className={`h-full bg-lime-500 transition-all duration-500 ${step > s ? "w-full" : "w-0"}`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 pb-12 max-w-3xl mx-auto">
          <form onSubmit={handleBooking} className="animate-fade-in">
            {step === 1 && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="text-lime-500 font-extrabold text-xs uppercase tracking-widest">
                    Step 1
                  </span>
                  <h3 className="text-2xl font-black text-navy-900">
                    What needs fixing?
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  {["Mobile", "Laptop"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setBookingData({ ...bookingData, device: type });
                        setStep(2);
                      }}
                      className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-300 overflow-hidden text-left ${
                        bookingData.device === type
                          ? "border-lime-500 bg-navy-900 shadow-2xl shadow-lime-500/10"
                          : "border-transparent bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-xl hover:shadow-gray-200/50"
                      }`}
                    >
                      <div
                        className={`absolute top-0 right-0 p-8 opacity-10 transition-transform duration-500 group-hover:scale-110 ${bookingData.device === type ? "text-lime-500" : "text-navy-900"}`}
                      >
                        {type === "Mobile" ? (
                          <Smartphone className="w-40 h-40" />
                        ) : (
                          <Laptop className="w-40 h-40" />
                        )}
                      </div>

                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all ${
                          bookingData.device === type
                            ? "bg-lime-500 text-navy-900"
                            : "bg-white text-navy-900 shadow-md group-hover:scale-110"
                        }`}
                      >
                        {type === "Mobile" ? (
                          <Smartphone className="w-8 h-8" />
                        ) : (
                          <Laptop className="w-8 h-8" />
                        )}
                      </div>

                      <span
                        className={`block font-black text-2xl mb-1 ${
                          bookingData.device === type
                            ? "text-white"
                            : "text-navy-900"
                        }`}
                      >
                        {type}
                      </span>
                      <p
                        className={`text-sm font-medium ${
                          bookingData.device === type
                            ? "text-gray-400"
                            : "text-gray-500"
                        }`}
                      >
                        {type === "Mobile"
                          ? "Screen, Battery, etc."
                          : "Keyboard, Screen, etc."}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="text-lime-500 font-extrabold text-xs uppercase tracking-widest">
                    Step 2
                  </span>
                  <h3 className="text-2xl font-black text-navy-900">
                    Device Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Brand
                    </label>
                    <div className="relative">
                      <select
                        className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-lime-500 focus:shadow-xl focus:shadow-lime-500/10 transition-all font-bold text-navy-900 appearance-none cursor-pointer"
                        value={bookingData.brand}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            brand: e.target.value,
                          })
                        }
                        required
                      >
                        <option value="">Select Brand</option>
                        {BRANDS[bookingData.device].map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                        <ArrowRight className="w-4 h-4 rotate-90" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Model
                    </label>
                    <input
                      type="text"
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-lime-500 focus:shadow-xl focus:shadow-lime-500/10 transition-all font-bold text-navy-900 placeholder:text-gray-400"
                      placeholder="e.g. iPhone 14 Pro"
                      value={bookingData.model}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          model: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 py-4 bg-black text-white font-black rounded-2xl shadow-xl hover:bg-gray-900 hover:-translate-y-1 transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
                    disabled={!bookingData.brand || !bookingData.model}
                  >
                    Next Step <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="text-center">
                  <span className="text-lime-500 font-extrabold text-xs uppercase tracking-widest">
                    Step 3
                  </span>
                  <h3 className="text-2xl font-black text-navy-900">
                    Problem & Contact
                  </h3>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Describe Issue
                    </label>
                    <textarea
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-lime-500 focus:shadow-xl focus:shadow-lime-500/10 transition-all font-bold text-navy-900 placeholder:text-gray-400 h-32 resize-none"
                      placeholder="Screen cracked, Battery draining fast..."
                      value={bookingData.issue}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          issue: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Pickup Address
                    </label>
                    <textarea
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl outline-none focus:bg-white focus:border-lime-500 focus:shadow-xl focus:shadow-lime-500/10 transition-all font-bold text-navy-900 placeholder:text-gray-400 h-24 resize-none"
                      placeholder="Complete address for pickup..."
                      value={bookingData.address}
                      onChange={(e) =>
                        setBookingData({
                          ...bookingData,
                          address: e.target.value,
                        })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                      Photo (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center bg-gray-50 group cursor-pointer hover:border-lime-500 hover:bg-lime-50/10 transition-all duration-300">
                      <div className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5 text-navy-900" />
                      </div>
                      <p className="text-gray-400 font-medium text-sm">
                        Click to upload photo of damage
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all uppercase tracking-widest text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-black text-white font-black rounded-2xl shadow-xl hover:bg-gray-900 hover:-translate-y-1 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                  >
                    Confirm Booking <CheckCircle className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Tracking Section */}
      <div className="space-y-8 mt-12">
        <div className="flex items-end justify-between px-4">
          <div>
            <h2 className="text-3xl font-black text-navy-900">
              Active Repairs
            </h2>
            <p className="text-gray-500 font-medium">
              Track the live status of your devices
            </p>
          </div>
          <Link
            to="/client/history"
            className="text-navy-900 font-bold flex items-center text-sm hover:text-lime-600 transition-colors uppercase tracking-wide bg-white px-5 py-2.5 rounded-xl shadow-sm border border-gray-100 mb-1"
          >
            History <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-white p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-gray-200 transition-all group relative overflow-hidden"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-50 to-gray-100 rounded-bl-[100px] -mr-8 -mt-8 transition-transform group-hover:scale-150`}
              ></div>

              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex items-start gap-6 md:w-[280px] lg:w-[320px] shrink-0">
                  <div
                    className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg shrink-0 ${
                      req.device === "Mobile"
                        ? "bg-navy-900 text-lime-400"
                        : "bg-lime-500 text-navy-900"
                    }`}
                  >
                    {req.device === "Mobile" ? (
                      <Smartphone className="w-10 h-10" />
                    ) : (
                      <Laptop className="w-10 h-10" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-black text-xl text-navy-900 truncate">
                        {req.brand} {req.model}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-gray-100 text-gray-500 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shrink-0">
                        #{req.id}
                      </span>
                      <p className="text-gray-500 font-medium text-sm truncate">
                        {req.issue}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border flex items-center gap-2 ${statusColors[req.status]}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                        {req.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 bg-gray-50 p-6 rounded-2xl border border-gray-100 w-full">
                  <div className="flex justify-between text-[10px] text-gray-400 mb-3 font-black uppercase tracking-widest">
                    <span>Progress</span>
                    <span>{Math.round(getProgress(req.status))}%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-1000 relative ${req.status === "Rejected" ? "bg-red-500" : "bg-lime-500"}`}
                      style={{ width: `${getProgress(req.status)}%` }}
                    >
                      <div className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-[1px]"></div>
                    </div>
                  </div>
                  {req.vendor && (
                    <div className="mt-4 flex items-center gap-2 pt-4 border-t border-gray-200">
                      <div className="w-6 h-6 rounded-full bg-navy-900 text-white flex items-center justify-center text-[10px] font-bold">
                        T
                      </div>
                      <div className="text-xs text-navy-900 font-bold">
                        Tech: {req.vendor}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-row md:flex-col gap-3">
                  <button
                    onClick={() => setRepairToDelete(req)}
                    className="flex-1 md:flex-none p-4 bg-white border border-gray-100 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                  >
                    <X className="w-5 h-5 mx-auto" />
                  </button>
                  <button
                    onClick={() => setSelectedRepair(req)}
                    className="flex-[3] md:flex-none py-4 px-6 bg-navy-900 text-white font-bold rounded-xl hover:bg-navy-800 transition-all shadow-xl shadow-navy-900/10 text-xs uppercase tracking-wider"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Repair Detail Modal */}
      {selectedRepair && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-slide-up relative">
            <div className="absolute top-0 right-0 p-8">
              <button
                onClick={() => setSelectedRepair(null)}
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
                  #{selectedRepair.id}
                </span>
              </div>
              <h2 className="text-4xl font-black text-navy-900 mb-2">
                {selectedRepair.brand} {selectedRepair.model}
              </h2>
              <p className="text-gray-500 font-medium flex items-center gap-2">
                <ArrowRight className="w-4 h-4 text-lime-500" /> Submitted on{" "}
                {selectedRepair.date}
              </p>
            </div>

            <div className="p-10 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Device Info
                  </div>
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-4 rounded-2xl ${selectedRepair.device === "Mobile" ? "bg-navy-900 text-white" : "bg-lime-500 text-navy-900"}`}
                    >
                      {selectedRepair.device === "Mobile" ? (
                        <Smartphone className="w-6 h-6" />
                      ) : (
                        <Laptop className="w-6 h-6" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-black text-lg text-navy-900 truncate">
                        {selectedRepair.brand}
                      </div>
                      <div className="font-medium text-gray-500 text-sm truncate">
                        {selectedRepair.model}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100">
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                    Reported Issue
                  </div>
                  <div className="font-bold text-navy-900 text-lg leading-tight mb-2">
                    {selectedRepair.issue}
                  </div>
                  <div
                    className={`text-xs font-bold px-3 py-1 rounded-lg inline-block border ${statusColors[selectedRepair.status]}`}
                  >
                    {selectedRepair.status}
                  </div>
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
                        ].indexOf(selectedRepair.status) >= i;
                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center relative z-10"
                        >
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black border-4 transition-all ${
                              isCompleted
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
                          width: `${(["Pending", "Accepted", "In Process", "Ready", "Completed"].indexOf(selectedRepair.status) / 4) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-10 py-8 border-t border-gray-100 text-center">
              <button
                onClick={() => setSelectedRepair(null)}
                className="text-gray-400 font-bold hover:text-navy-900 transition-colors text-sm uppercase tracking-widest"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {repairToDelete && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-navy-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full max-w-sm rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6">
              <X className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-navy-900 mb-2">
              Delete Repair?
            </h3>
            <p className="text-gray-500 font-medium mb-8">
              Are you sure you want to delete this repair request? This action
              cannot be undone.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setRepairToDelete(null)}
                className="flex-1 py-4 bg-gray-50 text-navy-900 font-bold rounded-xl hover:bg-gray-100 transition-all uppercase tracking-widest text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteRepair(repairToDelete.id);
                  setRepairToDelete(null);
                }}
                className="flex-1 py-4 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all shadow-lg shadow-red-500/30 uppercase tracking-widest text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;
