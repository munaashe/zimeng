import { defaultLocale, supportedLocales } from "@/i18n";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import "./globals.css";

import { NextIntlClientProvider, useMessages } from 'next-intl';
import Providers from "@/providers";


const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: 'Books',
  description: 'A good library for Books. Listed by Title, Author, and with information such as prices available.',
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