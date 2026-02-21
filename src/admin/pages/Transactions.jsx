import React, { useState } from "react";
import { ArrowUpRight, ArrowDownRight, CreditCard, User, Calendar, Search } from "lucide-react";

const tx = [
  {
    id: "T-1001",
    user: "Amit",
    plan: "Premium",
    amount: 499,
    date: "2025-10-01 14:23",
    status: "success",
  },
  {
    id: "T-1002",
    user: "Sneha",
    plan: "Elite",
    amount: 999,
    date: "2025-10-02 10:11",
    status: "success",
  },
  {
    id: "T-1003",
    user: "Rahul",
    plan: "Standard",
    amount: 199,
    date: "2025-10-03 09:45",
    status: "failed",
  },
];

export default function Transactions() {
  const [search, setSearch] = useState("");

  const filteredTx = tx.filter((t) =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.user.toLowerCase().includes(search.toLowerCase()) ||
    t.plan.toLowerCase().includes(search.toLowerCase()) ||
    t.status.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Transaction Details</h2>
          <p className="text-slate-500 text-sm mt-1">Review recent payments and subscriptions</p>
        </div>
      </div>

      <div className="admin-table-card">
        <div className="flex justify-end pt-4 px-6 mb-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="admin-input pl-9 w-64 text-sm py-1.5"
            />
          </div>
        </div>
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>User Details</th>
                <th>Subscription Plan</th>
                <th>Amount</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTx.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.status === "success" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                        }`}>
                        {t.status === "success" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-800">{t.id}</div>
                        <div className={`text-xs mt-0.5 capitalize ${t.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                          {t.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <User size={16} className="text-slate-400" />
                      {t.user}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-indigo-500" />
                      <span className="font-medium text-slate-700">{t.plan}</span>
                    </div>
                  </td>
                  <td>
                    <div className="font-bold text-slate-800 tracking-tight">
                      ₹{t.amount}
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Calendar size={14} className="text-slate-400" />
                      {t.date}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
