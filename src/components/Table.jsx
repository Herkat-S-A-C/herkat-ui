const Table = ({ 
  data, 
  type, 
  onEdit, 
  onDelete, 
  onViewMovements = () => {} // 🔹 Valor por defecto para evitar errores si no se pasa la función
}) => {
  const isTipo = ["ProductosTipos", "ServiciosTipos", "MaquinariaTipos"].includes(type);
  const isSociales = type === "sociales";
  const isBanner = type === "banner";
  const isClient = type === "clientes";
  const isInventory = type === "inventario";
  const isDestacadoType = ["productos", "servicios", "maquinaria"].includes(type);

  // Cálculo dinámico de columnas para el "colspan" de la tabla vacía
  const getColSpan = () => {
    if (isTipo) return 3; // ID, Nombre, Acciones
    if (isSociales) return 4; // ID, Tipo, URL, Acciones
    if (isBanner) return 4; // ID, Nombre, Imagen, Acciones
    if (isClient) return 6; // ID, Nombre, Email, Tel, Dir, Acciones
    // ID, ItemId, Nombre, Tipo, Stock, Fecha, Acciones = 7
    if (isInventory) return 7; 
    if (isDestacadoType) return type === "productos" ? 7 : 6;
    return 6;
  };

  const renderEmptyTable = () => (
    <div className="overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
            <th className="px-4 py-2 text-left">ID</th>
            {/* Headers dinámicos según el tipo */}
            <th className="px-4 py-2 text-left">...</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              colSpan={getColSpan()}
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

  // 🔹 Ordenar datos por ID de menor a mayor
  const sortedData = [...data].sort((a, b) => a.id - b.id);

  return (
    <div className="overflow-hidden rounded-2xl shadow-md border border-gray-300 bg-white select-none">
      <table className="w-full bg-white">
        <thead>
          <tr className="bg-blue-500 text-white text-sm uppercase tracking-wide">
            <th className="px-4 py-2 text-left">ID</th>

            {/* --- TIPOS --- */}
            {isTipo && <th className="px-4 py-2 text-left">Nombre</th>}

            {/* --- SOCIALES --- */}
            {isSociales && (
              <>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">URL</th>
              </>
            )}

            {/* --- BANNER --- */}
            {isBanner && <th className="px-4 py-2 text-left">Nombre</th>}

            {/* --- CLIENTES --- */}
            {isClient && (
              <>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Teléfono</th>
                <th className="px-4 py-2 text-left">Dirección</th>
              </>
            )}

            {/* --- INVENTARIO (Actualizado con atributos DTO) --- */}
            {isInventory && (
              <>
                <th className="px-4 py-2 text-left">ID Ítem</th>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Actualizado</th>
              </>
            )}

            {/* --- PRODUCTOS / SERVICIOS / MAQUINARIA --- */}
            {!isTipo && !isSociales && !isBanner && !isClient && !isInventory && (
              <>
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                {type === "productos" && <th className="px-4 py-2 text-left">Capacidad</th>}
                <th className="px-4 py-2 text-left">Descripción</th>
                {isDestacadoType && <th className="px-4 py-2 text-left">Destacado</th>}
              </>
            )}

            {/* Columna Imagen */}
            {!isTipo && !isSociales && !isClient && !isInventory && (
              <th className="px-4 py-2 text-left">Imagen</th>
            )}

            <th className="px-4 py-2 text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors text-sm">
              {/* ID del Registro (Balance ID) */}
              <td className="px-4 py-2 border-b">{item.id}</td>

              {/* --- TIPOS --- */}
              {isTipo && <td className="px-4 py-2 border-b">{item.name}</td>}

              {/* --- SOCIALES --- */}
              {isSociales && (
                <>
                  <td className="px-4 py-2 border-b">{item.type || "—"}</td>
                  <td className="px-4 py-2 border-b truncate max-w-[200px]" title={item.url}>
                    {item.url || "—"}
                  </td>
                </>
              )}

              {/* --- BANNER --- */}
              {isBanner && <td className="px-4 py-2 border-b">{item.name}</td>}

              {/* --- CLIENTES --- */}
              {isClient && (
                <>
                  <td className="px-4 py-2 border-b font-medium">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.email}</td>
                  <td className="px-4 py-2 border-b">{item.phone || "—"}</td>
                  <td className="px-4 py-2 border-b truncate max-w-[150px]" title={item.address}>
                    {item.address || "—"}
                  </td>
                </>
              )}

              {/* --- INVENTARIO --- */}
              {isInventory && (
                <>
                  {/* itemId */}
                  <td className="px-4 py-2 border-b text-gray-600">
                    {item.itemId || "—"}
                  </td>
                  
                  {/* itemName */}
                  <td className="px-4 py-2 border-b font-medium">
                    {/* Priorizamos itemName del DTO, fallback al mapeo manual */}
                    {item.itemName || item.name || "—"}
                  </td>

                  {/* itemType */}
                  <td className="px-4 py-2 border-b">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs uppercase font-semibold">
                      {item.itemType || "—"}
                    </span>
                  </td>

                  {/* currentQuantity */}
                  <td className="px-4 py-2 border-b">
                    <span
                      className={`px-2 py-1 rounded-full font-bold text-xs ${
                        (item.currentQuantity || item.stock || 0) > 10
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.currentQuantity ?? item.stock ?? 0}
                    </span>
                  </td>

                  {/* lastUpdated */}
                  <td className="px-4 py-2 border-b text-gray-500 text-xs">
                    {item.lastUpdated
                      ? new Date(item.lastUpdated).toLocaleString()
                      : "—"}
                  </td>
                </>
              )}

              {/* --- PRODUCTOS / SERVICIOS / MAQUINARIA --- */}
              {!isTipo && !isSociales && !isBanner && !isClient && !isInventory && (
                <>
                  <td className="px-4 py-2 border-b">{item.name}</td>
                  <td className="px-4 py-2 border-b">{item.typeName || item.type || "—"}</td>
                  {type === "productos" && (
                    <td className="px-4 py-2 border-b">{item.capacity || "—"}</td>
                  )}
                  <td className="px-4 py-2 border-b truncate max-w-xs" title={item.description}>
                    {item.description || "—"}
                  </td>
                  {isDestacadoType && (
                    <td className="px-4 py-2 border-b text-center">
                      {item.isFeatured ? (
                        <span className="text-green-600 font-bold text-xs">SÍ</span>
                      ) : (
                        <span className="text-gray-400 text-xs">NO</span>
                      )}
                    </td>
                  )}
                </>
              )}

              {/* --- IMAGEN --- */}
              {!isTipo && !isSociales && !isClient && !isInventory && (
                <td className="px-4 py-2 border-b">
                  {item.imageUrl || item.image ? (
                    <img
                      src={item.imageUrl || item.image}
                      alt={item.name || `Elemento ${item.id}`}
                      className={
                        isBanner
                          ? "w-32 h-16 object-cover rounded-md shadow-sm"
                          : "w-12 h-12 object-cover rounded-md shadow-sm"
                      }
                    />
                  ) : (
                    <span className="text-gray-400 text-xs">Sin img</span>
                  )}
                </td>
              )}

              {/* --- ACCIONES --- */}
              <td className="px-4 py-2 border-b text-center space-x-2 whitespace-nowrap">
                
                {/* 🔹 Botón Movimientos (Solo para Inventario) */}
                {isInventory && (
                  <button
                    onClick={() => {
                      // 🔹 Verificación de seguridad antes de ejecutar la función
                      if (typeof onViewMovements === 'function') {
                        onViewMovements(item);
                      } else {
                        console.error("onViewMovements no es una función válida o no fue pasada como prop");
                      }
                    }}
                    className="px-3 py-1 rounded-full text-blue-700 bg-blue-100 hover:bg-blue-200 transform transition-transform duration-200 hover:scale-[1.10] text-xs font-semibold"
                  >
                    Movimientos
                  </button>
                )}

                {/* Botón Editar: Oculto para Inventario si es solo lectura */}
                {!isInventory && (
                  <button
                    onClick={() => onEdit(item)}
                    className="px-3 py-1 rounded-full text-yellow-700 bg-yellow-100 hover:bg-yellow-200 transform transition-transform duration-200 hover:scale-[1.10] text-xs font-semibold"
                  >
                    Editar
                  </button>
                )}

                {/* Botón Eliminar: Oculto para Sociales e Inventario */}
                {!isSociales && !isInventory && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="px-3 py-1 rounded-full text-red-700 bg-red-100 hover:bg-red-200 transform transition-transform duration-200 hover:scale-[1.10] text-xs font-semibold"
                  >
                    Eliminar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;