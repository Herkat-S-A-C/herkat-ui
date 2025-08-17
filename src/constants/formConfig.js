// src/constants/formConfig.js
export const formConfig = {
  // --------- ENTIDADES PRINCIPALES ---------
  productos: [
    { name: "nombre", label: "Nombre del producto", type: "text", required: true },
    {
      name: "tipo",
      label: "Tipo de producto",
      type: "select",
      optionsSource: "productTypes",
      required: true
    },
    { name: "capacidad", label: "Capacidad", type: "number" },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Imagen", type: "image" },
    { name: "isFeatured", label: "Destacado", type: "switch" },
  ],

  maquinaria: [
    { name: "nombre", label: "Nombre de la maquinaria", type: "text", required: true },
    {
      name: "tipo",
      label: "Tipo de maquinaria",
      type: "select",
      optionsSource: "machineTypes",
      required: true
    },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Imagen", type: "image" },
    { name: "isFeatured", label: "Destacado", type: "switch" },
  ],

  servicios: [
    { name: "nombre", label: "Nombre del servicio", type: "text", required: true },
    {
      name: "tipo",
      label: "Tipo de servicio",
      type: "select",
      optionsSource: "serviceTypes",
      required: true
    },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Imagen", type: "image" },
    { name: "isFeatured", label: "Destacado", type: "switch" },
  ],

  // --------- BANNERS ---------
  banner: [
    { name: "nombre", label: "Nombre del banner", type: "text", required: true },
    { name: "imagen", label: "Imagen", type: "image", required: true },
  ],
};
