import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Products from "../components/Products/Products";

export default function Home() {
  return (
    <main
      style={{
        background: "#090909",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Hero />
      <Products />
    </main>
  );
}