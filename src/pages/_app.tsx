import ProgressBarAtoms from "@/components/atoms/ProgressBar/ProgressBarAtoms";
import "@/styles/globals.css";
import { AuthProvider } from "@/utils/AuthContext";
import type { AppProps } from "next/app";
import { CookiesProvider } from "react-cookie";
import NextNProgress from "nextjs-progressbar";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <CookiesProvider>
        <AuthProvider>
          <NextNProgress
            color="#578B25"
            startPosition={0.3}
            stopDelayMs={200}
            height={5}
          />
          <Component {...pageProps} />
        </AuthProvider>
      </CookiesProvider>
    </>
  );
}
