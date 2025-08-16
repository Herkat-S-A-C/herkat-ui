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
            src={item.imageUrl}
            alt={item.name || `Banner ${item.id}`}
            className="w-full flex-shrink-0 object-cover h-full"
          />
        ))}
      </div>

      {/* Botón Anterior */}
      <button
        onClick={onPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-r transition"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-40 text-white p-3 rounded-l transition"
        aria-label="Siguiente"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? "bg-white scale-110" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Banner;
