import { Home, History, Users, LogOut } from "lucide-react";
import Link from "next/link";

interface SidebarProps {
  currentPage?: "home" | "history";
}

export default function Sidebar({ currentPage = "home" }: SidebarProps) {
  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200">
      <div className="p-6">
        <h1 className="text-xl font-semibold text-gray-900">Admin</h1>
      </div>

      <nav className="mt-6">
        <div className="px-3">
          <Link
            href="/"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
              currentPage === "home"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>

          <Link
            href="/history"
            className={`flex items-center px-3 py-2 mt-1 text-sm font-medium rounded-md ${
              currentPage === "history"
                ? "text-gray-900 bg-gray-100"
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <History className="w-5 h-5 mr-3" />
            History
          </Link>

          <a
            href="#"
            className="flex items-center px-3 py-2 mt-1 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <Users className="w-5 h-5 mr-3" />
            Switch to user
          </a>
        </div>

        <div className="mt-auto px-3 pt-6">
          <a
            href="#"
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </a>
        </div>
      </nav>
    </div>
  );
}
