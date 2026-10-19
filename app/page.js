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
  title: "Monos VW-Audi Service & Parts in Bulawayo | Car Repairs",
  description: "Monos VW-Audi Service & Parts in Donnington, Bulawayo offers VW and Audi servicing, car repairs, diagnostics, panel beating, spray painting and vehicle parts ordered from South Africa for all makes.",
  alternates: { canonical: "https://www.monovwaudi.co.zw/" },
  openGraph: {
    title: "Monos VW-Audi Service & Parts in Bulawayo | Car Repairs",
    description: "Visit Monos in Donnington, Bulawayo for VW/Audi servicing, diagnostics, mechanical repairs, bodywork and car parts sourced from South Africa.",
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
