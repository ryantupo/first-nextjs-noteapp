import Link from 'next/link';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <main className="min-h-screen flex flex-col">
          <nav className="bg-white shadow-md py-4 px-6">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <h1 className="text-xl font-bold text-gray-800">
                <Link href="/">My Notes App</Link>
              </h1>
              <div className="space-x-4">
                <Link href="/" className="text-gray-600 hover:text-blue-600 transition">
                  Home
                </Link>
                <Link href="/notes" className="text-gray-600 hover:text-blue-600 transition">
                  Notes
                </Link>
              </div>
            </div>
          </nav>
          <div className="flex-grow p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
