import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-10 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-600 transition"
            title="Facebook"
          >
            <FaFacebookF size={22} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-pink-500 transition"
            title="Instagram"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="mailto:herkat.contacto@gmail.com"
            className="text-white hover:text-red-500 transition"
            title="Correo electrónico"
          >
            <FaEnvelope size={22} />
          </a>
          <a
            href="https://wa.me/51989865307"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-green-500 transition"
            title="WhatsApp"
          >
            <FaWhatsapp size={22} />
          </a>
        </div>
        © {new Date().getFullYear()} HerKat Group SAC — Todos los derechos reservados.
      </div>
    </footer>
  );
}
