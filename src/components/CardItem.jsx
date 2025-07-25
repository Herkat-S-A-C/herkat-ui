// src/components/CardItem.jsx

function CardItem({ title, description, image }) {
  return (
<div className="border border-orange-300 rounded-md p-4 text-center hover:shadow-md transition duration-300">
<img src = {image} alt={title} className="w-24 h-24 mx-auto mb-2 object-contain" />
<h3 className="font-semibold text-md">{title}</h3>
<p className="text-sm text-gray-500">{description}</p>
</div>
);
}

export default CardItem; // 👈 Esto es obligatorio si lo importas como "import CardItem from ..."
