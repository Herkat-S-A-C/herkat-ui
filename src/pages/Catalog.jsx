import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import CardServices from "../components/CardService";
import { useParams } from "react-router-dom";
import { products, services, machinery } from "../constants/dataItems.js";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Modal simple
function Modal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
        <p className="text-gray-600">{item.description}</p>
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

  const scrollRefs = useRef({});

  const scroll = (subtipo, direction) => {
    const ref = scrollRefs.current[subtipo];
    if (ref) {
      ref.scrollBy({ left: direction * 300, behavior: "smooth" });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100">
        {/* Título + barra de búsqueda alineados */}
        <div className="px-4 md:px-6 pt-8 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold capitalize">
            {type}
          </h1>

          {type !== "servicios" && (
            <input
              type="text"
              placeholder="Buscar por nombre o tipo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
            />
          )}
        </div>

        {items.length > 0 ? (
          type === "servicios" ? (
            <div className="grid grid-cols-1 gap-4 px-4 md:px-[100px]">
              {items.map((item) => (
                <CardServices
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  image={item.image}
                  reverse={item.id % 2 === 0}
                />
              ))}
            </div>
          ) : (
            <>
              {Object.entries(groupedItems).map(
                ([subtipo, itemsSubgrupo]) => (
                  <section
                    className="mb-12 px-4 md:px-6 bg-gray-100"
                    key={subtipo}
                  >
                    <h2 className="text-lg md:text-xl font-semibold text-gray-700 mb-3 capitalize">
                      {subtipo}
                    </h2>

                    <div className="relative">
                      <button
                        onClick={() => scroll(subtipo, -1)}
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
                      >
                        <FaChevronLeft className="text-blue-800" />
                      </button>

                      <div
                        ref={(el) => (scrollRefs.current[subtipo] = el)}
                        className="pt-4 px-6 flex overflow-x-auto gap-3 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar w-full"
                      >
                        {itemsSubgrupo.map((item) => (
                          <div
                            key={item.id}
                            className="min-w-[240px] max-w-[240px] flex-shrink-0 h-[370px]"
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

                      <button
                        onClick={() => scroll(subtipo, 1)}
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 items-center justify-center z-10"
                      >
                        <FaChevronRight className="text-blue-800" />
                      </button>
                    </div>
                  </section>
                )
              )}
            </>
          )
        ) : (
          <p className="text-gray-500 px-4">
            No hay elementos en esta categoría.
          </p>
        )}
      </div>

      {selectedItem && (
        <Modal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </Layout>
  );
}

export default Catalog;
