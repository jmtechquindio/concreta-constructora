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
  - Filtro por categorías (Residencial, Hospitality, Piscinas).
  - Modal interactivo con especificaciones técnicas completas y botón directo de cotización para cada obra.
- **Calculadora Interactiva de Inversión y Cronograma:**
  - Permite al cliente seleccionar área en m², tipo de terreno y obra.
  - Estima tiempos de ejecución, conformación del equipo y genera un mensaje preformateado para cotización inmediata vía WhatsApp.
- **Metodología y Garantía:**
  - Proceso de 4 etapas: desde la visita al lote gratis hasta la entrega llave en mano.
  - Sello de Garantía Contractual por 1 año sobre la ejecución.

---

## 🛠️ Cómo Editar la Información Real de la Empresa

El sitio cuenta con **dos métodos muy fáciles** para cambiar la información de la empresa (teléfonos, WhatsApp, dirección, proyectos, métricas, etc.):

### Método 1: Editor Visual en Vivo (Sin tocar código)
1. Abre el sitio en tu navegador.
2. Haz clic en el botón flotante **`⚙️ Editar Empresa`** en la esquina inferior izquierda (o en la barra de navegación).
3. Modifica los textos, teléfonos de WhatsApp, dirección física, métricas de experiencia, etc.
4. Presiona **"Guardar y Aplicar"** para ver los cambios instantáneamente y guardarlos en tu navegador.
5. Ve a la pestaña **"Exportar / GitHub"** para descargar el archivo `company-data.js` actualizado con un solo clic.

### Método 2: Editando directamente `company-data.js`
Abre el archivo [`company-data.js`](company-data.js) en cualquier editor de código o directamente en GitHub:
```javascript
const DEFAULT_COMPANY_DATA = {
  info: {
    nombre: "Concreta",
    subtitulo: "Ingeniería y Arquitectura",
    sloganPrincipal: "Construimos lo que imaginas.",
    experienciaAnos: "20+",
    proyectosEntregados: "50+",
    garantia: "1 año contractual",
    // ...
  },
  contacto: {
    whatsapp: "573023376241", // Número para recepción de cotizaciones
    whatsappDisplay: "+57 302 337 6241",
    email: "contacto@concretaconstructora.com",
    direccion: "Edificio Quality, Cra. 17 #11-10",
    ciudad: "Pereira, Risaralda",
    // ...
  }
};
```
Haz commit a la rama `main` y GitHub Pages se actualizará automáticamente en segundos.

---

## 📂 Estructura del Proyecto

```
concreta-constructora/
├── index.html            # Estructura semántica, accesibilidad y componentes
├── style.css             # Estilos modernos, diseño responsive, tipografías y animaciones
├── app.js                # Lógica interactiva, filtros, modal, calculadora y editor
├── company-data.js       # Archivo maestro de configuración editable
├── assets/
│   └── images/           # Renders y fotografías originales de proyectos reales
└── README.md             # Documentación del proyecto
```

---

## 🏗️ Despliegue en GitHub Pages

Este proyecto utiliza HTML5, CSS3 y Vanilla JavaScript puros, sin dependencias complejas ni procesos de compilación propensos a fallos. Se despliega automáticamente desde la rama `main`.
