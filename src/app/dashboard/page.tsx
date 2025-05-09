"use client";
import ProtectedRoute from "@/components/ProtectedRoute";
import SessionsTable, { Session } from "@/components/SessionTable";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import SessionForm from "@/components/SessionForm";
import { getSessions, isUserAdmin, registerForSession } from "@/lib/firestore";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRegistering, setIsRegistering] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const loadSessions = async () => {
      try {
        const sessions = await getSessions();
        setSessions(sessions);
      } catch (err) {
        console.error("Loading sessions failed", err);
      }
    };

    const checkAdminStatus = async () => {
      if (user?.uid) {
        const adminStatus = await isUserAdmin(user.uid);
        setIsAdmin(adminStatus);
      }
    };

    loadSessions();
    checkAdminStatus();
  }, [user?.uid]);

  const handleCreateSession = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleRegisterForSession = async (sessionId: string) => {
    if (!user?.uid) return;

    try {
      setIsRegistering(sessionId);
      await registerForSession(sessionId, user.uid);
      const updatedSessions = await getSessions();
      setSessions(updatedSessions);
      alert("Successfully registered for session!");
    } catch (error) {
      console.error("Failed to register for session:", error);
      alert("Failed to register for session. Please try again.");
    } finally {
      setIsRegistering(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto flex min-h-screen py-2 flex-col">
        <Header />
        <div className="w-full mb-8 flex justify-end">
          {isAdmin && (
            <button
              className="rounded-md bg-blue-600 px-10 py-3 text-white shadow-sm hover:bg-blue-700"
              onClick={handleCreateSession}
            >
              Create New Session
            </button>
          )}
          {showForm && <SessionForm onClose={handleCloseForm} />}
        </div>
        <div className="w-full">
          <h1 className="mb-7 text-xl font-bold text-black">
            Upcoming Sessions
          </h1>
          <SessionsTable
            sessions={sessions}
            onRegister={handleRegisterForSession}
            isRegistering={isRegistering}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
