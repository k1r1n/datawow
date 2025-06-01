"use client";

import Sidebar from "@/components/sidebar";
import { usePathname, useRouter } from "next/navigation";
import { CurrentPage, UserRole } from "@/types/sidebar";
import { useEffect } from "react";
import { role } from "@/constants/role";
import { routerPath } from "@/constants/routerPath";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const currentPage = pathname.split("/").pop() as CurrentPage;
  const router = useRouter();
  const userPath = pathname.split("/")[1] as UserRole;

  useEffect(() => {
    if (userPath !== role.admin && userPath !== role.user) {
      router.replace(routerPath.admin.path);
    }
  }, [userPath, router, routerPath.admin.path]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} userRole={userPath} />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
