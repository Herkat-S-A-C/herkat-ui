import { useState } from "react";
import Sidebar from "/src/components/Sidebar";
import Table from "/src/components/Table";
import ModalForm from "/src/components/ModalForm";
import HomePreview from "/src/components/HomePreview";
import { products, services, machinery, banner } from "/src/constants/dataItems";

const AdminPage = () => {
  const [data, setData] = useState({
    banner: banner,
    productos: products,
    servicios: services,
    maquinaria: machinery,
  });

  const [selected, setSelected] = useState("productos");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [previewVisible, setPreviewVisible] = useState(true); // Estado para mostrar/ocultar la vista previa

  // Filtrar datos
  const filteredData = data[selected].filter((item) => {
    if (selected === "banner") {
      return String(item.id).toLowerCase().includes(search.toLowerCase());
    }
    const nameKey = item.title || item.nombre || "";
    const idKey = String(item.id);
    return (
      nameKey.toLowerCase().includes(search.toLowerCase()) ||
      idKey.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Guardar
  const handleSave = (newItem) => {
    if (editItem) {
      const updated = data[selected].map((item) =>
        item.id === editItem.id ? newItem : item
      );
      setData({ ...data, [selected]: updated });
    } else {
      setData({ ...data, [selected]: [...data[selected], newItem] });
    }
    setEditItem(null);
    setModalOpen(false);
  };

  // Eliminar
  const handleDelete = (id) => {
    const updated = data[selected].filter((item) => item.id !== id);
    setData({ ...data, [selected]: updated });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar selected={selected} setSelected={setSelected} />

      <div className="flex-1 p-6">
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold capitalize">{selected}</h1>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Buscar..."
              className="border p-2 rounded"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => {
                setModalOpen(true);
                setEditItem(null);
              }}
            >
              Registrar +
            </button>
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

        {/* Botón para mostrar/ocultar la vista previa */}
        <button
          onClick={() => setPreviewVisible(!previewVisible)}
          className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 z-50"
        >
          {previewVisible ? "Ocultar Vista Previa" : "Mostrar Vista Previa"}
        </button>

        {/* Vista previa solo si está visible */}
        {previewVisible && (
          <div className="fixed bottom-16 right-4 w-96 h-64 bg-white border shadow-lg rounded-lg overflow-hidden">
            <div className="bg-gray-200 px-4 py-2 border-b text-sm font-bold">
              Vista previa
            </div>
            <div className="w-full h-full overflow-auto">
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
