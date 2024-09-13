import Providers from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { withTranslation } from "react-i18next";
import { appWithTranslation } from "next-i18next";
import '../i18n'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <div className='min-h-[80vh]'>
        <Component {...pageProps} />
      </div>
    </Providers>
  );
}

export default appWithTranslation(App)