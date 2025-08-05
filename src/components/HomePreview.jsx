import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import CardItem from "../components/CardItem";
import CardServices from "../components/CardServices";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const HomePreview = ({ banner, productos, servicios, maquinaria }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="flex justify-center items-start w-full h-full overflow-auto bg-gray-100 rounded shadow-lg">
      <div style={{ transform: "scale(0.7)", transformOrigin: "top center", width: "140%" }}>
        {/* Banner */}
        <Banner images={banner} currentIndex={currentIndex} />

        {/* Modal (solo para vista previa) */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-md w-full relative shadow-lg">
              <button
                onClick={closeModal}
                className="absolute top-3 right-3 text-gray-600 hover:text-red-500"
              >
                <FaTimes size={20} />
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">{selectedItem.title}</h3>
              <p className="text-gray-600">{selectedItem.description}</p>
            </div>
          </div>
        )}

        {/* Productos */}
        <section className="mt-6 px-4 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Productos destacados</h2>
          <button
            onClick={() => scrollLeft("productos-preview")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-10"
          >
            <FaChevronLeft className="text-blue-800" />
          </button>
          <div
            id="productos-preview"
            className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
          >
            {productosDestacados.map((item) => (
              <div
                key={item.id}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px] cursor-pointer"
                onClick={() => openModal(item)}
              >
                <CardItem title={item.title} description={item.description} image={item.image} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight("productos-preview")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-10"
          >
            <FaChevronRight className="text-blue-800" />
          </button>
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
          <button
            onClick={() => scrollLeft("maquinarias-preview")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-10"
          >
            <FaChevronLeft className="text-blue-800" />
          </button>
          <div
            id="maquinarias-preview"
            className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
          >
            {maquinariaDestacada.map((item) => (
              <div
                key={item.id}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px] cursor-pointer"
                onClick={() => openModal(item)}
              >
                <CardItem title={item.title} description={item.description} image={item.image} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight("maquinarias-preview")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-8 h-8 items-center justify-center z-10"
          >
            <FaChevronRight className="text-blue-800" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePreview;
