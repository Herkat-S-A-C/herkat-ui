import { NavLink } from "react-router-dom";
import Button from "./Button";
import loginIcon from "../assets/icons/login.png";
import Logo from "../assets/icons/Logo-1.png";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
        
        {/* Logo */}
        <div className="flex justify-between items-center">
          <NavLink to="/">
            <img
              src={Logo}
              alt="HerKat Logo"
              className="w-10 h-auto object-contain"
            />
          </NavLink>
        </div>

        {/* Menú de navegación */}
        <nav className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-4">
          <Button
            as={NavLink}
            to="/catalogo/productos"
            className="bg-transparent font-semibold text-white hover:text-gray-300 text-sm sm:text-base"
          >
            Productos
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/servicios"
            className="bg-transparent font-semibold text-white hover:text-gray-300 text-sm sm:text-base"
          >
            Servicios
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/maquinaria"
            className="bg-transparent font-semibold text-white hover:text-gray-300 text-sm sm:text-base"
          >
            Maquinaria
          </Button>
          <Button
            as={NavLink}
            to="/"
            className="bg-black text-white rounded hover:bg-gray-900 transition text-sm sm:text-base"
          >
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
              className="w-8 sm:w-10 h-auto object-contain"
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
