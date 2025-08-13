const Table = ({ data, type, onEdit, onDelete }) => {
  const isTipo = ["ProductosTipos", "ServiciosTipos", "MaquinariaTipos"].includes(type);
  const isSociales = type === "sociales";

  const renderEmptyTable = () => (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          {isTipo && <th className="border p-2">Nombre</th>}
          {isSociales && (
            <>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">URL</th>
            </>
          )}
          {!isTipo && !isSociales && type !== "banner" && (
            <>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2 w-48">Descripción</th>
            </>
          )}
          {!isTipo && !isSociales && <th className="border p-2">Imagen</th>}
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td
            colSpan={isTipo ? 3 : isSociales ? 3 : 5}
            className="p-4 text-gray-500 text-center"
          >
            No hay datos disponibles
          </td>
        </tr>
      </tbody>
    </table>
  );

  if (!data || data.length === 0) return renderEmptyTable();
  /*posiciona los encabezados*/ 
  return (
    <table className="w-full border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">ID</th>
          {isTipo && <th className="border p-2">Nombre</th>}
          {isSociales && (
            <>
              <th className="border p-2">Tipo</th>
              <th className="border p-2">URL</th>
            </>
          )}
          {!isTipo && !isSociales && type !== "banner" && (
            <>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Tipo</th>
              <th className="border p-2 w-48">Descripción</th>
            </>
          )}
          {!isTipo && !isSociales && <th className="border p-2">Imagen</th>}
          <th className="border p-2">Acciones</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="text-center">
            <td className="border p-2">{item.id}</td>

            {isTipo && <td className="border p-2">{item.name}</td>}
            
            {isSociales && (
              <>
                <td className="border p-2">{item.type || "—"}</td>
                <td className="border p-2">{item.url || "—"}</td>
              </>
            )}

            {!isTipo && !isSociales && type !== "banner" && (
              <>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{item.type}</td>
                <td
                  className="border p-2 w-48 max-w-xs truncate"
                  title={item.description}
                >
                  {item.description || "—"}
                </td>
              </>
            )}

            {!isTipo && !isSociales && (
              <td className="border p-2">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || `Elemento ${item.id}`}
                    className={
                      type === "banner"
                        ? "w-48 h-24 object-cover mx-auto"
                        : "w-16 h-16 object-cover mx-auto"
                    }
                  />
                ) : (
                  "—"
                )}
              </td>
            )}

            <td className="border p-2 space-x-2">
              <button
                onClick={() => onEdit(item)}
                className="bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:scale-105"
              >
                Editar
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="bg-red-500 text-white px-3 py-1 rounded shadow-md hover:scale-105"
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
