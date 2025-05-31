import StatsCards from "@/components/stats-cards";
import Layout from "@/components/layout";
import ConcertPage from "@/components/concert/concert-page";

export default function AdminPage() {
  return (
    <Layout>
      <StatsCards />
      <ConcertPage />
    </Layout>
  );
}
