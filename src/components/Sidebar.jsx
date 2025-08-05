import { useNavigate } from "react-router-dom";

const Sidebar = ({ selected, setSelected }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminData");
    navigate("/"); // Ajusta la ruta según tu página de inicio
  };

  return (
    <div className="w-40 bg-gray-800 text-white flex flex-col justify-between h-screen sticky top-0">
      {/* Sección superior */}
      <div>
        <h2 className="text-2xl font-bold p-4">Admin</h2>
        <ul>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              selected === "banner" && "bg-gray-700"
            }`}
            onClick={() => setSelected("banner")}
          >
            Banner
          </li>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              selected === "productos" && "bg-gray-700"
            }`}
            onClick={() => setSelected("productos")}
          >
            Productos
          </li>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              selected === "servicios" && "bg-gray-700"
            }`}
            onClick={() => setSelected("servicios")}
          >
            Servicios
          </li>
          <li
            className={`p-4 cursor-pointer hover:bg-gray-700 ${
              selected === "maquinaria" && "bg-gray-700"
            }`}
            onClick={() => setSelected("maquinaria")}
          >
            Maquinaria
          </li>
        </ul>
      </div>

      {/* Botón Cerrar sesión */}
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
