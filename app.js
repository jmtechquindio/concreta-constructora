/**
 * CONCRETA · INGENIERÍA Y ARQUITECTURA
 * Controlador Principal de la Aplicación y Editor Dinámico
 */

let currentData = null;
let currentProjectFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar datos
  currentData = window.getCompanyData();
  
  // 2. Renderizar sitio completo
  renderAllSections(currentData);
  
  // 3. Inicializar eventos interactivos
  initEventListeners();
  
  // 4. Inicializar calculadora
  updateCalculator();
});

/* ========================================================
   RENDERIZADO DE SECCIONES DESDE DATOS
   ======================================================== */
function renderAllSections(data) {
  renderBrandAndHero(data);
  renderTrustRibbon(data);
  renderServices(data);
  renderProjects(data, currentProjectFilter);
  renderProcess(data);
  renderDiferenciales(data);
  renderTestimonios(data);
  renderContactAndFooter(data);
}

// 1. Marca y Hero
function renderBrandAndHero(data) {
  const info = data.info;
  const contacto = data.contacto;

  // Marca Navbar
  document.getElementById('brandTitle').innerHTML = `${info.nombre.toUpperCase()} <span>·</span>`;
  document.getElementById('brandTag').textContent = info.subtitulo.toUpperCase();

  // Enlaces de WhatsApp en Navbar y Hero
  const waUrl = `https://wa.me/${contacto.whatsapp}?text=Hola%20${encodeURIComponent(info.nombre)},%20quisiera%20iniciar%20un%20proyecto`;
  document.getElementById('navWaBtn').href = waUrl;
  document.getElementById('mobileWaBtn').href = waUrl;
  document.getElementById('heroCtaPrimary').href = waUrl;
  document.getElementById('floatingWaLink').href = waUrl;

  // Hero Content
  if (info.cobertura) {
    document.getElementById('heroPillText').textContent = `OBRAS ACTIVAS · ${info.cobertura.toUpperCase()}`;
  }
  
  // Stats
  document.getElementById('statYears').textContent = info.experienciaAnos || '20+';
  document.getElementById('statProjects').textContent = info.proyectosEntregados || '50+';
  document.getElementById('statWarranty').textContent = (info.garantia || '1 AÑO').toUpperCase();
  document.getElementById('statCoverage').textContent = info.satisfaccion || '100%';

  if (info.sloganSub) {
    document.getElementById('heroDescription').textContent = info.sloganSub;
  }
}

// 2. Barra de Confianza
function renderTrustRibbon(data) {
  const container = document.getElementById('trustGridContainer');
  if (!container) return;

  const items = data.confianza || [];
  container.innerHTML = items.map(item => `
    <div class="trust-card">
      <div class="trust-card-icon">
        <span class="material-symbols-outlined">${item.icono || 'verified'}</span>
      </div>
      <div>
        <div class="trust-card-title">${item.titulo}</div>
        <div class="trust-card-desc">${item.desc}</div>
      </div>
    </div>
  `).join('');
}

// 3. Bento Grid de Servicios
function renderServices(data) {
  const container = document.getElementById('servicesBentoContainer');
  if (!container) return;

  const servicios = data.servicios || [];
  container.innerHTML = servicios.map(srv => `
    <div class="service-box">
      <div>
        <div class="service-header-row">
          <div class="service-icon-wrap">
            <span class="material-symbols-outlined">${srv.icono || 'apartment'}</span>
          </div>
          <span class="service-code">${srv.codigo || 'ING-01'}</span>
        </div>
        <h3 class="service-title">${srv.titulo}</h3>
        <p class="service-desc">${srv.resumen}</p>
      </div>
      <div class="service-details">
        ${srv.detalles}
      </div>
    </div>
  `).join('');
}

// 4. Portafolio de Proyectos
function renderProjects(data, filter = 'all') {
  const container = document.getElementById('projectsGridContainer');
  if (!container) return;

  let proyectos = data.proyectos || [];
  if (filter !== 'all') {
    proyectos = proyectos.filter(p => p.categoria === filter);
  }

  container.innerHTML = proyectos.map((p, idx) => {
    const isFeatured = idx === 0 && filter === 'all';
    return `
      <div class="project-item ${isFeatured ? 'featured' : ''}" onclick="openProjectModal('${p.id}')">
        <img src="${p.imagen}" alt="${p.nombre}" class="project-img-cover" loading="lazy">
        <div class="project-gradient-overlay"></div>
        <div class="project-meta-top">
          <span class="badge-tag">${p.categoriaLabel || p.categoria}</span>
          <span class="badge-year">${p.ano || '2024'}</span>
        </div>
        <div class="project-info-bottom">
          <h3 class="project-name">${p.nombre}</h3>
          <div class="project-location">
            <span class="material-symbols-outlined" style="font-size:16px; color:var(--verde-brand);">location_on</span>
            <span>${p.ubicación || 'Risaralda'} · ${p.area || ''}</span>
          </div>
          <div class="project-chips">
            ${(p.aspectos || []).slice(0, 3).map(a => `<span class="chip-spec">${a}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// 5. Metodología en 4 Etapas
function renderProcess(data) {
  const container = document.getElementById('processGridContainer');
  if (!container) return;

  const proceso = data.proceso || [];
  container.innerHTML = proceso.map(p => `
    <div class="process-step-card">
      <div class="step-num-badge">${p.paso}</div>
      <span class="step-time-badge">${p.tiempo}</span>
      <h3 class="step-title">${p.titulo}</h3>
      <p class="step-desc">${p.desc}</p>
    </div>
  `).join('');
}

// 6. Diferenciales
function renderDiferenciales(data) {
  const container = document.getElementById('diferencialesContainer');
  if (!container) return;

  const difs = data.diferenciales || [];
  container.innerHTML = difs.map(d => `
    <div style="background:var(--bg-card); border:1px solid var(--border-subtle); border-radius:var(--radius-sm); padding:20px; display:flex; gap:16px;">
      <div style="width:36px; height:36px; background:var(--verde-subtle); border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:center; color:var(--verde-brand); flex-shrink:0;">
        <span class="material-symbols-outlined" style="font-size:20px;">check</span>
      </div>
      <div>
        <h4 style="font-family:var(--font-display); font-size:18px; font-weight:700; color:#fff; margin-bottom:4px;">${d.titulo}</h4>
        <p style="font-size:13px; color:var(--text-muted); line-height:1.6;">${d.desc}</p>
      </div>
    </div>
  `).join('');
}

// 7. Testimonios
function renderTestimonios(data) {
  const container = document.getElementById('testiGridContainer');
  if (!container) return;

  const testimonios = data.testimonios || [];
  container.innerHTML = testimonios.map(t => `
    <div class="testi-card">
      <div>
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"${t.comentario}"</p>
      </div>
      <div>
        <div class="testi-author">${t.nombre}</div>
        <div class="testi-role">${t.cargo} · ${t.ubicacion}</div>
      </div>
    </div>
  `).join('');
}

// 8. Contacto y Footer
function renderContactAndFooter(data) {
  const contacto = data.contacto;
  const info = data.info;

  if (document.getElementById('contactAddress')) {
    document.getElementById('contactAddress').textContent = contacto.direccion;
  }
  if (document.getElementById('contactCity')) {
    document.getElementById('contactCity').textContent = `${contacto.ciudad} · ${contacto.pais}`;
  }
  if (document.getElementById('contactPhoneDisplay')) {
    document.getElementById('contactPhoneDisplay').textContent = contacto.whatsappDisplay || contacto.whatsapp;
  }
  if (document.getElementById('contactEmail')) {
    document.getElementById('contactEmail').textContent = contacto.email;
  }
  if (document.getElementById('contactHours')) {
    document.getElementById('contactHours').textContent = contacto.horarioAtencion;
  }

  // Footer Contact Block
  if (document.getElementById('footerContactBlock')) {
    document.getElementById('footerContactBlock').innerHTML = `
      ${contacto.direccion}<br>
      ${contacto.ciudad} · ${contacto.pais}<br>
      WhatsApp: ${contacto.whatsappDisplay || contacto.whatsapp}<br>
      Email: ${contacto.email}
    `;
  }
}

/* ========================================================
   EVENT LISTENERS Y NAVEGACIÓN
   ======================================================== */
function initEventListeners() {
  // Mobile Nav Toggle
  const navHamburger = document.getElementById('navHamburger');
  if (navHamburger) {
    navHamburger.addEventListener('click', toggleMobileNav);
  }

  // Portfolio Filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentProjectFilter = btn.getAttribute('data-filter');
      renderProjects(currentData, currentProjectFilter);
    });
  });

  // Calculadora Sliders y Selects
  const areaRange = document.getElementById('calcAreaRange');
  const projectType = document.getElementById('calcProjectType');
  const terrain = document.getElementById('calcTerrain');
  const location = document.getElementById('calcLocation');

  if (areaRange) {
    areaRange.addEventListener('input', (e) => {
      document.getElementById('calcAreaDisplay').textContent = `${e.target.value} m²`;
      updateCalculator();
    });
  }
  if (projectType) projectType.addEventListener('change', updateCalculator);
  if (terrain) terrain.addEventListener('change', updateCalculator);
  if (location) location.addEventListener('change', updateCalculator);

  // Cerrar modales con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeCompanyEditor();
    }
  });
}

function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('active');
}

function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.remove('active');
}

/* ========================================================
   MODAL DE PROYECTO (LIGHTBOX)
   ======================================================== */
function openProjectModal(projectId) {
  const project = (currentData.proyectos || []).find(p => p.id === projectId);
  if (!project) return;

  document.getElementById('modalMainImg').src = project.imagen;
  document.getElementById('modalTitle').textContent = project.nombre;
  document.getElementById('modalCategory').textContent = (project.categoriaLabel || project.categoria).toUpperCase();
  document.getElementById('modalAreaYear').textContent = `${project.area || ''} · ${project.ano || ''}`;
  document.getElementById('modalLocation').textContent = project.ubicación || 'Risaralda';
  document.getElementById('modalDesc').textContent = project.descripcion || '';

  const aspectsContainer = document.getElementById('modalAspects');
  aspectsContainer.innerHTML = (project.aspectos || []).map(a => `<span class="chip-spec">${a}</span>`).join('');

  const waText = encodeURIComponent(`Hola Concreta, me interesa conocer detalles y presupuesto aproximado similar al proyecto "${project.nombre}" (${project.ubicación}).`);
  document.getElementById('modalInquireBtn').href = `https://wa.me/${currentData.contacto.whatsapp}?text=${waText}`;

  document.getElementById('projectModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  document.getElementById('projectModal').classList.remove('active');
  document.body.style.overflow = '';
}

/* ========================================================
   LÓGICA DE LA CALCULADORA
   ======================================================== */
function updateCalculator() {
  const area = parseInt(document.getElementById('calcAreaRange').value, 10);
  const type = document.getElementById('calcProjectType').value;

  let timeVal = "5 a 7 Meses";
  let teamVal = "Arq. Director + Ing. Residente";
  let deliverablesVal = "Renders 3D + NSR-10 + Curaduría";

  if (type === 'campestre') {
    if (area < 200) timeVal = "4 a 6 Meses";
    else if (area <= 500) timeVal = "6 a 9 Meses";
    else timeVal = "10 a 14 Meses";
    deliverablesVal = "Diseño Bioclimático + NSR-10 + Llave en Mano";
  } else if (type === 'piscina') {
    timeVal = "2 a 3 Meses";
    teamVal = "Ing. Hidráulico + Maestro Especialista";
    deliverablesVal = "Plano Hidráulico + Bombeo + Revestimiento Prémium";
  } else if (type === 'remodelacion') {
    timeVal = area < 150 ? "2 a 3 Meses" : "4 a 6 Meses";
    teamVal = "Arquitecto de Interiores + Oficiales";
    deliverablesVal = "Redistribución + Acabados + Redes Nuevas";
  } else if (type === 'diseno') {
    timeVal = "4 a 6 Semanas";
    teamVal = "Arq. Diseñador + Ing. Calculista NSR-10";
    deliverablesVal = "Planos Ejecutivos + Memorias de Cálculo + Radicación";
  } else if (type === 'comercial') {
    timeVal = "6 a 12 Meses";
    teamVal = "Equipo Interdisciplinario Concreta";
    deliverablesVal = "Norma Comercial + Seguridad Humana + Obra Civil";
  }

  document.getElementById('calcTimeVal').textContent = timeVal;
  document.getElementById('calcTeamVal').textContent = teamVal;
  document.getElementById('calcDeliverablesVal').textContent = deliverablesVal;
}

function enviarCotizacionCalculada() {
  const typeText = document.getElementById('calcProjectType').selectedOptions[0].text;
  const area = document.getElementById('calcAreaRange').value;
  const terrainText = document.getElementById('calcTerrain').selectedOptions[0].text;
  const locationText = document.getElementById('calcLocation').selectedOptions[0].text;

  const message = `Hola Concreta, calculé mi proyecto en su sitio web:\n\n` +
    `• Tipo: ${typeText}\n` +
    `• Área aproximada: ${area} m²\n` +
    `• Terreno: ${terrainText}\n` +
    `• Ubicación: ${locationText}\n\n` +
    `Deseo agendar la visita al lote gratuita y conocer presupuesto formal.`;

  window.open(`https://wa.me/${currentData.contacto.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
}

/* ========================================================
   FORMULARIO DE CONTACTO DIRECTO
   ======================================================== */
function handleFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('formName').value;
  const phone = document.getElementById('formPhone').value;
  const type = document.getElementById('formType').value;
  const location = document.getElementById('formLocation').value || 'No indicada';
  const notes = document.getElementById('formMessage').value || 'Sin detalles adicionales';

  const message = `Hola Concreta, solicito información técnica desde el sitio web:\n\n` +
    `*Nombre:* ${name}\n` +
    `*Teléfono:* ${phone}\n` +
    `*Tipo de Obra:* ${type}\n` +
    `*Ubicación del Lote:* ${location}\n` +
    `*Mensaje:* ${notes}`;

  window.open(`https://wa.me/${currentData.contacto.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
}

/* ========================================================
   PANEL EDITOR VISUAL DE LA EMPRESA
   ======================================================== */
function openCompanyEditor() {
  const drawer = document.getElementById('companyEditorDrawer');
  
  // Poblar campos con los datos actuales
  const info = currentData.info;
  const contacto = currentData.contacto;

  document.getElementById('editNombre').value = info.nombre || '';
  document.getElementById('editSubtitulo').value = info.subtitulo || '';
  document.getElementById('editSloganPrincipal').value = info.sloganPrincipal || '';
  document.getElementById('editSloganSub').value = info.sloganSub || '';
  document.getElementById('editPillText').value = info.cobertura || '';

  document.getElementById('editWhatsapp').value = contacto.whatsapp || '';
  document.getElementById('editWhatsappDisplay').value = contacto.whatsappDisplay || '';
  document.getElementById('editEmail').value = contacto.email || '';
  document.getElementById('editDireccion').value = contacto.direccion || '';
  document.getElementById('editCiudad').value = contacto.ciudad || '';

  document.getElementById('editExp').value = info.experienciaAnos || '';
  document.getElementById('editProyectos').value = info.proyectosEntregados || '';
  document.getElementById('editGarantia').value = info.garantia || '';
  document.getElementById('editSatisfaccion').value = info.satisfaccion || '';

  drawer.classList.add('open');
}

function closeCompanyEditor() {
  document.getElementById('companyEditorDrawer').classList.remove('open');
}

function switchEditorTab(tabId) {
  document.querySelectorAll('.editor-tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.editor-tab-content').forEach(c => c.classList.remove('active'));

  const activeBtn = document.querySelector(`.editor-tab-btn[data-tab="${tabId}"]`);
  const activeContent = document.getElementById(`tab-${tabId}`);
  if (activeBtn) activeBtn.classList.add('active');
  if (activeContent) activeContent.classList.add('active');
}

function applyAndSaveEditorChanges() {
  currentData.info.nombre = document.getElementById('editNombre').value;
  currentData.info.subtitulo = document.getElementById('editSubtitulo').value;
  currentData.info.sloganPrincipal = document.getElementById('editSloganPrincipal').value;
  currentData.info.sloganSub = document.getElementById('editSloganSub').value;
  currentData.info.cobertura = document.getElementById('editPillText').value;

  currentData.contacto.whatsapp = document.getElementById('editWhatsapp').value.replace(/[^0-9]/g, '');
  currentData.contacto.whatsappDisplay = document.getElementById('editWhatsappDisplay').value;
  currentData.contacto.email = document.getElementById('editEmail').value;
  currentData.contacto.direccion = document.getElementById('editDireccion').value;
  currentData.contacto.ciudad = document.getElementById('editCiudad').value;

  currentData.info.experienciaAnos = document.getElementById('editExp').value;
  currentData.info.proyectosEntregados = document.getElementById('editProyectos').value;
  currentData.info.garantia = document.getElementById('editGarantia').value;
  currentData.info.satisfaccion = document.getElementById('editSatisfaccion').value;

  // Persistir en localStorage
  window.saveCompanyData(currentData);

  // Re-renderizar todo el sitio de inmediato
  renderAllSections(currentData);

  alert('¡Datos de la empresa actualizados y guardados exitosamente en tu navegador!');
  closeCompanyEditor();
}

function generateConfigJsString() {
  return `/**
 * CONCRETA · INGENIERÍA Y ARQUITECTURA
 * =====================================
 * Archivo de Configuración de Datos de la Empresa (Generado)
 */

const DEFAULT_COMPANY_DATA = ${JSON.stringify(currentData, null, 2)};

function getCompanyData() {
  try {
    const saved = localStorage.getItem("concreta_custom_company_data");
    if (saved) {
      return { ...DEFAULT_COMPANY_DATA, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Error leyendo storage", e);
  }
  return DEFAULT_COMPANY_DATA;
}

function saveCompanyData(newData) {
  try {
    localStorage.setItem("concreta_custom_company_data", JSON.stringify(newData));
    return true;
  } catch (e) {
    return false;
  }
}

function resetCompanyData() {
  try {
    localStorage.removeItem("concreta_custom_company_data");
    return true;
  } catch (e) {
    return false;
  }
}

window.DEFAULT_COMPANY_DATA = DEFAULT_COMPANY_DATA;
window.getCompanyData = getCompanyData;
window.saveCompanyData = saveCompanyData;
window.resetCompanyData = resetCompanyData;
`;
}

function downloadUpdatedConfigFile() {
  const content = generateConfigJsString();
  const blob = new Blob([content], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'company-data.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function copyConfigCode() {
  const content = generateConfigJsString();
  navigator.clipboard.writeText(content).then(() => {
    alert('Código copiado al portapapeles. Puedes pegarlo directamente en company-data.js en tu repositorio de GitHub.');
  }).catch(() => {
    alert('No se pudo copiar automáticamente. Por favor descarga el archivo.');
  });
}

function restoreDefaults() {
  if (confirm('¿Estás seguro de que deseas restablecer los datos a los valores originales de Concreta?')) {
    window.resetCompanyData();
    currentData = window.DEFAULT_COMPANY_DATA;
    renderAllSections(currentData);
    closeCompanyEditor();
    alert('Valores predeterminados restaurados.');
  }
}
