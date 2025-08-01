import { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import loginIcon from "../assets/icons/login.png";
import Logo from "../assets/icons/Logo-1.png";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={Logo} alt="HerKat Logo" className="w-10 h-auto object-contain" />
        </NavLink>

        {/* Botón hamburguesa (visible en móvil) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white text-2xl"
          aria-label="Toggle Menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Navegación - Escritorio */}
        <nav className="hidden sm:flex gap-4 items-center">
          <Button as={NavLink} to="/catalogo/productos" className="bg-transparent font-semibold text-white hover:text-gray-300">
            Productos
          </Button>
          <Button as={NavLink} to="/catalogo/servicios" className="bg-transparent font-semibold text-white hover:text-gray-300">
            Servicios
          </Button>
          <Button as={NavLink} to="/catalogo/maquinaria" className="bg-transparent font-semibold text-white hover:text-gray-300">
            Maquinaria
          </Button>
          <Button as={NavLink} to="/" className="bg-black text-white rounded hover:bg-gray-900 transition">
            Inicio
          </Button>
          <Button as={NavLink} to="/login" className="p-1 bg-transparent hover:bg-transparent">
            <img src={loginIcon} alt="Iniciar sesión" className="w-10 h-10 object-contain" />
          </Button>
        </nav>
      </div>

      {/* Menú lateral - Móvil */}
      {menuOpen && (
        <div className="sm:hidden fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50 p-4 space-y-4">
          <Button as={NavLink} to="/catalogo/productos" className="block text-blue-700 font-semibold" onClick={() => setMenuOpen(false)}>
            Productos
          </Button>
          <Button as={NavLink} to="/catalogo/servicios" className="block text-blue-700 font-semibold" onClick={() => setMenuOpen(false)}>
            Servicios
          </Button>
          <Button as={NavLink} to="/catalogo/maquinaria" className="block text-blue-700 font-semibold" onClick={() => setMenuOpen(false)}>
            Maquinaria
          </Button>
          <Button as={NavLink} to="/" className="block text-white bg-blue-700 px-3 py-2 rounded" onClick={() => setMenuOpen(false)}>
            Inicio
          </Button>
          <Button as={NavLink} to="/login" className="block" onClick={() => setMenuOpen(false)}>
            <img src={loginIcon} alt="Iniciar sesión" className="w-10 h-10 object-contain" />
          </Button>
        </div>
      )}
    </header>
  );
}
