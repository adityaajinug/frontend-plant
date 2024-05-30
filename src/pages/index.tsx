import { HeadPage } from "@/components/atoms/HeadPage";
import { Banner } from "@/components/organisms/Home/Banner/Banner";
import { NewProducts } from "@/components/organisms/Home/NewProducts/NewProducts";
import { PopularCategories } from "@/components/organisms/Home/PopularCategories/PopularCategories";
import { Value } from "@/components/organisms/Home/Value/Value";
import { LayoutTemplates as Layout } from "@/components/templates/Layouts/LayoutTemplates";
export default function Home() {
  return (
    <>
      <Layout title="Home">
        <Banner />
        <PopularCategories />
        <NewProducts />
        <Value />
      </Layout>
    </>
  );
}
