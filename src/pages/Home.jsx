// ...importaciones
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp";
import { products, services, machinery, banner } from "../constants/dataItems";
import { useEffect, useState } from "react";
import CardServices from "../components/CardServices";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const productosDestacados = products.filter(
    (item) => item.outstanding === "si"
  );
  const maquinariaDestacada = machinery.filter(
    (item) => item.outstanding === "si"
  );
  const serviciosDestacados = services.filter(
    (item) => item.outstanding === "si"
  );

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="bg-gray-100 overflow-x-hidden">
      <Header />
      <Banner images={banner} currentIndex={currentIndex} />

      {/* Modal */}
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
<section className="mt-10 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] relative bg-gray-100 overflow-visible pb-12">
  <h2 className="text-2xl font-semibold text-gray-800 mb-6">
  Productos destacados
</h2>

  {/* Botón izquierdo */}
  <button
    onClick={() => scrollLeft("productos")}
    className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
  >
    <FaChevronLeft className="text-blue-800" />
  </button>

  {/* Carrusel */}
  <div
  id="productos"
  className="pt-2 px-1.5 relative flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full z-0 overflow-visible">
    {productosDestacados.map((item) => (
      <div
        key={item.id}
        className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer"
        onClick={() => openModal(item)}
      >
        <CardItem
          title={item.title}
          description={item.description}
          image={item.image}
        />
      </div>
    ))}
  </div>

  {/* Botón derecho */}
  <button
    onClick={() => scrollRight("productos")}
    className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
  >
    <FaChevronRight className="text-blue-800" />
  </button>
</section>



      {/* Servicios */}
      <section className="mt-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Servicios destacados
        </h2>
        <div className="grid grid-cols-1 gap-6">
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
      <section className="mt-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] relative bg-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Maquinarias destacadas
        </h2>
        <button
          onClick={() => scrollLeft("maquinarias")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>
        <div
          id="maquinarias"
          className="pt-2 px-1.5 relative flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full z-0 overflow-visible">
          {maquinariaDestacada.map((item) => (
            <div
              key={item.id}
              className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer"
              onClick={() => openModal(item)}
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
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>

      {/* Ubicación / Mapa */}
      <section className="mt-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¿Dónde estamos ubicados?
        </h2>
        <div className="w-full h-96 rounded-md overflow-hidden shadow-lg">
          <iframe
            title="Ubicación del local"
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3902.4214076270105!2d-76.96286052493942!3d-12.014482988219758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDAwJzUyLjEiUyA3NsKwNTcnMzcuMCJX!5e0!3m2!1ses!2spe!4v1754349773753!5m2!1ses!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      <ButtonWhatsApp />
      <Footer />
    </div>
  );
}

export default Home;
