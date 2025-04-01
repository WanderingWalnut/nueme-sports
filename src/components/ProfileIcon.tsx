import Image from "next/image";

export default function ProfileIcon({ width = 32, height = 32 }: { width?: number; height?: number }) {
  return <Image src="/profile.svg" alt="Profile Icon" width={width} height={height} />;
}
