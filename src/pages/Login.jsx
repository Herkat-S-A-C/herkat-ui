import { useState } from "react";
import { FaUser, FaLock, FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../assets/icons/Logo-1.png";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const USERNAME = "admin";
  const PASSWORD = "123456";

  const handleLogin = () => {
    if (user === USERNAME && pass === PASSWORD) {
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      navigate("/admin");
    } else {
      setError("Usuario o contraseña incorrectos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-700 px-4 relative">
      <NavLink
        to="/"
        className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200 transition"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </NavLink>

      <div className="w-full max-w-md p-8">
        <div className="flex justify-center mb-8">
          <img src={Logo} alt="Logo" className="w-32 h-24" />
        </div>

        <div className="bg-transparent rounded-xl p-8 backdrop-blur-sm shadow-lg">
          <div className="mb-6">
            <div className="flex items-center bg-white bg-opacity-20 rounded px-4 py-2 border">
              <FaUser className="text-white mr-2" />
              <input
                type="text"
                placeholder="Usuario"
                className="bg-transparent focus:outline-none text-white w-full placeholder-white"
                value={user}
                onChange={(e) => setUser(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center bg-white bg-opacity-20 rounded px-4 py-2 border">
              <FaLock className="text-white mr-2" />
              <input
                type="password"
                placeholder="Contraseña"
                className="bg-transparent focus:outline-none text-white w-full placeholder-white"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-300 text-sm mb-4 text-center">{error}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full bg-white text-blue-700 font-semibold py-2 rounded hover:bg-gray-100 transition"
          >
            Iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
