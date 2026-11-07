# Concreta · Ingeniería y Arquitectura (Clone & Rediseño Prémium)

Sitio web oficial y rediseño moderno para **Concreta · Ingeniería y Arquitectura**, empresa constructora con sede en Pereira, Risaralda y proyectos en todo el Eje Cafetero y Antioquia.

🚀 **Sitio desplegado en vivo en GitHub Pages:**
[https://jmtechquindio.github.io/concreta-constructora/](https://jmtechquindio.github.io/concreta-constructora/)

---

## ✨ Características Principales y Estilo Único

- **Estética Arquitectónica Brutalista y Prémium:**
  - Paleta en gris pizarra arquitectónico oscuro (`#090c0e`), titanium white y el verde ingeniería característico de Concreta (`#3eb828`).
  - Grilla de planos arquitectónicos (blueprint grid) de fondo con sutiles microinteracciones.
  - Video de fondo en el Hero (producción real de Concreta) con controles y overlay de alto contraste.
- **Portafolio Dinámico con Lightbox:**
  - Proyectos reales: *Hotel Boutique Petrasanta*, *Casa Campestre Combia*, *Proyecto Emunah*, *Zonas Húmedas & Spas*.
  - Filtro por categorías (Residencial, Hospitality, Piscinas, Estructuras).
  - Modal interactivo con especificaciones técnicas completas y botón directo de cotización para cada obra.
- **Calculadora Interactiva de Inversión y Cronograma:**
  - Permite al cliente seleccionar área en m², tipo de terreno y obra.
  - Estima tiempos de ejecución, conformación del equipo y genera un mensaje preformateado para cotización inmediata vía WhatsApp.
- **Metodología y Garantía:**
  - Proceso de 4 etapas: desde la visita al lote gratis hasta la entrega llave en mano.
  - Sello de Garantía Contractual por 1 año sobre la ejecución.

---

## 🎨 Nuevo Panel de Personalización y Edición de Contenido

Haz clic en el botón flotante **`⚙️ Editar Empresa`** (o en **"Editar Info"** en la barra de navegación) para acceder a las nuevas herramientas visuales en vivo:

### 1. Apartado de Estilos y Colores:
- **Plantillas Predeterminadas:**
  - *Concreta Esmeralda* (Predeterminado)
  - *Oro & Obsidiana* (Luxury Architecture)
  - *Azul Titanio & Acero Estructural*
  - *Terracota & Bio-Construcción*
  - *Estudio Blanco* (Minimalist Light)
- **Modo Personalizado:**
  - Selectores de color en tiempo real para Color Primario/Marca, Fondo Principal, Fondo de Tarjetas y Color de Texto.

### 2. Apartado de Logo e Imágenes:
- **Logo de la Empresa:**
  - Sube tu logo directamente desde tu computador (PNG, SVG, JPG, WebP) o ingresa una URL externa.
  - Se actualiza automáticamente en el Navbar, Footer y vistas previas.
- **Fondo del Hero:**
  - Modifica el ID del video de YouTube en el Hero.
- **Galería de Proyectos:**
  - Sube fotografías de tus obras desde tu computador o pega URLs.
  - Edita nombre, categoría, ubicación, área construida (m²) y descripción de cada proyecto.
  - Agrega nuevos proyectos con el botón **"+ Nuevo Proyecto"** o elimina los que no necesites.

### 3. Datos Generales, Contacto y Métricas:
- Edita nombre de la empresa, eslogan, píldora de estado, números de WhatsApp, correos, dirección y métricas de años/proyectos.

### 4. Guardar y Exportar a GitHub:
- Los cambios se aplican al instante y se guardan en el navegador (`localStorage`).
- Con el botón **"Descargar company-data.js Actualizado"** o **"Copiar Código"** puedes guardar la configuración permanentemente en tu repositorio de GitHub.

---

## 📂 Estructura del Proyecto

```
concreta-constructora/
├── index.html            # Estructura semántica, accesibilidad y panel de edición
├── style.css             # Estilos modernos, temas oscuro/claro, diseño responsive
├── app.js                # Lógica interactiva, filtros, modal, calculadora, temas y gestor de fotos
├── company-data.js       # Archivo maestro de configuración editable y presets de temas
├── assets/
│   └── images/           # Renders y fotografías originales de proyectos reales
└── README.md             # Documentación del proyecto
```

---

## 🏗️ Despliegue en GitHub Pages

Este proyecto utiliza HTML5, CSS3 y Vanilla JavaScript puros, sin dependencias complejas ni procesos de compilación propensos a fallos. Se despliega automáticamente desde la rama `main`.
