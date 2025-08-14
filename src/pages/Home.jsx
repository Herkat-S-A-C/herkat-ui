// ...importaciones necesarias
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import Footer from "../components/Footer";
import Banner from "../components/Banner";
import ButtonWhatsApp from "../components/ButtonWhatsApp";
import { products, services, machinery, banner } from "../constants/dataItems";
import { useEffect, useState, useRef } from "react";
import CardService from "../components/CardService";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  // refs para los contenedores
  const productosRef = useRef(null);
  const maquinariasRef = useRef(null);

  // ref para almacenar animaciones activas y poder cancelarlas
  const scrollAnimRef = useRef(new Map());

  // Autoplay banner: cambia cada 8 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banner.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // Funciones para avanzar y retroceder el banner
  const prevBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? banner.length - 1 : prevIndex - 1
    );
  };

  const nextBanner = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === banner.length - 1 ? 0 : prevIndex + 1
    );
  };

  // easing (suavizado)
  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  // animación smooth custom con requestAnimationFrame (cancela animaciones previas)
  const smoothScrollBy = (container, distance, duration = 500) => {
    if (!container) return;

    // cancelar animación previa de ese container si existe
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

  // obtiene el primer elemento hijo válido (tarjeta) y calcula ancho + gap
  const getCardWidth = (container) => {
    if (!container) return 0;
    // buscar el primer hijo elemento (evitar nodos de texto)
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

  // helper para resolver ref por id (sigue soportando document.getElementById como fallback)
  const getContainerById = (id) => {
    if (id === "productos") return productosRef.current;
    if (id === "maquinarias") return maquinariasRef.current;
    return document.getElementById(id);
  };

  // Scroll horizontal: usa smoothScrollBy y mueve exactamente 1 tarjeta
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

  // Filtrar destacados
  const productosDestacados = products.filter(
    (item) => item.outstanding === "si"
  );
  const maquinariaDestacada = machinery.filter(
    (item) => item.outstanding === "si"
  );
  const serviciosDestacados = services.filter(
    (item) => item.outstanding === "si"
  );

  // Modal
  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="bg-gray-100 overflow-x-hidden">
      <Header />

      <Banner
        images={banner}
        currentIndex={currentIndex}
        onPrev={prevBanner}
        onNext={nextBanner}
      />

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal} // si hacen click fuera, cierra
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full relative shadow-lg p-8"
            onClick={(e) => e.stopPropagation()} // evita que el click dentro lo cierre
          >
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:scale-150 focus:outline-none focus:ring-0"
              aria-label="Cerrar modal"
            >
              <FaTimes size={24} />
            </button>

            {/* Contenido en columnas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Imagen */}
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-80 object-cover rounded"
              />

              {/* Texto */}
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-semibold mb-4">{selectedItem.title}</h3>
                <p className="text-gray-600 text-lg">{selectedItem.description}</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* Productos */}
      <section className="mt-10 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] relative bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Productos destacados
        </h2>

        {/* Botón izquierda */}
        <button
          onClick={() => scrollLeft("productos")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center 
      z-20 hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>

        {/* Contenedor scrollable con espacio extra a los lados */}
        <div
          id="productos"
          ref={productosRef}
          className="pt-6 px-6 -mx-6 flex overflow-x-auto overflow-y-hidden gap-6 scroll-smooth no-scrollbar w-full"
        >

          {productosDestacados.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              onClick={() => openModal(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openModal(item);
              }}
              className="relative min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer
                   transition-transform duration-300 ease-in-out
                   hover:scale-110 hover:z-50"
            >
              <CardItem
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

        {/* Botón derecha */}
        <button
          onClick={() => scrollRight("productos")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center
      z-20 hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none"
        >
          <FaChevronRight className="text-blue-800" />
        </button>
      </section>

      {/* Servicios */}
      <section className="mt-2 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Servicios destacados
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {serviciosDestacados.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              onClick={() => openModal(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openModal(item);
              }}
              className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
            >
              <CardService
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>
      </section>


      {/* Maquinarias */}
      <section className="mt-10 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-[100px] relative bg-gray-100 pb-12">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Maquinarias destacadas
        </h2>

        {/* Botón izquierda */}
        <button
          onClick={() => scrollLeft("maquinarias")}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center 
      z-20 hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none"
        >
          <FaChevronLeft className="text-blue-800" />
        </button>

        {/* Contenedor scrollable */}
        <div
          id="maquinarias"
          ref={maquinariasRef}
          className="pt-6 px-6 -mx-6 flex overflow-x-auto overflow-y-hidden gap-6 scroll-smooth no-scrollbar w-full"
        >
          {maquinariaDestacada.map((item) => (
            <div
              key={item.id}
              tabIndex={0}
              onClick={() => openModal(item)}
              onKeyDown={(e) => {
                if (e.key === "Enter") openModal(item);
              }}
              className="relative min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer
                   transition-transform duration-300 ease-in-out
                   hover:scale-110 hover:z-50"
            >
              <CardItem
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

        {/* Botón derecha */}
        <button
          onClick={() => scrollRight("maquinarias")}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border w-10 h-10 items-center justify-center
      z-20 hover:scale-125 transition-transform duration-300 ease-in-out focus:outline-none"
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
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3902.4214076270105!2d-76.96286052493942!3d-12.014482988219758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTLCsDAwJzUyLjEiUyA3NsKwNTcnMzcuMCJX!5e0!3m2!1ses!2spe!4v1754349773753!5m2!1ses!2spe"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <br />
        <br />
        <br />
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
