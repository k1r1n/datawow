"use client";

import Sidebar from "@/components/sidebar";
import { useAtom } from "jotai";
import { userAtom } from "@/store/user";
import { usePathname } from "next/navigation";
import { CurrentPage } from "@/types/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [user] = useAtom(userAtom);
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop() as CurrentPage;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} userRole={user.role} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
