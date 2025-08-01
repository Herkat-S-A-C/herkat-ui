import { NavLink } from "react-router-dom";
import Button from "./Button";
import loginIcon from "../assets/icons/login.png";

export default function Header() {
  return (
    <header className="bg-blue-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">HerKat</h1>
        <nav className="flex gap-4 items-center">
          <Button
            as={NavLink}
            to="/catalogo/productos"
            className="bg-transparent font-semibold text-white hover:text-gray-700 hover:bg-transparent"
          >
            Productos
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/servicios"
            className="bg-transparent font-semibold text-white hover:text-gray-700 hover:bg-transparent"
          >
            Servicios
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/maquinaria"
            className="bg-transparent font-semibold text-white hover:text-gray-700 hover:bg-transparent"
          >
            Maquinaria
          </Button>
          <Button as={NavLink} to="/"
          className="bg-black text-white rounded hover:bg-gray-900 transition ${className}">
            Inicio
          </Button>
          
          <Button
            as={NavLink}
            to="/login"
            className="p-1 bg-transparent hover:bg-transparent"
          >
            <img
              src={loginIcon}
              alt="Iniciar sesión"
              className="w-8 h-8 object-contain"
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
