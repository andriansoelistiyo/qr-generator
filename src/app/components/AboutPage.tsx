export default function AboutPage() {
  return (
    <main className="bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl mb-8 text-center">Tentang Generate QR Code</h1>

        <div className="prose prose-lg max-w-none">
          <section className="bg-blue-50 p-8 rounded-lg mb-8" aria-labelledby="what-is-qr">
            <h2 id="what-is-qr" className="text-2xl mb-4">Apa itu QR Code?</h2>
            <p className="text-gray-700">
              QR Code (Quick Response Code) adalah jenis kode matriks atau
              barcode dua dimensi yang dapat menyimpan berbagai informasi
              seperti URL, teks, nomor telepon, dan banyak lagi. QR Code dapat
              dengan mudah dipindai menggunakan kamera smartphone.
            </p>
          </section>

          <section className="mb-8" aria-labelledby="website-function">
            <h2 id="website-function" className="text-2xl mb-4">Fungsi Website Ini</h2>
            <p className="text-gray-700 mb-4">
              Website ini menyediakan layanan gratis untuk membuat QR Code
              dengan mudah dan cepat. Anda dapat membuat QR Code untuk:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>URL atau link website</li>
              <li>Teks bebas</li>
              <li>Nomor WhatsApp</li>
              <li>Alamat email</li>
            </ul>
          </section>

          <section className="mb-8" aria-labelledby="website-purpose">
            <h2 id="website-purpose" className="text-2xl mb-4">Tujuan Website</h2>
            <p className="text-gray-700">
              Website ini dibuat untuk membantu UMKM, personal, dan bisnis dalam
              membuat QR Code dengan mudah tanpa perlu keahlian teknis. Kami
              percaya bahwa teknologi harus mudah diakses oleh semua orang.
            </p>
          </section>

          <section className="bg-gray-50 p-8 rounded-lg" aria-labelledby="advantages">
            <h2 id="advantages" className="text-2xl mb-4">Keunggulan</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>100% gratis tanpa biaya tersembunyi</li>
              <li>Tidak perlu registrasi atau login</li>
              <li>Proses generate sangat cepat</li>
              <li>Hasil QR Code berkualitas tinggi</li>
              <li>Dapat digunakan di desktop dan mobile</li>
              <li>Privacy terjaga - tidak menyimpan data Anda</li>
              <li>QR Code tidak ada masa kadaluwarsa</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}