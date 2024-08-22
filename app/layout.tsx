import Providers from "@/providers";
import "./globals.css";
import {  JetBrains_Mono } from "next/font/google";

export const metadata = {
  title: `Zim Engineering Community`,
  description: `Here we go again!`,
};

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

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
    <html lang="en" className={jetBrainsMono.className}>
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
