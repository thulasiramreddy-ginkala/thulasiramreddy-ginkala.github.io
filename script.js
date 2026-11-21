document.getElementById('year').textContent = new Date().getFullYear();

/* ===========================
   NAVBAR — scroll glass effect
   =========================== */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

/* ===========================
   MOBILE — hamburger menu
   =========================== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
const spans     = hamburger.querySelectorAll('span');

hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    if (isOpen) {
        spans[0].style.transform = 'translateY(7px) rotate(45deg)';
        spans[1].style.opacity   = '0';
        spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
});

navLinks.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
});

/* ===========================
   TYPING EFFECT
   =========================== */
const titles    = ['Network Engineer II', 'Test Automation Specialist', 'Python Developer', 'API Automation Engineer', '5G / LTE Expert'];
const typingEl  = document.getElementById('typingText');

let ti = 0, ci = 0, deleting = false;

function type() {
    const word = titles[ti];

    if (!deleting) {
        typingEl.textContent = word.slice(0, ++ci);
        if (ci === word.length) {
            deleting = true;
            setTimeout(type, 1800);
            return;
        }
    } else {
        typingEl.textContent = word.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            ti = (ti + 1) % titles.length;
            setTimeout(type, 350);
            return;
        }
    }

    setTimeout(type, deleting ? 45 : 80);
}

// Start typing after hero animation settles
setTimeout(type, 1100);

/* ===========================
   SCROLL REVEAL
   =========================== */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        const parent    = entry.target.parentElement;
        const isGrid    = parent && (
            parent.classList.contains('skills-grid') ||
            parent.classList.contains('projects-grid')
        );
        const delay = isGrid
            ? [...parent.children].indexOf(entry.target) * 90
            : 0;

        setTimeout(() => entry.target.classList.add('visible'), delay);
        revealObserver.unobserve(entry.target);
    });
}, {
    threshold:  0.1,
    rootMargin: '0px 0px -40px 0px'
});

reveals.forEach(el => revealObserver.observe(el));

/* ===========================
   ACTIVE NAV LINK on scroll
   =========================== */
const sections   = document.querySelectorAll('section[id]');
const navAnchors = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
    });
}, { passive: true });

/* ===========================
   SCROLL PROGRESS BAR
   =========================== */
const progressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrolled / total) * 100}%`;
}, { passive: true });

/* ===========================
   BACK TO TOP
   =========================== */
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===========================
   COPY EMAIL
   =========================== */
const copyBtn = document.getElementById('copyEmail');
copyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText('gtrreddy5@gmail.com').then(() => {
        copyBtn.textContent = '✓';
        copyBtn.classList.add('copied');
        setTimeout(() => {
            copyBtn.textContent = '📋';
            copyBtn.classList.remove('copied');
        }, 2000);
    });
});

/* ===========================
   STATS COUNT-UP
   =========================== */
function countUp(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1400;
    const step     = target / (duration / 16);
    let current    = 0;
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            el.textContent = target;
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(current);
        }
    }, 16);
}

const statObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (!entry.isIntersecting) return;
        setTimeout(() => {
            entry.target.classList.add('visible');
            const num = entry.target.querySelector('.stat-number[data-target]');
            if (num) countUp(num);
        }, i * 120);
        statObserver.unobserve(entry.target);
    });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));

/* ===========================
   CARD SPOTLIGHT
   =========================== */
const spotSelector = '.skill-card, .project-card, .timeline-content, .contact-card, .arch-card';
document.addEventListener('mousemove', (e) => {
    const card = e.target.closest(spotSelector);
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
}, { passive: true });

/* ===========================
   NETWORK PARTICLE ANIMATION
   =========================== */
const canvas = document.getElementById('particlesCanvas');
const ctx    = canvas.getContext('2d');
const COUNT  = 55;
const DIST   = 130;
let particles = [];

function resizeCanvas() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}

class Dot {
    constructor() { this.init(); }
    init() {
        this.x  = Math.random() * canvas.width;
        this.y  = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.r  = Math.random() * 1.4 + 0.8;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width)  this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height)  this.vy *= -1;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 212, 255, 0.65)';
        ctx.fill();
    }
}

function initDots() {
    particles = [];
    for (let i = 0; i < COUNT; i++) particles.push(new Dot());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx   = particles[i].x - particles[j].x;
            const dy   = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < DIST) {
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(0, 212, 255, ${(1 - dist / DIST) * 0.28})`;
                ctx.lineWidth   = 0.7;
                ctx.stroke();
            }
        }
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => { resizeCanvas(); initDots(); });
resizeCanvas();
initDots();
animateParticles();

/* ===========================
   HERO GLOBE — wireframe + network arcs
   =========================== */
(function initGlobe() {
    const gc = document.getElementById('globeCanvas');
    if (!gc) return;
    const g = gc.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const TILT = 0.38;
    const rad = d => d * Math.PI / 180;

    let size = 0, R = 0;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        size = gc.offsetWidth;
        gc.width = gc.height = Math.round(size * dpr);
        g.setTransform(dpr, 0, 0, dpr, 0, 0);
        R = size * 0.38;
    }

    const toVec = (lat, lon) => {
        const la = rad(lat), lo = rad(lon);
        return [Math.cos(la) * Math.sin(lo), Math.sin(la), Math.cos(la) * Math.cos(lo)];
    };

    const cities = {
        hyd: [17.4, 78.5], blr: [13.0, 77.6], nyc: [40.7, -74.0], dal: [32.8, -96.8],
        lon: [51.5, -0.1], sin: [1.35, 103.8], tyo: [35.7, 139.7], syd: [-33.9, 151.2],
        fra: [50.1, 8.7], sao: [-23.5, -46.6], dxb: [25.2, 55.3], jnb: [-26.2, 28.0]
    };
    const nodes = Object.entries(cities).map(([k, [la, lo]]) => ({ key: k, v: toVec(la, lo) }));
    const pairs = [
        ['hyd', 'nyc'], ['hyd', 'dal'], ['hyd', 'lon'], ['hyd', 'sin'], ['hyd', 'dxb'],
        ['nyc', 'lon'], ['dal', 'sao'], ['sin', 'tyo'], ['sin', 'syd'], ['fra', 'dxb'], ['dxb', 'jnb']
    ];

    const arcs = pairs.map(([a, b], i) => {
        const A = toVec(...cities[a]), B = toVec(...cities[b]);
        const dot = Math.min(1, Math.max(-1, A[0]*B[0] + A[1]*B[1] + A[2]*B[2]));
        const w = Math.acos(dot), sw = Math.sin(w);
        const pts = [];
        for (let s = 0; s <= 40; s++) {
            const t = s / 40;
            const ka = Math.sin((1 - t) * w) / sw, kb = Math.sin(t * w) / sw;
            const lift = 1 + 0.22 * Math.sin(Math.PI * t) * (w / Math.PI + 0.25);
            pts.push([(A[0]*ka + B[0]*kb) * lift, (A[1]*ka + B[1]*kb) * lift, (A[2]*ka + B[2]*kb) * lift]);
        }
        return { pts, offset: i / pairs.length, speed: 0.00006 + (i % 3) * 0.00002 };
    });

    function grid(step) {
        const lines = [];
        for (let lat = -60; lat <= 60; lat += step) {
            const l = [];
            for (let lon = 0; lon <= 360; lon += 6) l.push(toVec(lat, lon));
            lines.push(l);
        }
        for (let lon = 0; lon < 360; lon += step) {
            const l = [];
            for (let lat = -90; lat <= 90; lat += 6) l.push(toVec(lat, lon));
            lines.push(l);
        }
        return lines;
    }
    const gridLines = grid(30);

    function project(v, yaw, k) {
        const cy = Math.cos(yaw), sy = Math.sin(yaw);
        const x1 = v[0] * cy + v[2] * sy;
        const z1 = -v[0] * sy + v[2] * cy;
        const ct = Math.cos(TILT), st = Math.sin(TILT);
        const y2 = v[1] * ct - z1 * st;
        const z2 = v[1] * st + z1 * ct;
        return [size / 2 + x1 * R * (k || 1), size / 2 - y2 * R * (k || 1), z2];
    }

    function draw(time) {
        const yaw = -time * 0.00011 + 3.2;
        g.clearRect(0, 0, size, size);

        const glow = g.createRadialGradient(size/2, size/2, R * 0.6, size/2, size/2, R * 1.25);
        glow.addColorStop(0, 'rgba(0, 212, 255, 0.06)');
        glow.addColorStop(1, 'rgba(0, 212, 255, 0)');
        g.fillStyle = glow;
        g.beginPath(); g.arc(size/2, size/2, R * 1.25, 0, Math.PI * 2); g.fill();

        g.strokeStyle = 'rgba(0, 212, 255, 0.35)';
        g.lineWidth = 1.2;
        g.beginPath(); g.arc(size/2, size/2, R, 0, Math.PI * 2); g.stroke();

        const front = new Path2D(), back = new Path2D();
        gridLines.forEach(line => {
            let prev = project(line[0], yaw);
            for (let i = 1; i < line.length; i++) {
                const cur = project(line[i], yaw);
                const path = (prev[2] + cur[2]) / 2 > 0 ? front : back;
                path.moveTo(prev[0], prev[1]);
                path.lineTo(cur[0], cur[1]);
                prev = cur;
            }
        });
        g.lineWidth = 0.8;
        g.strokeStyle = 'rgba(0, 212, 255, 0.07)';
        g.stroke(back);
        g.strokeStyle = 'rgba(0, 212, 255, 0.24)';
        g.stroke(front);

        const arcPath = new Path2D();
        arcs.forEach(a => {
            let prev = project(a.pts[0], yaw);
            for (let i = 1; i < a.pts.length; i++) {
                const cur = project(a.pts[i], yaw);
                if (prev[2] > -0.05 && cur[2] > -0.05) {
                    arcPath.moveTo(prev[0], prev[1]);
                    arcPath.lineTo(cur[0], cur[1]);
                }
                prev = cur;
            }
        });
        g.strokeStyle = 'rgba(167, 139, 250, 0.6)';
        g.lineWidth = 1.3;
        g.stroke(arcPath);

        arcs.forEach(a => {
            const t = (time * a.speed + a.offset) % 1;
            const idx = Math.floor(t * (a.pts.length - 1));
            const p = project(a.pts[idx], yaw);
            if (p[2] <= -0.05) return;
            g.fillStyle = '#00d4ff';
            g.shadowColor = '#00d4ff';
            g.shadowBlur = 10;
            g.beginPath(); g.arc(p[0], p[1], 2.6, 0, Math.PI * 2); g.fill();
            g.shadowBlur = 0;
        });

        nodes.forEach(n => {
            const p = project(n.v, yaw);
            if (p[2] <= 0) return;
            const home = n.key === 'hyd';
            if (home) {
                const pulse = (time % 2000) / 2000;
                g.strokeStyle = `rgba(0, 212, 255, ${0.7 * (1 - pulse)})`;
                g.lineWidth = 1.4;
                g.beginPath(); g.arc(p[0], p[1], 5 + pulse * 20, 0, Math.PI * 2); g.stroke();
            }
            g.fillStyle = home ? '#ffffff' : '#a78bfa';
            g.beginPath(); g.arc(p[0], p[1], home ? 4 : 2.6, 0, Math.PI * 2); g.fill();
        });
    }

    let running = false;
    function frame(t) {
        if (!running) return;
        draw(t);
        requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', () => { resize(); if (!running) draw(0); });

    if (reduceMotion) { draw(0); return; }

    new IntersectionObserver(([entry]) => {
        const visible = entry.isIntersecting;
        if (visible && !running) { running = true; requestAnimationFrame(frame); }
        else if (!visible) running = false;
    }).observe(document.getElementById('hero'));
})();
