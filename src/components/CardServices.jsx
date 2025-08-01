function CardServices({ image, title, description, reverse }) {
  return (
    <div
      className={`bg-white rounded-lg p-4 flex flex-col md:flex-row items-center gap-6 transition-all duration-300 w-full max-w-6xl mx-auto mb-6 ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Imagen */}
      <div className="w-full md:w-64 h-52 flex-shrink-0 rounded-md overflow-hidden flex items-center justify-center border">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Título y descripción */}
      <div
        className={`flex flex-col w-full ${
          reverse ? "md:text-right md:items-end" : "md:text-left md:items-start"
        }`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-base text-gray-600 text-justify">{description}</p>
      </div>
    </div>
  );
}

export default CardServices;
