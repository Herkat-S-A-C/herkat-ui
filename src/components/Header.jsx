import { NavLink } from "react-router-dom";
import Button from "./Button";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 py-2 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">HerKat</h1>
        <nav className="flex gap-4 items-center">
          <Button
            as={NavLink}
            to="/products"
            className="bg-transparent font-semibold text-blue-800 hover:text-blue-600 hover:bg-transparent"
          >
            Productos
          </Button>
          <Button
            as={NavLink}
            to="/services"
            className="bg-transparent font-semibold text-blue-800 hover:text-blue-600 hover:bg-transparent"
          >
            Servicios
          </Button>
          <Button
            as={NavLink}
            to="/machinery"
            className="bg-transparent font-semibold text-blue-800 hover:text-blue-600 hover:bg-transparent"
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
              src="/src/assets/icons/login.png"
              alt="Iniciar sesión"
              className="w-8 h-8 object-contain"
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
