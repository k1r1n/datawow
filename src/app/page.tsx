import Sidebar from "@/components/sidebar";
import StatsCards from "@/components/stats-cards";
import ConcertList from "@/components/concert-list";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar currentPage="home" />
      <main className="flex-1 p-6">
        <StatsCards />
        <ConcertList />
      </main>
    </div>
  );
}
