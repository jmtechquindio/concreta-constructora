/**
 * CONCRETA · INGENIERÍA Y ARQUITECTURA
 * Controlador Principal de la Aplicación y Editor Dinámico
 */

let currentData = null;
let currentProjectFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Cargar datos desde localStorage o predeterminados
  currentData = window.getCompanyData();

  // 2. Aplicar tema y colores
  applyTheme(currentData.tema);

  // 3. Renderizar sitio completo
  renderAllSections(currentData);

  // 4. Inicializar eventos interactivos
  initEventListeners();

  // 5. Inicializar calculadora
  updateCalculator();
});

/* ========================================================
   SISTEMA DE ESTILOS Y TEMAS DINÁMICOS
   ======================================================== */
function applyTheme(themeObj) {
  if (!themeObj || !themeObj.colores) return;
  const c = themeObj.colores;
  const root = document.documentElement;

  if (c.verdeBrand) {
    root.style.setProperty('--verde-brand', c.verdeBrand);
    root.style.setProperty('--verde-glow', hexToRgba(c.verdeBrand, 0.35));
    root.style.setProperty('--verde-subtle', hexToRgba(c.verdeBrand, 0.12));
  }
  if (c.verdeDark) root.style.setProperty('--verde-dark', c.verdeDark);
  if (c.verdeLight) root.style.setProperty('--verde-light', c.verdeLight);
  if (c.bgDeep) root.style.setProperty('--bg-deep', c.bgDeep);
  if (c.bgSurface) root.style.setProperty('--bg-surface', c.bgSurface);
  if (c.bgCard) {
    root.style.setProperty('--bg-card', c.bgCard);
    root.style.setProperty('--bg-card-hover', adjustBrightness(c.bgCard, 12));
  }
  if (c.textMain) root.style.setProperty('--text-main', c.textMain);
  if (c.textMuted) root.style.setProperty('--text-muted', c.textMuted);

  // Modo claro vs oscuro
  const isLight = isColorLight(c.bgDeep || '#090c0e');
  if (isLight) {
    root.classList.add('theme-light-mode');
    root.style.setProperty('--border-subtle', 'rgba(0, 0, 0, 0.08)');
    root.style.setProperty('--border-strong', 'rgba(0, 0, 0, 0.16)');
    root.style.setProperty('--text-dim', '#64748b');
  } else {
    root.classList.remove('theme-light-mode');
    root.style.setProperty('--border-subtle', 'rgba(255, 255, 255, 0.08)');
    root.style.setProperty('--border-strong', 'rgba(255, 255, 255, 0.16)');
    root.style.setProperty('--text-dim', '#64748b');
  }
}

function hexToRgba(hex, alpha) {
  if (!hex || hex.length < 6) return `rgba(62, 184, 40, ${alpha})`;
  let cleanHex = hex.replace('#', '');
  if (cleanHex.length === 3) {
    cleanHex = cleanHex.split('').map(x => x + x).join('');
  }
  const r = parseInt(cleanHex.substring(0, 2), 16) || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function adjustBrightness(hex, percent) {
  let cleanHex = (hex || '#161c22').replace('#', '');
  if (cleanHex.length === 3) cleanHex = cleanHex.split('').map(x => x + x).join('');
  let num = parseInt(cleanHex, 16);
  let r = (num >> 16) + percent;
  let g = ((num >> 8) & 0x00FF) + percent;
  let b = (num & 0x0000FF) + percent;
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${(g | (b << 8) | (r << 16)).toString(16).padStart(6, '0')}`;
}

function isColorLight(hex) {
  let clean = (hex || '#000').replace('#', '');
  if (clean.length === 3) clean = clean.split('').map(x => x + x).join('');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.6;
}

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

  // Marca Navbar & Footer
  const brandTitleEl = document.getElementById('brandTitle');
  if (brandTitleEl) brandTitleEl.textContent = info.nombre.toUpperCase();
  const brandTagEl = document.getElementById('brandTag');
  if (brandTagEl) brandTagEl.textContent = (info.subtitulo || 'INGENIERÍA & ARQUITECTURA').toUpperCase();

  const footerBrandTitleEl = document.getElementById('footerBrandTitle');
  if (footerBrandTitleEl) footerBrandTitleEl.textContent = info.nombre.toUpperCase();
  const footerBrandTagEl = document.getElementById('footerBrandTag');
  if (footerBrandTagEl) footerBrandTagEl.textContent = (info.subtitulo || 'INGENIERÍA & ARQUITECTURA').toUpperCase();

  // Logo de la empresa
  const logoUrl = info.logo || 'assets/images/LOGOTIPO_CONCRETA.png';
  const navLogoImg = document.getElementById('navBrandLogoImg');
  if (navLogoImg) navLogoImg.src = logoUrl;
  const footerLogoImg = document.getElementById('footerBrandLogoImg');
  if (footerLogoImg) footerLogoImg.src = logoUrl;

  // Video de YouTube en Hero
  const iframe = document.getElementById('heroVideoIframe');
  if (iframe && info.videoYoutubeId) {
    const desiredSrc = `https://www.youtube.com/embed/${info.videoYoutubeId}?autoplay=1&mute=1&loop=1&playlist=${info.videoYoutubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`;
    if (!iframe.src.includes(info.videoYoutubeId)) {
      iframe.src = desiredSrc;
    }
  }

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
   PANEL EDITOR VISUAL DE LA EMPRESA & ESTILOS
   ======================================================== */
function openCompanyEditor() {
  const drawer = document.getElementById('companyEditorDrawer');

  // 1. Renderizar Temas y Colores
  renderThemePresetsInEditor();
  populateColorPickers();

  // 2. Renderizar Logo y Proyectos
  populateLogoEditor();
  renderProjectsEditorList();

  // 3. Poblar campos de texto
  const info = currentData.info;
  const contacto = currentData.contacto;

  document.getElementById('editNombre').value = info.nombre || '';
  document.getElementById('editSubtitulo').value = info.subtitulo || '';
  document.getElementById('editSloganPrincipal').value = info.sloganPrincipal || '';
  document.getElementById('editSloganSub').value = info.sloganSub || '';
  document.getElementById('editPillText').value = info.cobertura || '';
  document.getElementById('editYoutubeId').value = info.videoYoutubeId || 'gQDHFTBZWUk';

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

/* --- Subir y Gestionar Logo --- */
function populateLogoEditor() {
  const currentLogo = (currentData.info && currentData.info.logo) || 'assets/images/LOGOTIPO_CONCRETA.png';
  const preview = document.getElementById('logoPreviewImg');
  if (preview) preview.src = currentLogo;
  const urlInput = document.getElementById('editLogoUrl');
  if (urlInput) urlInput.value = currentLogo.startsWith('data:') ? '' : currentLogo;
}

function handleLogoFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert('La imagen seleccionada supera los 5MB. Por favor elige una imagen más ligera.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    currentData.info.logo = dataUrl;
    populateLogoEditor();

    // Actualizar en el DOM en vivo
    const navLogo = document.getElementById('navBrandLogoImg');
    if (navLogo) navLogo.src = dataUrl;
    const footerLogo = document.getElementById('footerBrandLogoImg');
    if (footerLogo) footerLogo.src = dataUrl;

    window.saveCompanyData(currentData);
  };
  reader.readAsDataURL(file);
}

function handleLogoUrlChange(url) {
  if (!url || !url.trim()) return;
  currentData.info.logo = url.trim();
  populateLogoEditor();

  const navLogo = document.getElementById('navBrandLogoImg');
  if (navLogo) navLogo.src = url.trim();
  const footerLogo = document.getElementById('footerBrandLogoImg');
  if (footerLogo) footerLogo.src = url.trim();

  window.saveCompanyData(currentData);
}

function restoreDefaultLogo() {
  const defaultLogo = 'assets/images/LOGOTIPO_CONCRETA.png';
  currentData.info.logo = defaultLogo;
  populateLogoEditor();

  const navLogo = document.getElementById('navBrandLogoImg');
  if (navLogo) navLogo.src = defaultLogo;
  const footerLogo = document.getElementById('footerBrandLogoImg');
  if (footerLogo) footerLogo.src = defaultLogo;

  window.saveCompanyData(currentData);
  alert('Logo restaurado a la versión predeterminada.');
}

/* --- Renderizar y Seleccionar Temas / Paletas --- */
function renderThemePresetsInEditor() {
  const container = document.getElementById('themePresetsGrid');
  if (!container) return;

  const presets = window.THEME_PRESETS || {};
  const currentPresetId = (currentData.tema && currentData.tema.plantilla) || 'emerald';

  container.innerHTML = Object.keys(presets).map(key => {
    const p = presets[key];
    const c = p.colores;
    const isActive = currentPresetId === key ? 'active' : '';
    return `
      <div class="preset-card ${isActive}" onclick="selectPresetTheme('${key}')">
        <div class="preset-name">${p.nombre}</div>
        <div class="swatch-row">
          <div class="swatch-chip" style="background:${c.bgDeep};"></div>
          <div class="swatch-chip" style="background:${c.bgCard};"></div>
          <div class="swatch-chip" style="background:${c.verdeBrand};"></div>
          <div class="swatch-chip" style="background:${c.textMain};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function selectPresetTheme(presetId) {
  const presets = window.THEME_PRESETS || {};
  const preset = presets[presetId];
  if (!preset) return;

  currentData.tema = {
    plantilla: presetId,
    colores: { ...preset.colores }
  };

  // Aplicar inmediatamente en el documento
  applyTheme(currentData.tema);
  renderThemePresetsInEditor();
  populateColorPickers();
  window.saveCompanyData(currentData);
}

function populateColorPickers() {
  const c = (currentData.tema && currentData.tema.colores) || {};
  setColorPickerVal('pickBrandColor', 'hexBrandColor', c.verdeBrand || '#3eb828');
  setColorPickerVal('pickBgDeep', 'hexBgDeep', c.bgDeep || '#090c0e');
  setColorPickerVal('pickBgCard', 'hexBgCard', c.bgCard || '#161c22');
  setColorPickerVal('pickTextMain', 'hexTextMain', c.textMain || '#f1f5f9');
}

function setColorPickerVal(inputId, textId, value) {
  const input = document.getElementById(inputId);
  const text = document.getElementById(textId);
  if (input) input.value = value;
  if (text) text.textContent = value;
}

function handleCustomColorChange(colorKey, hexValue) {
  if (!currentData.tema) currentData.tema = { plantilla: 'custom', colores: {} };
  currentData.tema.plantilla = 'custom';
  currentData.tema.colores[colorKey] = hexValue;

  // Actualizar texto hexadecimal
  if (colorKey === 'verdeBrand') {
    document.getElementById('hexBrandColor').textContent = hexValue;
    currentData.tema.colores.verdeDark = adjustBrightness(hexValue, -20);
    currentData.tema.colores.verdeLight = adjustBrightness(hexValue, 20);
  } else if (colorKey === 'bgDeep') {
    document.getElementById('hexBgDeep').textContent = hexValue;
  } else if (colorKey === 'bgCard') {
    document.getElementById('hexBgCard').textContent = hexValue;
  } else if (colorKey === 'textMain') {
    document.getElementById('hexTextMain').textContent = hexValue;
  }

  // Desmarcar presets activos
  document.querySelectorAll('.preset-card').forEach(c => c.classList.remove('active'));

  // Aplicar inmediatamente
  applyTheme(currentData.tema);
  window.saveCompanyData(currentData);
}

/* --- Editor de Galería de Proyectos (Fotos y Contenido) --- */
function renderProjectsEditorList() {
  const container = document.getElementById('projectsEditorContainer');
  if (!container) return;

  const proyectos = currentData.proyectos || [];
  container.innerHTML = proyectos.map((p, idx) => `
    <div class="project-edit-card" id="projCard-${p.id}">
      <div class="project-edit-header">
        <img src="${p.imagen}" alt="${p.nombre}" class="project-edit-thumb" id="projThumb-${p.id}">
        <div style="flex:1;">
          <div style="font-weight:700; font-size:14px; color:#fff; margin-bottom:4px;">${p.nombre || 'Nuevo Proyecto'}</div>
          <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px;">${p.categoriaLabel || p.categoria} · ${p.area || ''}</div>
          <div class="file-upload-btn-wrap">
            <button class="btn btn-secondary" style="font-size:10px; padding:4px 10px;">
              <span class="material-symbols-outlined" style="font-size:14px;">upload</span>
              <span>Cambiar Foto (Subir PC)</span>
            </button>
            <input type="file" accept="image/*" onchange="handleProjectPhotoUpload('${p.id}', event)">
          </div>
        </div>
        <button class="btn btn-ghost" onclick="deleteProject('${p.id}')" title="Eliminar este proyecto" style="color:#f87171; border-color:rgba(248,113,113,0.3); padding:6px 10px;">
          <span class="material-symbols-outlined" style="font-size:16px;">delete</span>
        </button>
      </div>

      <div class="project-edit-grid-2">
        <div class="form-group-custom">
          <label class="form-label-custom">Nombre</label>
          <input type="text" class="form-input-custom" value="${p.nombre || ''}" onchange="updateProjectField('${p.id}', 'nombre', this.value)" style="font-size:12px; padding:8px 10px;">
        </div>
        <div class="form-group-custom">
          <label class="form-label-custom">Categoría</label>
          <select class="form-select-custom" onchange="updateProjectField('${p.id}', 'categoria', this.value)" style="font-size:12px; padding:8px 10px;">
            <option value="residencial" ${p.categoria === 'residencial' ? 'selected' : ''}>Residencial Campestre</option>
            <option value="hospitality" ${p.categoria === 'hospitality' ? 'selected' : ''}>Hospitality & Hoteles</option>
            <option value="piscinas" ${p.categoria === 'piscinas' ? 'selected' : ''}>Piscinas & Zonas Húmedas</option>
            <option value="estructural" ${p.categoria === 'estructural' ? 'selected' : ''}>Diseño Estructural / Comercial</option>
          </select>
        </div>
      </div>

      <div class="project-edit-grid-2">
        <div class="form-group-custom">
          <label class="form-label-custom">Ubicación</label>
          <input type="text" class="form-input-custom" value="${p.ubicación || ''}" onchange="updateProjectField('${p.id}', 'ubicación', this.value)" style="font-size:12px; padding:8px 10px;">
        </div>
        <div class="form-group-custom">
          <label class="form-label-custom">Área Construida</label>
          <input type="text" class="form-input-custom" value="${p.area || ''}" onchange="updateProjectField('${p.id}', 'area', this.value)" style="font-size:12px; padding:8px 10px;" placeholder="Ej: 450 m²">
        </div>
      </div>

      <div class="form-group-custom">
        <label class="form-label-custom">URL de Imagen (o usa el botón de subir)</label>
        <input type="text" class="form-input-custom" value="${p.imagen.startsWith('data:') ? '' : p.imagen}" onchange="updateProjectField('${p.id}', 'imagen', this.value)" placeholder="assets/images/..." style="font-size:12px; padding:8px 10px;">
      </div>

      <div class="form-group-custom">
        <label class="form-label-custom">Descripción de la Obra</label>
        <textarea class="form-input-custom" rows="2" onchange="updateProjectField('${p.id}', 'descripcion', this.value)" style="font-size:12px; padding:8px 10px;">${p.descripcion || ''}</textarea>
      </div>
    </div>
  `).join('');
}

function handleProjectPhotoUpload(projectId, e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.size > 5 * 1024 * 1024) {
    alert('La fotografía seleccionada supera los 5MB.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(evt) {
    const dataUrl = evt.target.result;
    const project = (currentData.proyectos || []).find(p => p.id === projectId);
    if (project) {
      project.imagen = dataUrl;
      const thumb = document.getElementById(`projThumb-${projectId}`);
      if (thumb) thumb.src = dataUrl;
      renderProjects(currentData, currentProjectFilter);
      window.saveCompanyData(currentData);
    }
  };
  reader.readAsDataURL(file);
}

function updateProjectField(projectId, field, value) {
  const project = (currentData.proyectos || []).find(p => p.id === projectId);
  if (!project) return;

  project[field] = value;
  if (field === 'categoria') {
    const labels = {
      residencial: "Residencial Campestre",
      hospitality: "Hospitality & Zonas Húmedas",
      piscinas: "Piscinas & Spas",
      estructural: "Diseño Estructural"
    };
    project.categoriaLabel = labels[value] || value;
  }

  renderProjects(currentData, currentProjectFilter);
  window.saveCompanyData(currentData);
}

function addNewProjectToEditor() {
  const newId = 'obra-' + Date.now().toString().slice(-4);
  const newProj = {
    id: newId,
    nombre: "Nueva Obra Arquitectónica",
    categoria: "residencial",
    categoriaLabel: "Residencial Campestre",
    ubicación: "Pereira, Risaralda",
    area: "350 m²",
    ano: new Date().getFullYear().toString(),
    imagen: "assets/images/CAMPESTRE.JPG",
    descripcion: "Construcción moderna llave en mano con acabados de primera calidad e ingeniería sismorresistente.",
    aspectos: ["Diseño bioclimático", "Estructura sismorresistente", "Acabados prémium"]
  };

  if (!currentData.proyectos) currentData.proyectos = [];
  currentData.proyectos.unshift(newProj);

  renderProjectsEditorList();
  renderProjects(currentData, currentProjectFilter);
  window.saveCompanyData(currentData);
}

function deleteProject(projectId) {
  if (confirm('¿Deseas eliminar este proyecto del portafolio?')) {
    currentData.proyectos = (currentData.proyectos || []).filter(p => p.id !== projectId);
    renderProjectsEditorList();
    renderProjects(currentData, currentProjectFilter);
    window.saveCompanyData(currentData);
  }
}

/* --- Guardar y Exportar --- */
function applyAndSaveEditorChanges() {
  currentData.info.nombre = document.getElementById('editNombre').value;
  currentData.info.subtitulo = document.getElementById('editSubtitulo').value;
  currentData.info.sloganPrincipal = document.getElementById('editSloganPrincipal').value;
  currentData.info.sloganSub = document.getElementById('editSloganSub').value;
  currentData.info.cobertura = document.getElementById('editPillText').value;
  currentData.info.videoYoutubeId = document.getElementById('editYoutubeId').value.trim() || 'gQDHFTBZWUk';

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

  // Aplicar tema y re-renderizar todo el sitio
  applyTheme(currentData.tema);
  renderAllSections(currentData);

  alert('¡Estilos, logo, proyectos e información actualizados y guardados exitosamente!');
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

window.THEME_PRESETS = ${JSON.stringify(window.THEME_PRESETS || {}, null, 2)};
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
    alert('Código copiado al portapapeles. Puedes pegarlo en company-data.js en tu repositorio de GitHub.');
  }).catch(() => {
    alert('No se pudo copiar automáticamente. Por favor descarga el archivo.');
  });
}

function restoreDefaults() {
  if (confirm('¿Estás seguro de que deseas restablecer TODOS los estilos, logo, proyectos y datos a los valores originales?')) {
    window.resetCompanyData();
    currentData = window.DEFAULT_COMPANY_DATA;
    applyTheme(currentData.tema);
    renderAllSections(currentData);
    closeCompanyEditor();
    alert('Valores predeterminados restaurados.');
  }
}
