import { useState, useEffect } from "react";

const ModalForm = ({ type, onClose, onSave, item }) => {
  const isBanner = type === "banner";

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    tipo: "",
    capacidad: "",
    descripcion: "",
    imagen: "",
    outstanding: "no",
    left: "no"
  });

  useEffect(() => {
    if (item) {
      setForm({
        id: item.id || "",
        nombre: item.title || item.nombre || "",
        tipo: item.type || item.tipo || "",
        capacidad: item.capacidad || "",
        descripcion: item.description || item.descripcion || "",
        imagen: item.image || item.imagen || "",
        outstanding: item.outstanding || "no",
        left: item.left || "no"
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.id) return alert("El ID es obligatorio");
    if (!isBanner && !form.nombre) return alert("Completa al menos ID y Nombre");

    onSave(
      isBanner
        ? {
            id: form.id,
            image: form.imagen
          }
        : {
            id: form.id,
            title: form.nombre,
            type: form.tipo,
            capacidad: form.capacidad,
            description: form.descripcion,
            image: form.imagen,
            outstanding: form.outstanding,
            left: form.left
          }
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">
          {item ? "Editar" : "Registrar"} {isBanner ? "Banner" : "Elemento"}
        </h2>

        {/* Campos para Banner */}
        {isBanner ? (
          <>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="ID"
              className="border p-2 w-full mb-2"
            />
            <input
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="URL Imagen"
              className="border p-2 w-full mb-4"
            />
          </>
        ) : (
          <>
            <input
              name="id"
              value={form.id}
              onChange={handleChange}
              placeholder="ID"
              className="border p-2 w-full mb-2"
            />
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Nombre"
              className="border p-2 w-full mb-2"
            />
            <input
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              placeholder="Tipo"
              className="border p-2 w-full mb-2"
            />
            <input
              name="capacidad"
              value={form.capacidad}
              onChange={handleChange}
              placeholder="Capacidad"
              className="border p-2 w-full mb-2"
            />
            <input
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              className="border p-2 w-full mb-2"
            />
            <input
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              placeholder="URL Imagen"
              className="border p-2 w-full mb-4"
            />

            <label className="block mb-2 font-semibold">¿Destacado?</label>
            <select
              name="outstanding"
              value={form.outstanding}
              onChange={handleChange}
              className="border p-2 w-full mb-4"
            >
              <option value="si">Sí</option>
              <option value="no">No</option>
            </select>

            {(item?.left !== undefined || form.left !== "no") && (
              <>
                <label className="block mb-2 font-semibold">¿Ubicar a la izquierda?</label>
                <select
                  name="left"
                  value={form.left}
                  onChange={handleChange}
                  className="border p-2 w-full mb-4"
                >
                  <option value="sí">Sí</option>
                  <option value="no">No</option>
                </select>
              </>
            )}
          </>
        )}

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
            {item ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
