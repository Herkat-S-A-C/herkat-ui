/* -------------------- CardItem (sin transform/rotation, solo sombra y fondo) -------------------- */
function CardItem({ title, description, image }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-80 cursor-pointer
                 transition-shadow duration-300 ease-in-out hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:bg-white"
      tabIndex={-1}
    >
      <img
        src={image}
        alt={title}
        className="h-48 w-full object-contain bg-gray-100"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 h-[3.5rem]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-4 h-[5rem]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CardItem;
