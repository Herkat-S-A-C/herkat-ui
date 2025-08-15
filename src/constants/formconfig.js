// src/constans/formConfig.js
export const formConfig = {
  // --------- TIPOS ---------
  ProductosTipos: [
    { name: "nombre", label: "Nombre del tipo de producto", type: "text", required: true },
  ],
  ServiciosTipos: [
    { name: "nombre", label: "Nombre del tipo de servicio", type: "text", required: true },
  ],
  MaquinariaTipos: [
    { name: "nombre", label: "Nombre del tipo de maquinaria", type: "text", required: true },
  ],

  // --------- ENTIDADES PRINCIPALES ---------
  productos: [
    { name: "nombre", label: "Nombre del producto", type: "text", required: true },
    { 
      name: "tipo", 
      label: "Tipo de producto", 
      type: "select", 
      optionsSource: "productTypes", // se llena con getAllProductTypes()
      required: true 
    },
    { name: "capacidad", label: "Capacidad", type: "number" },
    { name: "descripcion", label: "Descripción", type: "textarea" },
    { name: "imagen", label: "Imagen", type: "image" },
  ],

  maquinaria: [
    { name: "nombre", label: "Nombre de la maquinaria", type: "text", required: true },
    { 
      name: "tipo", 
      label: "Tipo de maquinaria", 
      type: "select", 
      optionsSource: "machineTypes", // se llena con getAllMachineTypes()
      required: true 
    },
    { name: "descripcion", label: "Descripción", type: "textarea", required: true },
    { name: "imagen", label: "Imagen", type: "image" },
  ],

  servicios: [
    { name: "nombre", label: "Nombre del servicio", type: "text", required: true },
    { name: "descripcion", label: "Descripción", type: "textarea", required: true },
    { name: "imagen", label: "Imagen", type: "image" },
  ],
};
