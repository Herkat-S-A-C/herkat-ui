import React from "react";

function Banner({ images, currentIndex, onPrev, onNext }) {
  return (
    <div className="relative w-full aspect-[3/1] overflow-hidden">
      {/* Carrusel de imágenes */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={`Banner ${item.id}`}
            className="w-full flex-shrink-0 object-cover h-full"
          />
        ))}
      </div>

      {/* Botones transparentes para avanzar/retroceder */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-r transition"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-l transition"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Puntos indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-4 h-4 rounded-full transition-colors duration-300 ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
