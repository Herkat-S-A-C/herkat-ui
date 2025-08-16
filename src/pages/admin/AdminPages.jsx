import { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
import HomePreview from "/src/components/HomePreview";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Servicios
import { getSocialMedia } from "/src/services/socialMediaService.js";
import { getAllProducts, deleteProduct } from "/src/services/productsService.js";
import { getAllServices, deleteService } from "/src/services/servicesService.js";
import { getAllMachines, deleteMachine } from "/src/services/machineryService.js";
import { getAllBanners, deleteBanner } from "/src/services/bannerServices.js";
import { getAllMachineTypes, deleteMachineType } from "/src/services/typeMachineryServices.js";
import { getAllProductTypes, deleteProductType } from "/src/services/typeProductsServices.js";
import { getAllServiceTypes, deleteServiceType } from "/src/services/typeServicesServices.js";

const AdminPage = () => {
  const [data, setData] = useState({
    banner: [],
    productos: [],
    servicios: [],
    maquinaria: [],
    sociales: [],
    ProductosTipos: [],
    ServiciosTipos: [],
    MaquinariaTipos: [],
  });

  const titleMap = {
    productos: "Productos",
    servicios: "Servicios",
    maquinaria: "Maquinaria",
    banner: "Banners",
    sociales: "Redes sociales",
    ProductosTipos: "Tipos de productos",
    ServiciosTipos: "Tipos de servicios",
    MaquinariaTipos: "Tipos de maquinaria",
  };

  // Funciones de eliminación mapeadas
  const deleteMap = useMemo(
    () => ({
      ProductosTipos: deleteProductType,
      ServiciosTipos: deleteServiceType,
      MaquinariaTipos: deleteMachineType,
      productos: deleteProduct,
      servicios: deleteService,
      maquinaria: deleteMachine,
      banner: deleteBanner,
    }),
    []
  );

  const [selected, setSelected] = useState("productos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  const serviceMap = useMemo(
    () => ({
      productos: getAllProducts,
      servicios: getAllServices,
      maquinaria: getAllMachines,
      banner: getAllBanners,
      sociales: getSocialMedia,
      ProductosTipos: getAllProductTypes,
      ServiciosTipos: getAllServiceTypes,
      MaquinariaTipos: getAllMachineTypes,
    }),
    []
  );

  const fetchData = useCallback(
    async (type) => {
      try {
        if (serviceMap[type]) {
          const res = await serviceMap[type]();
          setData((prev) => ({ ...prev, [type]: res }));
        }
      } catch (error) {
        console.error(`Error cargando datos de ${type}:`, error);
      }
    },
    [serviceMap]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        if (deleteMap[selected]) {
          await deleteMap[selected](id); // eliminar en backend
          await fetchData(selected);     // recargar lista
        } else {
          console.warn(`No hay función de eliminación para ${selected}`);
        }
      } catch (error) {
        console.error(`Error eliminando ${selected} con id ${id}:`, error);
      }
    },
    [selected, deleteMap, fetchData]
  );

  // Cargar datos iniciales y tipos
  useEffect(() => {
    fetchData(selected);
    fetchData("ProductosTipos");
    fetchData("ServiciosTipos");
    fetchData("MaquinariaTipos");
  }, [selected, fetchData]);

  // Mapea nombre de tipo
  const getDataWithTypeNames = () => {
    let items = Array.isArray(data[selected]) ? [...data[selected]] : [];

    if (selected === "productos") {
      items = items.map((prod) => {
        const tipo = data.ProductosTipos.find((t) => t.id === prod.tipoProductoId);
        return { ...prod, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    if (selected === "servicios") {
      items = items.map((serv) => {
        const tipo = data.ServiciosTipos.find((t) => t.id === serv.tipoServicioId);
        return { ...serv, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    if (selected === "maquinaria") {
      items = items.map((maq) => {
        const tipo = data.MaquinariaTipos.find((t) => t.id === maq.tipoMaquinariaId);
        return { ...maq, tipoNombre: tipo ? tipo.nombre : "Sin tipo" };
      });
    }

    return items;
  };

  // Filtrar por búsqueda
  const filteredData = getDataWithTypeNames().filter((item) => {
    const nameKey = item.title || item.nombre || item.name || "";
    const typeKey = item.tipoNombre || "";
    const idKey = String(item.id || "");
    return (
      nameKey.toLowerCase().includes(search.toLowerCase()) ||
      typeKey.toLowerCase().includes(search.toLowerCase()) ||
      idKey.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {titleMap[selected] || selected}
          </h1>

          <div className="flex gap-4 items-center">
            {selected !== "sociales" && (
              <div className="relative group transition-all duration-500 ease-out">
                <span className="material-symbols-rounded absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="pl-10 pr-4 py-3 rounded-xl border border-gray-300 shadow-inner bg-white outline-none transition-all duration-500 ease-out
                   w-40 group-hover:w-80 focus-within:w-80"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            )}

            {selected !== "sociales" && (
              <button
                className="bg-blue-500 text-white font-bold px-8 py-3 rounded-xl shadow-md transform transition-all duration-200 hover:scale-[1.15] hover:shadow-lg"
                onClick={() => {
                  setModalOpen(true);
                  setEditItem(null);
                }}
              >
                Registrar
              </button>
            )}
          </div>
        </div>

        <Table
          data={filteredData}
          type={selected}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />

        <button
          onClick={() => setPreviewVisible(!previewVisible)}
          className="fixed bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:ring-2 hover:ring-indigo-400 transform transition-transform duration-300 hover:scale-[1.05] flex items-center gap-2"
        >
          {previewVisible ? <FaEyeSlash /> : <FaEye />}
        </button>

        {previewVisible && (
          <div className="fixed bottom-20 right-5 w-[26rem] h-[28rem] bg-white border border-gray-200 shadow-2xl rounded-3xl overflow-hidden z-40">
            <div className="bg-gray-100 px-4 py-2 border-b text-sm font-semibold text-gray-700">
              Vista previa
            </div>
            <div className="w-full h-full overflow-auto p-4">
              <HomePreview
                banner={data.banner}
                productos={data.productos}
                servicios={data.servicios}
                maquinaria={data.maquinaria}
              />
            </div>
          </div>
        )}

        {modalOpen && (
          <ModalForm
            type={selected}
            onClose={() => setModalOpen(false)}
            onSave={async () => {
              await fetchData(selected);
              setModalOpen(false);
            }}
            item={editItem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
