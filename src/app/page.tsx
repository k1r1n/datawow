import Sidebar from "@/components/sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />
      <main className="flex-1 p-6">test</main>
    </div>
  );
}
