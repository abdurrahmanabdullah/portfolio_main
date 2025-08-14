// ==============================================
// Portfolio App - Main JavaScript File
// Author: Abdullah
// ==============================================

"use strict";

// ==============================================
// Configuration & Constants
// ==============================================
const CONFIG = {
  ANIMATION_DURATION: 500,
  SCROLL_THRESHOLD: 50,
  STATS_ANIMATION_DURATION: 30,
  MOBILE_BREAKPOINT: 768,
  EMAIL: "abdullah19303034@gmail.com",
};

// ==============================================
// Projects Data
// ==============================================
const PROJECTS_DATA = [
  {
    number: "01",
    type: "Fullstack Project",
    title: "Queuing Management System",
    description:
      "An advanced queuing management system with features like token-based offline voice calling, hold, reject, and recall options. It uses two backends—one for overall system operations and another for sound management. The system provides real-time updates and efficient queue management for businesses.",
    tech: ["Flutter", "FastAPI", "MySQL", "WebSocket"],
    links: {
      github: "https://github.com/abdurrahmanabdullah/Q_bot.git",
      live: "https://github.com/abdurrahmanabdullah/Q_bot.git",
    },
    image: "https://i.ibb.co.com/cc9Zy0sV/quing1.png",
  },
  {
    number: "02",
    type: "Mobile Application",
    title: "Nurse Calling Management System",
    description:
      "Built a real-time Nurse Call app with Strapi backend and Flutter mobile, featuring WebSocket-based live updates and custom sound notifications. Includes detailed wait-time tracking for efficient patient care and emergency response systems.",
    tech: ["Flutter", "Laravel", "MySQL", "ESP32"],
    links: {
      github: "https://github.com/abdurrahmanabdullah/QNurse-management-system",
      live: "https://github.com/abdurrahmanabdullah/QNurse-management-system",
    },
    image: "https://i.ibb.co.com/39VZphmw/nurse-call.png",
  },
  {
    number: "03",
    type: "Mobile Application",
    title: "Soccer Player Hub",
    description:
      "A Flutter-based soccer training app with video recording for training sessions, integrated video player, detailed progress reports, personalized training plans, and role-based access control. Published on Apple App Store.",
    tech: ["Flutter", "Laravel", "MySQL", "Video Processing"],
    links: {
      github: "https://github.com/abdurrahmanabdullah/-Soccer-Player-Hub.git",
      live: "https://apps.apple.com/us/app/beestera-soccer/id6741708558",
    },
    image: "https://i.ibb.co.com/hFS8TmP1/so1.jpg",
  },
  {
    number: "04",
    type: "Web Application",
    title: "JP-TRAVEL Platform",
    description:
      "A full-stack travel suggestion web and mobile platform. Users can search for travel spots, view nearby suggestions, like, love, and comment on locations. Includes comprehensive admin dashboard for content management.",
    tech: ["TypeScript", "Next.js", "Nest.js", "PostgreSQL"],
    links: {
      github: "#",
      live: "https://kt-travel-frontend-713130595460.asia-northeast1.run.app/ja",
    },
    image: "https://i.postimg.cc/VNZzp9zX/jp.avif",
  },
  {
    number: "05",
    type: "E-Commerce Platform",
    title: "Full-Stack E-Commerce",
    description:
      "A comprehensive e-commerce solution with customer browsing, cart management, order processing, secure bKash payments, and complete admin panel for product and order management. Built with modern technologies.",
    tech: ["React.js", "Strapi", "Node.js", "MySQL"],
    links: {
      github:
        "https://github.com/abdurrahmanabdullah/E-commerce-project-React-Strapi-.git",
      live: "https://strapipracticum.hidayahsmart.solutions/",
    },
    image: "https://i.ibb.co.com/R4hjBGDX/e-com.png",
  },
  {
    number: "06",
    type: "Mobile Application",
    title: "Hidayah Ebooks Platform",
    description:
      "An online E-Book reading platform with 5 different user panels (Admin, Translator, Author, Publisher, and User). Features Epub book reading capabilities for mobile users with comprehensive content management.",
    tech: ["Flutter", "Python Flask", "PostgreSQL", "MySQL"],
    links: {
      github:
        "https://github.com/abdurrahmanabdullah/hidayah_islamic_book_store-main.git",
      live: "https://drive.google.com/file/d/1jpW2PvAas4ClGCVSvof2PTcK00Fv29pu/view?usp=sharing",
    },
    image: "https://i.ibb.co.com/9H2nHPPV/book.png",
  },
];

// ==============================================
// Utility Functions
// ==============================================
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static isMobile() {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
  }

  static smoothScrollTo(top) {
    window.scrollTo({
      top,
      behavior: "smooth",
    });
  }

  static createElement(tag, className, content) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (content) element.textContent = content;
    return element;
  }

  static setAttributes(element, attributes) {
    Object.keys(attributes).forEach((key) => {
      element.setAttribute(key, attributes[key]);
    });
  }
}

// ==============================================
// Loading Manager
// ==============================================
class LoadingManager {
  constructor() {
    this.loadingScreen = document.getElementById("loadingScreen");
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      this.hideLoading();
    });

    // Fallback: Hide loading after 3 seconds
    setTimeout(() => {
      this.hideLoading();
    }, 3000);
  }

  hideLoading() {
    if (this.loadingScreen) {
      this.loadingScreen.classList.add("hidden");
      document.body.style.opacity = "1";
    }
  }
}

// ==============================================
// Navigation Manager
// ==============================================
class NavigationManager {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("navMenu");
    this.navLinks = document.querySelectorAll(".nav-link, .contact-btn");

    this.init();
  }

  init() {
    this.setupScrollEffect();
    this.setupMobileMenu();
    this.setupSmoothScrolling();
  }

  setupScrollEffect() {
    const handleScroll = Utils.debounce(() => {
      if (window.scrollY > CONFIG.SCROLL_THRESHOLD) {
        this.navbar.classList.add("scrolled");
      } else {
        this.navbar.classList.remove("scrolled");
      }
    }, 10);

    window.addEventListener("scroll", handleScroll);
  }

  setupMobileMenu() {
    if (this.hamburger && this.navMenu) {
      this.hamburger.addEventListener("click", () => {
        this.toggleMobileMenu();
      });

      // Close menu when clicking on links
      this.navLinks.forEach((link) => {
        link.addEventListener("click", () => {
          this.closeMobileMenu();
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!this.navbar.contains(e.target)) {
          this.closeMobileMenu();
        }
      });
    }
  }

  setupSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          Utils.smoothScrollTo(target.offsetTop - 90);
        }
      });
    });
  }

  toggleMobileMenu() {
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");
  }

  closeMobileMenu() {
    this.hamburger.classList.remove("active");
    this.navMenu.classList.remove("active");
  }

  updateActiveLink(page) {
    this.navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("data-page") === page) {
        link.classList.add("active");
      }
    });
  }
}

// ==============================================
// Router Class
// ==============================================
class Router {
  constructor() {
    // Set your base path here
    this.basePath = "/portfolio_main";

    this.routes = {
      "/": "home",
      "/home": "home",
      "/about": "about",
      "/services": "expertise",
      "/work": "work",
      "/contact": "contact",
    };
    this.currentPage = "home";
    this.navigationManager = null;
    this.init();
  }

  init() {
    // Get current path and remove base path
    const fullPath = window.location.pathname;
    const relativePath = this.getRelativePath(fullPath);
    const page = this.routes[relativePath] || "home";

    this.showPage(page);

    window.addEventListener("popstate", (e) => {
      const page = e.state
        ? e.state.page
        : this.getPageFromPath(this.getRelativePath(window.location.pathname));
      this.showPage(page);
    });

    this.setupNavigation();
  }

  // Remove base path from full path to get relative path
  getRelativePath(fullPath) {
    if (fullPath.startsWith(this.basePath)) {
      const relativePath = fullPath.substring(this.basePath.length);
      return relativePath || "/";
    }
    return fullPath;
  }

  // Add base path to relative path to get full path
  getFullPath(relativePath) {
    if (relativePath === "/") {
      return this.basePath + "/";
    }
    return this.basePath + relativePath;
  }

  getPageFromPath(path) {
    return this.routes[path] || "home";
  }

  getPathFromPage(page) {
    for (const [path, pageName] of Object.entries(this.routes)) {
      if (pageName === page) {
        return path === "/home" ? "/" : path;
      }
    }
    return "/";
  }

  setupNavigation() {
    document.querySelectorAll("[data-page]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page =
          e.target.getAttribute("data-page") ||
          e.currentTarget.getAttribute("data-page");
        this.navigateTo(page);
      });
    });
  }

  navigateTo(page) {
    const validPages = Object.values(this.routes);
    if (!validPages.includes(page)) return;

    const relativePath = this.getPathFromPage(page);
    const fullPath = this.getFullPath(relativePath);

    history.pushState({ page }, "", fullPath);
    this.showPage(page);
  }

  showPage(page) {
    // Hide all pages
    document.querySelectorAll(".page").forEach((p) => {
      p.classList.remove("active");
    });

    // Show selected page
    const targetPage = document.getElementById(page);
    if (targetPage) {
      targetPage.classList.add("active");
    }

    // Update navigation
    if (this.navigationManager) {
      this.navigationManager.updateActiveLink(page);
    }

    this.currentPage = page;
    this.updateTitle(page);
    Utils.smoothScrollTo(0);
    this.initializePage(page);
  }

  updateTitle(page) {
    const titles = {
      home: "Abdullah - Software Engineer",
      about: "About - Abdullah",
      expertise: "Services - Abdullah",
      work: "My Work - Abdullah",
      contact: "Contact - Abdullah",
    };
    document.title = titles[page] || "Abdullah - Software Engineer";
  }

  initializePage(page) {
    switch (page) {
      case "home":
        new StatsAnimator().animate();
        break;
      case "work":
        new ProjectShowcase().init();
        break;
      case "contact":
        new ContactForm().init();
        break;
    }
  }

  setNavigationManager(navigationManager) {
    this.navigationManager = navigationManager;
  }
}

// ==============================================
// Stats Animator Class
// ==============================================
class StatsAnimator {
  constructor() {
    this.statsElement = document.getElementById("stats");
    this.animated = false;
  }

  animate() {
    if (this.animated || !this.statsElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateNumbers();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(this.statsElement);
  }

  animateNumbers() {
    const statsNumbers = this.statsElement.querySelectorAll(".stat-number");

    statsNumbers.forEach((stat) => {
      const finalText = stat.textContent;
      const numericValue = parseInt(finalText.replace(/\D/g, ""));

      if (isNaN(numericValue)) return;

      let current = 0;
      const increment = numericValue / (2000 / CONFIG.STATS_ANIMATION_DURATION);

      const timer = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          stat.textContent = finalText;
          clearInterval(timer);
        } else {
          if (finalText.includes("+")) {
            stat.textContent = Math.floor(current) + "+";
          } else {
            stat.textContent = Math.floor(current);
          }
        }
      }, CONFIG.STATS_ANIMATION_DURATION);
    });

    this.animated = true;
  }
}

// ==============================================
// Project Showcase Class
// ==============================================
class ProjectShowcase {
  constructor() {
    this.currentIndex = 0;
    this.projects = PROJECTS_DATA;
    this.elements = {
      display: document.getElementById("projectDisplay"),
      number: document.getElementById("currentProjectNumber"),
      type: document.getElementById("projectType"),
      title: document.getElementById("projectTitle"),
      description: document.getElementById("projectDescription"),
      techStack: document.getElementById("projectTechStack"),
      image: document.getElementById("projectImage"),
      liveLink: document.getElementById("liveLink"),
      githubLink: document.getElementById("githubLink"),
      prevBtn: document.getElementById("prevProject"),
      nextBtn: document.getElementById("nextProject"),
    };
  }

  init() {
    if (!this.elements.display) return;

    this.setupEventListeners();
    this.updateProject(0);
    this.setupKeyboardNavigation();
  }

  setupEventListeners() {
    if (this.elements.nextBtn) {
      this.elements.nextBtn.addEventListener("click", () => {
        this.nextProject();
      });
    }

    if (this.elements.prevBtn) {
      this.elements.prevBtn.addEventListener("click", () => {
        this.prevProject();
      });
    }
  }

  setupKeyboardNavigation() {
    document.addEventListener("keydown", (e) => {
      if (router.currentPage !== "work") return;

      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          this.nextProject();
          break;
        case "ArrowLeft":
          e.preventDefault();
          this.prevProject();
          break;
      }
    });
  }

  nextProject() {
    if (this.currentIndex < this.projects.length - 1) {
      this.currentIndex++;
      this.updateProject(this.currentIndex);
    }
  }

  prevProject() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateProject(this.currentIndex);
    }
  }

  updateProject(index) {
    if (!this.projects[index] || !this.elements.display) return;

    const project = this.projects[index];

    // Add fade out effect
    this.elements.display.classList.add("project-fade-out");

    setTimeout(() => {
      this.updateProjectContent(project);
      this.updateNavigationState(index);

      // Remove fade out and add fade in
      this.elements.display.classList.remove("project-fade-out");
      this.elements.display.classList.add("project-fade-in");

      setTimeout(() => {
        this.elements.display.classList.remove("project-fade-in");
      }, CONFIG.ANIMATION_DURATION);
    }, 250);
  }

  updateProjectContent(project) {
    // Update text content
    if (this.elements.number) {
      this.elements.number.textContent = project.number.padStart(2, "0");
    }
    if (this.elements.type) {
      this.elements.type.textContent = project.type;
    }
    if (this.elements.title) {
      this.elements.title.textContent = project.title;
    }
    if (this.elements.description) {
      this.elements.description.textContent = project.description;
    }

    // Update tech stack
    if (this.elements.techStack) {
      this.elements.techStack.innerHTML = project.tech
        .map((tech) => `<span class="tech-tag">${tech}</span>`)
        .join("");
    }

    // Update links
    if (this.elements.liveLink) {
      this.elements.liveLink.href = project.links.live;
    }
    if (this.elements.githubLink) {
      this.elements.githubLink.href = project.links.github;
    }

    // Update image
    if (this.elements.image) {
      this.elements.image.src = project.image;
      this.elements.image.alt = project.title;
    }
  }

  updateNavigationState(index) {
    if (this.elements.prevBtn) {
      this.elements.prevBtn.disabled = index === 0;
    }
    if (this.elements.nextBtn) {
      this.elements.nextBtn.disabled = index === this.projects.length - 1;
    }
  }
}

// ==============================================
// Contact Form Class
// ==============================================
class ContactForm {
  constructor() {
    this.form = document.getElementById("contactForm");
    this.isSubmitting = false;
  }

  init() {
    if (!this.form) return;

    this.setupEventListeners();
    this.setupValidation();
  }

  setupEventListeners() {
    this.form.addEventListener("submit", (e) => {
      this.handleSubmit(e);
    });

    // Real-time validation
    const inputs = this.form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => {
        this.validateField(input);
      });

      input.addEventListener("input", () => {
        this.clearFieldError(input);
      });
    });
  }

  setupValidation() {
    // Add validation styles and messages
    const style = document.createElement("style");
    style.textContent = `
            .form-field-error {
                border-color: #ff4757 !important;
                box-shadow: 0 0 0 2px rgba(255, 71, 87, 0.2);
            }
            .form-error-message {
                color: #ff4757;
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: block;
            }
            .form-field-success {
                border-color: var(--primary-color) !important;
            }
        `;
    document.head.appendChild(style);
  }

  validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = "";

    // Remove existing error
    this.clearFieldError(field);

    switch (fieldName) {
      case "name":
        if (value.length < 2) {
          isValid = false;
          errorMessage = "Name must be at least 2 characters long";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid email address";
        }
        break;

      case "phone":
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
          isValid = false;
          errorMessage = "Please enter a valid phone number";
        }
        break;

      case "message":
        if (value.length < 10) {
          isValid = false;
          errorMessage = "Message must be at least 10 characters long";
        }
        break;
    }

    if (!isValid) {
      this.showFieldError(field, errorMessage);
    } else {
      field.classList.add("form-field-success");
    }

    return isValid;
  }

  showFieldError(field, message) {
    field.classList.add("form-field-error");

    let errorElement = field.parentNode.querySelector(".form-error-message");
    if (!errorElement) {
      errorElement = document.createElement("span");
      errorElement.className = "form-error-message";
      field.parentNode.appendChild(errorElement);
    }
    errorElement.textContent = message;
  }

  clearFieldError(field) {
    field.classList.remove("form-field-error", "form-field-success");
    const errorElement = field.parentNode.querySelector(".form-error-message");
    if (errorElement) {
      errorElement.remove();
    }
  }

  validateForm() {
    const fields = this.form.querySelectorAll("input, textarea");
    let isValid = true;

    fields.forEach((field) => {
      if (!this.validateField(field)) {
        isValid = false;
      }
    });

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.isSubmitting) return;

    if (!this.validateForm()) {
      this.showNotification("Please fix the errors above", "error");
      return;
    }

    this.isSubmitting = true;
    const submitBtn = this.form.querySelector(".submit-btn");
    const originalText = submitBtn.textContent;

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Get form data
    const formData = new FormData(this.form);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    // Create mailto link
    this.sendEmail(data);

    // Reset form and button
    setTimeout(() => {
      this.form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      this.isSubmitting = false;

      // Clear all field styles
      const fields = this.form.querySelectorAll("input, textarea");
      fields.forEach((field) => this.clearFieldError(field));

      this.showNotification(
        "Thank you! Your message has been sent.",
        "success",
      );
    }, 1000);
  }

  sendEmail(data) {
    const subject = `Contact from ${data.name}`;
    const body = `Name: ${data.name}%0D%0AEmail: ${data.email}%0D%0APhone: ${data.phone}%0D%0A%0D%0AMessage:%0D%0A${data.message}`;
    const mailtoLink = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`;

    window.open(mailtoLink, "_blank");
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles
    const style = {
      position: "fixed",
      top: "100px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "8px",
      color: "white",
      fontWeight: "600",
      zIndex: "10000",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      maxWidth: "300px",
    };

    if (type === "success") {
      style.background = "var(--primary-color)";
      style.color = "var(--bg-primary)";
    } else if (type === "error") {
      style.background = "#ff4757";
    } else {
      style.background = "#3742fa";
    }

    Object.assign(notification.style, style);

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 5000);
  }
}

// ==============================================
// Performance Monitor
// ==============================================
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    // Monitor page load performance
    window.addEventListener("load", () => {
      if ("performance" in window) {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log("Page Load Performance:", {
          loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
          domReady: Math.round(
            perfData.domContentLoadedEventEnd - perfData.fetchStart,
          ),
          firstPaint: this.getFirstPaint(),
        });
      }
    });

    // Monitor memory usage (if available)
    if ("memory" in performance) {
      setInterval(() => {
        const memory = performance.memory;
        if (memory.usedJSHeapSize > memory.jsHeapSizeLimit * 0.9) {
          console.warn("High memory usage detected");
        }
      }, 30000);
    }
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType("paint");
    const firstPaint = paintEntries.find(
      (entry) => entry.name === "first-paint",
    );
    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }
}

// ==============================================
// Accessibility Manager
// ==============================================
class AccessibilityManager {
  constructor() {
    this.init();
  }

  init() {
    this.setupKeyboardNavigation();
    this.setupFocusManagement();
    this.setupScreenReaderSupport();
  }

  setupKeyboardNavigation() {
    // Ensure all interactive elements are keyboard accessible
    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        document.body.classList.add("keyboard-navigation");
      }
    });

    document.addEventListener("mousedown", () => {
      document.body.classList.remove("keyboard-navigation");
    });

    // Add focus styles for keyboard navigation
    const style = document.createElement("style");
    style.textContent = `
            .keyboard-navigation *:focus {
                outline: 2px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
        `;
    document.head.appendChild(style);
  }

  setupFocusManagement() {
    // Skip to main content link
    const skipLink = document.createElement("a");
    skipLink.href = "#main-content";
    skipLink.textContent = "Skip to main content";
    skipLink.className = "skip-link";

    const skipLinkStyles = {
      position: "absolute",
      top: "-100px",
      left: "0",
      background: "var(--primary-color)",
      color: "var(--bg-primary)",
      padding: "1rem",
      textDecoration: "none",
      borderRadius: "0 0 8px 0",
      fontWeight: "600",
      zIndex: "10001",
      transition: "top 0.3s ease",
    };

    Object.assign(skipLink.style, skipLinkStyles);

    skipLink.addEventListener("focus", () => {
      skipLink.style.top = "0";
    });

    skipLink.addEventListener("blur", () => {
      skipLink.style.top = "-100px";
    });

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  setupScreenReaderSupport() {
    // Add ARIA labels and roles where needed
    const nav = document.querySelector(".navbar");
    if (nav) {
      nav.setAttribute("role", "navigation");
      nav.setAttribute("aria-label", "Main navigation");
    }

    const main = document.querySelector(".main-content");
    if (main) {
      main.setAttribute("role", "main");
      main.setAttribute("id", "main-content");
    }

    // Add live region for dynamic content updates
    const liveRegion = document.createElement("div");
    liveRegion.setAttribute("aria-live", "polite");
    liveRegion.setAttribute("aria-atomic", "true");
    liveRegion.className = "sr-only";
    liveRegion.id = "live-region";

    const srOnlyStyles = {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0,0,0,0)",
      whiteSpace: "nowrap",
      border: "0",
    };

    Object.assign(liveRegion.style, srOnlyStyles);
    document.body.appendChild(liveRegion);
  }

  announcePageChange(pageName) {
    const liveRegion = document.getElementById("live-region");
    if (liveRegion) {
      liveRegion.textContent = `Navigated to ${pageName} page`;
    }
  }
}

// ==============================================
// Global Variables & Initialization
// ==============================================
let router;
let navigationManager;
let accessibilityManager;

// Global navigation function for logo click
function navigateTo(page) {
  if (router) {
    router.navigateTo(page);
  }
}

// ==============================================
// App Initialization
// ==============================================
document.addEventListener("DOMContentLoaded", () => {
  try {
    // Initialize all managers
    new LoadingManager();
    new PerformanceMonitor();

    navigationManager = new NavigationManager();
    accessibilityManager = new AccessibilityManager();
    router = new Router();

    // Connect router with navigation manager
    router.setNavigationManager(navigationManager);

    // Add page change announcements for accessibility
    const originalShowPage = router.showPage.bind(router);
    router.showPage = function (page) {
      originalShowPage(page);
      accessibilityManager.announcePageChange(page);
    };

    console.log("Portfolio app initialized successfully");
  } catch (error) {
    console.error("Error initializing portfolio app:", error);
  }
});

// ==============================================
// Error Handling
// ==============================================
window.addEventListener("error", (e) => {
  console.error("Global error:", e.error);
});

window.addEventListener("unhandledrejection", (e) => {
  console.error("Unhandled promise rejection:", e.reason);
  e.preventDefault();
});

// ==============================================
// Export for testing (if needed)
// ==============================================
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    Router,
    NavigationManager,
    ProjectShowcase,
    ContactForm,
    StatsAnimator,
    Utils,
  };
}
