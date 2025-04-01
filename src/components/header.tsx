// src/components/Header.tsx
"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProfileIcon from "@/components/ProfileIcon";

export default function Header() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logOut();
    router.push("/");
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-100">
      <div className="flex items-center space-x-2">
        <ProfileIcon width={40} height={40} />
        <span className="text-lg font-bold">Welcome {user?.displayName || "User"}</span>
      </div>
      <button
        onClick={handleLogout}
        title="Logout"
        className="focus:outline-none"
      >
      </button>
    </div>
  );
}
