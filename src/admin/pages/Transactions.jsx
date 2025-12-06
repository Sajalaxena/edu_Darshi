import React from "react";

const tx = [
  {
    id: "T-1001",
    user: "Amit",
    plan: "Premium",
    amount: 499,
    date: "2025-10-01 14:23",
  },
  {
    id: "T-1002",
    user: "Sneha",
    plan: "Elite",
    amount: 999,
    date: "2025-10-02 10:11",
  },
];

export default function Transactions() {
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Transaction Details</h2>
      <div className="card p-4 overflow-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-sm text-slate-500">
              <th>Txn ID</th>
              <th>User</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tx.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="py-3">{t.id}</td>
                <td className="py-3">{t.user}</td>
                <td className="py-3">{t.plan}</td>
                <td className="py-3">₹{t.amount}</td>
                <td className="py-3">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
