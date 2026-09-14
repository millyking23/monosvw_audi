import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export const metadata = {
  title: "VW & Audi Workshop Gallery | Monos Bulawayo",
  description: "See Monos VW-Audi Service & Parts workshop work in Bulawayo, including servicing, diagnostics, injector cleaning, panel beating and spray painting.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "VW & Audi Workshop Gallery | Monos Bulawayo",
    description: "See Monos workshop work across servicing, diagnostics, bodywork and spray painting in Bulawayo.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <section className="mx-auto max-w-6xl px-6 pb-8 pt-8 sm:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            VW &amp; Audi Workshop Gallery in Bulawayo
          </h1>
          <p className="mt-3 max-w-3xl text-base leading-7 text-silver">
            Explore photos from Monos VW-Audi Service &amp; Parts in Bulawayo, showing our workshop, vehicle servicing, computer diagnostics, fuel injector testing and cleaning, panel beating and spray painting work.
          </p>
        </section>
        <Gallery />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
