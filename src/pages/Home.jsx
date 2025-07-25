import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Banner from "../components/banner";
import Catalog from "./Catalog";
import {
  productos,
  servicios,
  maquinaria,
  banner,
} from "../constants/dataStatic";
import { useEffect, useState } from "react";
import CardServices from "../components/CardServices";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (id) => {
    const container = document.getElementById(id);
    container.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <Banner images={banner} currentIndex={currentIndex} />

      {/* Productos */}
      <section className="mt-12 px-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Productos destacados
        </h2>
        <button
          onClick={() => scrollLeft("productos")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 z-10"
        >
          ◀
        </button>
        <div
          id="productos"
          className="flex overflow-x-auto gap-4 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar"
        >
          {productos.map((item) => (
            <div className="min-w-[240px] max-w-[240px] flex-shrink-0">
              <CardItem
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRight("productos")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 z-10"
        >
          ▶
        </button>
      </section>

      {/* Servicios */}
      <section className="mt-12 px-[100px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Servicios destacados
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {servicios.map((item) => (
            <CardServices
              key={item.id}
              title={item.title}
              description={item.description}
              image={item.image}
              reverse={item.id % 2 === 0}
            />
          ))}
        </div>
      </section>

      {/* Maquinarias */}
      <section className="mt-12 px-6 relative">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Maquinarias destacadas
        </h2>
        <button
          onClick={() => scrollLeft("maquinarias")}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 z-10"
        >
          ◀
        </button>
        <div
          id="maquinarias"
          className="flex overflow-x-auto gap-4 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar"
        >
          {maquinaria.map((item) => (
            <div className="min-w-[240px] max-w-[240px] flex-shrink-0">
              <CardItem
                key={item.id}
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollRight("maquinarias")}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border p-2 z-10"
        >
          ▶
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
