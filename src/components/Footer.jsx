import { useState, useEffect } from "react";
import { getSocialMedia } from "/src/services/socialMediaService";
import { FaFacebookF, FaTiktok, FaWhatsapp, FaEnvelope } from "react-icons/fa";

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

        const enriched = data.map((item) => {
          const match = iconMap[item.type] || {};
          return {
            ...item,
            icon: match.icon,
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
  }, []);

  return (
    <footer className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white py-10 border-t border-blue-500/20">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          {socialNetworks
            .filter((item) => !!item.url && item.icon)
            .map((item) => {
              const isEmail = item.title === "Email" || item.url?.startsWith("mailto:");
              const finalUrl =
                isEmail && !item.url?.startsWith("mailto:") ? `mailto:${item.url}` : item.url;
              const IconComponent = item.icon;

              return (
                <a
                  key={item.id}
                  href={finalUrl}
                  target={isEmail ? undefined : "_blank"}
                  rel={isEmail ? undefined : "noopener noreferrer"}
                  className={`text-white transition ${item.hoverColor || ""}`}
                  title={item.title || ""}
                >
                  <IconComponent size={22} />
                </a>
              );
            })}
        </div>
        © {new Date().getFullYear()} HerKat Group SAC — Todos los derechos reservados.
      </div>
    </footer>
  );
}
