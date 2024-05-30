import { useEffect, useState } from "react";
import Router from "next/router";

const ProgressBar: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [startLoading, setStartLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleStart = () => {
      setStartLoading(true);
      timer = setTimeout(() => {
        setLoading(true);
      }, 100); // Waktu minimum untuk menampilkan progress bar (misal: 100ms)
    };

    const handleComplete = () => {
      clearTimeout(timer);
      if (startLoading) {
        setTimeout(() => {
          setLoading(false);
          setStartLoading(false);
        }, 1500); // Waktu minimum progress bar terlihat setelah selesai (misal: 300ms)
      }
    };

    Router.events.on("routeChangeStart", handleStart);
    Router.events.on("routeChangeComplete", handleComplete);
    Router.events.on("routeChangeError", handleComplete);

    return () => {
      Router.events.off("routeChangeStart", handleStart);
      Router.events.off("routeChangeComplete", handleComplete);
      Router.events.off("routeChangeError", handleComplete);
    };
  }, [startLoading]);

  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-1 bg-transparent z-50">
        <div className="h-full bg-primary-900 animate-progressBar"></div>
      </div>
    )
  );
};

export default ProgressBar;
