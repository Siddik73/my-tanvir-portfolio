document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");
  const navItems = document.querySelectorAll(".nav-link");
  const splash = document.getElementById("splash");
  const scrollTop = document.getElementById("scroll-top");
  const contactForm = document.getElementById("contact-form");

  const hideSplash = () => {
    if (splash) {
      splash.classList.add("is-hidden");
    }
  };

  window.addEventListener("load", () => {
    window.setTimeout(hideSplash, 1250);
  });
  window.setTimeout(hideSplash, 2800);

  if (window.Typed) {
    new window.Typed("#typed-roles", {
      strings: [
        "Machine Learning Developer",
        "Data Analyst",
        "Sustainable AI Researcher"
      ],
      typeSpeed: 56,
      backSpeed: 34,
      backDelay: 1450,
      loop: true,
      smartBackspace: true
    });
  }

  const setHeaderState = () => {
    const scrolled = window.scrollY > 60;
    header?.classList.toggle("is-scrolled", scrolled);
    scrollTop?.classList.toggle("is-visible", window.scrollY > 460);
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  const closeMenu = () => {
    navLinks?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks?.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (!navLinks || !menuToggle) return;
    const clickedInsideMenu = navLinks.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideMenu && !clickedToggle) {
      closeMenu();
    }
  });

  scrollTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  const revealElements = document.querySelectorAll(".reveal");

  if (window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    revealElements.forEach((element, index) => {
      window.gsap.fromTo(
        element,
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          delay: Math.min(index * 0.018, 0.18),
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true
          }
        }
      );
    });

    window.gsap.fromTo(
      ".splash-title",
      { y: 18, scale: 0.96 },
      { y: 0, scale: 1, duration: 0.8, ease: "power3.out" }
    );

    window.gsap.to(".orbital-card", {
      y: -14,
      duration: 2.8,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });
  } else if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
  }

  const sections = Array.from(document.querySelectorAll("main section[id]"));

  if ("IntersectionObserver" in window) {
    const activeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${activeId}`);
        });
      });
    }, {
      rootMargin: "-34% 0px -55% 0px",
      threshold: 0.01
    });

    sections.forEach((section) => activeObserver.observe(section));
  }

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const emailInput = contactForm.querySelector('input[type="email"]');

    if (!name || !email || !message) {
      showToast("Please fill in your name, email, and message.");
      return;
    }

    if (emailInput && !emailInput.validity.valid) {
      showToast("Please enter a valid email address.");
      return;
    }

    const text = `*New Portfolio Message* 🚀\n\n` +
                 `*Name:* ${name}\n` +
                 `*Email:* ${email}\n\n` +
                 `*Message:*\n${message}`;
    const whatsappUrl = `https://wa.me/8801706683622?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, "_blank");
    contactForm.reset();
    showToast("Opening WhatsApp to send your message...");
  });

  // Floating cursor video preview for 3D WEB Card & Client Portfolio Card
  const web3dCard = document.querySelector('.web3d-card');
  const pheroCard = document.querySelector('.phero-card');
  const tooltip = document.getElementById('video-preview-tooltip');
  const tooltipPing = document.getElementById('tooltip-ping');
  const tooltipText = document.getElementById('tooltip-text');
  const ignoreMediaError = () => {};

  const setupVideoHover = (card, targetVideoId, tooltipLabel, pingClassToAdd) => {
    if (!card) return;
    let isHovered = false;
    const cardVideo = card.querySelector('.project-video');
    const targetTooltipVideo = document.getElementById(targetVideoId);

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      
      // Hide all tooltip videos first
      document.querySelectorAll('.tooltip-video').forEach(video => {
        video.classList.add('hidden');
        video.pause();
      });

      if (targetTooltipVideo) {
        targetTooltipVideo.classList.remove('hidden');
        targetTooltipVideo.play().catch(ignoreMediaError);
      }
      if (tooltipText) {
        tooltipText.textContent = tooltipLabel;
      }
      if (tooltipPing) {
        tooltipPing.className = `w-2 h-2 rounded-full animate-ping ${pingClassToAdd}`;
      }
      if (cardVideo) {
        cardVideo.currentTime = 0;
        cardVideo.play().catch(ignoreMediaError);
        cardVideo.style.zIndex = '20';
        cardVideo.style.opacity = '1';
        cardVideo.classList.remove('opacity-0');
        cardVideo.classList.add('opacity-100');
      }
      const thumbnail = card.querySelector('.project-visual img');
      if (thumbnail) {
        thumbnail.style.opacity = '0';
      }
      if (tooltip) {
        if (window.gsap) {
          window.gsap.to(tooltip, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'power3.out'
          });
        } else {
          tooltip.style.opacity = '1';
          tooltip.style.transform = 'scale(1)';
        }
      }
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      if (cardVideo) {
        cardVideo.pause();
        cardVideo.currentTime = 0;
        cardVideo.style.zIndex = '0';
        cardVideo.style.opacity = '0';
        cardVideo.classList.remove('opacity-100');
        cardVideo.classList.add('opacity-0');
      }
      const thumbnail = card.querySelector('.project-visual img');
      if (thumbnail) {
        thumbnail.style.opacity = '1';
      }
      if (tooltip) {
        if (window.gsap) {
          window.gsap.to(tooltip, {
            opacity: 0,
            scale: 0.75,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
              if (!isHovered && targetTooltipVideo) {
                targetTooltipVideo.pause();
              }
            }
          });
        } else {
          tooltip.style.opacity = '0';
          tooltip.style.transform = 'scale(0.75)';
          if (targetTooltipVideo) targetTooltipVideo.pause();
        }
      }
    });

    card.addEventListener('mousemove', (e) => {
      if (tooltip) {
        if (window.gsap) {
          window.gsap.to(tooltip, {
            x: e.clientX + 20,
            y: e.clientY + 20,
            duration: 0.25,
            ease: 'power2.out'
          });
        } else {
          tooltip.style.left = `${e.clientX + 20}px`;
          tooltip.style.top = `${e.clientY + 20}px`;
        }
      }
    });
  };

  setupVideoHover(web3dCard, 'tooltip-video-3d', '3D Portfolio Preview', 'bg-purple-500');
  setupVideoHover(pheroCard, 'tooltip-video-phero', 'Client Project Preview', 'bg-orange-500');

  // Live Preview Drawer (Right Side Split Screen Panel)
  const previewOverlay = document.getElementById('preview-overlay');
  const previewDrawer = document.getElementById('preview-drawer');
  const previewTitle = document.getElementById('preview-title');
  const previewIframe = document.getElementById('preview-iframe');
  const previewLoader = document.getElementById('preview-loader');
  const previewGithubFallback = document.getElementById('preview-github-fallback');
  const previewOpenTab = document.getElementById('preview-open-tab');
  const previewClose = document.getElementById('preview-close');
  const previewGithubBtn = document.getElementById('preview-github-btn');

  const formatUrlForPreview = (url) => {
    if (url.includes('drive.google.com')) {
      return url.replace(/\/view(\?.*)?$/, '/preview').replace(/\/view\/$/, '/preview').replace(/\/view$/, '/preview');
    }
    return url;
  };

  const openPreview = (url, titleText) => {
    if (!previewDrawer || !previewOverlay) return;

    if (previewIframe) {
      previewIframe.classList.add('hidden');
      previewIframe.src = '';
    }
    if (previewGithubFallback) previewGithubFallback.classList.add('hidden');
    if (previewLoader) previewLoader.classList.remove('hidden');

    if (previewTitle) previewTitle.textContent = titleText;
    if (previewOpenTab) previewOpenTab.href = url;

    previewOverlay.style.opacity = '1';
    previewOverlay.style.pointerEvents = 'auto';
    previewDrawer.style.transform = 'translateX(0)';

    if (url.includes('github.com') && !url.includes('github.io')) {
      if (previewLoader) previewLoader.classList.add('hidden');
      if (previewGithubFallback) {
        previewGithubFallback.classList.remove('hidden');
        if (previewGithubBtn) previewGithubBtn.href = url;
      }
    } else {
      const formattedUrl = formatUrlForPreview(url);
      if (previewIframe) {
        previewIframe.src = formattedUrl;
        previewIframe.classList.remove('hidden');
      }
    }
  };

  const closePreview = () => {
    if (!previewDrawer || !previewOverlay) return;
    previewOverlay.style.opacity = '0';
    previewOverlay.style.pointerEvents = 'none';
    previewDrawer.style.transform = 'translateX(100%)';
    if (previewIframe) {
      previewIframe.src = '';
    }
  };

  if (previewClose) previewClose.addEventListener('click', closePreview);
  if (previewOverlay) previewOverlay.addEventListener('click', closePreview);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closePreview();
    }
  });

  if (previewIframe) {
    previewIframe.addEventListener('load', () => {
      if (previewLoader) previewLoader.classList.add('hidden');
    });
  }

  // Intercept all external portfolio, code, and credential links
  const clickableLinks = document.querySelectorAll(
    '.project-actions a, .credential-card a, .document-actions a, .hero-actions a'
  );

  clickableLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.startsWith('#') || href.startsWith('mailto:') || link.hasAttribute('download')) {
      return;
    }

    link.addEventListener('click', (e) => {
      e.preventDefault();
      const parentCard = link.closest('article, .credential-card, .document-panel, .hero-copy');
      const titleText = parentCard?.querySelector('h3')?.textContent || 'Document Preview';
      openPreview(href, titleText);
    });
  });
});

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("is-visible"));

  window.setTimeout(() => {
    toast.classList.remove("is-visible");
    window.setTimeout(() => toast.remove(), 260);
  }, 3600);
}
