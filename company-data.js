/**
 * CONCRETA · INGENIERÍA Y ARQUITECTURA
 * =====================================
 * Archivo de Configuración de Datos de la Empresa
 * 
 * Puedes editar cualquier información de este archivo directamente,
 * o usar el botón flotante "⚙️ Editar Empresa" en el sitio web para
 * editar visualmente y descargar la configuración actualizada.
 */

const DEFAULT_COMPANY_DATA = {
  // Información General
  info: {
    nombre: "Concreta",
    subtitulo: "Ingeniería y Arquitectura",
    sloganPrincipal: "Construimos lo que imaginas.",
    sloganSub: "Desde el diseño bioclimático hasta la entrega final de llaves. Acompañamos cada etapa de tu proyecto con ingeniería sismorresistente NSR-10, control estricto de costos y garantía certificada.",
    anoFundacion: 2004,
    experienciaAnos: "20+",
    proyectosEntregados: "50+",
    garantia: "1 año contractual",
    satisfaccion: "100%",
    cobertura: "Pereira · Risaralda · Eje Cafetero · Antioquia",
    videoYoutubeId: "gQDHFTBZWUk", // ID de video de YouTube para el fondo del Hero
    visitaLoteGratis: true,
  },

  // Canales de Contacto
  contacto: {
    whatsapp: "573023376241", // Número para el botón de WhatsApp (formato internacional sin signos)
    whatsappDisplay: "+57 302 337 6241",
    whatsappSecundario: "+57 322 727 3102",
    email: "contacto@concretaconstructora.com",
    direccion: "Edificio Quality, Cra. 17 #11-10",
    ciudad: "Pereira, Risaralda",
    pais: "Colombia",
    horarioAtencion: "Lunes a Viernes: 8:00 AM - 6:00 PM | Sábados: 9:00 AM - 1:00 PM",
    googleMapsUrl: "https://maps.google.com/?q=Edificio+Quality+Pereira+Cra+17+11-10",
  },

  // Mensajes de Confianza (Barra superior)
  confianza: [
    {
      icono: "terrain",
      titulo: "Visita al Lote Gratis",
      desc: "Evaluamos tu terreno sin costo ni compromiso antes de cotizar."
    },
    {
      icono: "apartment",
      titulo: "Sede Física en Pereira",
      desc: "Edificio Quality · Asesoría presencial con ingenieros titulados."
    },
    {
      icono: "verified_user",
      titulo: "Garantía de 1 Año",
      desc: "Garantía contractual completa sobre todos los procesos constructivos."
    },
    {
      icono: "receipt_long",
      titulo: "Presupuesto Detallado",
      desc: "Desglose por ítems antes de iniciar para cero sobrecostos."
    }
  ],

  // Servicios
  servicios: [
    {
      id: "01",
      codigo: "DIS-ARQ",
      icono: "architecture",
      titulo: "Diseño Arquitectónico",
      resumen: "Conceptos visuales y funcionales adaptados a la topografía de tu terreno y necesidades de confort.",
      detalles: "Renders fotorrealistas 3D, distribución bioclimática para aprovechamiento de luz y ventilación natural, y planos ejecutivos de obra."
    },
    {
      id: "02",
      codigo: "ING-EST",
      icono: "square_foot",
      titulo: "Diseño Estructural NSR-10",
      resumen: "Cálculo y modelado sismorresistente con estricto apego a la normativa colombiana vigente.",
      detalles: "Memorias de cálculo, planos estructurales de cimentación, vigas, columnas y optimización de aceros para máxima seguridad y eficiencia."
    },
    {
      id: "03",
      codigo: "LIC-CUR",
      icono: "fact_check",
      titulo: "Licencias y Trámites",
      resumen: "Gestión técnica, urbanística y jurídica completa ante curadurías y entidades municipales.",
      detalles: "Acompañamiento en desenglobes, permisos de parcelación, uso de suelos y licencias de construcción nueva o modificación."
    },
    {
      id: "04",
      codigo: "OBR-CIV",
      icono: "foundation",
      titulo: "Construcción y Ejecución",
      resumen: "Llevamos a cabo tu proyecto con personal técnico calificado, supervisión permanente y control de calidad.",
      detalles: "Obras llave en mano: desde movimiento de tierras, cimentación y estructura hasta acabados finos y carpintería arquitectónica."
    },
    {
      id: "05",
      codigo: "PRE-COS",
      icono: "analytics",
      titulo: "Presupuestos y Control",
      resumen: "Presupuesto detallado por actividades y análisis de precios unitarios (APU) antes de firmar.",
      detalles: "Transparencia absoluta: conoces cronograma de compras, desembolsos programados y avance medido por actas de obra."
    },
    {
      id: "06",
      codigo: "REM-AMP",
      icono: "handyman",
      titulo: "Remodelaciones de Alta Gama",
      resumen: "Transformación integral de viviendas, oficinas y locales comerciales con estándar de obra nueva.",
      detalles: "Actualización de redes hidrosanitarias y eléctricas, modernización de fachadas y redistribución de espacios."
    },
    {
      id: "07",
      codigo: "PIS-JAC",
      icono: "pool",
      titulo: "Piscinas y Zonas Húmedas",
      resumen: "Diseño y construcción especializada de piscinas sinfín, jacuzzis climatizados, saunas y turcos.",
      detalles: "Sistemas de bombeo inteligente, iluminación LED subacuática, acabados en piedra natural, microcemento y revestimientos prémium."
    },
    {
      id: "08",
      codigo: "EVA-SIS",
      icono: "emergency",
      titulo: "Evaluación Post-Sismo",
      resumen: "Inspección técnica y dictamen de vulnerabilidad estructural tras eventos sísmicos en edificaciones.",
      detalles: "Detección de fisuras estructurales críticas vs no estructurales, pruebas de patología de concreto y plan de reforzamiento."
    }
  ],

  // Portafolio de Proyectos Reales
  proyectos: [
    {
      id: "petrasanta",
      nombre: "Hotel Boutique Petrasanta",
      categoria: "hospitality",
      categoriaLabel: "Hospitality & Zonas Húmedas",
      ubicación: "Guatapé / Risaralda",
      area: "1,200 m²",
      ano: "2023 - 2024",
      imagen: "assets/images/HOTEL_BOUTIQUE_PESTRASANA_2.jpg",
      imagenSecundaria: "assets/images/HOTEL_BOUTIQUE_PESTRASANA.jpg",
      descripcion: "Complejo boutique de lujo integrado al entorno natural con terrazas en voladizo, estructuras en madera tratada y concreto visto, y zonas húmedas de alta ingeniería.",
      aspectos: ["Zonas húmedas termales", "Acabados de lujo", "Integración paisajística", "Estructura sismorresistente"]
    },
    {
      id: "casa-combia",
      nombre: "Casa Campestre Combia",
      categoria: "residencial",
      categoriaLabel: "Residencial Campestre",
      ubicación: "Combia, Pereira",
      area: "480 m²",
      ano: "2023",
      imagen: "assets/images/CAMPESTRE.JPG",
      imagenSecundaria: "assets/images/CAMPESTRE_DETRAS.JPG",
      descripcion: "Vivienda unifamiliar de arquitectura contemporánea con doble altura, amplios ventanales bioclimáticos que maximizan la vista al valle y eficiencia energética.",
      aspectos: ["Diseño bioclimático", "Doble altura", "Iluminación natural cenital", "Concreto arquitectónico"]
    },
    {
      id: "proyecto-emunah",
      nombre: "Residencia & Piscina Emunah",
      categoria: "piscinas",
      categoriaLabel: "Residencial & Zonas Húmedas",
      ubicación: "Pereira, Risaralda",
      area: "350 m² + 90 m² Zona Húmeda",
      ano: "2024",
      imagen: "assets/images/EMUNAH_3.jpeg",
      imagenSecundaria: "assets/images/EMUNAH_4.jpeg",
      descripcion: "Proyecto residencial con piscina sinfín con borde infinito de cristal, jacuzzi climatizado con hidromasaje y solárium en deck ecológico.",
      aspectos: ["Piscina de borde infinito", "Climatización solar", "Deck en madera sintética", "Automatización de filtrado"]
    },
    {
      id: "campestre-norte",
      nombre: "Villa Campestre Los Andes",
      categoria: "residencial",
      categoriaLabel: "Residencial Campestre",
      ubicación: "Antioquia",
      area: "620 m²",
      ano: "2024",
      imagen: "assets/images/CAMPESTRE_DETRAS.JPG",
      imagenSecundaria: "assets/images/CAMPESTRE.JPG",
      descripcion: "Construcción campestre con cerramientos panorámicos, zona social integrada a pérgolas de acero estructural y cocina abierta de alto concepto.",
      aspectos: ["Estructura mixta acero/concreto", "Pérgolas exteriores", "Cocina integrada", "Paisajismo autóctono"]
    },
    {
      id: "spa-petrasanta",
      nombre: "Zona Húmeda & Spa Petrasanta",
      categoria: "piscinas",
      categoriaLabel: "Piscina & Spa Comercial",
      ubicación: "Risaralda",
      area: "280 m²",
      ano: "2023",
      imagen: "assets/images/HOTEL_BOUTIQUE_PESTRASANA.jpg",
      imagenSecundaria: "assets/images/HOTEL_BOUTIQUE_PESTRASANA_2.jpg",
      descripcion: "Diseño hidráulico y ejecución de circuito termal con piscina hidroterapéutica, cascada en piedra natural y sistemas de desinfección salina.",
      aspectos: ["Desinfección por electrólisis salina", "Enchape importado antideslizante", "Iluminación domótica", "Cascadas integradas"]
    }
  ],

  // Metodología en 4 Etapas
  proceso: [
    {
      paso: "01",
      titulo: "Consulta y Visita al Lote",
      desc: "Nos desplazamos sin costo a tu terreno en Risaralda o Antioquia para evaluar topografía, accesos, servicios públicos y viabilidad técnica.",
      tiempo: "Día 1 - 3"
    },
    {
      paso: "02",
      titulo: "Diseño y Presupuesto Cerrado",
      desc: "Desarrollamos la propuesta arquitectónica y un presupuesto detallado ítem por ítem para que apruebes con total claridad de inversión.",
      tiempo: "Semana 2 - 3"
    },
    {
      paso: "03",
      titulo: "Licencias y Arranque de Obra",
      desc: "Tramitamos la licencia ante curaduría, radicamos cálculos estructurales y damos inicio a la ejecución con cronograma estricto.",
      tiempo: "Semana 4 - 6"
    },
    {
      paso: "04",
      titulo: "Entrega Llave en Mano y Garantía",
      desc: "Entrega formal con acta de recibido a satisfacción, planos definitivos as-built y activación de garantía contractual por 1 año.",
      tiempo: "Entrega Final"
    }
  ],

  // Testimonios de Clientes
  testimonios: [
    {
      nombre: "Carlos Mario Restrepo",
      cargo: "Propietario Casa Campestre",
      ubicacion: "Llanogrande, Antioquia",
      estrellas: 5,
      comentario: "Entregaron el proyecto exactamente en los tiempos pactados y dentro del presupuesto convenido. El rigor en los detalles arquitectónicos y la estructura fue impecable."
    },
    {
      nombre: "Dra. Valentina Gómez",
      cargo: "Gerencia Hotel Boutique Petrasanta",
      ubicacion: "Risaralda",
      estrellas: 5,
      comentario: "Lo que más valoramos fue el acompañamiento integral: curaduría, diseño, cálculo y la ejecución de las zonas húmedas. Nos evitaron dolores de cabeza y sobrecostos."
    },
    {
      nombre: "Ing. Andrés Felipe Osorio",
      cargo: "Propietario Proyecto Emunah",
      ubicacion: "Pereira, Risaralda",
      estrellas: 5,
      comentario: "La piscina y la casa quedaron mejor de lo que imaginamos en los renders 3D. Trabajo limpio, ordenado, personal muy profesional y cumplimiento en los pagos y actas."
    }
  ],

  // Diferenciales
  diferenciales: [
    {
      titulo: "Visita al Lote 100% Gratis",
      desc: "Antes de hablar de números, vamos a tu terreno. Evaluamos accesos, fuentes de agua, pendientes y orientación solar sin costo alguno."
    },
    {
      titulo: "Sede Física Propia en Pereira",
      desc: "Edificio Quality, Cra. 17 #11-10. Contamos con oficina permanente donde puedes reunirte directamente con los ingenieros y arquitectos a cargo de tu obra."
    },
    {
      titulo: "Cero Costos Ocultos",
      desc: "Te entregamos un presupuesto por actividades detalladas antes de firmar cualquier contrato. Lo que se presupuesta es lo que se ejecuta."
    },
    {
      titulo: "Todo en un Solo Equipo",
      desc: "Desde la topografía, el diseño estructural y las licencias hasta el último acabado. No necesitas subcontratar ni coordinar múltiples proveedores."
    }
  ]
};

// Cargar datos persistidos en localStorage si existen, o usar los predeterminados
function getCompanyData() {
  try {
    const saved = localStorage.getItem("concreta_custom_company_data");
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_COMPANY_DATA, ...parsed };
    }
  } catch (e) {
    console.warn("No se pudo leer datos locales, usando configuración predeterminada", e);
  }
  return DEFAULT_COMPANY_DATA;
}

// Guardar datos modificados en localStorage
function saveCompanyData(newData) {
  try {
    localStorage.setItem("concreta_custom_company_data", JSON.stringify(newData));
    return true;
  } catch (e) {
    console.error("Error al guardar datos", e);
    return false;
  }
}

// Restaurar configuración predeterminada
function resetCompanyData() {
  try {
    localStorage.removeItem("concreta_custom_company_data");
    return true;
  } catch (e) {
    return false;
  }
}

// Exportar globalmente
window.DEFAULT_COMPANY_DATA = DEFAULT_COMPANY_DATA;
window.getCompanyData = getCompanyData;
window.saveCompanyData = saveCompanyData;
window.resetCompanyData = resetCompanyData;
