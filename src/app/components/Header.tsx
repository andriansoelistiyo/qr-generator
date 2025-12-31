import { useState } from "react";
import { Menu, X } from "lucide-react";

type Page = "home" | "generate" | "about";

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigate = (page: Page) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("home")}
            className="text-2xl text-blue-600"
          >
            QR Generator
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onNavigate("home")}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === "home"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Beranda
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === "about"
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              Tentang
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Slide Menu */}
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden animate-in slide-in-from-right duration-300 ease-out">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-all duration-200"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col px-4 space-y-2">
              <button
                onClick={() => handleNavigate("home")}
                className={`px-4 py-3 rounded-md text-left transition-all duration-200 ${
                  currentPage === "home"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Beranda
              </button>
              <button
                onClick={() => handleNavigate("about")}
                className={`px-4 py-3 rounded-md text-left transition-all duration-200 ${
                  currentPage === "about"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Tentang
              </button>
            </nav>
          </div>
        </>
      )}
    </header>
  );
}