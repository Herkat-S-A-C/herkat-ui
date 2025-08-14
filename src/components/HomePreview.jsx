import { useEffect, useState, useRef } from "react";
import Banner from "../components/Banner";
import CardItem from "../components/CardItem";
import CardService from "../components/CardService";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

const HomePreview = ({ banner, productos, servicios, maquinaria }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);

  const productosRef = useRef(null);
  const maquinariasRef = useRef(null);
  const scrollAnimRef = useRef(new Map());

  // autoplay banner cada 8s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banner.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [banner.length]);

  const prevBanner = () => {
    setCurrentIndex((prev) => (prev === 0 ? banner.length - 1 : prev - 1));
  };

  const nextBanner = () => {
    setCurrentIndex((prev) => (prev === banner.length - 1 ? 0 : prev + 1));
  };

  const easeInOutQuad = (t) =>
    t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

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
    return null;
  };

  const scrollLeft = (id) => {
    const container = getContainerById(id);
    if (!container) return;
    smoothScrollBy(container, -getCardWidth(container));
  };

  const scrollRight = (id) => {
    const container = getContainerById(id);
    if (!container) return;
    smoothScrollBy(container, getCardWidth(container));
  };

  const productosDestacados = productos.filter(
    (item) => item.outstanding === "si"
  );
  const maquinariaDestacada = maquinaria.filter(
    (item) => item.outstanding === "si"
  );
  const serviciosDestacados = servicios.filter(
    (item) => item.outstanding === "si"
  );

  const openModal = (item) => setSelectedItem(item);
  const closeModal = () => setSelectedItem(null);

  return (
    <div className="flex justify-center items-start w-full h-full overflow-auto bg-gray-100 rounded shadow-lg relative">
      <div style={{ transform: "scale(0.7)", transformOrigin: "top center", width: "140%" }}>
        
        <Banner
          images={banner}
          currentIndex={currentIndex}
          onPrev={prevBanner}
          onNext={nextBanner}
        />

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
                <img
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  className="w-full h-80 object-cover rounded"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-2xl font-semibold mb-4">{selectedItem.title}</h3>
                  <p className="text-gray-600 text-lg">{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Productos */}
        <section className="mt-6 px-4 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Productos destacados</h2>
          <button
            onClick={() => scrollLeft("productos")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 w-8 h-8 items-center justify-center z-20"
          >
            <FaChevronLeft className="text-blue-800" />
          </button>
          <div
            id="productos"
            ref={productosRef}
            className="pt-2 px-1.5 flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
          >
            {productosDestacados.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px] cursor-pointer hover:scale-105 transition-transform"
              >
                <CardItem title={item.title} description={item.description} image={item.image} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight("productos")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 w-8 h-8 items-center justify-center z-20"
          >
            <FaChevronRight className="text-blue-800" />
          </button>
        </section>

        {/* Servicios */}
        <section className="mt-6 px-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Servicios destacados</h2>
          <div className="grid grid-cols-1 gap-4">
            {serviciosDestacados.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <CardService
                  image={item.image}
                  title={item.title}
                  description={item.description}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Maquinarias */}
        <section className="mt-6 px-4 relative">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Maquinarias destacadas</h2>
          <button
            onClick={() => scrollLeft("maquinarias")}
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 w-8 h-8 items-center justify-center z-20"
          >
            <FaChevronLeft className="text-blue-800" />
          </button>
          <div
            id="maquinarias"
            ref={maquinariasRef}
            className="pt-2 px-1.5 flex overflow-x-auto gap-4 scroll-smooth no-scrollbar w-full"
          >
            {maquinariaDestacada.map((item) => (
              <div
                key={item.id}
                onClick={() => openModal(item)}
                className="min-w-[180px] max-w-[180px] flex-shrink-0 h-[280px] cursor-pointer hover:scale-105 transition-transform"
              >
                <CardItem title={item.title} description={item.description} image={item.image} />
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollRight("maquinarias")}
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 w-8 h-8 items-center justify-center z-20"
          >
            <FaChevronRight className="text-blue-800" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default HomePreview;
