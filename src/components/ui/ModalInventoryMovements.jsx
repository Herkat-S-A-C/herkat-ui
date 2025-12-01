import { useState, useEffect, useCallback } from "react";
import { FaTrash, FaEdit, FaTimes, FaSave, FaPlus } from "react-icons/fa";

// 🔹 CORRECCIÓN: Usamos ruta absoluta "/src/..." para garantizar que encuentre el archivo
// sin importar si este componente está en "components/" o "components/ui/"
import {
  getInventoryMovementsByItemId,
  createInventoryMovement,
  updateInventoryMovement,
  deleteInventoryMovement,
} from "/src/services/inventoryMovementsServices";

const ModalInventoryMovements = ({ item, onClose }) => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Estado del formulario
  const [form, setForm] = useState({
    type: "IN", // Por defecto Entrada
    quantity: "",
  });

  // Cargar movimientos
  const fetchMovements = useCallback(async () => {
    // Validación de seguridad
    if (!item || !item.itemId) return;

    setLoading(true);
    try {
      const data = await getInventoryMovementsByItemId(item.itemId);
      // Ordenar por fecha descendente (más reciente primero)
      const sorted = (Array.isArray(data) ? data : []).sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setMovements(sorted);
    } catch (error) {
      console.error("Error cargando movimientos:", error);
    } finally {
      setLoading(false);
    }
  }, [item]);

  // Ejecutar fetch cuando el item cambia
  useEffect(() => {
    if (item) {
      fetchMovements();
    }
  }, [fetchMovements, item]);

  // Manejar cambios en el input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Cargar datos en el formulario para editar
  const handleEditClick = (mov) => {
    setEditingId(mov.id);
    setForm({
      type: mov.type,
      quantity: mov.quantity,
    });
  };

  // Cancelar edición
  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ type: "IN", quantity: "" });
  };

  // Eliminar movimiento
  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este movimiento? Esto afectará el stock actual.")) return;
    try {
      await deleteInventoryMovement(id);
      fetchMovements(); // Recargar lista
    } catch (error) {
      console.error("Error al eliminar:", error);
      alert("Error al eliminar movimiento");
    }
  };

  // Enviar formulario (Crear o Actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.quantity || Number(form.quantity) <= 0) {
      return alert("La cantidad debe ser mayor a 0");
    }

    const payload = {
      itemId: item.itemId, // ID obligatorio del ítem
      type: form.type,     // "IN" o "OUT"
      quantity: Number(form.quantity),
    };

    try {
      if (editingId) {
        await updateInventoryMovement(editingId, payload);
      } else {
        await createInventoryMovement(payload);
      }
      setEditingId(null);
      setForm({ type: "IN", quantity: "" }); // Resetear form
      fetchMovements(); // Recargar lista
    } catch (error) {
      console.error(error);
      alert("Error al guardar el movimiento. Verifique los datos.");
    }
  };

  // Si no hay item, no renderizamos nada
  if (!item) return null;

  return (
    // Usamos un div normal con clases Tailwind para el overlay
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-[100] p-4 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Contenedor del Modal */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-xl font-bold">Movimientos de Inventario</h2>
            <p className="text-sm opacity-90">
              Ítem: <strong>{item.itemName || item.name || "Desconocido"}</strong> (ID: {item.itemId})
            </p>
          </div>
          <button 
            onClick={onClose} 
            className="hover:bg-blue-700 p-2 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Body Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* TABLA DE MOVIMIENTOS */}
          <div className="border rounded-lg overflow-hidden shadow-sm">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-semibold">
                <tr>
                  {/* 🔹 Nueva columna ID */}
                  <th className="p-3">ID</th>
                  <th className="p-3">Fecha</th>
                  <th className="p-3">Tipo</th>
                  <th className="p-3">Cantidad</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="5" className="p-4 text-center text-gray-500">Cargando...</td></tr>
                ) : movements.length === 0 ? (
                  <tr><td colSpan="5" className="p-6 text-center text-gray-500 italic">No hay movimientos registrados.</td></tr>
                ) : (
                  movements.map((mov) => (
                    <tr key={mov.id} className="hover:bg-gray-50">
                      {/* 🔹 Celda ID */}
                      <td className="p-3 font-bold text-gray-500">
                        #{mov.id}
                      </td>
                      <td className="p-3 text-gray-600">
                        {mov.createdAt ? new Date(mov.createdAt).toLocaleString() : "—"}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold border ${
                          mov.type === "IN" 
                            ? "bg-green-50 text-green-700 border-green-200" 
                            : "bg-red-50 text-red-700 border-red-200"
                        }`}>
                          {mov.type === "IN" ? "ENTRADA (+)" : "SALIDA (-)"}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-800">{mov.quantity}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button 
                          onClick={() => handleEditClick(mov)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded transition"
                          title="Editar"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(mov.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded transition"
                          title="Eliminar"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* FORMULARIO DE REGISTRO */}
          <div className={`p-5 rounded-xl border transition-colors ${
            editingId ? "border-yellow-300 bg-yellow-50/50" : "border-gray-200 bg-gray-50/50"
          }`}>
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-sm uppercase tracking-wide">
              {editingId ? <><FaEdit className="text-yellow-600"/> Editar Movimiento</> : <><FaPlus className="text-blue-600"/> Nuevo Movimiento</>}
            </h3>
            
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* ID Item (Visual) */}
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">ID Ítem</label>
                <input 
                  type="text" 
                  value={item.itemId || ""} 
                  disabled 
                  className="w-full bg-gray-200 border-gray-300 text-gray-500 rounded px-3 py-2 text-sm cursor-not-allowed"
                />
              </div>

              {/* Selector Tipo */}
              <div className="md:col-span-4">
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Tipo <span className="text-red-500">*</span></label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
                >
                  <option value="IN">ENTRADA (Aumentar Stock)</option>
                  <option value="OUT">SALIDA (Disminuir Stock)</option>
                </select>
              </div>

              {/* Input Cantidad */}
              <div className="md:col-span-3">
                <label className="block text-xs font-bold text-gray-700 mb-1 uppercase">Cantidad <span className="text-red-500">*</span></label>
                <input 
                  type="number" 
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  min="1"
                  placeholder="0"
                  required
                  className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition shadow-sm"
                />
              </div>

              {/* Botones Acción */}
              <div className="md:col-span-3 flex gap-2">
                <button 
                  type="submit"
                  className={`flex-1 flex items-center justify-center gap-2 text-white font-bold py-2 px-4 rounded text-sm transition shadow-md ${
                    editingId ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  <FaSave /> {editingId ? "Guardar" : "Registrar"}
                </button>
                
                {editingId && (
                  <button 
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-3 rounded hover:bg-gray-100 text-sm transition"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalInventoryMovements;