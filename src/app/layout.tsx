import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "jiehoon lee.",
  description: "Full-stack developer",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫀</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🫀</text></svg>" />
      </head>
      <body
        className={`${montserrat.variable} antialiased`}
        style={{ fontFamily: 'var(--font-montserrat), Montserrat, sans-serif' }}
      >
        {/* App wrapper */}
        <div className="relative min-h-screen">
          {/* Global navigation bar - overlay */}
          <div className="fixed top-0 left-0 right-0 z-50">
            <Navbar />
          </div>

          {/* Main page content - full screen */}
          <main className="min-h-screen">{children}</main>
        </div>
      </body>
    </html>
  );
}
