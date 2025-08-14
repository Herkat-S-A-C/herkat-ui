// src/components/ModalForm.jsx
import { useState, useEffect } from "react";
import { updateSocialMedia } from "../services/socialMediaService";
import { getAllProductTypes } from "/src/services/typeProductsServices.js";
// Servicios
import { createProduct, updateProduct } from "../services/productsService";
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

  // 👉 Lista de tipos de producto para el combo
  const [productTypes, setProductTypes] = useState([]);

  useEffect(() => {
    if (isProducto) {
      console.log("📥 Cargando tipos de productos...");
      getAllProductTypes()
        .then((data) => {
          console.log("✅ Tipos de productos cargados:", data);
          setProductTypes(data);
        })
        .catch((err) => console.error("❌ Error cargando tipos de productos:", err));
    }
  }, [isProducto]);

  // Cargar datos si es edición
  useEffect(() => {
    if (item) {
      console.log("✏️ Editando item recibido en props:", item);
      setForm({
        id: item.id || "",
        nombre: item.name || "",
        tipo: item.type?.id || "",
        capacidad: item.capacity || "",
        descripcion: item.description || "",
        imagen: item.image?.url || "",
        file: null,
        outstanding: item.outstanding || "no",
        left: item.left || "no",
        url: item.url || "",
      });
    } else {
      const newId =
        isProducto
          ? "" 
          : lastId
          ? String(Number(lastId) + 1)
          : "1";

      console.log("🆕 Nuevo registro, ID generado:", newId);

      setForm((prev) => ({
        ...prev,
        id: newId,
      }));
    }
  }, [item, lastId, isProducto]);

  const handleChange = (e) => {
    console.log(`✏️ Campo cambiado: ${e.target.name} = ${e.target.value}`);
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("📂 Archivo seleccionado:", file);
    setForm({ ...form, file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("🖼️ Imagen convertida en base64");
        setForm((prev) => ({ ...prev, imagen: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    console.log("🚀 Enviando formulario con datos:", form);

    if (!isProducto && !form.id) {
      alert("El ID es obligatorio");
      return;
    }

    try {
      if (isBanner) {
        console.log("➡️ Guardando Banner...");
        onSave({ id: form.id, image: form.imagen });
      } else if (isSocial) {
        if (!form.url) return alert("La URL es obligatoria");
        console.log("➡️ Guardando Red Social...");
        await updateSocialMedia(form.tipo, { url: form.url });
        onSave();
        onClose();
      } else if (isTipoProductos) {
        console.log("➡️ Guardando Tipo de Producto...");
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateProductType(form.id, { name: form.nombre });
        } else {
          await createProductType({ name: form.nombre });
        }
        onSave();
        onClose();
      } else if (isTipoServicios) {
        console.log("➡️ Guardando Tipo de Servicio...");
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateServiceType(form.id, { name: form.nombre });
        } else {
          await createServiceType({ name: form.nombre });
        }
        onSave();
        onClose();
      } else if (isTipoMaquinaria) {
        console.log("➡️ Guardando Tipo de Maquinaria...");
        if (!form.nombre) return alert("Completa el nombre del tipo");
        if (item) {
          await updateMachineType(form.id, { name: form.nombre });
        } else {
          await createMachineType({ name: form.nombre });
        }
        onSave();
        onClose();
      } else if (isProducto) {
        if (!form.nombre) return alert("Completa el nombre del producto");

        const productPayload = {
          name: form.nombre,
          type: { id: parseInt(form.tipo) },
          capacity: parseFloat(form.capacidad),
          description: form.descripcion,
          image: { url: form.imagen },
        };

        console.log("📦 Payload del producto a enviar:", productPayload);

        if (item) {
          console.log("✏️ Actualizando producto con ID:", form.id);
          await updateProduct(form.id, productPayload);
        } else {
          console.log("🆕 Creando producto...");
          await createProduct(productPayload);
        }
        console.log("✅ Producto guardado correctamente");
        onSave();
        onClose();
      } else if (isMaquinaria) {
        console.log("➡️ Guardando Maquinaria...");
        onSave({
          id: form.id,
          name: form.nombre,
          type: form.tipo,
          description: form.descripcion,
          image: form.imagen,
        });
        onClose();
      } else if (isServicio) {
        console.log("➡️ Guardando Servicio...");
        onSave({
          id: form.id,
          name: form.nombre,
          type: form.tipo,
          description: form.descripcion,
          image: form.imagen,
        });
        onClose();
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error.response?.data || error.message);
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

            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="border p-2 w-full mb-2"
            >
              <option value="">Seleccione un tipo</option>
              {productTypes.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>

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
