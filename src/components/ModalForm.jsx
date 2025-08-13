// src/components/ModalForm.jsx
import { useState, useEffect } from "react";
import { updateSocialMedia } from "../services/socialMediaService";

// Servicios de tipos
import { createMachineType, updateMachineType } from "../services/typeMachineryServices";
import { createProductType, updateProductType } from "../services/typeProductsServices";
import { createServiceType, updateServiceType } from "../services/typeServicesServices";

const ModalForm = ({ type, onClose, onSave, item, lastId }) => {
  const isBanner = type === "banner";
  const isSocial = type === "sociales";
  const isTipoProductos = type === "ProductosTipos";
  const isTipoServicios = type === "ServiciosTipos";
  const isTipoMaquinaria = type === "MaquinariaTipos";
  const isProducto = type === "productos";
  const isMaquinaria = type === "maquinarias";
  const isServicio = type === "servicios";

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
  });

  // Cargar datos si es edición
  useEffect(() => {
    if (item) {
      setForm({
        id: item.id || "",
        nombre: item.name || "",
        tipo: item.type || "",
        capacidad: item.capacity || "",
        descripcion: item.description || "",
        imagen: item.image || "",
        file: null,
        outstanding: item.outstanding || "no",
        left: item.left || "no",
        url: item.url || "",
      });
    } else {
      setForm((prev) => ({
        ...prev,
        id: lastId ? String(Number(lastId) + 1) : "1",
      }));
    }
  }, [item, lastId]);

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

  const handleSubmit = async () => {
    if (!form.id) return alert("El ID es obligatorio");

    let imageData = form.imagen;
    if (form.file) imageData = form.file;

    try {
      if (isBanner) {
        onSave({ id: form.id, image: imageData });
      } 
      else if (isSocial) {
        if (!form.url) return alert("La URL es obligatoria");
        await updateSocialMedia(form.tipo, { url: form.url });
        onSave();
        onClose();
      } 
      else if (isTipoProductos) {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateProductType(form.id, { name: form.nombre });
        } else {
          await createProductType({ name: form.nombre });
        }
        onSave();
        onClose();
      } 
      else if (isTipoServicios) {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateServiceType(form.id, { name: form.nombre });
        } else {
          await createServiceType({ name: form.nombre });
        }
        onSave();
        onClose();
      } 
      else if (isTipoMaquinaria) {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateMachineType(form.id, { name: form.nombre });
        } else {
          await createMachineType({ name: form.nombre });
        }
        onSave();
        onClose();
      } 
      else if (isProducto) {
        onSave({
          id: form.id,
          name: form.nombre,
          type: form.tipo,
          capacity: form.capacidad,
          description: form.descripcion,
          image: imageData,
        });
        onClose();
      } 
      else if (isMaquinaria) {
        onSave({
          id: form.id,
          name: form.nombre,
          type: form.tipo,
          description: form.descripcion,
          image: imageData,
        });
        onClose();
      } 
      else if (isServicio) {
        onSave({
          id: form.id,
          name: form.nombre,
          type: form.tipo,
          description: form.descripcion,
          image: imageData,
        });
        onClose();
      }
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Ocurrió un error al guardar los datos");
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
            : isTipoProductos
            ? "Tipo de Producto"
            : isTipoServicios
            ? "Tipo de Servicio"
            : isTipoMaquinaria
            ? "Tipo de Maquinaria"
            : isProducto
            ? "Producto"
            : isMaquinaria
            ? "Maquinaria"
            : isServicio
            ? "Servicio"
            : "Elemento"}
        </h2>

        {/* Campos para Tipos */}
{(isTipoProductos || isTipoServicios || isTipoMaquinaria) && (
  <>
    {item && (
      <input
        name="id"
        value={form.id}
        disabled
        className="border p-2 w-full mb-2 bg-gray-100"
      />
    )}
    <input
      name="nombre"
      value={form.nombre}
      onChange={handleChange}
      placeholder="Nombre"
      className="border p-2 w-full mb-2"
    />
  </>
)}

{/* Campos para Productos */}
{isProducto && (
  <>
    {item && (
      <input
        name="id"
        value={form.id}
        disabled
        className="border p-2 w-full mb-2 bg-gray-100"
      />
    )}
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
  </>
)}

{/* Campos para Redes sociales */}
{isSocial && (
  <>
    {item && (
      <>
        {/* ID solo lectura */}
        <input
          name="id"
          value={form.id}
          disabled
          className="border p-2 w-full mb-2 bg-gray-100"
        />
        {/* Solo URL editable */}
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="URL de la red social"
          className="border p-2 w-full mb-2"
        />
      </>
    )}

    {!item && (
      <>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre de la red social"
          className="border p-2 w-full mb-2"
        />
        <input
          name="url"
          value={form.url}
          onChange={handleChange}
          placeholder="URL de la red social"
          className="border p-2 w-full mb-2"
        />
      </>
    )}
  </>
)}

{/* Campos para Maquinaria y Servicios */}
{(isMaquinaria || isServicio) && (
  <>
    {item && (
      <input
        name="id"
        value={form.id}
        disabled
        className="border p-2 w-full mb-2 bg-gray-100"
      />
    )}
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
  </>
)}

{/* Campos para Banner */}
{isBanner && (
  <>
    {item && (
      <input
        name="id"
        value={form.id}
        disabled
        className="border p-2 w-full mb-2 bg-gray-100"
      />
    )}
    <input
      name="nombre"
      value={form.nombre}
      onChange={handleChange}
      placeholder="Nombre"
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
