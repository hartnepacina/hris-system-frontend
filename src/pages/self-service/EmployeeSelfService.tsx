import { useState } from "react";
import {
  User,
  FileText,
  Calendar,
  Bell,
  Clock,
  Download,
  Eye,
  Plus,
  X,
} from "lucide-react";

type Tab = "profile" | "payslips" | "leave" | "attendance" | "requests";

const EmployeeSelfService = () => {
  const [activeTab, setActiveTab] = useState<Tab>("profile");
  const [showApplyModal, setShowApplyModal] = useState(false);

  const tabs = [
    { id: "profile" as Tab, label: "My Profile", icon: User },
    { id: "payslips" as Tab, label: "My Payslips", icon: FileText },
    { id: "leave" as Tab, label: "My Leave", icon: Calendar },
    { id: "attendance" as Tab, label: "My Attendance", icon: Clock },
    { id: "requests" as Tab, label: "My Requests", icon: Bell },
  ];

  const profile = {
    name: "Juan Dela Cruz",
    id: "EMP-001",
    position: "Admin Officer",
    department: "Administration",
    email: "juan.delacruz@simplevia.com",
    phone: "+63 912 345 6789",
    hireDate: "January 15, 2024",
    status: "Active",
  };

  const payslips = [
    { period: "Feb 1-15, 2026", netPay: "₱28,500", date: "Feb 15, 2026" },
    { period: "Jan 16-31, 2026", netPay: "₱28,500", date: "Jan 31, 2026" },
    { period: "Jan 1-15, 2026", netPay: "₱27,800", date: "Jan 15, 2026" },
  ];

  const myLeave = {
    vacation: { total: 15, used: 5, remaining: 10 },
    sick: { total: 15, used: 3, remaining: 12 },
    emergency: { total: 5, used: 1, remaining: 4 },
  };

  const myAttendance = [
    {
      date: "2026-02-25",
      timeIn: "07:55 AM",
      timeOut: "05:01 PM",
      status: "Present",
      hours: "8.1",
    },
    {
      date: "2026-02-24",
      timeIn: "08:10 AM",
      timeOut: "05:30 PM",
      status: "Late",
      hours: "8.3",
    },
    {
      date: "2026-02-23",
      timeIn: "07:45 AM",
      timeOut: "06:00 PM",
      status: "Present",
      hours: "9.25",
    },
  ];

  const myRequests = [
    {
      type: "Leave Request",
      date: "2026-02-20",
      details: "Vacation Leave - 3 days",
      status: "Pending",
    },
    {
      type: "Overtime Request",
      date: "2026-02-18",
      details: "2 hours - Project deadline",
      status: "Approved",
    },
    {
      type: "Certificate Request",
      date: "2026-02-15",
      details: "Certificate of Employment",
      status: "Completed",
    },
  ];

  const statusBadge: Record<string, string> = {
    Present: "badge-success",
    Late: "badge-warning",
    Absent: "badge-danger",
    Pending: "badge-warning",
    Approved: "badge-success",
    Completed: "badge-info",
    Active: "badge-success",
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1>Employee Self-Service</h1>
        <p>View your personal information, payslips, and submit requests</p>
      </div>

      {/* Banner */}

      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg,#059669,#10b981,#34d399)",
        }}
      >
        <div className="p-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl font-bold border-2 border-white/30">
            JD
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">{profile.name}</h2>

            <p className="text-emerald-100 text-sm">
              {profile.position} • {profile.department}
            </p>

            <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
              {profile.status}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}

      <div className="pro-card">
        <div className="px-6 pt-4">
          <div className="pro-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pro-tab flex items-center gap-2 ${activeTab === tab.id ? "active" : ""}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* PROFILE */}

          {activeTab === "profile" && (
            <div className="grid md:grid-cols-2 gap-5">
              {Object.entries(profile).map(([k, v]) => (
                <div
                  key={k}
                  className="p-4 bg-gray-50 rounded-xl border border-gray-100"
                >
                  <p className="text-xs text-gray-400 uppercase">{k}</p>

                  <p className="text-sm font-semibold">{v}</p>
                </div>
              ))}
            </div>
          )}

          {/* PAYSLIPS */}

          {activeTab === "payslips" && (
            <div className="space-y-3">
              {payslips.map((p) => (
                <div
                  key={p.period}
                  className="pro-card border border-gray-100 flex justify-between"
                >
                  <div>
                    <p className="font-bold">{p.period}</p>

                    <p className="text-xs text-gray-400">{p.date}</p>
                  </div>

                  <div className="flex gap-3">
                    <p className="font-bold text-emerald-600">{p.netPay}</p>

                    <button className="btn-ghost btn-icon text-blue-500">
                      <Eye className="w-4 h-4" />
                    </button>

                    <button className="btn-ghost btn-icon">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LEAVE */}

          {activeTab === "leave" && (
            <div className="space-y-5">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowApplyModal(true)}
                  className="btn btn-primary"
                >
                  <Plus className="w-4 h-4" />
                  Apply for Leave
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    label: "Vacation Leave",
                    ...myLeave.vacation,
                    gradient: "linear-gradient(135deg,#059669,#10b981)",
                  },
                  {
                    label: "Sick Leave",
                    ...myLeave.sick,
                    gradient: "linear-gradient(135deg,#d97706,#f59e0b)",
                  },
                  {
                    label: "Emergency Leave",
                    ...myLeave.emergency,
                    gradient: "linear-gradient(135deg,#dc2626,#ef4444)",
                  },
                ].map((l) => (
                  <div
                    key={l.label}
                    className="rounded-xl p-5 border border-gray-100 bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                        style={{ background: l.gradient }}
                      >
                        <Calendar className="w-4 h-4" />
                      </div>

                      <p className="text-xs text-gray-500 font-semibold">
                        {l.label}
                      </p>
                    </div>

                    <div className="flex items-end gap-2 mb-2">
                      <p className="text-2xl font-bold text-gray-800">
                        {l.remaining}
                      </p>

                      <p className="text-xs text-gray-400 mb-1">
                        / {l.total} remaining
                      </p>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${(l.remaining / l.total) * 100}%`,
                          background: l.gradient,
                        }}
                      />
                    </div>

                    <p className="text-[10px] text-gray-400 mt-1.5">
                      {l.used} used
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE */}

          {activeTab === "attendance" && (
            <table className="pro-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time In</th>
                  <th>Time Out</th>
                  <th>Status</th>
                  <th>Hours</th>
                </tr>
              </thead>

              <tbody>
                {myAttendance.map((r, i) => (
                  <tr key={i}>
                    <td>{r.date}</td>
                    <td>{r.timeIn}</td>
                    <td>{r.timeOut}</td>

                    <td>
                      <span className={`badge ${statusBadge[r.status]}`}>
                        {r.status}
                      </span>
                    </td>

                    <td>{r.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* REQUESTS */}

          {activeTab === "requests" && (
            <div className="space-y-3">
              {myRequests.map((r, i) => (
                <div
                  key={i}
                  className="pro-card border border-gray-100 flex justify-between"
                >
                  <div>
                    <p className="font-bold">{r.type}</p>

                    <p className="text-xs text-gray-400">
                      {r.date} • {r.details}
                    </p>
                  </div>

                  <span className={`badge ${statusBadge[r.status]}`}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* MODAL */}

      {showApplyModal && (
        <div className="pro-modal-overlay">
          <div className="pro-modal max-w-md">
            <div className="pro-modal-header">
              <h3>Apply for Leave</h3>

              <button
                onClick={() => setShowApplyModal(false)}
                className="btn-ghost btn-icon"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="pro-modal-body space-y-4">
              <div>
                <label className="pro-label">Leave Type</label>

                <select className="pro-select">
                  <option>Vacation Leave</option>
                  <option>Sick Leave</option>
                  <option>Emergency Leave</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="pro-label">Start Date</label>

                  <input type="date" className="pro-input" />
                </div>

                <div>
                  <label className="pro-label">End Date</label>

                  <input type="date" className="pro-input" />
                </div>
              </div>

              <div>
                <label className="pro-label">Reason</label>

                <textarea rows={3} className="pro-input" />
              </div>
            </div>

            <div className="pro-modal-footer">
              <button
                onClick={() => setShowApplyModal(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowApplyModal(false)}
                className="btn btn-primary"
              >
                Submit Application
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeSelfService;
