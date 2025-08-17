// Catalog.jsx
import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import CardService from "../components/CardService";
import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

// importaciones de servicios
import { getAllProducts } from "/src/services/productsService.js";
import { getAllServices } from "/src/services/servicesService.js";
import { getAllMachines } from "/src/services/machineryService.js";

// -------------------- Modal mejorado --------------------
function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-4xl w-full relative shadow-lg p-8"
        onClick={(e) => e.stopPropagation()}
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
          {/* Imagen */}
          <div className="flex items-center justify-center">
            <img
              src={item.imageUrl || item.image || "/placeholder-service.png"}
              alt={item.name}
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Texto */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
            <p className="text-gray-600 text-lg text-justify">
              {item.description}
            </p>

            {/* Capacidad (solo si existe, ej: productos/maquinaria) */}
            {item.capacity && (
              <p className="mt-4 text-lg font-medium text-blue-800">
                Capacidad:{" "}
                {item.capacity >= 1000
                  ? `${(item.capacity / 1000).toFixed(1)} L`
                  : `${item.capacity} ml`}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------- Catálogo --------------------
function Catalog() {
  const { type } = useParams();
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState([]);

  // Fetch a la API según tipo (usando servicios)
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data = [];

        if (type === "productos") data = await getAllProducts();
        else if (type === "servicios") data = await getAllServices();
        else if (type === "maquinaria") data = await getAllMachines();

        setItems(Array.isArray(data) ? data : data?.content || data?.items || []);
      } catch (error) {
        console.error("❌ Error al cargar datos:", error);
        setItems([]);
      }
    };

    fetchData();
  }, [type]);

  // Filtro búsqueda
  const filteredItems = items.filter((item) => {
    const term = searchTerm.toLowerCase();
    return (
      item.name?.toLowerCase().includes(term) ||
      item.typeName?.toLowerCase().includes(term) // ✅ unificado
    );
  });

  // Agrupar según el tipoName de cada entidad
  const groupedItems = filteredItems.reduce((acc, item) => {
    const groupKey = item.typeName || "Otros"; // ✅ unificado
    acc[groupKey] = acc[groupKey] || [];
    acc[groupKey].push(item);
    return acc;
  }, {});

  // ---- Scroll carrusel ----
  const scrollRefs = useRef({});
  const scrollAnimRef = useRef(new Map());

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

          <input
            type="text"
            placeholder="Buscar por nombre o tipo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
        </div>

        {items.length > 0 ? (
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
                    className="hidden md:flex absolute left-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 transition-transform duration-300 ease-in-out w-10 h-10 items-center justify-center z-20"
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
                        className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px] cursor-pointer hover:z-10"
                        onClick={() => setSelectedItem(item)}
                      >
                        {type === "servicios" ? (
                          <CardService
                            name={item.name}
                            description={item.description}
                            imageUrl={item.imageUrl || item.image || "/placeholder-service.png"}
                          />
                        ) : (
                          <CardItem
                            name={item.name}
                            description={item.description}
                            imageUrl={item.imageUrl || item.image || "/placeholder.png"}
                            capacity={item.capacity}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Botón derecha */}
                  <button
                    onClick={() => scrollRight(subtipo)}
                    className="hidden md:flex absolute right-[20px] top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:scale-125 transition-transform duration-300 ease-in-out w-10 h-10 items-center justify-center z-20"
                  >
                    <FaChevronRight className="text-blue-800" />
                  </button>
                </div>
              </section>
            ))}
          </>
        ) : (
          <p className="text-gray-500 px-4">No hay elementos en esta categoría.</p>
        )}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </Layout>
  );
}

export default Catalog;
