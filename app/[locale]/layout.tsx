import { defaultLocale, supportedLocales } from "@/i18n";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "./globals.css";

import { NextIntlClientProvider, useMessages } from 'next-intl';
import Providers from "@/providers";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Zim Engineering Community',
  description: 'Connecting innovators, engineers, and tech enthusiasts in Zimbabwe. Join us to collaborate, learn, and shape the future together!',
  keywords: 'Zimbabwe, engineering, technology, community, collaboration, innovation, engineers, tech enthusiasts, learning, networking, Zim Engineering',
  openGraph: {
    title: 'Zim Engineering Community',
    description: 'Connecting innovators, engineers, and tech enthusiasts in Zimbabwe. Join us to collaborate, learn, and shape the future together!',
    type: 'website',
    url: 'https://zimeng.org',
    images: [
      {
        url: 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg',
        width: 800,
        height: 600,
        alt: 'Zim Engineering Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zim Engineering Community',
    description: 'Connecting innovators, engineers, and tech enthusiasts in Zimbabwe. Join us to collaborate, learn, and shape the future together!',
    image: 'https://images.ctfassets.net/x9qfewrt309k/27XpWIwqZ5QjJw069l12RF/de152f627be2c5f294c5ee3b75c8276e/WhatsApp_Image_2024-09-28_at_21.19.53.jpeg'
  },
};

interface Props {
  children: ReactNode;
  params: { locale: string };
}

export default function RootLayout(props: Props) {
  const { children, params } = props;
  const messages = useMessages();

  if (!supportedLocales.includes(params.locale)) notFound();

  return (
    <html lang={params.locale || defaultLocale}>
      <body className={inter.className}>
        <NextIntlClientProvider locale={params.locale} messages={messages}>
          <Providers>
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}