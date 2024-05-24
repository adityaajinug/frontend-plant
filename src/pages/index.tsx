import { HeadPage } from "@/components/atoms/HeadPage";
import { Banner } from "@/components/organisms/Home/Banner/Banner";
import { Navbar } from "@/components/organisms/Navbar/Navbar";

export default function Home() {
  return (
    <div>
      <HeadPage title="Home" />
      <Navbar />
      <Banner />
    </div>
  );
}
