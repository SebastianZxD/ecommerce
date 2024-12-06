import { ProductsContainer } from "@/components/ProductsContainer";

const Home = () => {
  return (
    <main className="p-6">
      <section className="products-section">
        <h1 className="text-2xl font-bold mb-4">Our Products</h1>
        <div className="products-container">
          <ProductsContainer />
        </div>
      </section>
    </main>
  );
};

export default Home;