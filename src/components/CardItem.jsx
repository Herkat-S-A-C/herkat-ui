function CardItem({ title, description, image }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-80 cursor-pointer">
      <img
        src={image}
        alt={title}
        className="h-40 w-full object-cover"
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
