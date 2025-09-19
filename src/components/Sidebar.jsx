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
    { key: "ProductosTipos", label: "Tipos de Productos", icon: "category" },
    { key: "ServiciosTipos", label: "Tipos de Servicio", icon: "design_services" },
    { key: "MaquinariaTipos", label: "Tipos de Maquinaria", icon: "construction" },
    { key: "inventario", label: "Inventario", icon: "inventory_2" },
    { key: "sociales", label: "Sociales", icon: "share" }
  ];

  return (
    <div className="group w-16 hover:w-60 bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-700 text-white flex flex-col justify-between
    h-screen sticky top-0 shadow-xl transition-all duration-300 ease-in-out">
      {/* Sección superior */}
      <div>
        <h2 className="text-lg font-bold p-4 text-center border-b border-blue-500/50 whitespace-nowrap opacity-0 group-hover:opacity-100
        transition-opacity duration-300">
          Administrador
        </h2>
        <ul className="mt-2 space-y-1">
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
              <span className="material-icons text-xl">{item.icon}</span>
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Botón Cerrar sesión */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-red-500/90 text-white font-medium rounded-full transition-all
          duration-300 ease-in-out transform hover:scale-110 hover:bg-red-600 hover:shadow-[0_6px_15px_rgba(239,68,68,0.5)]"
        >
          <span className="material-icons">logout</span>
          <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Cerrar sesión
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
