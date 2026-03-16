import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBanner from "@/components/AnnouncementBanner";

export default function PublicLayout({ children }) {
  return (
    <>
      <AnnouncementBanner />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
