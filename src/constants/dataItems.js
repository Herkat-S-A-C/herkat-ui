import localBanner1 from "../assets/banners/banner-prueba-1.png";
import localBanner2 from "../assets/banners/banner-prueba-2.png";
import localBanner3 from "../assets/banners/banner-prueba-3.png";

import localBottle1 from "../assets/bottles/botella-1.png";
import localBottle2 from "../assets/bottles/botella-2.png";
import localBottle3 from "../assets/bottles/botella-3.png";
import localBottle4 from "../assets/bottles/botella-4.png";

import localMachine1 from "../assets/machines/maquina-1.png";
import localMachine2 from "../assets/machines/maquina-2.png";
import localMachine3 from "../assets/machines/maquina-3.png";
import localMachine4 from "../assets/machines/maquina-4.png";

export const banner = [
  {
    id: 1,
    image: localBanner1,
  },
  {
    id: 2,
    image: localBanner2,
  },
  {
    id: 3,
    image: localBanner3
  }
];

export const products = [
  // Botellas
  {
    id: 1,
    title: "Botella 500ml",
    description: "Botella PET transparente de 500ml.",
    image: "https://drive.google.com/file/d/1SZNOPyZre512zeFqHA1Fu05pm6b6bjRT/view?usp=sharing",
    type: "botella",
    outstanding: "si"
  },
  {
    id: 2,
    title: "Botella 1L",
    description: "Botella PET azul de 1 litro.",
    image: localBottle2,
    type: "botella",
    outstanding: "si"
  },
  {
    id: 3,
    title: "Botella 2L",
    description: "Botella PET gris de 2 litros.",
    image: localBottle3,
    type: "botella",
    outstanding: "si"
  },

  // Tapas
  {
    id: 4,
    title: "Tapa Rosca Azul",
    description: "Tapa para botella estándar de rosca color azul.",
    image: localBottle4,
    type: "tapa",
    outstanding: "si"
  },
  {
    id: 5,
    title: "Tapa Rosca Blanca",
    description: "Tapa estándar color blanco, segura y hermética.",
    image: localBottle1,
    type: "tapa",
    outstanding: "si"
  },

  // Envases
  {
    id: 6,
    title: "Envase 5L",
    description: "Envase PET de 5 litros, ideal para químicos.",
    image: localBottle2,
    type: "envase",
    outstanding: "si"
  },
  {
    id: 7,
    title: "Envase 10L Industrial",
    description: "Envase resistente para líquidos industriales.",
    image: localBottle3,
    type: "envase",
    outstanding: "si"
  },
  {
    id: 8,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: localBottle4,
    type: "botella",
    outstanding: "si"
  },
  {
    id: 9,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: localBottle1,
    type: "botella",
    outstanding: "si"
  },
  {
    id: 10,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: localBottle2,
    type: "botella",
    outstanding: "si"
  }
];



export const services = [
  {
    id: 1,
    title: "Diseño de Moldes",
    description: "Creamos moldes personalizados para tus productos.",
    image: "https://drive.google.com/file/d/1SZNOPyZre512zeFqHA1Fu05pm6b6bjRT/view?usp=drive_link",
    type: "diseño",
    outstanding: "si",
    left: "sí"
  },
  {
    id: 2,
    title: "Diseño de Etiquetas",
    description: "Diseñamos etiquetas con identidad de marca.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
    type: "diseño",
    outstanding: "si",
    left: "no"
  },
  {
    id: 3,
    title: "Servicio de Envasado",
    description: "Envasado profesional de líquidos o sólidos.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
    type: "envasado",
    outstanding: "si",
    left: "sí"
  },
  {
    id: 4,
    title: "Sellado Hermético",
    description: "Sellado al vacío o con calor para conservación.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
    type: "envasado",
    outstanding: "si",
    left: "no"
  },
  {
    id: 5,
    title: "Distribución Local",
    description: "Entregas puntuales en Lima y alrededores.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",

    type: "logística",
    outstanding: "si",
    left: "sí"
  },
  {
    id: 6,
    title: "Transporte Nacional",
    description: "Cobertura a todo el país en 48 horas.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",

    type: "logística",
    outstanding: "si",
    left: "no"
  },
  {
    id: 7,
    title: "Empaque y Embalaje",
    description: "Preparación profesional de tus productos para envío.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
    type: "logística",
    outstanding: "no",
    left: "sí"
  },
  {
    id: 8,
    title: "Almacenamiento",
    description: "Servicio de almacenamiento temporal o permanente.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
    type: "logística",
    outstanding: "si",
    left: "no"
  }
];



export const machinery = [
  {
    id: 1,
    title: "Sopladora Automática",
    description: "Máquina para fabricar botellas desde preformas.",
    image: localMachine1,
    type: "sopladora",
    outstanding: "si"
  },
  {
    id: 2,
    title: "Mini Sopladora Manual",
    description: "Versión compacta y operada manualmente.",
    image: localMachine2,
    type: "sopladora",
    outstanding: "no"
  },
  {
    id: 3,
    title: "Selladora de Banda",
    description: "Sellado automático de envases en línea.",
    image: localMachine3,
    type: "selladora",
    outstanding: "no"
  },
  {
    id: 4,
    title: "Selladora de Inducción",
    description: "Sellado hermético para tapas con inducción.",
    image: localMachine4,
    type: "selladora",
    outstanding: "si"
  },
  {
    id: 5,
    title: "Impresora de Etiquetas",
    description: "Impresora térmica para etiquetas de productos.",
    image: localMachine1,
    type: "impresora",
    outstanding: "no"
  },
  {
    id: 6,
    title: "Impresora de Códigos QR",
    description: "Ideal para seguimiento y trazabilidad.",
    image: localMachine2,
    type: "impresora",
    outstanding: "si"
  },
  {
    id: 7,
    title: "Dosificadora de Líquidos",
    description: "Precisión en el llenado de botellas.",
    image: localMachine3,
    type: "sopladora",
    outstanding: "no"
  },
  {
    id: 8,
    title: "Moldeadora de Tapas",
    description: "La Moldeadora de Tapas Plásticas es un equipo industrial diseñado para la fabricación eficiente y uniforme de tapas de plástico, utilizadas comúnmente en botellas, envases y otros recipientes. Su tecnología avanzada permite un proceso de moldeado preciso, garantizando un sellado seguro y resistente que cumple con los estándares de calidad del sector. Este equipo es ideal para empresas del rubro de embalaje, envasado, fabricación de productos plásticos, alimentario y farmacéutico, donde se requiere producción en serie con alta eficiencia.",
    image: localMachine4,
    type: "selladora",
    outstanding: "si"
  }
];

import {
  FaFacebookF,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaTiktok,
  FaPinterestP,
  FaTelegramPlane,
  FaGithub,
} from "react-icons/fa";

export const social_networks = [
  {
    id: "1",
    icon: FaFacebookF,
    url: "https://facebook.com",
    hoverColor: "hover:text-blue-600",
    title: "Facebook",
  },
  {
    id: "2",
    icon: FaTiktok,
    url: "https://tiktok.com",
    hoverColor: "hover:text-gray-100",
    title: "TikTok",
  },
  {
    id: "3",
    icon: FaEnvelope,
    url: "mailto:herkat.contacto@gmail.com",
    hoverColor: "hover:text-red-500",
    title: "Correo electrónico",
  },
  {
    id: "4",
    icon: FaWhatsapp,
    url: "https://wa.me/51989865307",
    hoverColor: "hover:text-green-500",
    title: "WhatsApp",
  },
];
