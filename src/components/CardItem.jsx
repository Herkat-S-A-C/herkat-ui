function CardItem({ image, title, description }) {
  return (
    <div className="bg-white rounded-lg border p-4 w-60 text-center shadow-sm hover:shadow-md transition-all duration-300">
      {/* Contenedor cuadrado para la imagen */}
      <div className="w-full aspect-square  rounded-lg overflow-hidden mb-3 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Título y descripción */}
      <h3 className="text-base font-medium text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
  );
}

export default CardItem;
