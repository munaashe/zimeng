import Providers from "@/providers";
import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
  title: `Zim Engineering Community`,
  description: `THere we go again!`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      here we go!
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Providers>
          <section className="min-h-[90vh]">
            <main>{children}</main>
          </section>
        </Providers>
      </body>
    </html>
  );
}
