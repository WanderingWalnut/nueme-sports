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
  onRegister: (sessionId: string) => void;
  isRegistering: string | null;
};

export default function SessionsTable({
  sessions,
  onRegister,
  isRegistering,
}: SessionsTableProps) {
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
            <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase tracking-wider">
              Action
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
              <td className="px-6 py-4 whitespace-nowrap text-black">
                <button
                  onClick={() => onRegister(session.id)}
                  disabled={isRegistering === session.id}
                  className={`px-4 py-2 rounded-md ${
                    isRegistering === session.id
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  } text-white transition-colors duration-200`}
                >
                  {isRegistering === session.id ? "Registering..." : "Register"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
