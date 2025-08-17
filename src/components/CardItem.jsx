/* -------------------- CardItem (adaptado a la API) -------------------- */
function CardItem({ name, description, imageUrl }) {
  return (
    <div
      className="relative bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-80 cursor-pointer transform transition-all duration-300 ease-out 
      hover:scale-110 hover:shadow-[0_10px_25px_rgba(0,0,0,0.25)]"
      tabIndex={-1}
    >
      <img
        src={imageUrl}
        alt={name}
        className="h-48 w-full object-contain bg-white"
      />
      <div className="p-4 flex flex-col justify-between flex-1">
        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 h-[3.5rem]">
          {name}
        </h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-4 h-[5rem]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default CardItem;
