import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CardItem from "../components/CardItem";
import CardServices from "../components/CardServices";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const HomePreview = ({ banner, productos, servicios, maquinaria }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [banner.length]);

  const scrollLeft = (id) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = (id) => {
    const container = document.getElementById(id);
    if (container) container.scrollBy({ left: 200, behavior: "smooth" });
  };

  const productosDestacados = productos.filter((item) => item.outstanding === "si");
  const maquinariaDestacada = maquinaria.filter((item) => item.outstanding === "si");
  const serviciosDestacados = servicios.filter((item) => item.outstanding === "si");

  return (
    <div className="flex justify-center items-start w-full h-full overflow-auto bg-gray-100 rounded shadow-lg relative">
      <div style={{ transform: "scale(0.7)", transformOrigin: "top center", width: "140%" }}>
        {/* Banner */}
        <Banner images={banner} currentIndex={currentIndex} />

        {/* Productos */}
        <section className="mt-6 px-4 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Productos destacados</h2>
          <div className="relative">
            <button
              onClick={() => scrollLeft("productos-preview")}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-20"
            >
              <FaChevronLeft className="text-blue-800" />
            </button>
            <div
              id="productos-preview"
              className="pt-2 px-1.5 flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
            >
              {productosDestacados.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px]"
                >
                  <CardItem title={item.title} description={item.description} image={item.image} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight("productos-preview")}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-20"
            >
              <FaChevronRight className="text-blue-800" />
            </button>
          </div>
        </section>

        {/* Servicios */}
        <section className="mt-6 px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Servicios destacados</h2>
          <div className="grid grid-cols-1 gap-4">
            {serviciosDestacados.map((item) => (
              <CardServices
                key={item.id}
                image={item.image}
                title={item.title}
                description={item.description}
                reverse={item.left === "no"}
              />
            ))}
          </div>
        </section>

        {/* Maquinarias */}
        <section className="mt-6 px-4 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Maquinarias destacadas</h2>
          <div className="relative">
            <button
              onClick={() => scrollLeft("maquinarias-preview")}
              className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-20"
            >
              <FaChevronLeft className="text-blue-800" />
            </button>
            <div
              id="maquinarias-preview"
              className="pt-2 px-1.5 flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
            >
              {maquinariaDestacada.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px]"
                >
                  <CardItem title={item.title} description={item.description} image={item.image} />
                </div>
              ))}
            </div>
            <button
              onClick={() => scrollRight("maquinarias-preview")}
              className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-20"
            >
              <FaChevronRight className="text-blue-800" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePreview;
