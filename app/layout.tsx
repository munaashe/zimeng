import "./globals.css";
import { Inter } from "next/font/google";
import { CMS_NAME } from "@/lib/constants";
import Providers from "@/providers";

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section>
          <main className='relative'>
            <Providers>
              <div className='min-h-[78vh]'>
                {children}
              </div>
            </Providers>
          </main>
        </section>
      </body>
    </html>
  );
}
