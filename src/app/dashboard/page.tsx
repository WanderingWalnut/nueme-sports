"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import Head from "next/head";
import { useRouter } from "next/navigation";
import SessionsTable, { Session } from "@/components/SessionTable";
import { useState } from "react";
import Header from "@/components/header"

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const router = useRouter();

  // Dummy data for initial display
  const [sessions, setSessions] = useState<Session[]>([
    {
      id: "1",
      location: "Genesis Centre",
      time: new Date(),
      participantsCount: 5,
      registrationStatus: "Open",
    },
    {
      id: "2",
      location: "Downtown Park",
      time: new Date(Date.now() + 3600 * 1000),
      participantsCount: 3,
      registrationStatus: "Full",
    },
  ]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto flex min-h-screen py-2 flex-col">
        <Header/>
        <div className="w-full mb-8 flex justify-end">
          <button
            className="rounded-md bg-blue-600 px-10 py-3 text-white shadow-sm hover:bg-blue-700"
          >
            Create New Session
          </button>
        </div>
        <div className="w-full">
          <h1 className="mb-7 text-xl font-bold text-black">Upcoming Sessions</h1>
          <SessionsTable sessions={sessions} />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
