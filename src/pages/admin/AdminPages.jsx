import { useState, useEffect, useMemo, useCallback } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
import HomePreview from "/src/components/HomePreview";
import { FaEye, FaEyeSlash } from "react-icons/fa";

// Servicios
import { getSocialMedia } from "/src/services/socialMediaService.js";
import { getAllProducts } from "/src/services/productsService.js";
import { getAllServices } from "/src/services/servicesService.js";
import { getAllMachines } from "/src/services/machineryService.js";
import { getAllBanners } from "/src/services/bannerServices.js";
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

  // Mapa de funciones de eliminación (memoizado)
const deleteMap = useMemo(
  () => ({
    ProductosTipos: deleteProductType,
    ServiciosTipos: deleteServiceType,
    MaquinariaTipos: deleteMachineType,
  }),
  []
);


  const [selected, setSelected] = useState("productos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Mapa de servicios
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

  // Función para cargar datos
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

  // Función para eliminar
  const handleDelete = useCallback(
    async (id) => {
      try {
        if (deleteMap[selected]) {
          await deleteMap[selected](id);
          await fetchData(selected);
        } else {
          console.warn(`No hay función de eliminación para ${selected}`);
        }
      } catch (error) {
        console.error(`Error eliminando ${selected} con id ${id}:`, error);
      }
    },
    [selected, deleteMap, fetchData]
  );

  // Cargar al inicio y cuando cambie "selected"
  useEffect(() => {
    fetchData(selected);
  }, [selected, fetchData]);

  // Filtrar datos según búsqueda
  const filteredData = Array.isArray(data[selected])
    ? data[selected].filter((item) => {
        const nameKey = item.title || item.nombre || item.name || "";
        const idKey = String(item.id || "");
        return (
          nameKey.toLowerCase().includes(search.toLowerCase()) ||
          idKey.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold capitalize text-gray-800">
            {selected}
          </h1>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Buscar..."
              className="p-2 px-4 rounded-xl border border-gray-300 shadow-inner bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {selected !== "sociales" && (
              <button
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white px-5 py-2 rounded-xl shadow-md hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:ring-2 hover:ring-indigo-400 hover:bg-blue-500 transform transition-transform hover:scale-[1.02]"
                onClick={() => {
                  setModalOpen(true);
                  setEditItem(null);
                }}
              >
                Registrar +
              </button>
            )}
          </div>
        </div>

        {/* Tabla dinámica */}
        <Table
          data={filteredData}
          type={selected}
          onEdit={(item) => {
            setEditItem(item);
            setModalOpen(true);
          }}
          onDelete={handleDelete}
        />
        

        {/* Botón Vista Previa */}
        <button
          onClick={() => setPreviewVisible(!previewVisible)}
          className="fixed bottom-5 right-5 z-50 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-5 py-3 rounded-full shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:ring-2 hover:ring-indigo-400 transform transition-transform duration-300 hover:scale-[1.05] flex items-center gap-2"
        >
          {previewVisible ? <FaEyeSlash /> : <FaEye />}
        </button>

        {/* Vista previa */}
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

        {/* Modal */}
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
