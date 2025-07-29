import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import CardServices from "../components/CardServices";
import { useParams } from "react-router-dom";
import { productos, servicios, maquinaria } from "../constants/dataItems.js";
import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function Catalog() {
  const { tipo } = useParams();

  const dataMap = {
    products: productos,
    services: servicios,
    machinery: maquinaria,
  };

  const items = dataMap[tipo] || [];

  const groupedItems = items.reduce((acc, item) => {
    acc[item.tipo] = acc[item.tipo] || [];
    acc[item.tipo].push(item);
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
        <h1 className="text-3xl font-bold mb-6 capitalize px-6 pt-8">{tipo}</h1>

        {items.length > 0 ? (
          tipo === "services" ? (
            <div className="grid grid-cols-1 gap-4 px-[100px]">
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
              {Object.entries(groupedItems).map(([subtipo, itemsSubgrupo]) => (
                <section
                  className="mb-12 px-6 relative bg-gray-100"
                  key={subtipo}
                >
                  <h2 className="text-xl font-semibold text-gray-700 mb-3 capitalize">
                    {subtipo}
                  </h2>
                  {/* Botón izquierdo */}
                  <button
                    onClick={() => scroll(subtipo, -1)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
                  >
                    <FaChevronLeft className="text-blue-800" />
                  </button>

                  {/* Carrusel horizontal */}
                  <div
                    ref={(el) => (scrollRefs.current[subtipo] = el)}
                    className="flex overflow-x-auto gap-4 scroll-smooth transition-transform duration-500 ease-in-out no-scrollbar"
                  >
                    {itemsSubgrupo.map((item) => (
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

                  {/* Botón derecho */}
                  <button
                    onClick={() => scroll(subtipo, 1)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md border hover:bg-blue-100 w-10 h-10 flex items-center justify-center z-10"
                  >
                    <FaChevronRight className="text-blue-800" />
                  </button>
                </section>
              ))}
            </>
          )
        ) : (
          <p className="text-gray-500 px-6">No hay elementos en esta categoría.</p>
        )}
      </div>
    </Layout>
  );
}

export default Catalog;
