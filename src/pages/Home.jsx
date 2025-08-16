// ...importaciones necesarias
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp";
import { useEffect, useState, useRef } from "react";
import CardService from "../components/CardService";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// importacion de servicios
import { getAllProducts } from "/src/services/productsService.js";
import { getAllServices } from "/src/services/servicesService.js";
import { getAllMachines } from "/src/services/machineryService.js";
import { getAllBanners } from "/src/services/bannerServices.js";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // Estados para API
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [machinery, setMachinery] = useState([]);
  const [banners, setBanners] = useState([]);

  // refs para los contenedores
  const productosRef = useRef(null);
  const maquinariasRef = useRef(null);

  // ref para animaciones
  const scrollAnimRef = useRef(new Map());

  // Fetch de datos desde API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, servRes, machRes, bannRes] = await Promise.all([
          getAllProducts(),
          getAllServices(),
          getAllMachines(),
          getAllBanners(),
        ]);
        setProducts(prodRes);
        setServices(servRes);
        setMachinery(machRes);
        setBanners(bannRes);
      } catch (error) {
        console.error("❌ Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // Autoplay banner
  useEffect(() => {
    if (banners.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [banners]);

  // Funciones para avanzar/retroceder banners
  const prevBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const nextBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  // easing
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // smooth scroll
  const smoothScrollBy = (container, distance, duration = 500) => {
    if (!container) return;
    const prevAnim = scrollAnimRef.current.get(container);
    if (prevAnim) cancelAnimationFrame(prevAnim);

    const start = container.scrollLeft;
    const maxLeft = Math.max(0, container.scrollWidth - container.clientWidth);
    const end = Math.max(0, Math.min(start + distance, maxLeft));
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = easeInOutQuad(t);
      container.scrollLeft = Math.round(start + (end - start) * eased);

      if (t < 1) {
        const id = requestAnimationFrame(step);
        scrollAnimRef.current.set(container, id);
      } else {
        scrollAnimRef.current.delete(container);
      }
    };

    const id = requestAnimationFrame(step);
    scrollAnimRef.current.set(container, id);
  };

  const getCardWidth = (container) => {
    if (!container) return 0;
    const firstChild = Array.from(container.children).find(
      (c) => c.nodeType === 1
    );
    if (!firstChild) return 0;
    const style = window.getComputedStyle(container);
    const gapRaw =
      style.columnGap ||
      style.getPropertyValue("column-gap") ||
      style.gap ||
      "0px";
    const gap = parseFloat(gapRaw) || 0;
    const width = firstChild.getBoundingClientRect().width;
    return Math.round(width + gap);
  };

  const getContainerById = (id) => {
    if (id === "productos") return productosRef.current;
    if (id === "maquinarias") return maquinariasRef.current;
    return document.getElementById(id);
  };

  const scrollLeft = (id) => {
    const container = getContainerById(id);
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    smoothScrollBy(container, -cardWidth);
  };

  const scrollRight = (id) => {
    const container = getContainerById(id);
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    smoothScrollBy(container, cardWidth);
  };

  // Modal
  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="bg-gray-100 overflow-x-hidden">
      <Header />

      {/* Banner con objetos completos */}
      <Banner
        images={banners}
        currentIndex={currentIndex}
        onPrev={prevBanner}
        onNext={nextBanner}
      />

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full relative shadow-lg p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:scale-150"
            >
              <FaTimes size={24} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-center">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-4">
                  {selectedItem.name}
                </h3>
                <p className="text-gray-600 text-lg text-justify">
                  {selectedItem.description}
                </p>

                {/* Capacidad (solo si existe y es producto) */}
                {selectedItem.capacity && (
                  <p className="mt-4 text-lg font-medium text-blue-800">
                    Capacidad:{" "}
                    {selectedItem.capacity >= 1000
                      ? `${(selectedItem.capacity / 1000).toFixed(1)} L`
                      : `${selectedItem.capacity} ml`}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Productos */}
      <section className="mt-10 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] relative bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Productos</h2>

        <button
          onClick={() => scrollLeft("productos")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center z-20 hover:scale-125"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>

        <div
          id="productos"
          ref={productosRef}
          className="pt-6 px-6 -mx-6 flex overflow-x-auto overflow-y-hidden gap-6 scroll-smooth no-scrollbar w-full"
        >
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="relative min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer hover:scale-110 hover:z-20"
            >
              <CardItem {...item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRight("productos")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center z-20 hover:scale-125"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>

      {/* Servicios */}
      <section className="mt-2 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Servicios</h2>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="cursor-pointer hover:scale-105 hover:shadow-lg"
            >
              <CardService {...item} />
            </div>
          ))}
        </div>
      </section>

      {/* Maquinarias */}
      <section className="mt-10 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] relative bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Maquinarias
        </h2>

        <button
          onClick={() => scrollLeft("maquinarias")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center z-20 hover:scale-125"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>

        <div
          id="maquinarias"
          ref={maquinariasRef}
          className="pt-6 px-6 -mx-6 flex overflow-x-auto overflow-y-hidden gap-6 scroll-smooth no-scrollbar w-full"
        >
          {machinery.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="relative min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer hover:scale-110 hover:z-50"
            >
              <CardItem {...item} />
            </div>
          ))}
        </div>

        <button
          onClick={() => scrollRight("maquinarias")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center z-20 hover:scale-125"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>

      {/* Ubicación / Mapa */}
      <section className="mt-2 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          ¿Dónde estamos ubicados?
        </h2>
        <div className="w-full h-[700px] rounded-md overflow-hidden shadow-lg">
          <iframe
            title="Ubicación del local"
            src="https://www.google.com/maps/embed?..."
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Visión y Misión */}
      <section className="mt-12 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[100px] pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto text-gray-700">
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Visión</h3>
            <p className="leading-relaxed text-justify">
              Convertirnos en la referencia principal de la industria de envases
              PET, impulsando el desarrollo tecnológico y sostenible del sector
              mediante productos, maquinarias y servicios que marquen la
              diferencia en calidad, eficiencia y respeto por el medio ambiente.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 text-blue-800">Misión</h3>
            <p className="leading-relaxed text-justify">
              Brindar a nuestros clientes productos y servicios de alta calidad
              en el soplado de botellas PET, venta de maquinaria especializada y
              servicios de instalación, asegurando eficiencia, innovación y
              soporte técnico oportuno. Nos comprometemos a impulsar el
              crecimiento de nuestros clientes mediante soluciones confiables,
              personalizadas y sostenibles, contribuyendo al desarrollo de la
              industria de envases.
            </p>
          </div>
        </div>
      </section>

      <ButtonWhatsApp />
      <Footer />
    </div>
  );
}

export default Home;
