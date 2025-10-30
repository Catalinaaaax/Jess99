// ===================================
// Mobile Menu Toggle
// ===================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a menu item
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    mobileMenuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

// ===================================
// Header Scroll Effect
// ===================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// ===================================
// Testimonials Carousel
// ===================================
const carousel = document.getElementById('testimonialsCarousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (carousel && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = carousel.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;
    
    // Function to get visible cards based on screen size
    function getVisibleCards() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }
    
    // Function to scroll to specific index
    function scrollToIndex(index) {
        const cardWidth = cards[0].offsetWidth;
        const gap = 16; // gap between cards
        const scrollAmount = (cardWidth + gap) * index;
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        currentIndex = Math.max(0, currentIndex - visibleCards);
        scrollToIndex(currentIndex);
    });
    
    // Next button
    nextBtn.addEventListener('click', () => {
        const visibleCards = getVisibleCards();
        const maxIndex = Math.max(0, totalCards - visibleCards);
        currentIndex = Math.min(maxIndex, currentIndex + visibleCards);
        scrollToIndex(currentIndex);
    });
    
    // Auto-scroll functionality (optional)
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            const visibleCards = getVisibleCards();
            const maxIndex = Math.max(0, totalCards - visibleCards);
            
            if (currentIndex >= maxIndex) {
                currentIndex = 0;
            } else {
                currentIndex++;
            }
            
            scrollToIndex(currentIndex);
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause auto-scroll on hover
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    
    // Update on window resize
    window.addEventListener('resize', () => {
        scrollToIndex(currentIndex);
    });
}

// ===================================
// Smooth Scroll for Navigation Links
// ===================================
document.querySelectorAll('a[href*="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        // Create a full URL object to easily parse it
        const url = new URL(href, window.location.href);

        // Check if the link's path is the same as the current page's path
        // and if it has a hash (e.g., #inicio)
        if (url.pathname === window.location.pathname && url.hash) {
            const targetId = url.hash.substring(1);
            const targetElement = document.getElementById(targetId);

            // If the target element exists on the page, perform smooth scroll
            if (targetElement) {
                e.preventDefault(); // Prevent the default browser jump
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            }
        } // If the link points to a different page, let the browser handle it normally.
    });
});

// ===================================
// User Type Selector
// ===================================
const userTypeToggles = document.querySelectorAll('.user-type-toggle'); // Both desktop and mobile

const ctaData = {
    persona: {
        text: 'Empieza ahora',
        href: 'https://wa.me/573197128435?text=Hola%20estoy%20interesado%20en%20personalizar%20un%20producto'
    },
    empresa: {
        text: 'Cotiza ahora',
        href: 'https://wa.me/573197128435?text=Hola%20Jess99,%20me%20gustaría%20solicitar%20una%20cotización%20empresarial.'
    }
};

function handleUserTypeChange(selectedType) {
    console.log(`Perfil seleccionado: ${selectedType}`);
    
    // 1. Update all toggle buttons
    userTypeToggles.forEach(toggle => {
        const buttons = toggle.querySelectorAll('.user-type-btn');
        buttons.forEach(button => {
            if (button.dataset.userType === selectedType) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    });
    
    // 2. Update CTA buttons
    const ctaHeaderBtn = document.getElementById('ctaHeaderBtn');
    const ctaMobileBtn = document.getElementById('ctaMobileBtn');
    if (ctaHeaderBtn && ctaMobileBtn && ctaData[selectedType]) {
        ctaHeaderBtn.textContent = ctaData[selectedType].text;
        ctaHeaderBtn.href = ctaData[selectedType].href;
        ctaMobileBtn.textContent = ctaData[selectedType].text;
        ctaMobileBtn.href = ctaData[selectedType].href;
    }
    
    // 3. Redirect if necessary
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isEmpresasPage = currentPath === 'empresas.html';

    if (selectedType === 'empresa' && !isEmpresasPage) {
        window.location.href = 'empresas.html';
    } else if (selectedType === 'persona' && isEmpresasPage) {
        window.location.href = 'index.html';
    }
}

userTypeToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        const button = e.target.closest('.user-type-btn');
        if (button) {
            handleUserTypeChange(button.dataset.userType);
        }
    });
});

// ===================================
// Initialize User Type on Page Load
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isEmpresasPage = currentPath === 'empresas.html';
    const userType = isEmpresasPage ? 'empresa' : 'persona';
    handleUserTypeChange(userType);
});

// ===================================
// Product Catalog Filtering
// ===================================
const productFilters = document.getElementById('productFilters');

if (productFilters) {
    const filterButtons = productFilters.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card[data-product-type]');
    const productCategories = document.querySelectorAll('.product-category'); // Keep this to hide empty categories

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Filter individual product cards
            productCards.forEach(card => {
                if (filter === 'all' || card.dataset.productType === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide category titles if they become empty
            productCategories.forEach(category => {
                const visibleProducts = category.querySelectorAll('.product-card[data-product-type][style*="display: block"]');
                if (visibleProducts.length > 0) {
                    category.style.display = 'block';
                } else {
                    category.style.display = 'none';
                }
            });
        });
    });
}

// ===================================
// Scroll Animations (Intersection Observer)
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.product-card, .testimonial-card, .stat-card, .benefit-item');
animateElements.forEach(el => observer.observe(el));

// ===================================
// CTA Button Handlers
// ===================================
const ctaButtons = document.querySelectorAll('.btn-primary:not(.mobile)');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Prevent default if it's inside a form
        if (!button.type || button.type !== 'submit') {
            const buttonText = button.textContent.trim();
            
            if (buttonText.includes('Empieza ahora') || buttonText.includes('Personalizar')) {
                console.log('Iniciando proceso de personalización...');
                // Here you would typically redirect to a customization page
                // window.location.href = '/personalizacion';
            } else if (buttonText.includes('cotización')) {
                console.log('Abriendo formulario de cotización...');
                // Here you would open a quote form modal
            } else if (buttonText.includes('asesor')) {
                console.log('Conectando con asesor...');
                // Here you would open a chat or contact form
            }
        }
    });
});

// ===================================
// Image Lazy Loading (for better performance)
// ===================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ===================================
// Performance: Debounce function
// ===================================
function debounce(func, wait) {
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

// Apply debounce to resize events
const debouncedResize = debounce(() => {
    console.log('Window resized');
    // Add any resize-specific logic here
}, 250);

window.addEventListener('resize', debouncedResize);

// ===================================
// JESS99 - Efectos Navideños
// ===================================

// ===================================
// Crear Banner Navideño (antes del header)
// ===================================
function createChristmasBanner() {
    const header = document.querySelector('header');
    if (!header) return;
    
    const banner = document.createElement('section');
    banner.className = 'christmas-banner';
    banner.innerHTML = `
        <div class="container">
            <div class="christmas-banner-content">
                <div class="christmas-banner-icon left">
                    <img src="IMG/Navidad/Arbol.png" alt="Árbol de Navidad">
                </div>
                <div class="christmas-banner-text">
                    <h2 class="christmas-banner-title">¡Llegó la Temporada Navideña!</h2>
                    <p class="christmas-banner-subtitle">Descuentos especiales en productos personalizados • Ideal para regalos corporativos</p>
                </div>
                <div class="christmas-banner-icon right">
                    <img src="IMG/Navidad/Regalos.png" alt="Regalos de Navidad">
                </div>
            </div>
        </div>
    `;
    
    // Insertar el banner DESPUÉS del header, asegurando que el header exista
    document.querySelector('header')?.insertAdjacentElement('afterend', banner);
    
    // Agregar evento al botón CTA
    const ctaButton = banner.querySelector('.christmas-banner-cta');
}

// ===================================
// Crear Bolas de Navidad en el Footer
// ===================================
function createChristmasOrnaments() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    const ornamentsContainer = document.createElement('div');
    ornamentsContainer.className = 'christmas-ornaments';
    
    const ornamentColors = ['red', 'green', 'gold', 'blue'];
    const ornamentCount = 12; // Fixed count for more consistent look
    
    for (let i = 0; i < ornamentCount; i++) {
        const ornament = document.createElement('div');
        ornament.className = `ornament ornament-${ornamentColors[i % ornamentColors.length]}`;
        
        // Posicionar las bolas aleatoriamente
        const leftPosition = (i * (100 / ornamentCount)) + (Math.random() * 5);
        ornament.style.left = `${leftPosition}%`;
        ornament.style.top = `${Math.random() * 30}px`;
        
        // Añadir variación en el tamaño
        const size = 30 + Math.random() * 20;
        ornament.style.width = `${size}px`;
        ornament.style.height = `${size}px`;
        
        // Añadir variación en la animación
        ornament.style.animationDelay = `${Math.random() * 2}s`;
        ornament.style.animationDuration = `${3 + Math.random() * 2}s`;
        
        ornamentsContainer.appendChild(ornament);
    }
    
    footer.insertBefore(ornamentsContainer, footer.firstChild);
}

// ===================================
// Efecto de Nieve Cayendo
// ===================================
function createSnowfall() {
    // Crear canvas para la nieve
    const canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas'; // Asegurarse de que el ID sea correcto
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    // Configurar tamaño del canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Crear copos de nieve
    const snowflakes = [];
    const maxSnowflakes = 50;
    // Paleta de colores navideños para los copos
    const snowColors = ['#FFFFFF', '#FFD700', '#C41E3A', '#00873E']; // Colores para la nieve
    const ornamentColors = ['#FFD700', '#C41E3A']; // Dorado y Rojo para las bolas

    
    class Snowflake {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.wind = Math.random() * 0.5 - 0.25;
            this.opacity = Math.random() * 0.5 + 0.3;

            // Decidir si es un copo de nieve o una bola decorativa
            if (Math.random() > 0.95) { // 5% de probabilidad de ser una bola
                this.type = 'ornament';
                this.radius = Math.random() * 15 + 20; // Más grandes: 20px a 35px
                this.speed = Math.random() * 1 + 0.8; // Un poco más rápidas
                this.color = ornamentColors[Math.floor(Math.random() * ornamentColors.length)];
                this.blur = Math.random() * 2 + 2; // Desenfoque para dar profundidad
            } else {
                this.type = 'snow';
                this.radius = Math.random() * 3 + 1; // Pequeños
                this.speed = Math.random() * 1 + 0.5;
                this.color = snowColors[Math.floor(Math.random() * snowColors.length)];
                this.blur = 0; // Sin desenfoque
            }
        }
        
        update() {
            this.y += this.speed;
            this.x += this.wind;
            
            // Reiniciar si sale de la pantalla
            if (this.y > canvas.height) {
                this.reset();
                this.y = 0;
            }
            
            if (this.x > canvas.width || this.x < 0) {
                this.x = Math.random() * canvas.width;
            }
        }
        
        draw() {
            ctx.beginPath();
            ctx.filter = `blur(${this.blur}px)`; // Aplicar desenfoque

            if (this.type === 'ornament') {
                // Crear un gradiente para dar efecto de esfera
                const gradient = ctx.createRadialGradient(this.x - this.radius * 0.3, this.y - this.radius * 0.3, this.radius * 0.1, this.x, this.y, this.radius);
                const lighterColor = hexToRgba('#FFFFFF', 0.7); // Un brillo blanco
                const mainColor = hexToRgba(this.color, this.opacity);
                gradient.addColorStop(0, lighterColor);
                gradient.addColorStop(1, mainColor);
                ctx.fillStyle = gradient;
            } else {
                ctx.fillStyle = hexToRgba(this.color, this.opacity);
            }

            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
            ctx.filter = 'none'; // Resetear el filtro para no afectar otros elementos
        }
    }
    
    // Inicializar copos de nieve
    for (let i = 0; i < maxSnowflakes; i++) {
        snowflakes.push(new Snowflake());
    }
    
    // Animar
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Helper para convertir HEX a RGBA (usado en la clase Snowflake)
function hexToRgba(hex, opacity) {
    let r = 0, g = 0, b = 0;
    // 3 digits
    if (hex.length == 4) {
        r = "0x" + hex[1] + hex[1];
        g = "0x" + hex[2] + hex[2];
        b = "0x" + hex[3] + hex[3];
    // 6 digits
    } else if (hex.length == 7) {
        r = "0x" + hex[1] + hex[2];
        g = "0x" + hex[3] + hex[4];
        b = "0x" + hex[5] + hex[6];
    }
    return `rgba(${+r},${+g},${+b},${opacity})`;
}

// Usar window.onload para asegurar que todo esté cargado, incluyendo el salto del ancla del navegador.
window.onload = function() {
    // Inicializar todos los efectos navideños aquí
    try {
        createSnowfall();
        createChristmasBanner();
        createChristmasOrnaments();

        // Mensaje de bienvenida en la consola
        console.log('%c🎄 ¡Bienvenido a Jess99! 🎨', 'color: #007BFF; font-size: 20px; font-weight: bold;');
        console.log('%cSitio web desarrollado con HTML, CSS y JavaScript vanilla', 'color: #6b7280; font-size: 12px;');
        console.log('%c❄️ Temporada navideña activada', 'color: #00873E; font-size: 14px; font-weight: bold;');

    } catch (error) {
        console.error("Error al inicializar los efectos navideños:", error);
    }
};

// Mantener el inicializador del tipo de usuario en DOMContentLoaded porque es una configuración inicial que no depende de otros elementos.
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isEmpresasPage = currentPath === 'empresas.html';
    const userType = isEmpresasPage ? 'empresa' : 'persona';
    handleUserTypeChange(userType);
});

// ===================================
// 🎄 EFECTO DE CURSOR MÁGICO NAVIDEÑO
// ===================================

class MagicCursor {
    constructor() {
        this.cursor = null;
        this.follower = null;
        this.glow = null;
        this.cursorPos = { x: -100, y: -100 };
        this.followerPos = { x: -100, y: -100 };
        this.init();
    }

    init() {
        // No ejecutar en dispositivos táctiles
        if ('ontouchstart' in window) {
            return;
        }

        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.follower = document.createElement('div');
        this.follower.className = 'cursor-follower';
        document.body.appendChild(this.follower);

        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        document.body.appendChild(this.glow);

        this.addEventListeners();
        this.animate();
    }

    addEventListeners() {
        document.addEventListener('mousemove', (e) => {
            this.cursorPos.x = e.clientX;
            this.cursorPos.y = e.clientY;
            
            if (Math.random() > 0.85) { // Reducir la frecuencia de partículas
                this.createParticle(e.clientX, e.clientY);
            }
        });

        document.addEventListener('mousedown', (e) => {
            this.cursor.classList.add('clicking');
            this.createRipple(e.clientX, e.clientY);
            this.createClickParticles(e.clientX, e.clientY);
        });

        document.addEventListener('mouseup', () => {
            this.cursor.classList.remove('clicking');
        });

        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
            this.follower.style.opacity = '0';
            this.glow.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
            this.follower.style.opacity = '1';
            this.glow.style.opacity = '0.5';
        });

        const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .filter-btn');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.follower.classList.add('hovering');
            });
            
            el.addEventListener('mouseleave', () => {
                this.follower.classList.remove('hovering');
            });
        });
    }

    createParticle(x, y) {
        const particles = ['❄️', '✨', '⭐', '🌟'];
        const particle = document.createElement('div');
        particle.className = 'cursor-particle';
        particle.textContent = particles[Math.floor(Math.random() * particles.length)];
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';

        const tx = (Math.random() - 0.5) * 80;
        const ty = (Math.random() - 0.5) * 80;

        document.body.appendChild(particle);

        particle.animate([
            { opacity: 1, transform: 'translate(0, 0) scale(1) rotate(0deg)' },
            { opacity: 0, transform: `translate(${tx}px, ${ty}px) scale(0.5) rotate(${Math.random() * 180 - 90}deg)` }
        ], {
            duration: 1200,
            easing: 'ease-out'
        });

        setTimeout(() => particle.remove(), 1200);
    }

    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        document.body.appendChild(ripple);

        ripple.animate([
            { width: '0px', height: '0px', opacity: 0.8 },
            { width: '80px', height: '80px', opacity: 0 }
        ], {
            duration: 600,
            easing: 'ease-out'
        });

        setTimeout(() => ripple.remove(), 600);
    }

    createClickParticles(x, y) {
        const particleCount = 10;
        const colors = ['#C41E3A', '#165B33', '#FFD700', '#FFFFFF']; // Rojo, Verde, Dorado, Blanco

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.borderRadius = '50%';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9998';

            document.body.appendChild(particle);

            const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
            const velocity = 40 + Math.random() * 40;
            const tx = Math.cos(angle) * velocity;
            const ty = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`, opacity: 0 }
            ], {
                duration: 800,
                easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            });

            setTimeout(() => particle.remove(), 800);
        }
    }

    animate() {
        this.followerPos.x += (this.cursorPos.x - this.followerPos.x) * 0.15;
        this.followerPos.y += (this.cursorPos.y - this.followerPos.y) * 0.15;

        this.cursor.style.left = this.cursorPos.x + 'px';
        this.cursor.style.top = this.cursorPos.y + 'px';

        this.follower.style.left = this.followerPos.x + 'px';
        this.follower.style.top = this.followerPos.y + 'px';

        this.glow.style.left = this.followerPos.x + 'px';
        this.glow.style.top = this.followerPos.y + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Inicializar el cursor mágico solo una vez.
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new MagicCursor());
} else {
    new MagicCursor();
}
