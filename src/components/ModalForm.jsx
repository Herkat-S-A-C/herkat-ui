// src/components/ModalForm.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formConfig } from "../constants/formConfig";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ImagePlus } from "lucide-react";

// Servicios API
import {
  getSocialMedia,
  updateSocialMedia,
} from "../services/socialMediaService";
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
import { createProduct, updateProduct } from "../services/productsService";
import { createMachine, updateMachine } from "../services/machineryService";
import { createService, updateService } from "../services/servicesService";
import { createBanner, updateBanner } from "../services/bannerServices";

const ModalForm = ({ type, onClose, onSave, item, lastId }) => {
  const isBanner = type === "banner";
  const isSocial = type === "sociales";
  const isTypeForm = ["ProductosTipos", "ServiciosTipos", "MaquinariaTipos"].includes(type);

  const [form, setForm] = useState({});
  const [productTypes, setProductTypes] = useState([]);
  const [machineTypes, setMachineTypes] = useState([]);
  const [serviceTypes, setServiceTypes] = useState([]);

  // === Cargar listas de tipos según sección + intentar mapear typeName->id en edición ===
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

  // === Si es social, cargar datos desde servicio y rellenar ===
  useEffect(() => {
    if (isSocial && item?.id) {
      getSocialMedia()
        .then((data) => {
          const social = (data || []).find((s) => s.id === item.id);
          if (social) {
            setForm({
              id: social.id,
              tipo: social.type || "", // enum/type string
              url: social.url || "",
            });
          }
        })
        .catch(console.error);
    }
  }, [isSocial, item]);

  // === Prellenado general para edición/creación (excepto sociales que se cargan arriba) ===
  useEffect(() => {
    if (item && !isSocial) {
      setForm({
        id: item.id || "",
        nombre: item.name || "",
        tipo: item.typeId || item.tipo || "",
        capacidad: item.capacity || "",
        descripcion: item.description || "",
        imagen: item.imageUrl || "",
        file: null,
        // ✅ mapear "destacado" UI <-> isFeatured (DB)
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
      const newId = ["productos", "maquinaria", "servicios"].includes(type)
        ? ""
        : lastId
          ? String(Number(lastId) + 1)
          : "1";
      setForm({ id: newId, destacado: false, isFeatured: false });
    }
  }, [item, lastId, type, isSocial]);

  // === Handlers ===
  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setForm((prev) => ({ ...prev, file }));
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () =>
        setForm((prev) => ({ ...prev, imagen: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  // === Guardado usando create*/update* ===
  const handleSubmit = async () => {
    try {
      // BANNER
      if (isBanner) {
        if (!form.nombre?.trim()) return alert("Completa el nombre del banner");
        if (!form.file && !item)
          return alert("Selecciona una imagen para el banner");
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

      // SOCIALES (editar url por tipo/enum)
      if (isSocial) {
        if (!form.url?.trim()) return alert("La URL es obligatoria");
        await updateSocialMedia(form.tipo, { url: form.url });
        onSave?.();
        return onClose();
      }

      // TIPOS: Productos / Servicios / Maquinaria
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
        if (!form.nombre?.trim())
          return alert("Completa el nombre del producto");
        if (!form.tipo) return alert("Selecciona un tipo de producto");
        const formData = new FormData();
        if (!item || form.nombre !== item.name)
          formData.append("name", form.nombre);
        formData.append("typeId", form.tipo);
        formData.append("capacity", parseFloat(form.capacidad) || 0);
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
        if (!form.nombre?.trim())
          return alert("Completa el nombre de la maquinaria");
        if (!form.tipo) return alert("Selecciona un tipo de maquinaria");
        const formData = new FormData();
        if (!item || form.nombre !== item.name)
          formData.append("name", form.nombre);
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
        if (!form.nombre?.trim())
          return alert("Completa el nombre del servicio");
        if (!form.tipo) return alert("Selecciona un tipo de servicio");
        const formData = new FormData();
        if (!item || form.nombre !== item.name)
          formData.append("name", form.nombre);
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

  // Fallback explícito para formularios de "Tipos" (asegura que siempre muestre el input)
  const typeLabels = {
    ProductosTipos: "Nombre del tipo de producto",
    ServiciosTipos: "Nombre del tipo de servicio",
    MaquinariaTipos: "Nombre del tipo de maquinaria",
  };

  const fields = isSocial
    ? [
        { name: "tipo", label: "Nombre de la red social", type: "text", readonly: true },
        { name: "url", label: "URL", type: "text", required: true },
      ]
    : isTypeForm
      ? [{ name: "nombre", label: typeLabels[type], type: "text", required: true }]
      : (formConfig[type] || formConfig[normalizedType] || []);

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
          {item ? "Editar" : "Registrar"} {type}
        </h2>

        {/* Campos dinámicos */}
        <div className="space-y-4">
          {fields.map((field) => {
            const id = `field-${field.name}`;

            if (["text", "number", "url"].includes(field.type)) {
              return (
                <div
                  key={field.name}
                  className="space-y-1 hover:scale-[1.02] transition-transform"
                >
                  <Label htmlFor={id} className="text-gray-700">
                    {field.label}
                  </Label>
                  <input
                    id={id}
                    name={field.name}
                    type={field.type}
                    value={form[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    readOnly={!!field.readonly}
                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div
                  key={field.name}
                  className="space-y-1 hover:scale-[1.02] transition-transform"
                >
                  <Label htmlFor={id} className="text-gray-700">
                    {field.label}
                  </Label>
                  <textarea
                    id={id}
                    name={field.name}
                    value={form[field.name] ?? ""}
                    onChange={handleChange}
                    placeholder={field.placeholder || ""}
                    rows={3}
                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
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
                      : serviceTypes;

              return (
                <div
                  key={field.name}
                  className="space-y-1 hover:scale-[1.02] transition-transform"
                >
                  <Label htmlFor={id} className="text-gray-700">
                    {field.label}
                  </Label>
                  <select
                    id={id}
                    name={field.name}
                    value={form[field.name] ?? ""}
                    onChange={handleChange}
                    className="w-full rounded-lg bg-gray-50 border border-gray-300 text-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">{`Seleccione ${field.label}`}</option>
                    {options?.map((opt) => (
                      <option key={opt.id} value={opt.id}>
                        {opt.name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === "image") {
              return (
                <UploadImage
                  key={field.name}
                  form={form}
                  handleFileChange={handleFileChange}
                  inputId={`fileInput-${field.name}`}
                  label={field.label}
                />
              );
            }

            if (field.type === "switch") {
              // ✅ El switch maneja `destacado` en UI pero actualiza y lee `isFeatured`
              const isFeaturedValue =
                field.name === "destacado"
                  ? !!form.isFeatured
                  : !!form[field.name];

              return (
                <div
                  key={field.name}
                  className="flex items-center justify-between pt-1 hover:scale-[1.02] transition-transform"
                >
                  <Label htmlFor={id} className="text-gray-700 font-medium">
                    {field.label}
                  </Label>
                  <Switch
                    id={id}
                    checked={isFeaturedValue}
                    onCheckedChange={(val) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: val,
                        ...(field.name === "destacado" ? { isFeatured: val } : {}),
                      }))
                    }
                    className="data-[state=checked]:bg-gradient-to-r from-cyan-400 to-blue-600"
                  />
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 text-gray-800 font-medium hover:bg-gray-200 hover:scale-110 transition shadow"
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

// === Upload de imagen ===
const UploadImage = ({ form, handleFileChange, inputId, label }) => (
  <div className="space-y-2 hover:scale-[1.02] transition-transform">
    {label && <Label className="text-gray-700">{label}</Label>}
    <div
      className="border-2 border-dashed border-gray-300 bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition flex flex-col items-center justify-center text-center"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleFileChange({ target: { files: [file] } });
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <ImagePlus className="w-10 h-10 text-gray-400 mb-2" />
        <p className="text-gray-500 text-sm">
          Arrastra una imagen aquí o haz clic para seleccionarla
        </p>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id={inputId}
      />
      <label
        htmlFor={inputId}
        className="mt-3 inline-block px-3 py-1 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 text-white cursor-pointer shadow hover:shadow-lg hover:opacity-90 transition"
      >
        Seleccionar archivo
      </label>
    </div>

    {form.imagen && (
      <img
        src={form.file ? URL.createObjectURL(form.file) : form.imagen}
        alt="Vista previa"
        className="w-full h-40 object-cover rounded-lg transition-transform hover:scale-[1.02]"
      />
    )}
  </div>
);

export default ModalForm;
