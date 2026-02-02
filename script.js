// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* ===========================================
   PRELOADER
   =========================================== */
window.addEventListener('load', () => {
  const preloader = document.querySelector('.preloader');
  setTimeout(() => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }, 1000);
});

/* ===========================================
   CUSTOM CURSOR
   =========================================== */
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");
const hoverTriggers = document.querySelectorAll(".hover-trigger");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// Smooth follower animation
function animateFollower() {
  const dx = mouseX - followerX;
  const dy = mouseY - followerY;
  
  followerX += dx * 0.1;
  followerY += dy * 0.1;
  
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  
  requestAnimationFrame(animateFollower);
}
animateFollower();

hoverTriggers.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
});

/* ===========================================
   NAVIGATION
   =========================================== */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const nav = document.querySelector("nav");

// Hamburger toggle
hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

/* ===========================================
   SMOOTH SCROLL
   =========================================== */
document.querySelectorAll('.nav-links a, .cta-btn').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;

    const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

/* ===========================================
   BACK TO TOP BUTTON
   =========================================== */
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 500) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================================
   ANIMATED COUNTERS (Hero Stats)
   =========================================== */
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 seconds
  const increment = target / (duration / 16);
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current) + '+';
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target + '+';
    }
  };

  updateCounter();
}

// Trigger counter animation when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-number').forEach(counter => {
        animateCounter(counter);
      });
      heroObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const heroSection = document.querySelector('#home');
if (heroSection) heroObserver.observe(heroSection);

/* ===========================================
   SKILL PROGRESS BARS
   =========================================== */
const skillBars = document.querySelectorAll('.skill-bar');

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target;
      const progress = progressBar.getAttribute('data-progress');
      setTimeout(() => {
        progressBar.style.width = progress + '%';
      }, 100);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => skillObserver.observe(bar));

/* ===========================================
   GSAP ANIMATIONS - COMPLETELY FIXED
   Using gsap.set to ensure elements are visible by default
   and proper ScrollTrigger configuration
   =========================================== */

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  
  // CRITICAL: Set all animated elements to visible state by default
  // This ensures they show even if animations don't trigger
  gsap.set([
    ".section-title",
    ".section-subtitle", 
    ".about-text",
    ".about-image-wrapper",
    ".skill-card",
    ".service-card",
    ".video-card",
    ".testimonial-card",
    ".contact-info"
  ], {
    opacity: 1,
    x: 0,
    y: 0,
    clearProps: "transform"
  });

  // 1. Hero reveal animations (these run immediately on load)
  gsap.fromTo(".hero-title .line", 
    { y: 100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power4.out", delay: 1.2 }
  );

  gsap.fromTo(".hero-subtitle",
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 1, delay: 1.6, ease: "power2.out" }
  );

  gsap.fromTo(".hero-stats",
    { opacity: 0, y: 30 },
    { opacity: 1, y: 0, duration: 1, delay: 1.8, ease: "power2.out" }
  );

  gsap.fromTo(".cta-group",
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, delay: 2, ease: "power2.out" }
  );

  gsap.fromTo(".social-sidebar",
    { x: -50, opacity: 0 },
    { x: 0, opacity: 1, duration: 1, delay: 2.2, ease: "power2.out" }
  );

  // 2. Section titles - using fromTo with onComplete
  gsap.utils.toArray(".section-title").forEach((title) => {
    gsap.fromTo(title,
      { x: -50, opacity: 0 },
      { 
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: title, 
          start: "top 80%",
          once: true, // Only trigger once
          onEnter: () => {
            // Ensure element stays visible
            gsap.set(title, { opacity: 1, x: 0 });
          }
        }
      }
    );
  });

  // Section subtitles
  gsap.utils.toArray(".section-subtitle").forEach((subtitle) => {
    gsap.fromTo(subtitle,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: subtitle, 
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.set(subtitle, { opacity: 1, y: 0 });
          }
        }
      }
    );
  });

  // 3. About section
  const aboutText = document.querySelector(".about-text");
  if (aboutText) {
    gsap.fromTo(aboutText,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#about", 
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.set(aboutText, { opacity: 1, x: 0 });
          }
        }
      }
    );
  }

  const aboutImage = document.querySelector(".about-image-wrapper");
  if (aboutImage) {
    gsap.fromTo(aboutImage,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#about", 
          start: "top 75%",
          once: true,
          onEnter: () => {
            gsap.set(aboutImage, { opacity: 1, x: 0 });
          }
        }
      }
    );
  }

  // 4. Skill cards
  const skillCards = document.querySelectorAll(".skill-card");
  if (skillCards.length > 0) {
    gsap.fromTo(skillCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.7)",
        scrollTrigger: { 
          trigger: ".skills-grid", 
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(skillCards, { opacity: 1, y: 0 });
          }
        }
      }
    );
  }

  // 5. Service cards
  const serviceCards = document.querySelectorAll(".service-card");
  if (serviceCards.length > 0) {
    gsap.fromTo(serviceCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#services", 
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(serviceCards, { opacity: 1, y: 0 });
          }
        }
      }
    );
  }

  // 6. Video cards
  const videoCards = document.querySelectorAll(".video-card");
  if (videoCards.length > 0) {
    gsap.fromTo(videoCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#projects", 
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(videoCards, { opacity: 1, y: 0 });
          }
        }
      }
    );
  }

  // 7. Testimonial cards
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  if (testimonialCards.length > 0) {
    gsap.fromTo(testimonialCards,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: { 
          trigger: "#testimonials", 
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(testimonialCards, { opacity: 1, y: 0 });
          }
        }
      }
    );
  }

  // 8. Contact info
  const contactInfo = document.querySelector(".contact-info");
  if (contactInfo) {
    gsap.fromTo(contactInfo,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { 
          trigger: "#contact", 
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.set(contactInfo, { opacity: 1, y: 0 });
          }
        }
      }
    );
  }

  // Refresh ScrollTrigger after a short delay
  setTimeout(() => {
    ScrollTrigger.refresh();
  }, 100);
});

// Refresh after everything loads
window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});

/* ===========================================
   VIDEO CAROUSEL
   =========================================== */
const track = document.getElementById('videoTrack');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

if (nextBtn && track) {
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: 320, behavior: 'smooth' });
  });
}

if (prevBtn && track) {
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -320, behavior: 'smooth' });
  });
}

// Hover to play / reset on leave
document.querySelectorAll('.video-card').forEach((card) => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => {
    video.play().catch(e => console.log('Video play failed:', e));
  });
  
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.currentTime = 0;
    video.load()
  });
});

/* ===========================================
   PARTICLE BACKGROUND
   =========================================== */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const COLORS = ['#6C63FF', '#00E5FF', '#ffffff'];
const MAX_DIST_SQ = 18000;

// Mouse interaction
let mouse = {
  x: null,
  y: null,
  radius: 150
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

window.addEventListener('mouseout', () => {
  mouse.x = null;
  mouse.y = null;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.baseSize = this.size;
    this.speedX = (Math.random() - 0.5);
    this.speedY = (Math.random() - 0.5);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;

    // Mouse interaction
    if (mouse.x != null && mouse.y != null) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        this.size = this.baseSize * 2;
        if (distance < mouse.radius / 2) {
          this.x -= dx / 20;
          this.y -= dy / 20;
        }
      } else {
        if (this.size > this.baseSize) {
          this.size -= 0.1;
        }
      }
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  const count = Math.min(Math.floor((canvas.width * canvas.height) / 20000), 100);
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distSq = dx * dx + dy * dy;

      if (distSq < MAX_DIST_SQ) {
        const opacity = 1 - distSq / MAX_DIST_SQ;
        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particles[a].x, particles[a].y);
        ctx.lineTo(particles[b].x, particles[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach((p) => { 
    p.update(); 
    p.draw(); 
  });
  
  connectParticles();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();

/* ===========================================
   PERFORMANCE OPTIMIZATION
   =========================================== */
// Disable animations on low-end devices
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  gsap.globalTimeline.pause();
  document.querySelectorAll('.skill-bar').forEach(bar => {
    bar.style.width = bar.getAttribute('data-progress') + '%';
  });
}

// Lazy load images
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for older browsers
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}