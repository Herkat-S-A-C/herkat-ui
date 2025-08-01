import { NavLink } from "react-router-dom";
import Button from "./Button";
import loginIcon from "../assets/icons/login.png";
import Logo from "../assets/icons/Logo-1.png";

export default function Header() {
  return (
    /*<header className="bg-blue-700 shadow-md sticky top-0 z-50">*/
    <header className="bg-gradient-to-r  from-blue-600 via-blue-700 to-indigo-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-1 flex justify-between items-center">
        <NavLink to="/">
          <img
            src={Logo}
            alt="HerKat Logo"
            className="w-10 h-auto object-contain"
          />
        </NavLink>
        <nav className="flex gap-4 items-center">
          <Button
            as={NavLink}
            to="/catalogo/productos"
            className="bg-transparent font-semibold text-white hover:text-gray-300"
          >
            Productos
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/servicios"
            className="bg-transparent font-semibold text-white hover:text-gray-300"
          >
            Servicios
          </Button>
          <Button
            as={NavLink}
            to="/catalogo/maquinaria"
            className="bg-transparent font-semibold text-white hover:text-gray-300"
          >
            Maquinaria
          </Button>
          <Button
            as={NavLink}
            to="/"
            className="bg-black text-white rounded hover:bg-gray-900 transition"
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
              className="w-10 h-10 object-contain"
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
