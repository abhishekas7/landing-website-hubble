import Banner from "./components/Banner";
import Header from "./components/Header";
import chipImg from "../public/images/chip.png";


export default function HomePage() {
  return (
    <main>
      <Header/>
      <Banner title={
    <>
      One Platform.
      <br />
      Total Visibility.
      <br />
      Infinite Possibilities.
    </>
  } tagline="IoT Connectivity & Modem Management Platform" image={chipImg.src} />
    </main>
  );
}
