import { useState, useEffect } from "react";

const ModalForm = ({ type, onClose, onSave, item }) => {
  const isBanner = type === "banner";
  const isSocial = type === "sociales";
  const isTipo = type === "tipos";

  const [form, setForm] = useState({
    id: "",
    nombre: "",
    tipo: "",
    capacidad: "",
    descripcion: "",
    imagen: "",
    file: null,
    outstanding: "no",
    left: "no",
    url: "",
    hoverColor: "",
    icon: "",
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
        file: null,
        outstanding: item.outstanding || "no",
        left: item.left || "no",
        url: item.url || "",
        hoverColor: item.hoverColor || "",
        icon: item.icon || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!form.id) return alert("El ID es obligatorio");

    let imageData = form.imagen;
    if (form.file) {
      imageData = form.file;
    }

    if (isBanner) {
      onSave({ id: form.id, image: imageData });
    } else if (isSocial) {
      if (!form.nombre || !form.url)
        return alert("Título y URL son obligatorios");
      onSave({
        id: form.id,
        title: form.nombre,
        url: form.url,
        hoverColor: form.hoverColor,
        icon: form.icon,
      });
    } else if (isTipo) {
      if (!form.nombre) return alert("Completa al menos ID y Nombre");
      onSave({
        id: form.id,
        nombre: form.nombre,
      });
    } else {
      if (!form.nombre) return alert("Completa al menos ID y Nombre");
      onSave({
        id: form.id,
        title: form.nombre,
        type: form.tipo,
        capacidad: form.capacidad,
        description: form.descripcion,
        image: imageData,
        outstanding: form.outstanding,
        left: form.left,
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">
          {item ? "Editar" : "Registrar"}{" "}
          {isBanner
            ? "Banner"
            : isSocial
            ? "Red Social"
            : isTipo
            ? "Tipo"
            : "Elemento"}
        </h2>

        {/* Banner */}
        {isBanner && (
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
              className="border p-2 w-full mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4"
            />
            {form.imagen && (
              <img
                src={form.file ? URL.createObjectURL(form.file) : form.imagen}
                alt="Vista previa"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
          </>
        )}

        {/* Redes Sociales */}
        {isSocial && (
          <>
            <input
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Título"
              className="border p-2 w-full mb-2"
            />
            <input
              name="url"
              value={form.url}
              onChange={handleChange}
              placeholder="URL"
              className="border p-2 w-full mb-2"
            />
          </>
        )}

        {/* Tipos */}
        {isTipo && (
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
          </>
        )}

        {/* Productos / Servicios / Maquinaria */}
        {!isBanner && !isSocial && !isTipo && (
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
              className="border p-2 w-full mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="border p-2 w-full mb-4"
            />
            {form.imagen && (
              <img
                src={form.file ? URL.createObjectURL(form.file) : form.imagen}
                alt="Vista previa"
                className="w-full h-40 object-cover rounded mb-4"
              />
            )}
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
            {type === "servicios" && (
              <>
                <label className="block mb-2 font-semibold">
                  ¿Ubicar a la izquierda?
                </label>
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
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {item ? "Guardar" : "Agregar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalForm;
