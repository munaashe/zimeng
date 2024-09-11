import "./globals.css";
import { Inter } from "next/font/google";
import { CMS_NAME } from "@/lib/constants";
import Providers from "@/providers";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { notFound } from "next/navigation";
import { supportedLocales } from "@/i18n";

export const metadata = {
  title: `Next.js and ${CMS_NAME} Example`,
  description: `This is a blog built with Next.js and ${CMS_NAME}.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

interface Props {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout(props: Props) {
  const { children, params } = props;
  const messages = useMessages();



  return (
    <html lang={params.locale} className={inter.variable}>
      <body>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Providers>
            <main className='relative'>
              <div className='min-h-[78vh]'>
                {children}
              </div>
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
