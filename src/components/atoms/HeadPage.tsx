import Head from "next/head";
import React from "react";
interface HeadPageProps {
  title: string;
}
export const HeadPage: React.FC<HeadPageProps> = ({ title }) => {
  return (
    <div>
      <Head>
        <title>{title} - Planting Commerce</title>
      </Head>
    </div>
  );
};
