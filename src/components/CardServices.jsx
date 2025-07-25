function CardServices({ image, title, description, reverse }) {
  return (
    <div
      className={`bg-white rounded-lg p-2 flex items-start gap-6 transition-all duration-300 w-full max-w-6xl mx-auto mb-4 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      {/* Imagen */}
      <div className="w-65 h-52 flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center border">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título y descripción */}
      <div
        className={`flex flex-col ${
          reverse ? "text-right items-end" : "text-left items-start"
        }`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-lg text-gray-600 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default CardServices;
