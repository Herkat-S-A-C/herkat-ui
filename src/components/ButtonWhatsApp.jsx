import React from "react";
import { FaWhatsapp } from "react-icons/fa";

function ButtonWhatsApp({ phoneNumber = "51989865307" }) {
  const whatsappURL = `https://wa.me/${phoneNumber}`;
  return (
    <a
      href={whatsappURL}
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
