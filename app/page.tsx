import Banner from "./components/Banner";
import Header from "./components/Header";
import chipImg from "../public/images/chip.png";
import ProductSection from "./components/ProductSection";
import { products } from "./data/product";
import ConsultSection from "./components/ConsultSection";

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
      {/* what is cavli */}
      <div className="mx-auto px-8 py-12 sm:px-6 lg:px-[180px] text-center text-[#756383] border-t border-b border-[#E5DCEE] font-inter  ">
      <p className="text-lg text-[#392259] md:text-xl font-inter">
          With Cavli Hubble, we centralize connectivity and device management across LPWAN, LTE, 5G, and even legacy networks using integrated eSIM technology. Designed to scale, Hubble provides real-time visibility and operational control across every IoT deployment, ensuring strong security, high uptime, and consistent fleet-wide intelligence.
        </p><br/>
      <p className="text-lg text-[#392259] md:text-xl font-inter">
          The platform streamlines modem onboarding, data plan management, and OTA updates, enabling our clients to activate and manage eSIM-enabled modems deployed anywhere in the world with minimal field intervention. This helps them simplify operations, reduce system complexity, and maintain a connected ecosystem that remains secure, transparent, and deployment-ready at all times. 
        </p>
      </div>

      {/* PRODUCT SECTION */}
      <ProductSection products={products} />
      <ConsultSection />
    </main>
  );
}
