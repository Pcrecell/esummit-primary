// import Support from "@/components/customer-support/Support";
import Hero from "@/components/esummit/Hero-section/Hero";
import {Event} from "@/components/esummit/Homepage-events/index"
import PastSpeakers from "@/components/esummit/past-speakers/PastSpeakers";
import PastSponser from "@/components/esummit/past-sponsors/PastSponserWithCarousel";

export default function HomePage() {
  return (
    <main>
      <Hero />
      {/* <Support /> */}
      <Event />
      <PastSpeakers/>
      <PastSponser/>
    </main>
  )
}