const Table = ({ data, type, onEdit, onDelete }) => {
  if (!data || data.length === 0) {
    return (
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            {type !== "banner" && <th className="border p-2">Título</th>}
            {type !== "banner" && <th className="border p-2 w-48">Descripción</th>}
            {type !== "banner" && <th className="border p-2">Tipo</th>}
            {type !== "banner" && <th className="border p-2">Destacado</th>}
            {type === "servicios" && <th className="border p-2">Izquierda</th>}
            <th className="border p-2">Imagen</th>
            <th className="border p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={type === "banner" ? 3 : type === "servicios" ? 8 : 7} className="p-4 text-gray-500">
              No hay datos disponibles
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          {type !== "banner" && <th className="border p-2">Título</th>}
          {type !== "banner" && <th className="border p-2 w-48">Descripción</th>}
          {type !== "banner" && <th className="border p-2">Tipo</th>}
          {type !== "banner" && <th className="border p-2">Destacado</th>}
          {type === "servicios" && <th className="border p-2">Izquierda</th>}
          <th className="border p-2">Imagen</th>
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border p-2">{item.id}</td>

            {type !== "banner" && (
              <td className="border p-2">{item.title || item.nombre}</td>
            )}

            {type !== "banner" && (
              <td
                className="border p-2 w-48 max-w-xs truncate"
                title={item.description || item.descripcion}
              >
                {item.description || item.descripcion}
              </td>
            )}

            {type !== "banner" && (
              <td className="border p-2">{item.type || item.tipo}</td>
            )}

            {type !== "banner" && (
              <td className="border p-2">{item.outstanding === "si" ? "Sí" : "No"}</td>
            )}

            {type === "servicios" && (
              <td className="border p-2">{item.left === "sí" ? "Sí" : "No"}</td>
            )}

            <td className="border p-2">
              <img
                src={item.image || item.imagen}
                alt={item.title || item.nombre || `Banner ${item.id}`}
                className={
                  type === "banner"
                    ? "w-48 h-24 object-cover mx-auto" // Imagen más ancha para banners
                    : "w-16 h-16 object-cover mx-auto"
                }
              />
            </td>

            <td className="border p-2">
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => onEdit(item)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => onDelete(item.id)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
