import Banner from "./components/Banner";
import Header from "./components/Header";


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
  } subtitle="IoT Connectivity & Modem Management Platform" />
    </main>
  );
}
