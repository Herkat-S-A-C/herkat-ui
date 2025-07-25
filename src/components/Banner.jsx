import React from "react";

function Banner({ images, currentIndex }) {
  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden">
      {/* Carrusel de imágenes */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={`Banner ${item.id}`}
            className="w-full flex-shrink-0 object-cover h-64 md:h-80"
          />
        ))}
      </div>

      {/* Capa oscura encima de las imágenes (opcional) */}
      <div className="absolute inset-0 bg-black bg-opacity-20" />

      {/* ✅ PUNTOS INDICADORES */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
