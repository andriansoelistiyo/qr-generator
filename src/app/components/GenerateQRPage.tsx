import { useState, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { trackEvent } from "./GoogleAnalytics";

type QRType = "url" | "text" | "whatsapp" | "email";
type QRSize = "small" | "medium" | "large";

export default function GenerateQRPage() {
  const [qrType, setQrType] = useState<QRType>("url");
  const [inputValue, setInputValue] = useState("");
  const [qrSize, setQrSize] = useState<QRSize>("medium");
  const [qrColor, setQrColor] = useState("#000000");
  const [generatedValue, setGeneratedValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState<"png" | "webp">("png");
  const qrRef = useRef<HTMLDivElement>(null);

  const sizeMap = {
    small: 200,
    medium: 300,
    large: 400,
  };

  const validateInput = (): boolean => {
    setError("");

    if (!inputValue.trim()) {
      setError("Input tidak boleh kosong");
      return false;
    }

    if (qrType === "url") {
      try {
        const url = inputValue.startsWith("http")
          ? inputValue
          : `https://${inputValue}`;
        new URL(url);
      } catch {
        setError("Format URL tidak valid. Contoh: https://example.com");
        return false;
      }
    }

    if (qrType === "whatsapp") {
      const phoneRegex = /^[0-9]+$/;
      if (!phoneRegex.test(inputValue.replace(/[\s\-\+]/g, ""))) {
        setError("Nomor WhatsApp hanya boleh berisi angka");
        return false;
      }
    }

    if (qrType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setError("Format email tidak valid");
        return false;
      }
    }

    return true;
  };

  const handleGenerate = () => {
    if (!validateInput()) return;

    setIsLoading(true);

    setTimeout(() => {
      let value = inputValue;

      if (qrType === "url") {
        value = inputValue.startsWith("http")
          ? inputValue
          : `https://${inputValue}`;
      } else if (qrType === "whatsapp") {
        const cleanPhone = inputValue.replace(/[\s\-\+]/g, "");
        value = `https://wa.me/${cleanPhone}`;
      } else if (qrType === "email") {
        value = `mailto:${inputValue}`;
      }

      setGeneratedValue(value);
      setIsLoading(false);

      // 📊 Track QR Code Generation Event
      trackEvent("qr_code_generated", {
        qr_type: qrType,
        qr_size: qrSize,
        qr_color: qrColor,
      });
    }, 500);
  };

  const handleDownload = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    const size = sizeMap[qrSize];
    canvas.width = size;
    canvas.height = size;

    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `qrcode-${Date.now()}.${downloadFormat}`;
          link.click();
          URL.revokeObjectURL(url);

          // 📊 Track QR Code Download Event
          trackEvent("qr_code_downloaded", {
            qr_type: qrType,
            qr_size: qrSize,
            download_format: downloadFormat,
          });
        }
      }, `image/${downloadFormat}`);
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const getPlaceholder = () => {
    switch (qrType) {
      case "url":
        return "https://example.com";
      case "text":
        return "Masukkan teks Anda";
      case "whatsapp":
        return "628123456789";
      case "email":
        return "email@example.com";
    }
  };

  const getLabel = () => {
    switch (qrType) {
      case "url":
        return "URL / Website";
      case "text":
        return "Teks";
      case "whatsapp":
        return "Nomor WhatsApp";
      case "email":
        return "Email";
    }
  };

  return (
    <div className="bg-gray-50 py-12 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8 text-center">Generate QR Code</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl mb-6">Pengaturan QR Code</h2>

            <div className="space-y-6">
              {/* QR Type Selection */}
              <div>
                <label className="block mb-2">Tipe QR Code</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setQrType("url");
                      setInputValue("");
                      setError("");
                    }}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      qrType === "url"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    URL / Website
                  </button>
                  <button
                    onClick={() => {
                      setQrType("text");
                      setInputValue("");
                      setError("");
                    }}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      qrType === "text"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    Teks
                  </button>
                  <button
                    onClick={() => {
                      setQrType("whatsapp");
                      setInputValue("");
                      setError("");
                    }}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      qrType === "whatsapp"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      setQrType("email");
                      setInputValue("");
                      setError("");
                    }}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      qrType === "email"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    Email
                  </button>
                </div>
              </div>

              {/* Input Field */}
              <div>
                <label className="block mb-2">{getLabel()}</label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => {
                    setInputValue(e.target.value);
                    setError("");
                  }}
                  placeholder={getPlaceholder()}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none transition-colors"
                />
                {error && (
                  <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
              </div>

              {/* Size Selection */}
              <div>
                <label className="block mb-2">Ukuran QR Code</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={() => setQrSize("small")}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      qrSize === "small"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    Small
                  </button>
                  <button
                    onClick={() => setQrSize("medium")}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      qrSize === "medium"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    Medium
                  </button>
                  <button
                    onClick={() => setQrSize("large")}
                    className={`px-4 py-2 border-2 rounded-lg transition-colors ${
                      qrSize === "large"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    Large
                  </button>
                </div>
              </div>

              {/* Color Selection */}
              <div>
                <label className="block mb-2">Warna QR Code</label>
                <div className="flex items-center space-x-4">
                  <input
                    type="color"
                    value={qrColor}
                    onChange={(e) => setQrColor(e.target.value)}
                    className="w-16 h-12 rounded-lg border-2 border-gray-200 cursor-pointer"
                  />
                  <span className="text-gray-600">{qrColor}</span>
                </div>
              </div>

              {/* Format Selection */}
              <div>
                <label className="block mb-2">Format Download</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setDownloadFormat("png")}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      downloadFormat === "png"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => setDownloadFormat("webp")}
                    className={`px-4 py-3 border-2 rounded-lg transition-colors ${
                      downloadFormat === "webp"
                        ? "border-blue-600 bg-blue-50 text-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    WEBP
                  </button>
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-blue-600 text-white px-6 py-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Generating..." : "Generate QR Code"}
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md">
            <h2 className="text-2xl mb-6">Preview QR Code</h2>

            <div className="flex flex-col items-center justify-center min-h-[400px]">
              {generatedValue ? (
                <div className="flex flex-col items-center space-y-6 w-full">
                  <div
                    ref={qrRef}
                    className="bg-white p-4 rounded-lg border-2 border-gray-200 max-w-full overflow-hidden flex items-center justify-center"
                  >
                    <QRCodeSVG
                      value={generatedValue}
                      size={sizeMap[qrSize]}
                      fgColor={qrColor}
                      level="H"
                      includeMargin={true}
                      className="w-full h-auto max-w-full"
                      style={{
                        maxWidth: '100%',
                        height: 'auto',
                      }}
                    />
                  </div>

                  <button
                    onClick={handleDownload}
                    className="w-full max-w-md bg-green-600 text-white px-6 py-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <span>Download QR Code ({downloadFormat.toUpperCase()})</span>
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-400">
                  <svg
                    className="w-24 h-24 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                    />
                  </svg>
                  <p className="text-xl">QR Code akan muncul di sini</p>
                  <p className="mt-2">Isi form dan klik generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}