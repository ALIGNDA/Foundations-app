'use client';

import React, { useState } from 'react';

const MOCK_ASSESSMENTS = [
  {
    id: '101',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    email: 'sarah.j@example.com',
    whatsapp: '+1 555-0192',
    calculatedScore: 85,
    internalFlag: 'clear_to_match',
    conflictStyle: 'resolve_immediately',
    datingMotive: 'build_future',
    denomination: 'Non-denominational',
    familyGoals: 'Looking for a Christ-centered marriage and starting a family in the next 2-3 years.',
    submittedAt: '2026-08-05'
  }
];

export default function AdminPage() {
  const [assessments, setAssessments] = useState(MOCK_ASSESSMENTS);
  const [filter, setFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const filteredData = assessments.filter((item) => {
    if (filter === 'all') return true;
    return item.internalFlag === filter;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E2D24] p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EBE5DF] pb-6">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#1E2D24]">Readiness Review Panel</h1>
            <p className="text-sm text-[#1E2D24]/70">Triage applicants, review readiness indicators, and schedule check-ins.</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-[#EBE5DF] overflow-hidden shadow-sm p-4">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EBE5DF] bg-[#FDFBF7] text-[11px] uppercase text-[#1E2D24]/60">
                <th className="p-4 font-semibold">Applicant</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold">Internal Flag</th>
                <th className="p-4 font-semibold">Submitted</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE5DF] text-sm">
              {filteredData.map((item) => (
                <tr key={item.id}>
                  <td className="p-4">{item.firstName} {item.lastName} ({item.email})</td>
                  <td className="p-4 font-mono">{item.calculatedScore}/100</td>
                  <td className="p-4 capitalize">{item.internalFlag.replace('_', ' ')}</td>
                  <td className="p-4 text-xs">{item.submittedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
