import { useState } from "react";
import { FaUser, FaLock, FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../assets/icons/Logo-1.png";

export default function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

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

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-700 px-4 relative">
      {/* Botón volver */}
      <NavLink
        to="/"
        className="absolute top-4 left-4 flex items-center text-white hover:text-gray-200 transition"
      >
        <FaArrowLeft className="mr-2" />
        Volver
      </NavLink>

      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <img src={Logo} alt="Logo" className="w-56 h-56 drop-shadow-md" />
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 60 }}
          className={`bg-white/10 backdrop-blur-2xl rounded-2xl shadow-2xl p-8 border ${
            error ? "border-red-400/50" : "border-white/20"
          } space-y-6`}
        >
          {/* Usuario */}
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type="text"
              id="user"
              required
              className="peer pl-10 pr-3 pt-5 pb-2 w-full rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30
              transition placeholder-transparent"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="Usuario"
              onKeyDown={handleKeyPress}
            />
            <label
              htmlFor="user"
              className="absolute left-10 text-white/60 text-sm transition-all 
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40
              peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-cyan-300"
            >
              Usuario
            </label>
          </div>

          {/* Contraseña */}
          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70" />
            <input
              type={showPass ? "text" : "password"}
              id="password"
              required
              className="peer pl-10 pr-10 pt-5 pb-2 w-full rounded-lg bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:bg-white/30 transition placeholder-transparent"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Contraseña"
              onKeyDown={handleKeyPress}
            />
            <label
              htmlFor="password"
              className="absolute left-10 text-white/60 text-sm transition-all 
              peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40
              peer-focus:top-1 peer-focus:translate-y-0 peer-focus:text-sm peer-focus:text-cyan-300"
            >
              Contraseña
            </label>

            {/* Toggle contraseña */}
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Error */}
          {error && (
            <motion.p
              initial={{ x: -10 }}
              animate={{ x: [0, -10, 10, -10, 10, 0] }}
              transition={{ duration: 0.4 }}
              className="text-red-300 text-sm text-center font-medium"
            >
              {error}
            </motion.p>
          )}

          {/* Botón login */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleLogin}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg hover:shadow-xl hover:opacity-90 transition-all"
          >
            Iniciar sesión
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
