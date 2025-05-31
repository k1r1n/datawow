import { role } from "@/constants/role";
import { routerPath } from "@/constants/routerPath";
import { userAtom } from "@/store/user";
import { CurrentPage, SidebarProps, UserRole } from "@/types/sidebar";
import { useAtom } from "jotai";
import { Home, History, Users } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  currentPage = routerPath.admin.title as CurrentPage,
  userRole,
}: SidebarProps) {
  const [user, setUser] = useAtom(userAtom);
  const switchRole = userRole === role.admin ? role.user : role.admin;

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900 capitalize">
          {userRole}
        </h1>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          {userRole === role.admin && (
            <>
              <Link
                href={routerPath.admin.path}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md capitalize ${
                  currentPage === routerPath.admin.path.split("/").pop()
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Home className="w-5 h-5 mr-3" />
                {routerPath.admin.title}
              </Link>

              <Link
                href={routerPath.history.path}
                className={`flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md capitalize ${
                  currentPage === routerPath.history.title
                    ? "text-gray-900 bg-gray-100"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <History className="w-5 h-5 mr-3" />
                {routerPath.history.title}
              </Link>
            </>
          )}

          <Link
            href={
              userRole === role.admin
                ? routerPath.user.path
                : routerPath.admin.path
            }
            onClick={() => {
              setUser({
                ...user,
                role: switchRole as UserRole,
              });
            }}
            className="flex items-center px-3 py-2 mt-1 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <Users className="w-5 h-5 mr-3" />
            Switch to {switchRole}
          </Link>
        </div>
      </nav>
    </div>
  );
}
