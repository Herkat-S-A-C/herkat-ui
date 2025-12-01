import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { getSocialMedia } from "/src/services/socialMediaServices";

function ButtonWhatsApp() {
  const [whatsappUrl, setWhatsappUrl] = useState("");

  useEffect(() => {
    const fetchWhatsApp = async () => {
      try {
        const data = await getSocialMedia();
        // buscamos el objeto con type === "WHATSAPP"
        const whatsappItem = data.find((item) => item.type === "WHATSAPP");

        if (whatsappItem && whatsappItem.url) {
          // Si la API devuelve solo el número, construimos el link
          const url = whatsappItem.url.startsWith("http")
            ? whatsappItem.url
            : `https://wa.me/${whatsappItem.url}`;
          setWhatsappUrl(url);
        }
      } catch (error) {
        console.error("Error al cargar WhatsApp:", error);
      }
    };

    fetchWhatsApp();
  }, []);

  if (!whatsappUrl) return null; // 🔹 No renderizar si no hay URL

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 z-50 flex items-center justify-center"
      title="Chatea por WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  );
}

export default ButtonWhatsApp;
