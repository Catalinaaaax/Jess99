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
// Console Welcome Message
// ===================================
console.log('%c¡Bienvenido a Jess99! 🎨', 'color: #007BFF; font-size: 20px; font-weight: bold;');
console.log('%cSitio web desarrollado con HTML, CSS y JavaScript vanilla', 'color: #6b7280; font-size: 12px;');
