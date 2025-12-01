import { useNavigate } from "react-router-dom";

const Sidebar = ({ selected, setSelected }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/");
  };

  const menuItems = [
    { key: "banner", label: "Banner", icon: "image" },
    { key: "productos", label: "Productos", icon: "shopping_bag" },
    { key: "servicios", label: "Servicios", icon: "build" },
    { key: "maquinaria", label: "Maquinaria", icon: "precision_manufacturing" },
    { key: "clientes", label: "Clientes", icon: "group" }, // 🔹 Nuevo apartado
    { key: "ProductosTipos", label: "Tipos de Productos", icon: "category" },
    { key: "ServiciosTipos", label: "Tipos de Servicio", icon: "design_services" },
    { key: "MaquinariaTipos", label: "Tipos de Maquinaria", icon: "construction" },
    { key: "inventario", label: "Inventario", icon: "inventory_2" }, // 🔹 Nuevo apartado
    { key: "sociales", label: "Sociales", icon: "share" }
  ];

  return (
    <div className="group w-16 hover:w-60 bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-700 text-white flex flex-col 
    h-screen sticky top-0 shadow-xl transition-all duration-300 ease-in-out z-50 overflow-hidden">
      
      {/* 1. Sección superior (Título) - Fijo */}
      <div className="shrink-0">
        <h2 className="text-lg font-bold p-4 text-center border-b border-blue-500/50 whitespace-nowrap opacity-0 group-hover:opacity-100
        transition-opacity duration-300 h-[60px] flex items-center justify-center">
          Administrador
        </h2>
      </div>

      {/* 2. Lista de Menú - Flexible y Scrolleable */}
      {/* MODIFICACIÓN SCROLLBAR:
          - [&::-webkit-scrollbar]:w-0  -> Oculto por defecto (ancho 0)
          - group-hover:[&::-webkit-scrollbar]:w-1.5 -> Visible al expandir (ancho delgado)
          - Estilización del track y thumb para que sea estético y redondeado.
      */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-2 
        [&::-webkit-scrollbar]:w-0 
        group-hover:[&::-webkit-scrollbar]:w-1.5
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-white/20
        [&::-webkit-scrollbar-thumb]:rounded-full
        hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li
              key={item.key}
              className={`flex items-center gap-3 p-3 text-sm cursor-pointer transition-all duration-200 rounded-md mx-2 ${
                selected === item.key
                  ? "bg-white/20 font-semibold shadow-sm hover:scale-105"
                  : "hover:bg-white/20 hover:scale-105"
              }`}
              onClick={() => setSelected(item.key)}
            >
              {/* Aseguramos que el icono no se encoja */}
              <span className="material-icons text-xl min-w-[24px] text-center">{item.icon}</span>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* 3. Botón Cerrar sesión - Fijo abajo */}
      <div className="p-4 shrink-0 border-t border-blue-500/30 bg-blue-800/20 backdrop-blur-sm">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-500/90 text-white font-medium rounded-full transition-all
          duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600 hover:shadow-[0_6px_15px_rgba(239,68,68,0.5)] overflow-hidden"
        >
          <span className="material-icons min-w-[24px]">logout</span>
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
            Cerrar sesión
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;