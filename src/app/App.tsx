import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import GenerateQRPage from "./components/GenerateQRPage";
import AboutPage from "./components/AboutPage";
import GoogleAnalytics, { trackPageView } from "./components/GoogleAnalytics";

type Page = "home" | "generate" | "about";

// 🔑 GOOGLE ANALYTICS MEASUREMENT ID
// Ganti G-XXXXXXXXXX dengan Measurement ID Anda dari Google Analytics
// Contoh: G-ABC123XYZ4
const GA_MEASUREMENT_ID = "G-KCJQT03349";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  // Track page views ketika halaman berubah
  useEffect(() => {
    const pageTitle = {
      home: "Beranda - QR Code Generator",
      generate: "Generate QR Code - QR Code Generator",
      about: "Tentang - QR Code Generator",
    };

    trackPageView(`/${currentPage}`, pageTitle[currentPage]);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage onNavigate={setCurrentPage} />;
      case "generate":
        return <GenerateQRPage />;
      case "about":
        return <AboutPage />;
      default:
        return <LandingPage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Google Analytics */}
      <GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />
      
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}