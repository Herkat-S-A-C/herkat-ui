import { useState, useEffect } from "react";
import { getSocialMedia } from "/src/services/socialMediaService";

// Importamos los íconos que usaremos
import { FaFacebookF, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";

// 🔹 Mapeo de type -> ícono + estilos (fuera del componente)
const iconMap = {
  FACEBOOK: { icon: FaFacebookF, hover: "hover:text-blue-400", title: "Facebook" },
  TIKTOK: { icon: FaTiktok, hover: "hover:text-gray-400", title: "TikTok" },
  WHATSAPP: { icon: FaWhatsapp, hover: "hover:text-green-400", title: "WhatsApp" },
  EMAIL: { icon: FaEnvelope, hover: "hover:text-red-400", title: "Email" },
};

export default function Footer() {
  const [socialNetworks, setSocialNetworks] = useState([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const data = await getSocialMedia();

        // Enriquecemos la data con los íconos y colores según el type
        const enriched = data.map((item) => {
          const match = iconMap[item.type] || {};
          return {
            ...item,
            Icon: match.icon,
            hoverColor: match.hover,
            title: match.title || item.type,
          };
        });

        setSocialNetworks(enriched);
      } catch (error) {
        console.error("Error al cargar redes sociales:", error);
      }
    };
    fetchSocialMedia();
  }, []); // ✅ sin warnings porque iconMap ya no está dentro del componente

  return (
    <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-10 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          {socialNetworks.map(({ id, Icon, url, hoverColor, title }) => {
            const isEmail = title === "Email" || url?.startsWith("mailto:");
            // Si es EMAIL y no tiene "mailto:" lo agregamos
            const finalUrl = isEmail && !url?.startsWith("mailto:") ? `mailto:${url}` : url;

            return (
              <a
                key={id}
                href={finalUrl}
                target={isEmail ? undefined : "_blank"}
                rel={isEmail ? undefined : "noopener noreferrer"}
                className={`text-white transition ${hoverColor || ""}`}
                title={title || ""}
              >
                {Icon && <Icon size={22} />}
              </a>
            );
          })}
        </div>
        © {new Date().getFullYear()} HerKat Group SAC — Todos los derechos reservados.
      </div>
    </footer>
  );
}
