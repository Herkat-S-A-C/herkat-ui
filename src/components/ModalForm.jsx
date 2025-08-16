// src/components/ModalForm.jsx
import { useState, useEffect } from "react";
import { formConfig } from "../constants/formConfig";

// Servicios API
import { updateSocialMedia } from "../services/socialMediaService";
import { getAllProductTypes, createProductType, updateProductType } from "../services/typeProductsServices";
import { getAllMachineTypes, createMachineType, updateMachineType } from "../services/typeMachineryServices";
import { getAllServiceTypes, createServiceType, updateServiceType } from "../services/typeServicesServices";
import { createProduct, updateProduct } from "../services/productsService";
import { createMachine, updateMachine } from "../services/machineryService";
import { createService, updateService } from "../services/servicesService";
import { createBanner, updateBanner } from "../services/bannerServices";

const ModalForm = ({ type, onClose, onSave, item, lastId }) => {
  const isBanner = type === "banner";
  const isSocial = type === "sociales";
  const [form, setForm] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Cargar listas dinámicas
  useEffect(() => {
    if (type === "productos") {
      getAllProductTypes().then(setProductTypes).catch(console.error);
    }
    if (type === "maquinaria") {
      getAllMachineTypes().then(setMachineTypes).catch(console.error);
    }
    if (type === "servicios") {
      getAllServiceTypes().then(setServiceTypes).catch(console.error);
    }
  }, [type]);

  // Prellenar si está en edición
  useEffect(() => {
    if (item) {
      setForm({
        id: item.id || "",
        nombre: item.name || "",
        tipo: item.typeId || "",
        capacidad: item.capacity || "",
        descripcion: item.description || "",
        imagen: item.imageUrl || "",
        file: null,
        outstanding: item.outstanding || "no",
        left: item.left || "no",
        url: item.url || "",
      });
    } else {
      const newId =
        ["productos", "maquinaria", "servicios"].includes(type)
          ? ""
          : lastId
          ? String(Number(lastId) + 1)
          : "1";
      setForm({ id: newId });
    }
  }, [item, lastId, type]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      // 📌 Banner: solo nombre + imagen
      if (isBanner) {
        if (!form.nombre) return alert("Completa el nombre del banner");
        if (!form.file && !item) return alert("Selecciona una imagen para el banner");

        const formData = new FormData();
        formData.append("name", form.nombre);
        if (form.file) formData.append("image", form.file);

        item
          ? await updateBanner(form.id, formData)
          : await createBanner(formData);

        onSave();
        return onClose();
      }

      // 📌 Redes sociales
      if (isSocial) {
        if (!form.url) return alert("La URL es obligatoria");
        await updateSocialMedia(form.tipo, { url: form.url });
        onSave();
        return onClose();
      }

      // 📌 Tipos de producto
      if (type === "ProductosTipos") {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        item
          ? await updateProductType(form.id, { name: form.nombre })
          : await createProductType({ name: form.nombre });
        onSave();
        return onClose();
      }

      // 📌 Tipos de servicio
      if (type === "ServiciosTipos") {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        item
          ? await updateServiceType(form.id, { name: form.nombre })
          : await createServiceType({ name: form.nombre });
        onSave();
        return onClose();
      }

      // 📌 Tipos de maquinaria
      if (type === "MaquinariaTipos") {
        if (!form.nombre) return alert("Completa el nombre del tipo");
        item
          ? await updateMachineType(form.id, { name: form.nombre })
          : await createMachineType({ name: form.nombre });
        onSave();
        return onClose();
      }

      // 📌 Productos
      if (type === "productos") {
        if (!form.nombre) return alert("Completa el nombre del producto");
        if (!form.tipo) return alert("Selecciona un tipo de producto");

        const formData = new FormData();
        formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("capacity", parseFloat(form.capacidad) || 0);
        formData.append("description", form.descripcion || "");
        if (form.file) formData.append("image", form.file);

        item
          ? await updateProduct(form.id, formData)
          : await createProduct(formData);

        onSave();
        return onClose();
      }

      // 📌 Maquinaria
      if (type === "maquinaria") {
        if (!form.nombre) return alert("Completa el nombre de la maquinaria");
        if (!form.tipo) return alert("Selecciona un tipo de maquinaria");

        const formData = new FormData();
        formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("description", form.descripcion || "");
        if (form.file) formData.append("image", form.file);

        item
          ? await updateMachine(form.id, formData)
          : await createMachine(formData);

        onSave();
        return onClose();
      }

      // 📌 Servicios
      if (type === "servicios") {
        if (!form.nombre) return alert("Completa el nombre del servicio");
        if (!form.tipo) return alert("Selecciona un tipo de servicio");

        const formData = new FormData();
        formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("description", form.descripcion || "");
        if (form.file) formData.append("image", form.file);

        item
          ? await updateService(form.id, formData)
          : await createService(formData);

        onSave();
        return onClose();
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error.response?.data || error.message);
      alert("Ocurrió un error al guardar los datos");
    }
  };

  const fields = formConfig[type] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-auto">
        <h2 className="text-xl font-bold mb-4">
          {item ? "Editar" : "Registrar"} {type}
        </h2>

        {fields.map((field) => {
          if (field.type === "text" || field.type === "number") {
            return (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                value={form[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className="border p-2 w-full mb-2"
              />
            );
          }

          if (field.type === "textarea") {
            return (
              <textarea
                key={field.name}
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                placeholder={field.label}
                className="border p-2 w-full mb-2"
              />
            );
          }

          if (field.type === "select") {
            const options =
              field.optionsSource === "productTypes"
                ? productTypes
                : field.optionsSource === "machineTypes"
                ? machineTypes
                : field.optionsSource === "serviceTypes"
                ? serviceTypes
                : [];
            return (
              <select
                key={field.name}
                name={field.name}
                value={form[field.name] || ""}
                onChange={handleChange}
                className="border p-2 w-full mb-2"
              >
                <option value="">Seleccione {field.label}</option>
                {options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            );
          }

          if (field.type === "image") {
            return (
              <UploadImage
                key={field.name}
                form={form}
                handleFileChange={handleFileChange}
                inputId={`fileInput-${field.name}`}
              />
            );
          }

          return null;
        })}

        <div className="flex justify-end gap-2 mt-4">
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

const UploadImage = ({ form, handleFileChange, inputId }) => (
  <>
    <div
      className="border-2 border-dashed p-4 text-center mb-4 rounded cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileChange({ target: { files: [file] } });
      }}
    >
      <p className="text-gray-500">Arrastra una imagen aquí o haz clic para seleccionarla</p>
      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id={inputId} />
      <label htmlFor={inputId} className="bg-blue-500 text-white px-3 py-1 rounded cursor-pointer mt-2 inline-block">
        Seleccionar archivo
      </label>
    </div>
    {form.imagen && (
      <img
        src={form.file ? URL.createObjectURL(form.file) : form.imagen}
        alt="Vista previa"
        className="w-full h-40 object-cover rounded mb-4"
      />
    )}
  </>
);

export default ModalForm;
