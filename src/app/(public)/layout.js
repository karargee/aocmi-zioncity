import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import PageTransition from "@/components/PageTransition";
import BackToTop from "@/components/BackToTop";

export default function PublicLayout({ children }) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
