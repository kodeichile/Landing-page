/**
 * KODEI - Soluciones Tecnológicas e Inteligencia de Datos
 * Main JavaScript Handler - Versión Inteligente con Captura de Servicios
 */

// 1. Funciones Globales (Back to Top)
window.scrollToTop = function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.addEventListener('DOMContentLoaded', function() {
  const THEME_STORAGE_KEY = 'kodei-theme';
  
  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.setAttribute('aria-expanded', 'false');

    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('active');
      const isExpanded = mobileMenu.classList.contains('active');
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded);
    });

    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // --- Smooth Scroll para Anclas ---
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const headerElement = document.querySelector('.header');
        const headerHeight = headerElement ? headerElement.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    });
  });

  // --- Active Navigation Section ---
  const trackedSections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-link[href^="#"], .mobile-nav-link[href^="#"]');

  if (trackedSections.length && navAnchors.length) {
    const activateLink = function(sectionId) {
      navAnchors.forEach(function(link) {
        const isActive = link.getAttribute('href') === '#' + sectionId;
        link.classList.toggle('active', isActive);
        if (isActive) {
          link.setAttribute('aria-current', 'page');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    const sectionObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          activateLink(entry.target.id);
        }
      });
    }, {
      rootMargin: '-40% 0px -45% 0px',
      threshold: 0
    });

    trackedSections.forEach(function(section) {
      sectionObserver.observe(section);
    });
  }

  // --- Header Control on Scroll ---
  const header = document.querySelector('.header');
  function updateHeader() {
    if (!header) return;
    const isDarkMode = document.body.classList.contains('theme-dark');
    if (window.scrollY > 50) {
      header.style.backgroundColor = isDarkMode ? 'rgba(15, 17, 21, 0.95)' : 'rgba(250, 250, 250, 0.95)';
      header.style.boxShadow = isDarkMode ? '0 1px 3px rgba(0, 0, 0, 0.35)' : '0 1px 3px rgba(0, 0, 0, 0.05)';
    } else {
      header.style.backgroundColor = isDarkMode ? 'rgba(15, 17, 21, 0.72)' : 'rgba(250, 250, 250, 0.7)';
      header.style.boxShadow = 'none';
    }
  }

  // --- Theme Toggle / Persisted Dark Mode ---
  function getSavedTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function renderThemeToggleState(theme) {
    const isDark = theme === 'dark';
    document.querySelectorAll('.theme-toggle-btn').forEach(function(btn) {
      btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      btn.setAttribute('title', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
      btn.textContent = isDark ? '☀' : '☾';
    });
  }

  function applyTheme(theme) {
    document.body.classList.toggle('theme-dark', theme === 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    renderThemeToggleState(theme);
    updateHeader();
  }

  function ensureThemeButtons() {
    document.querySelectorAll('.header-container').forEach(function(container) {
      if (container.querySelector('.theme-toggle-btn')) return;

      const themeBtn = document.createElement('button');
      themeBtn.type = 'button';
      themeBtn.className = 'theme-toggle-btn btn btn-outline btn-rounded';
      themeBtn.setAttribute('aria-label', 'Cambiar modo de color');
      themeBtn.setAttribute('aria-pressed', 'false');

      themeBtn.addEventListener('click', function() {
        const isDark = document.body.classList.contains('theme-dark');
        const nextTheme = isDark ? 'light' : 'dark';
        localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
      });

      const mobileTrigger = container.querySelector('.mobile-menu-btn');
      if (mobileTrigger) {
        container.insertBefore(themeBtn, mobileTrigger);
      } else {
        container.appendChild(themeBtn);
      }
    });
  }

  ensureThemeButtons();
  applyTheme(getSavedTheme());

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // --- Animaciones de Entrada (Intersection Observer) ---
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.service-card, .product-card, .client-card, .division-card').forEach(function(card) {
    observer.observe(card);
  });
  // --- Botón Back to Top (Visibilidad) ---
  const scrollButton = document.getElementById("scrollToTop");
  if (scrollButton) {
    window.addEventListener("scroll", () => {
      scrollButton.style.display = (window.scrollY > 300) ? "flex" : "none";
    }, { passive: true });
  }

  // --- Contact Form Handler (Actualizado para Estadísticas) ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); 

      const btnSubmit = contactForm.querySelector('.btn-submit');
      const formData = new FormData(contactForm);
      const url = contactForm.action;
      
      // Capturamos el servicio seleccionado para la estadística
      // El campo del formulario usa name="servicio"
      const selectedService = formData.get('servicio') || 'No especificado';

      btnSubmit.disabled = true;
      btnSubmit.innerText = 'Enviando...';

      fetch(url, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
      })
      .then(() => {
        // SEÑAL PARA GOOGLE TAG MANAGER CON DATOS EXTRA
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'event': 'form_submission_success',
          'form_id': 'contact_main',
          'tipo_servicio': selectedService // <-- Esto es lo que mediremos
        });

        window.location.href = "graciasforms.html";
      })
      .catch(error => {
        console.error('Error:', error);
        window.location.href = "graciasforms.html";
      });
      
      // Redirección de seguridad
      setTimeout(() => {
        if(window.location.pathname !== "/graciasforms.html") {
            window.location.href = "graciasforms.html";
        }
      }, 4000);
    });
  }
});


