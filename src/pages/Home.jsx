import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Banner from "../components/banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp";
import {
  productos,
  servicios,
  maquinaria,
  banner,
} from "../constants/dataStatic";
import { useEffect, useState } from "react";
import CardServices from "../components/CardServices";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

  // ✅ Filtrar productos y maquinarias destacados
  const productosDestacados = productos.filter(
    (item) => item.destacado === "si"
  );
  const maquinariaDestacada = maquinaria.filter(
    (item) => item.destacado === "si"
  );
  const serviciosDestacados = servicios.filter(
    (item) => item.destacado === "si"
  );

  return (
    <div className=" bg-gray-100">
      <Header />
      <Banner images={banner} currentIndex={currentIndex} />

      {/* Productos */}
      <section className="mt-12 px-6 relative bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Productos destacados
        </h2>
        <button
          onClick={() => scrollLeft("productos")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>
        <div
          id="productos"
          className="flex overflow-x-auto gap-4 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar"
        >
          {productosDestacados.map((item) => (
            <div
              key={item.id}
              className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px]"
            >
              <CardItem
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollRight("productos")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>

      {/* Servicios */}
      <section className="mt-2 px-[100px]  bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Servicios destacados
        </h2>
        <div className="grid grid-cols-1 gap-2">
          {serviciosDestacados.map((item) => (
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
      <section className="mt-2 px-6 relative  bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Maquinarias destacadas
        </h2>
        <button
          onClick={() => scrollLeft("maquinarias")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>
        <div
          id="maquinarias"
          className="flex overflow-x-auto gap-4 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar"
        >
          {maquinariaDestacada.map((item) => (
            <div
              key={item.id}
              className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px]"
            >
              <CardItem
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scrollRight("maquinarias")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>
      <ButtonWhatsApp/>
      <Footer />
    </div>
  );
}

export default Home;
