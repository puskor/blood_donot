import CalloutBanner from "@/components/sheard/CalloutBanner";
import Hero from "@/components/sheard/Hero";
import RecentRequests from "@/components/sheard/RecentRequests";
import StatsAndProcess from "@/components/sheard/StatsAndProcess";

export default function Home() {
  return (
    <div>
      <Hero />
      <StatsAndProcess />
      <RecentRequests />
      <CalloutBanner />

    </div>
  );
}
