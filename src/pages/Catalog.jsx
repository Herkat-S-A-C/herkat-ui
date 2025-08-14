import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import CardService from "../components/CardService";
import { useParams } from "react-router-dom";
import { products, services, machinery } from "../constants/dataItems.js";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// Modal mejorado
function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose} // cierra al hacer click fuera
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full relative shadow-lg p-8"
        onClick={(e) => e.stopPropagation()} // evita que el click dentro cierre
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 hover:scale-150 focus:outline-none focus:ring-0"
          aria-label="Cerrar modal"
        >
          <FaTimes size={24} />
        </button>

        {/* Contenido en columnas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen 16:9 */}
          <div className="flex items-center justify-center">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
            <p className="text-gray-600 text-lg text-justify">{item.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Catalog() {
  const { type } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const dataMap = {
    productos: products,
    servicios: services,
    maquinaria: machinery,
  };

  const items = dataMap[type?.toLowerCase()] || [];

  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.title.toLowerCase().includes(term) ||
      item.type.toLowerCase().includes(term)
    );
  });

  const groupedItems = filteredItems.reduce((acc, item) => {
    acc[item.type] = acc[item.type] || [];
    acc[item.type].push(item);
    return acc;
  }, {});

  // ---- Scroll como en Home ----
  const scrollRefs = useRef({});
  const scrollAnimRef = useRef(new Map());

  const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

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
    const firstChild = Array.from(container.children).find((c) => c.nodeType === 1);
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

  const scrollLeft = (subtipo) => {
    const container = scrollRefs.current[subtipo];
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    smoothScrollBy(container, -cardWidth);
  };

  const scrollRight = (subtipo) => {
    const container = scrollRefs.current[subtipo];
    if (!container) return;
    const cardWidth = getCardWidth(container);
    if (!cardWidth) return;
    smoothScrollBy(container, cardWidth);
  };
  // -----------------------------

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Título + barra de búsqueda */}
        <div className="px-4 md:px-6 pt-8 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold capitalize">{type}</h1>

          {type !== "servicios" && (
            <input
              type="text"
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500
              transition duration-200"
            />
          )}
        </div>

        {items.length > 0 ? (
          type === "servicios" ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-4 md:px-[150px] overflow-visible pb-20">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 hover:z-10 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                  transform-origin-center
                  overflow-hidden"
                  onClick={() => setSelectedItem(item)}
                >
                  <CardService
                    title={item.title}
                    description={item.description}
                    image={item.image}
                    reverse={item.id % 2 === 0}
                  />
                </div>

              ))}

            </div>
          ) : (
            <>
              {Object.entries(groupedItems).map(([subtipo, itemsSubgrupo]) => (
                <section className="mb-12 bg-gray-100" key={subtipo}>
                  <h2 className="px-[60px] text-lg md:text-xl font-semibold text-gray-800 mb-3 capitalize">
                    {subtipo}
                  </h2>

                  <div className="relative px-[60px]">
                    {/* Botón izquierda */}
                    <button
                      onClick={() => scrollLeft(subtipo)}
                      className="hidden md:flex absolute left-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125
                      transition-transform duration-300 ease-in-out w-10 h-10 items-center justify-center z-20"
                    >
                      <FaChevronLeft className="text-blue-800" />
                    </button>

                    {/* Carrusel */}
                    <div
                      ref={(el) => (scrollRefs.current[subtipo] = el)}
                      className="pt-4 flex overflow-x-auto overflow-y-hidden gap-6 scroll-smooth no-scrollbar w-full pl-[20px] pr-[20px]"
                    >
                      {itemsSubgrupo.map((item) => (
                        <div
                          key={item.id}
                          className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer transition-transform duration-300 ease-in-out
                          hover:scale-110 hover:z-10"
                          onClick={() => setSelectedItem(item)}
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
                      onClick={() => scrollRight(subtipo)}
                      className="hidden md:flex absolute right-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border
      hover:scale-125 transition-transform duration-300 ease-in-out w-10 h-10 items-center justify-center z-20"
                    >
                      <FaChevronRight className="text-blue-800" />
                    </button>
                  </div>
                </section>

              ))}
            </>
          )
        ) : (
          <p className="text-gray-500 px-4">No hay elementos en esta categoría.</p>
        )}
      </div>

      {selectedItem && <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />}
    </Layout>
  );
}

export default Catalog;
