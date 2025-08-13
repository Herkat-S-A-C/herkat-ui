import { useState, useEffect } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
import HomePreview from "/src/components/HomePreview";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {getSocialMedia} from "/src/services/socialMediaService.js";

const API_BASE = "https://herkat-api.onrender.com";

const endpointsMap = {
  productos: "products",
  servicios: "service-items",
  maquinaria: "machines",
  banner: "banners",
  sociales: "social-media", // usaremos ruta especial para GET
  tipos: "tipos",
};

const AdminPage = () => {
  const [data, setData] = useState({
    banner: [],
    productos: [],
    servicios: [],
    maquinaria: [],
    sociales: [],
    tipos: [],
  });

  const [selected, setSelected] = useState("productos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(false);

  // Cargar datos desde la API
  useEffect(() => {
  const fetchData = async () => {
    try {
      let result;

      if (selected === "sociales") {
        // Llamamos al método GET del servicio
        result = await getSocialMedia();
      } else {
        const endpoint = endpointsMap[selected];
        const res = await fetch(`${API_BASE}/${endpoint}`);
        const json = await res.json();
        result = Array.isArray(json) ? json : json.data || [];
      }

      setData((prev) => ({
        ...prev,
        [selected]: result,
      }));
    } catch (error) {
      console.error(`Error cargando ${selected}:`, error);
    }
  };

  fetchData();
}, [selected]);

  // Filtrado de datos
  const filteredData = Array.isArray(data[selected])
    ? data[selected].filter((item) => {
        if (selected === "banner") {
          return String(item.id).toLowerCase().includes(search.toLowerCase());
        }
        if (selected === "tipos") {
          const nameKey = item.nombre || "";
          return (
            nameKey.toLowerCase().includes(search.toLowerCase()) ||
            String(item.id).toLowerCase().includes(search.toLowerCase())
          );
        }
        if (selected === "sociales") {
          const nameKey = item.title || "";
          return (
            nameKey.toLowerCase().includes(search.toLowerCase()) ||
            String(item.id).toLowerCase().includes(search.toLowerCase())
          );
        }
        const nameKey = item.title || item.nombre || "";
        const idKey = String(item.id);
        return (
          nameKey.toLowerCase().includes(search.toLowerCase()) ||
          idKey.toLowerCase().includes(search.toLowerCase())
        );
      })
    : [];

  const handleSave = async (newItem) => {
    const endpoint = endpointsMap[selected];
    try {
      if (editItem) {
        // Editar
        const res = await fetch(`${API_BASE}/${endpoint}/${editItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        if (!res.ok) throw new Error("Error al editar");
      } else {
        // Crear
        const res = await fetch(`${API_BASE}/${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newItem),
        });
        if (!res.ok) throw new Error("Error al crear");
      }
      // Recargar datos
      const updatedRes = await fetch(`${API_BASE}/${endpoint}`);
      const updatedJson = await updatedRes.json();
      setData((prev) => ({
        ...prev,
        [selected]: Array.isArray(updatedJson)
          ? updatedJson
          : updatedJson.data || [],
      }));
    } catch (error) {
      console.error("Error guardando:", error);
    }
    setEditItem(null);
    setModalOpen(false);
  };

  const handleDelete = async (id) => {
    const endpoint = endpointsMap[selected];
    try {
      const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error al eliminar");
      setData((prev) => ({
        ...prev,
        [selected]: prev[selected].filter((item) => item.id !== id),
      }));
    } catch (error) {
      console.error("Error eliminando:", error);
    }
  };

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
            onSave={handleSave}
            item={editItem}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
