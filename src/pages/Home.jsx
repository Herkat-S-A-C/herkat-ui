import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer"; // opcional si deseas cerrar la página
import { productos } from "../constants/dataStatic";
import Banner from "../components/banner";

function Home() {
  return (
    <div>
      <Header />
      <Banner />

      <section className="mt-12 px-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Productos destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {productos.map((item) => (
            <CardItem
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;