const Table = ({ data, type, onEdit, onDelete }) => {
  const renderEmptyTable = () => (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          {type === "sociales" && <th className="border p-2">Título</th>}
          {type === "sociales" && <th className="border p-2">URL</th>}

          {type !== "banner" && type !== "sociales" && <th className="border p-2">Título</th>}
          {type !== "banner" && type !== "sociales" && (
            <th className="border p-2 w-48">Descripción</th>
          )}
          {type !== "banner" && type !== "sociales" && <th className="border p-2">Tipo</th>}
          {type !== "banner" && type !== "sociales" && <th className="border p-2">Destacado</th>}
          {type === "servicios" && <th className="border p-2">Izquierda</th>}
          {type !== "sociales" && <th className="border p-2">Imagen</th>}
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colSpan={
              type === "banner"
                ? 3
                : type === "servicios"
                ? 8
                : type === "sociales"
                ? 4
                : 7
            }
            className="p-4 text-gray-500 text-center"
          >
            No hay datos disponibles
          </td>
        </tr>
      </tbody>
    </table>
  );

  if (!data || data.length === 0) return renderEmptyTable();

  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          {type === "sociales" && <th className="border p-2">Título</th>}
          {type === "sociales" && <th className="border p-2">URL</th>}

          {type !== "banner" && type !== "sociales" && <th className="border p-2">Título</th>}
          {type !== "banner" && type !== "sociales" && (
            <th className="border p-2 w-48">Descripción</th>
          )}
          {type !== "banner" && type !== "sociales" && <th className="border p-2">Tipo</th>}
          {type !== "banner" && type !== "sociales" && <th className="border p-2">Destacado</th>}
          {type === "servicios" && <th className="border p-2">Izquierda</th>}
          {type !== "sociales" && <th className="border p-2">Imagen</th>}
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border p-2">{item.id}</td>

            {type === "sociales" && <td className="border p-2">{item.title}</td>}
            {type === "sociales" && (
              <td className="border p-2 truncate max-w-xs" title={item.url}>
                {item.url}
              </td>
            )}

            {type !== "banner" && type !== "sociales" && (
              <td className="border p-2">{item.title || item.nombre}</td>
            )}
            {type !== "banner" && type !== "sociales" && (
              <td
                className="border p-2 w-48 max-w-xs truncate"
                title={item.description || item.descripcion}
              >
                {item.description || item.descripcion}
              </td>
            )}
            {type !== "banner" && type !== "sociales" && (
              <td className="border p-2">{item.type || item.tipo}</td>
            )}
            {type !== "banner" && type !== "sociales" && (
              <td className="border p-2">
                {item.outstanding === "si" ? "Sí" : "No"}
              </td>
            )}
            {type === "servicios" && (
              <td className="border p-2">{item.left === "sí" ? "Sí" : "No"}</td>
            )}

            {type !== "sociales" && (
              <td className="border p-2">
                <img
                  src={item.image || item.imagen}
                  alt={item.title || item.nombre || `Banner ${item.id}`}
                  className={
                    type === "banner"
                      ? "w-48 h-24 object-cover mx-auto"
                      : "w-16 h-16 object-cover mx-auto"
                  }
                />
              </td>
            )}

            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md transition transform duration-300 hover:scale-105 hover:shadow-lg active:translate-y-1"
              >
                Editar
              </button>

              {type !== "sociales" && (
                <button
                  onClick={() => onDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded shadow-md transition transform duration-300 hover:scale-105 hover:shadow-lg active:translate-y-1"
                >
                  Eliminar
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
