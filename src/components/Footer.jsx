import { FaFacebookF, FaInstagram, FaEnvelope, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 py-10 border-t">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition"
            title="Facebook"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition"
            title="Instagram"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="mailto:herkat.contacto@gmail.com"
            className="text-gray-600 hover:text-red-500 transition"
            title="Correo electrónico"
          >
            <FaEnvelope size={20} />
          </a>
          <a
            href="https://wa.me/51989865307"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-green-500 transition"
            title="WhatsApp"
          >
            <FaWhatsapp size={20} />
          </a>
        </div>
        © {new Date().getFullYear()} HerKat SAC — Todos los derechos reservados.
      </div>
    </footer>
  );
}
