function CardService({ name, description, imageUrl }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer
                 transition-shadow duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:bg-gray-50"
      tabIndex={-1}
    >
      {/* Imagen del servicio */}
      <div className="w-full h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-4">
          {description}
        </p>
      </div>
    </div>
  );
}


export default CardService;
