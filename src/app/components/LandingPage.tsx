type Page = "home" | "generate" | "about";

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

import { trackEvent } from "./GoogleAnalytics";

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const handleStartGenerate = () => {
    trackEvent("cta_clicked", {
      button_location: "hero_section",
      button_text: "Mulai Generate QR",
    });
    onNavigate("generate");
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20 sm:py-32" aria-label="Hero section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6">
              Buat QR Code Gratis & Instan
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Generate QR Code untuk link, teks, WhatsApp, dan lainnya. Cepat,
              mudah, dan tanpa login.
            </p>
            <button
              onClick={handleStartGenerate}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
              aria-label="Mulai membuat QR Code"
            >
              Mulai Generate QR
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20" aria-label="Fitur unggulan">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="sr-only">Fitur Unggulan QR Code Generator</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <article className="text-center p-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Cepat & Gratis</h3>
              <p className="text-gray-600">
                Generate QR Code dalam hitungan detik tanpa biaya apapun
              </p>
            </article>

            <article className="text-center p-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Tanpa Login</h3>
              <p className="text-gray-600">
                Tidak perlu registrasi atau login untuk menggunakan layanan ini
              </p>
            </article>

            <article className="text-center p-8">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Bisa Download</h3>
              <p className="text-gray-600">
                Download QR Code Anda dalam format PNG berkualitas tinggi
              </p>
            </article>

            <article className="text-center p-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12c0 1.657-1.343 3-3 3s-3-1.343-3-3 1.343-3 3-3 3 1.343 3 3zm0 0c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zm6 0c0 1.657 1.343 3 3 3s3-1.343 3-3-1.343-3-3-3-3 1.343-3 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl mb-2">Tidak Ada Kadaluwarsa</h3>
              <p className="text-gray-600">
                QR Code yang dibuat dapat digunakan selamanya tanpa batas waktu
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}