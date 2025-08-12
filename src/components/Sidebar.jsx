import { useNavigate } from "react-router-dom";

const Sidebar = ({ selected, setSelected }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/"); // Ajusta la ruta según tu página de inicio
  };

  return (
    <div className="w-44 bg-gray-900 text-white flex flex-col justify-between h-screen sticky top-0 shadow-lg">
      {/* Sección superior */}
      <div>
        <h2 className="text-2xl font-bold p-4 text-center border-b border-gray-700">
          Gestión
        </h2>
        <ul className="space-y-1 mt-2">
          {["banner", "productos", "servicios", "maquinaria", "sociales"].map((item) => (
            <li
              key={item}
              className={`p-3 text-sm text-center capitalize cursor-pointer transition-all duration-200 rounded-md mx-2 ${
                selected === item
                  ? "bg-indigo-600 font-semibold"
                  : "hover:bg-gray-700"
              }`}
              onClick={() => setSelected(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Botón Cerrar sesión */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full py-2 px-3 bg-red-500 text-white font-medium rounded-md transition-all duration-300 ease-in-out transform hover:scale-105 hover:translate-y-[-2px] hover:shadow-[0_6px_15px_rgba(239,68,68,0.5)]"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
