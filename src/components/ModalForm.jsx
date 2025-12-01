import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { formConfig } from "../constants/formConfig";
import FormFields from "./FormFields";

// ----------------------------------------------------
// 🔹 SERVICIOS API (Todos en Plural + Services)
// ----------------------------------------------------

import {
  getSocialMedia,
  updateSocialMedia,
} from "../services/socialMediaServices";

import {
  getAllProductTypes,
  createProductType,
  updateProductType,
} from "../services/typeProductsServices";

import {
  getAllMachineTypes,
  createMachineType,
  updateMachineType,
} from "../services/typeMachineryServices";

import {
  getAllServiceTypes,
  createServiceType,
  updateServiceType,
} from "../services/typeServicesServices";

import { createProduct, updateProduct } from "../services/productsServices";
import { createMachine, updateMachine } from "../services/machineryServices";
import { createService, updateService } from "../services/servicesServices";
import { createBanner, updateBanner } from "../services/bannerServices";
import { createClient, updateClient } from "../services/clientServices";

// Nota: No importamos servicios de inventario aquí porque el stock se gestiona
// externamente mediante movimientos, y el balance inicial es 0 automático.

const ModalForm = ({ type, onClose, onSave, item, lastId }) => {
  const isBanner = type === "banner";
  const isSocial = type === "sociales";
  const isClient = type === "clientes";
  const isTypeForm = ["ProductosTipos", "ServiciosTipos", "MaquinariaTipos"].includes(type);

  const [form, setForm] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  // === Cargar listas de tipos según sección ===
  useEffect(() => {
    const mapTypeNameIfNeeded = (data) => {
      if (item?.typeName) {
        const match = data.find(
          (t) => t.name?.toLowerCase() === item.typeName?.toLowerCase()
        );
        if (match) setForm((prev) => ({ ...prev, tipo: match.id }));
      }
    };

    if (type === "productos") {
      getAllProductTypes()
        .then((data) => {
          setProductTypes(data || []);
          mapTypeNameIfNeeded(data || []);
        })
        .catch(console.error);
    }
    if (type === "maquinaria") {
      getAllMachineTypes()
        .then((data) => {
          setMachineTypes(data || []);
          mapTypeNameIfNeeded(data || []);
        })
        .catch(console.error);
    }
    if (type === "servicios") {
      getAllServiceTypes()
        .then((data) => {
          setServiceTypes(data || []);
          mapTypeNameIfNeeded(data || []);
        })
        .catch(console.error);
    }
  }, [type, item]);

  // === Si es social, cargar datos desde servicio ===
  useEffect(() => {
    if (isSocial && item?.id) {
      getSocialMedia()
        .then((data) => {
          const social = (data || []).find((s) => s.id === item.id);
          if (social) {
            setForm({
              id: social.id,
              tipo: social.type || "",
              url: social.url || "",
            });
          }
        })
        .catch(console.error);
    }
  }, [isSocial, item]);

  // === Prellenado general ===
  useEffect(() => {
    if (item && !isSocial) {
      setForm({
        id: item.id || "",
        nombre: item.name || item.nombre || "",
        
        // 🔹 Campos de Cliente (Mapeo de la entidad Java)
        email: item.email || "",
        telefono: item.phone || item.telefono || "",
        direccion: item.address || item.direccion || "",

        // Mapeo general
        tipo: item.typeId || item.tipo || "",
        capacidad: item.capacity || "",
        // Stock: Eliminado (se maneja por balance)
        descripcion: item.description || "",
        imagen: item.imageUrl || "",
        file: null,
        destacado:
          item.outstanding === "si" ||
          item.destacado === true ||
          item.isFeatured === true,
        isFeatured:
          item.isFeatured ??
          (item.outstanding === "si" || item.destacado === true) ??
          false,
        left: item.left || "no",
        url: item.url || "",
      });
    } else if (!item && !isSocial) {
      const newId = ["productos", "maquinaria", "servicios", "clientes"].includes(type)
        ? ""
        : lastId
          ? String(Number(lastId) + 1)
          : "1";
      // Inicialización limpia
      setForm({ id: newId, destacado: false, isFeatured: false });
    }
  }, [item, lastId, type, isSocial]);

  // === Handlers ===
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // === Guardado ===
  const handleSubmit = async () => {
    try {
      // BANNER
      if (isBanner) {
        if (!form.nombre?.trim()) return alert("Completa el nombre del banner");
        if (!form.file && !item) return alert("Selecciona una imagen para el banner");

        const formData = new FormData();
        formData.append("name", form.nombre);
        if (form.file) formData.append("image", form.file);

        if (item) {
          await updateBanner(form.id, formData);
        } else {
          await createBanner(formData);
        }
        onSave?.();
        return onClose();
      }

      // SOCIALES
      if (isSocial) {
        if (!form.url?.trim()) return alert("La URL es obligatoria");
        await updateSocialMedia(form.tipo, { url: form.url });
        onSave?.();
        return onClose();
      }

      // 🔹 CLIENTES (Actualizado según Client.java)
      if (isClient) {
        // Validaciones obligatorias (nullable = false en Java)
        if (!form.nombre?.trim()) return alert("El nombre es obligatorio");
        if (!form.email?.trim()) return alert("El email es obligatorio");

        const formData = new FormData();
        
        // Backend espera: name, email, phone, address
        formData.append("name", form.nombre);
        formData.append("email", form.email);
        
        // Campos opcionales (nullable = true)
        formData.append("phone", form.telefono || "");
        formData.append("address", form.direccion || "");

        if (item) {
          await updateClient(form.id, formData);
        } else {
          await createClient(formData);
        }
        onSave?.();
        return onClose();
      }

      // TIPOS
      if (type === "ProductosTipos") {
        if (!form.nombre?.trim()) return alert("Completa el nombre del tipo");
        if (item) {
          await updateProductType(form.id, { name: form.nombre });
        } else {
          await createProductType({ name: form.nombre });
        }
        onSave?.();
        return onClose();
      }

      if (type === "ServiciosTipos") {
        if (!form.nombre?.trim()) return alert("Completa el nombre del tipo");
        if (item) {
          await updateServiceType(form.id, { name: form.nombre });
        } else {
          await createServiceType({ name: form.nombre });
        }
        onSave?.();
        return onClose();
      }

      if (type === "MaquinariaTipos") {
        if (!form.nombre?.trim()) return alert("Completa el nombre del tipo");
        if (item) {
          await updateMachineType(form.id, { name: form.nombre });
        } else {
          await createMachineType({ name: form.nombre });
        }
        onSave?.();
        return onClose();
      }

      // PRODUCTOS
      if (type === "productos") {
        if (!form.nombre?.trim()) return alert("Completa el nombre del producto");
        if (!form.tipo) return alert("Selecciona un tipo de producto");

        const formData = new FormData();
        if (!item || form.nombre !== item.name) formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("capacity", parseFloat(form.capacidad) || 0);
        
        // Stock eliminado (se gestiona por Balance y Movimientos)
        
        formData.append("description", form.descripcion || "");
        formData.append("isFeatured", form.isFeatured ? "true" : "false");
        if (form.file) formData.append("image", form.file);

        if (item) {
          await updateProduct(form.id, formData);
        } else {
          await createProduct(formData);
        }
        onSave?.();
        return onClose();
      }

      // MAQUINARIA
      if (type === "maquinaria") {
        if (!form.nombre?.trim()) return alert("Completa el nombre de la maquinaria");
        if (!form.tipo) return alert("Selecciona un tipo de maquinaria");

        const formData = new FormData();
        if (!item || form.nombre !== item.name) formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("description", form.descripcion || "");
        formData.append("isFeatured", form.isFeatured ? "true" : "false");
        if (form.file) formData.append("image", form.file);

        if (item) {
          await updateMachine(form.id, formData);
        } else {
          await createMachine(formData);
        }
        onSave?.();
        return onClose();
      }

      // SERVICIOS
      if (type === "servicios") {
        if (!form.nombre?.trim()) return alert("Completa el nombre del servicio");
        if (!form.tipo) return alert("Selecciona un tipo de servicio");

        const formData = new FormData();
        if (!item || form.nombre !== item.name) formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("description", form.descripcion || "");
        formData.append("isFeatured", form.isFeatured ? "true" : "false");
        if (form.file) formData.append("image", form.file);

        if (item) {
          await updateService(form.id, formData);
        } else {
          await createService(formData);
        }
        onSave?.();
        return onClose();
      }
    } catch (error) {
      console.error("❌ Error al guardar:", error?.response?.data || error);
      alert("Ocurrió un error al guardar los datos");
    }
  };

  // === Campos dinámicos ===
  const normalizedType = type.charAt(0).toUpperCase() + type.slice(1);

  const typeLabels = {
    ProductosTipos: "Nombre del tipo de producto",
    ServiciosTipos: "Nombre del tipo de servicio",
    MaquinariaTipos: "Nombre del tipo de maquinaria",
  };

  let fields = isSocial
    ? [
        { name: "tipo", label: "Nombre de la red social", type: "text", readonly: true },
        { name: "url", label: "URL", type: "text", required: true },
      ]
    : isTypeForm
      ? [{ name: "nombre", label: typeLabels[type], type: "text", required: true }]
      : (formConfig[type] || formConfig[normalizedType] || []);

  // 🔹 CAMPOS ESPECÍFICOS PARA CLIENTES
  // Ajustados a las restricciones de la base de datos (length)
  if (type === "clientes") {
    fields = [
      { 
        name: "nombre", 
        label: "Nombre Completo", 
        type: "text", 
        required: true, 
        maxLength: 50 // @Column(length = 50)
      },
      { 
        name: "email", 
        label: "Correo Electrónico", 
        type: "email", 
        required: true 
        // @Column(unique = true)
      },
      { 
        name: "telefono", 
        label: "Teléfono", 
        type: "tel",
        maxLength: 20 // @Column(length = 20)
      },
      { 
        name: "direccion", 
        label: "Dirección", 
        type: "text",
        maxLength: 100 // @Column(length = 100)
      },
    ];
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.94, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ type: "spring", stiffness: 120, damping: 14 }}
        className="bg-white border border-gray-200 rounded-2xl shadow-2xl p-6 w-[420px] max-h-[90vh] overflow-auto"
      >
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          {item ? "Editar" : "Registrar"} {type === 'clientes' ? 'Cliente' : type}
        </h2>

        <FormFields
          fields={fields}
          form={form}
          setForm={setForm}
          handleChange={handleChange}
          handleFileChange={handleFileChange}
          options={{ productTypes, machineTypes, serviceTypes }}
        />

        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 hover:scale-110 transition shadow"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:shadow-xl hover:opacity-90 hover:scale-110 transition"
          >
            {item ? "Guardar" : "Agregar"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalForm;