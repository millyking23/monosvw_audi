import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WhyChoose from "@/components/WhyChoose";
import Services from "@/components/Services";
import Marquee from "@/components/Marquee";
import Fleet from "@/components/Fleet";
import WorkshopPortfolio from "@/components/WorkshopPortfolio";
import Clients from "@/components/Clients";
import BookingSection from "@/components/BookingSection";
import FleetForm from "@/components/FleetForm";
import Estimator from "@/components/Estimator";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import CTAStrip from "@/components/CTAStrip";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "VW & Audi Service, Repairs & Diagnostics in Bulawayo",
  description: "Monos VW-Audi Service & Parts in Donnington, Bulawayo provides Volkswagen and Audi servicing, repairs and diagnostics, plus all-makes mechanical repairs, injector testing, panel beating, spray painting and fleet maintenance.",
  alternates: { canonical: "https://www.monovwaudi.co.zw/" },
  openGraph: {
    title: "VW & Audi Service, Repairs & Diagnostics in Bulawayo | Monos",
    description: "VW and Audi specialists in Bulawayo for servicing, repairs, diagnostics and bodywork, with support for other makes and models.",
    url: "https://www.monovwaudi.co.zw/",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <WhyChoose />
      <Services />
      <Marquee />
      <Fleet />
      <WorkshopPortfolio />
      <Clients />
      <BookingSection />
      <FleetForm />
      <Estimator />
      <Blog />
      <FAQ />
      <CTAStrip />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}
