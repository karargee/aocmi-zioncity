import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: {
    default: "AOCMI Zion City — Ambassadors of Christ Ministry International",
    template: "%s | AOCMI Zion City",
  },
  description:
    "Ambassadors of Christ Ministry International (Zion City) — devoted to expository preaching and teaching of God's word. Join our faith journey in Jos, Nigeria.",
  keywords: [
    "AOCMI", "Zion City", "church in Jos", "Ambassadors of Christ",
    "Ministry International", "Christian ministry Nigeria", "expository preaching",
  ],
  openGraph: {
    title: "AOCMI Zion City — Ambassadors of Christ Ministry International",
    description: "The joy of being in God's presence is an unparalleled experience. Join our faith journey.",
    url: "https://aocmi.com",
    siteName: "AOCMI Zion City",
    images: [{ url: "/img/home-page-1.png", width: 1200, height: 630 }],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AOCMI Zion City",
    description: "Ambassadors of Christ Ministry International — devoted to expository preaching and teaching of God's word.",
    images: ["/img/home-page-1.png"],
  },
  metadataBase: new URL("https://aocmi.com"),
  icons: { icon: "/img/logo.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
