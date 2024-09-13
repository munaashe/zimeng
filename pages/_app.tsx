import Providers from "@/providers";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import '../i18n'
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers>
      <div className='min-h-[80vh]' >
        <Component {...pageProps} />
      </div>
    </Providers>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
      props: {
          ...(await serverSideTranslations(locale || 'en', ['translationƒ'])),
      },
  };
};
export default appWithTranslation(App)