import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import CardItem from "../components/CardItem";

// Ejemplo de datos estáticos simulados (puedes importar desde /constants/dataStatic.js)
const allItems = [
{
id: "1",
tipo: "products",
title: "Botella 500ml",
description: "Botella PET transparente ideal para bebidas frías.",
image: "/assets/images/botella500.png",
},
{
id: "2",
tipo: "services",
title: "Soplado de botellas PET",
description: "Servicio personalizado según medidas del cliente.",
image: "/assets/images/soplado.png",
},
{
id: "3",
tipo: "machinery",
title: "Sopladora Industrial",
description: "Máquina automática de soplado de alta capacidad.",
image: "/assets/images/maquinaria1.png",
},
// ... más elementos
];

function DetailItem() {
const { id } = useParams(); // se recibe desde la URL: /detail/:id
const item = allItems.find((i) => i.id === id);

if (!item) {
return (
<Layout>
<div className="text-center text-gray-500 py-20">
<h2 className="text-2xl font-semibold">Elemento no encontrado</h2>
</div>
</Layout>
);
}

return (
<Layout>
<div className="max-w-3xl mx-auto p-4">
<div className="flex flex-col md:flex-row gap-6">
<img src={item.image} alt={item.title} className="w-64 h-64 object-contain border rounded-md mx-auto" />
<div className="flex-1">
<h1 className="text-3xl font-bold mb-4">{item.title}</h1>
<p className="text-gray-700 text-lg">{item.description}</p>
{/* Si deseas agregar más campos: precio, ficha técnica, disponibilidad, etc. */}
</div>
</div>
</div>
</Layout>
);
}

export default DetailItem;