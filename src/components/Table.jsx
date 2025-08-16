const Table = ({ data, type, onEdit, onDelete }) => {
  const isTipo = ["ProductosTipos", "ServiciosTipos", "MaquinariaTipos"].includes(type);
  const isSociales = type === "sociales";

  const renderEmptyTable = () => (
    <div className="overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
            <th className="px-4 py-2 text-left">ID</th>
            {isTipo && <th className="px-4 py-2 text-left">Nombre</th>}
            {isSociales && (
              <>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">URL</th>
              </>
            )}
            {!isTipo && !isSociales && type !== "banner" && (
              <>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Descripción</th>
              </>
            )}
            {!isTipo && !isSociales && <th className="px-4 py-2 text-left">Imagen</th>}
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={isTipo ? 3 : isSociales ? 3 : 5}
              className="px-4 py-6 text-gray-500 text-center italic"
            >
              No hay datos disponibles
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  if (!data || data.length === 0) return renderEmptyTable();

  return (
    <div className="overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
            <th className="px-4 py-2 text-left">ID</th>
            {isTipo && <th className="px-4 py-2 text-left">Nombre</th>}
            {isSociales && (
              <>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">URL</th>
              </>
            )}
            {!isTipo && !isSociales && type !== "banner" && (
              <>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Descripción</th>
              </>
            )}
            {!isTipo && !isSociales && <th className="px-4 py-2 text-left">Imagen</th>}
            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="hover:bg-gray-50 transition-colors text-sm"
            >
              <td className="px-4 py-2 border-b">{item.id}</td>

              {isTipo && <td className="px-4 py-2 border-b">{item.name}</td>}

              {isSociales && (
                <>
                  <td className="px-4 py-2 border-b">{item.type || "—"}</td>
                  <td className="px-4 py-2 border-b">{item.url || "—"}</td>
                </>
              )}

              {!isTipo && !isSociales && type !== "banner" && (
                <>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.type}</td>
                  <td
                    className="px-4 py-2 border-b truncate max-w-xs"
                    title={item.description}
                  >
                    {item.description || "—"}
                  </td>
                </>
              )}

              {!isTipo && !isSociales && (
                <td className="px-4 py-2 border-b">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name || `Elemento ${item.id}`}
                      className={
                        type === "banner"
                          ? "w-48 h-24 object-cover rounded-md shadow-sm"
                          : "w-16 h-16 object-cover rounded-md shadow-sm"
                      }
                    />
                  ) : (
                    "—"
                  )}
                </td>
              )}

              <td className="px-4 py-2 border-b text-center space-x-2">
                <button
                  onClick={() => onEdit(item)}
                  className="px-3 py-1 rounded-full text-yellow-700 bg-yellow-100 hover:bg-yellow-200 transform transition-transform duration-200
                  hover:scale-[1.18]"
                >
                  Editar
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="px-3 py-1 rounded-full text-red-700 bg-red-100 hover:bg-red-200 transform transition-transform duration-200 hover:scale-[1.18]"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
