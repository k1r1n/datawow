import StatsCards from "@/components/stats-cards";
import ConcertList from "@/components/concert/concert-list";
import Layout from "@/components/layout";

export default function Dashboard() {
  return (
    <Layout>
      <StatsCards />
      <ConcertList />
    </Layout>
  );
}
