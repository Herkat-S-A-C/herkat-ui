import Layout from "../components/Layout";
import CardItem from "../components/CardItem";
import { useParams } from "react-router-dom";

// Datos simulados por tipo (puedes mover esto a /constants/dataStatic.js si prefieres)
const catalogData = {
products: [
{
id: 1,
title: "Botella 500ml",
description: "PET transparente",
image: "/assets/images/botella500.png",
},
{
id: 2,
title: "Botella 1L",
description: "PET azul",
image: "/assets/images/botella1l.png",
},
{
id: 3,
title: "Botella 2L",
description: "PET con tapa verde",
image: "/assets/images/botella2l.png",
},
],
services: [
{
id: 1,
title: "Soplado de botellas PET",
description: "Botellas según requerimiento del cliente",
image: "/assets/images/soplado.png",
},
{
id: 2,
title: "Instalación",
description: "Instalación a domicilio",
image: "/assets/images/instalacion.png",
},
],
machinery: [
{
id: 1,
title: "Sopladora Industrial",
description: "Alta producción PET",
image: "/assets/images/maquinaria1.png",
},
{
id: 2,
title: "Máquina de moldeado",
description: "Moldeo por inyección",
image: "/assets/images/maquinaria2.png",
},
],
};

function Catalog() {
const { tipo } = useParams(); // tipo puede ser 'products', 'services' o 'machinery'
const items = catalogData[tipo] || [];

return (
<Layout>
<h1 className="text-3xl font-bold mb-6 capitalize">{tipo}</h1>
{items.length > 0 ? (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
{items.map((item) => (
<CardItem key={item.id} title={item.title} description={item.description} image={item.image} />
))}
</div>
) : (
<p className="text-gray-500">No hay elementos en esta categoría.</p>
)}
</Layout>
);
}

export default Catalog;