import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/icons/Logo-1.png";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);

  // Variables para swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (menuOpen) {
      setShowBackdrop(true);
    } else {
      const timeout = setTimeout(() => setShowBackdrop(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  // Detectar swipe hacia la derecha para cerrar menú
  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (touchEndX.current - touchStartX.current > 50) {
      setMenuOpen(false);
    }
  }

  const links = [
    { to: "/catalogo/productos", label: "Productos" },
    { to: "/catalogo/servicios", label: "Servicios" },
    { to: "/catalogo/maquinaria", label: "Maquinaria" },
    { to: "/", label: "Inicio" }
  ];

  return (
    <header className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 shadow-md sticky top-0 z-50 w-full">
      <div className="w-full px-12 py-4 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            src={Logo}
            alt="HerKat Logo"
            className="w-12 h-auto object-contain"
          />
        </NavLink>

        {/* Botón hamburguesa - móvil */}
        <button
          onClick={() => setMenuOpen(true)}
          className="sm:hidden text-white text-2xl"
          aria-label="Toggle Menu"
        >
          <FaBars />
        </button>

        {/* Navegación escritorio */}
        <nav className="hidden sm:flex gap-3 items-center">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `px-5 py-2 rounded-lg font-medium transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg hover:-translate-y-2 ${
                  isActive
                    ? "bg-white text-blue-700"
                    : "border border-white text-white hover:bg-white hover:text-blue-700"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          {/* Login */}
          <NavLink
            to="/login"
            className="flex items-center justify-center w-12 h-12 text-white rounded-full transition-all duration-300 hover:bg-white hover:text-blue-700 hover:-translate-y-2 hover:shadow-lg"
          >
            <span className="material-symbols-rounded text-4xl">
              account_circle
            </span>
          </NavLink>
        </nav>
      </div>

      {/* Fondo oscuro con animación */}
      {showBackdrop && (
        <div
          className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ${
            menuOpen ? "opacity-50" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Menú lateral con detección swipe */}
      <div
        className={`sm:hidden fixed top-0 right-0 w-[80%] h-full bg-gradient-to-b from-blue-700 to-indigo-800 shadow-lg z-50 p-6 space-y-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Ya no hay botón cerrar */}

        {/* Links */}
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setMenuOpen(false)}
            className={({ isActive }) =>
              `block w-full text-left px-4 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out transform hover:-translate-y-1 shadow-sm hover:shadow-lg ${
                isActive
                  ? "bg-white text-blue-700"
                  : "border border-white text-white hover:bg-white hover:text-blue-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}

        {/* Login */}
        <NavLink
          to="/login"
          onClick={() => setMenuOpen(false)}
          className="flex items-center justify-center w-12 h-12 text-white rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:bg-white hover:text-blue-700"
        >
          <span className="material-symbols-rounded text-5xl">
            account_circle
          </span>
        </NavLink>
      </div>
    </header>
  );
}
