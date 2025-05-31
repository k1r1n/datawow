export interface SidebarProps {
  currentPage: CurrentPage;
  userRole: UserRole;
}

export type UserRole = "admin" | "user";
export type CurrentPage = "admin" | "history";
