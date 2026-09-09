import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "Workshop Gallery | Monos VW-Audi Service & Parts",
  description: "Browse the Monos VW-Audi Service & Parts workshop photo gallery in Bulawayo, covering vehicle service, diagnostics, panel and paint, fleet support and workshop photos.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Monos Workshop Gallery | VW, Audi & Vehicle Services in Bulawayo",
    description: "Browse the Monos workshop photo gallery by service area.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Gallery />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
