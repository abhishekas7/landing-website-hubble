import Banner from "./components/Banner";
import chipImg from "../public/images/chip.png";
import ProductSection from "./components/ProductSection";
import { products } from "./data/product";
import ConsultSection from "./components/ConsultSection";
import WhatWeDo from "./components/WhatWeDo";

export default function HomePage() {
  return (
    <main>
      <Banner title={
        <>
          One Platform.
          <br />
          Total Visibility.
        </>
      } tagline="IoT Connectivity & Modem Management Platform" image={chipImg.src} />
      <WhatWeDo />
      {/* what is cavli */}
  

      {/* PRODUCT SECTION */}
      <ProductSection products={products} />
      <ConsultSection />
    </main>
  );
}
