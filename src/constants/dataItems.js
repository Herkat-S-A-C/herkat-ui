import localBanner1 from "../assets/banners/banner-prueba-1.png";
import localBanner2 from "../assets/banners/banner-prueba-2.png";
import localBanner3 from "../assets/banners/banner-prueba-3.png";

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
    image: "https://icemplast.com/wp-content/uploads/2020/12/ENVASES_AGUA_500ml.png",
    type: "botella",
    outstanding: "si"
  },
  {
    id: 2,
    title: "Botella 1L",
    description: "Botella PET azul de 1 litro.",
    image: "https://taino.pe/cdn/shop/files/Diseno_sin_titulo_-_2024-01-06T132243.123-removebg-preview.png?v=1704565404",
    type: "botella",
    outstanding: "si"
  },
  {
    id: 3,
    title: "Botella 2L",
    description: "Botella PET gris de 2 litros.",
    image: "https://us.123rf.com/450wm/jckca/jckca0804/jckca080400006/2813992-empty-two-liter-bottle-on-white.jpg",
    type: "botella",
    outstanding: "si"
  },

  // Tapas
  {
    id: 4,
    title: "Tapa Rosca Azul",
    description: "Tapa para botella estándar de rosca color azul.",
    image: "https://envasesyplasticosuperior.com/wp-content/uploads/2023/12/TAPA-28-MM-AZUL-BIC-800x799-1.jpg",
    type: "tapa",
    outstanding: "si"
  },
  {
    id: 5,
    title: "Tapa Rosca Blanca",
    description: "Tapa estándar color blanco, segura y hermética.",
    image: "https://soloenvases.com/wp-content/uploads/2023/06/0024TPBL28.jpg",
    type: "tapa",
    outstanding: "si"
  },

  // Envases
  {
    id: 6,
    title: "Envase 5L",
    description: "Envase PET de 5 litros, ideal para químicos.",
    image: "https://www.perezlinares.com/wp-content/uploads/2024/09/15-JERRYCAN-ENVASE-5-LITROS-BLANCO-300x300.jpg",
    type: "envase",
    outstanding: "si"
  },
  {
    id: 7,
    title: "Envase 10L Industrial",
    description: "Envase resistente para líquidos industriales.",
    image: "https://www.envases.mx/media/2834/product-range-extension530x354_4.jpg",
    type: "envase",
    outstanding: "si"
  },
  {
    id: 8,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: "https://taino.pe/cdn/shop/files/Diseno_sin_titulo_-_2024-01-06T132243.123-removebg-preview.png?v=1704565404",
    type: "botella",
    outstanding: "si"
  },
  {
    id: 9,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: "https://taino.pe/cdn/shop/files/Diseno_sin_titulo_-_2024-01-06T132243.123-removebg-preview.png?v=1704565404",
    type: "botella",
    outstanding: "si"
  },
  {
    id: 10,
    title: "Botella Deportiva",
    description: "Botella plástica para uso deportivo, ligera.",
    image: "https://taino.pe/cdn/shop/files/Diseno_sin_titulo_-_2024-01-06T132243.123-removebg-preview.png?v=1704565404",
    type: "botella",
    outstanding: "si"
  }
];



export const services = [
  {
    id: 1,
    title: "Diseño de Moldes",
    description: "Creamos moldes personalizados para tus productos.",
    image: "https://d2n4wb9orp1vta.cloudfront.net/cms/brand/PT-Mex/2024-PT-Mex/soplado-abril.jpg;maxWidth=1200",
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
    image: "https://pet-eu.com/wp-content/uploads/2019/12/APF-3002-1.png",
    type: "sopladora",
    outstanding: "si"
  },
  {
    id: 2,
    title: "Mini Sopladora Manual",
    description: "Versión compacta y operada manualmente.",
    image: "https://pet-eu.com/wp-content/uploads/2019/12/APF-3002-1.png",
    type: "sopladora",
    outstanding: "no"
  },
  {
    id: 3,
    title: "Selladora de Banda",
    description: "Sellado automático de envases en línea.",
    image: "https://pet-eu.com/wp-content/uploads/2019/12/APF-3002-1.png",
    type: "selladora",
    outstanding: "no"
  },
  {
    id: 4,
    title: "Selladora de Inducción",
    description: "Sellado hermético para tapas con inducción.",
    image: "https://pet-eu.com/wp-content/uploads/2019/12/APF-3002-1.png",
    type: "selladora",
    outstanding: "si"
  },
  {
    id: 5,
    title: "Impresora de Etiquetas",
    description: "Impresora térmica para etiquetas de productos.",
    image: "https://pet-eu.com/wp-content/uploads/2019/12/APF-3002-1.png",
    type: "impresora",
    outstanding: "no"
  },
  {
    id: 6,
    title: "Impresora de Códigos QR",
    description: "Ideal para seguimiento y trazabilidad.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGE6IX8EaDqyXuf9w2S_0_O7D2_uQnuWYTA&s",
    type: "impresora",
    outstanding: "si"
  },
  {
    id: 7,
    title: "Dosificadora de Líquidos",
    description: "Precisión en el llenado de botellas.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGE6IX8EaDqyXuf9w2S_0_O7D2_uQnuWYTA&s",
    type: "sopladora",
    outstanding: "no"
  },
  {
    id: 8,
    title: "Moldeadora de Tapas",
    description: "La Moldeadora de Tapas Plásticas es un equipo industrial diseñado para la fabricación eficiente y uniforme de tapas de plástico, utilizadas comúnmente en botellas, envases y otros recipientes. Su tecnología avanzada permite un proceso de moldeado preciso, garantizando un sellado seguro y resistente que cumple con los estándares de calidad del sector. Este equipo es ideal para empresas del rubro de embalaje, envasado, fabricación de productos plásticos, alimentario y farmacéutico, donde se requiere producción en serie con alta eficiencia.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXGE6IX8EaDqyXuf9w2S_0_O7D2_uQnuWYTA&s",
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
