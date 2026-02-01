// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/* --- CUSTOM CURSOR --- */
const cursor = document.querySelector(".cursor");
const hoverTriggers = document.querySelectorAll(".hover-trigger");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

hoverTriggers.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hovered"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hovered"));
});

/* --- HAMBURGER MENU --- */
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
  });
});

/* --- SMOOTH SCROLL --- */
document.querySelectorAll('.nav-links a, .cta-btn').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;

    const offset = target.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: offset, behavior: "smooth" });
  });
});

/* --- GSAP ANIMATIONS --- */

// 1. Hero reveal
gsap.from(".hero-title .line", {
  y: 100, opacity: 0, duration: 1, stagger: 0.2, ease: "power4.out", delay: 0.2,
});

gsap.from(".hero-subtitle", {
  opacity: 0, y: 20, duration: 1, delay: 0.8, ease: "power2.out",
});

gsap.from(".cta-btn", {
  y: 20, opacity: 0, duration: 1, delay: 1, ease: "power2.out",
  onComplete: () => gsap.set(".cta-btn", { clearProps: "opacity, transform" }),
});

// 2. Section titles slide in
gsap.utils.toArray(".section-title").forEach((title) => {
  gsap.from(title, {
    scrollTrigger: { trigger: title, start: "top 80%", toggleActions: "play none none reverse" },
    x: -50, opacity: 0, duration: 0.8,
  });
});

// 3. About fade up
gsap.from(".about-container", {
  scrollTrigger: { trigger: "#about", start: "top 75%" },
  y: 50, opacity: 0, duration: 1, ease: "power2.out",
});

// 4. Skill cards stagger
gsap.from(".skill-card", {
  scrollTrigger: { trigger: ".skills-grid", start: "top 85%", toggleActions: "play none none reverse" },
  y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)",
});

// 5. Service cards stagger
gsap.from(".service-card", {
  scrollTrigger: { trigger: "#services", start: "top 85%" },
  y: 50, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out",
  onComplete: () => gsap.set(".service-card", { clearProps: "all" }),
});

// 6. Contact info fade up
gsap.from(".contact-info", {
  scrollTrigger: { trigger: "#contact", start: "top 85%" },
  y: 50, opacity: 0, duration: 1, ease: "expo.out",
  onComplete: () => gsap.set(".contact-info", { clearProps: "all" }),
});

// Refresh after everything loads
window.addEventListener('load', () => ScrollTrigger.refresh());

/* --- VIDEO CAROUSEL --- */
const track = document.getElementById('videoTrack');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

nextBtn.addEventListener('click', () => track.scrollBy({ left: 300, behavior: 'smooth' }));
prevBtn.addEventListener('click', () => track.scrollBy({ left: -300, behavior: 'smooth' }));

// Hover to play / reset on leave
document.querySelectorAll('.video-card').forEach((card) => {
  const video = card.querySelector('video');
  if (!video) return;

  card.addEventListener('mouseenter', () => video.play());
  card.addEventListener('mouseleave', () => {
    video.pause();
    video.load(); // Resets to poster
  });
});

/* --- PARTICLE BACKGROUND --- */
const canvas = document.getElementById("bg-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const COLORS = ['#6C63FF', '#00E5FF', '#ffffff'];
const MAX_DIST_SQ = 18000; // Fixed squared-distance threshold for connecting lines

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = (Math.random() - 0.5);
    this.speedY = (Math.random() - 0.5);
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
    if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
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
  for (let i = 0; i < count; i++) particles.push(new Particle());
}

function connectParticles() {
  for (let a = 0; a < particles.length; a++) {
    for (let b = a + 1; b < particles.length; b++) {
      const dx = particles[a].x - particles[b].x;
      const dy = particles[a].y - particles[b].y;
      const distSq = dx * dx + dy * dy;

      if (distSq < MAX_DIST_SQ) {
        const opacity = 1 - distSq / MAX_DIST_SQ;
        ctx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
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
  particles.forEach((p) => { p.update(); p.draw(); });
  connectParticles();
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

initParticles();
animate();