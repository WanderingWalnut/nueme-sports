// src/components/SessionsTable.tsx
"use client";
import React from "react";

export type Session = {
  id: string;
  location: string;
  time: Date;
  participantsCount: number;
  registrationStatus: string;
};

type SessionsTableProps = {
  sessions: Session[];
};

export default function SessionsTable({ sessions }: SessionsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Participants
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Registration Status
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sessions.map((session) => (
            <tr key={session.id}>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {session.time.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {session.location}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {session.participantsCount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-black">
                {session.registrationStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
