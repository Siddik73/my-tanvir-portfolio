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

    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:mdtanvirsiddik124@gmail.com?subject=${subject}&body=${body}`;
    contactForm.reset();
    showToast("Your email app is opening with the message ready.");
  });

  // Floating cursor video preview for 3D WEB Card
  const web3dCard = document.querySelector('.web3d-card');
  const tooltip = document.getElementById('video-preview-tooltip');
  const tooltipVideo = document.getElementById('tooltip-video');
  const projectVideo = document.querySelector('.project-video');
  const ignoreMediaError = () => {};

  if (web3dCard) {
    let isHovered = false;

    web3dCard.addEventListener('mouseenter', () => {
      isHovered = true;
      if (tooltipVideo) {
        tooltipVideo.play().catch(ignoreMediaError);
      }
      if (projectVideo) {
        projectVideo.play().catch(ignoreMediaError);
        projectVideo.classList.remove('opacity-0');
        projectVideo.classList.add('opacity-100');
      }
      if (tooltip && window.gsap) {
        window.gsap.to(tooltip, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power3.out'
        });
      }
    });

    web3dCard.addEventListener('mouseleave', () => {
      isHovered = false;
      if (projectVideo) {
        projectVideo.pause();
        projectVideo.classList.remove('opacity-100');
        projectVideo.classList.add('opacity-0');
      }
      if (tooltip) {
        if (window.gsap) {
          window.gsap.to(tooltip, {
            opacity: 0,
            scale: 0.75,
            duration: 0.3,
            ease: 'power3.in',
            onComplete: () => {
              if (!isHovered && tooltipVideo) {
                tooltipVideo.pause();
              }
            }
          });
        } else {
          tooltip.style.opacity = '0';
          if (tooltipVideo) tooltipVideo.pause();
        }
      }
    });

    web3dCard.addEventListener('mousemove', (e) => {
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
  }
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
