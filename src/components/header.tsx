// src/components/Header.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProfileIcon from "@/components/ProfileIcon";

export default function Header() {
  const { logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center space-x-2">
        <ProfileIcon width={40} height={40} />
        <span className="text-lg font-bold text-black">
          Welcome
        </span>
      </div>
      <button
        onClick={handleLogout}
        title="Logout"
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 ease-in-out transform hover:scale-105 active:scale-95"
      >
        Logout
      </button>
    </div>
  );
}
