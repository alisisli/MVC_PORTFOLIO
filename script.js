/* ============================================
   JAVASCRIPT - Interactive Features
   ============================================ */

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-header');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                setTimeout(updateCounter, 30);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Trigger counter animation when stats section comes into view
            if (entry.target.classList.contains('stats-section')) {
                animateCounters();
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.about-content, .product-card, .feature-card, .article-card').forEach(el => {
    observer.observe(el);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// About Stats Number Animation
function animateAboutStats() {
    const statNumbers = document.querySelectorAll('.about-stats .stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-value'));
        let current = 0;
        const increment = target / 30;
        
        const updateStat = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current);
                setTimeout(updateStat, 30);
            } else {
                stat.textContent = target;
            }
        };
        
        // Start animation when element comes into view
        const statObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateStat();
                    statObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        statObserver.observe(stat);
    });
}

// Initialize about stats animation
animateAboutStats();

// Add scroll animation class to elements
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
});

// Mobile menu toggle
const navbarToggler = document.querySelector('.navbar-toggler');
const navbarCollapse = document.querySelector('.navbar-collapse');

document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', () => {
        if (navbarToggler.offsetParent !== null) {
            navbarToggler.click();
        }
    });
});

// Lazy load images
if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Gallery lightbox functionality
document.querySelectorAll('.gallery-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const galleryItem = this.closest('.gallery-item');
        const backgroundImage = window.getComputedStyle(galleryItem).backgroundImage;
        
        // Create lightbox
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        const img = document.createElement('img');
        const imageUrl = backgroundImage.slice(5, -2);
        img.src = imageUrl;
        img.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 8px;
        `;
        
        lightbox.appendChild(img);
        document.body.appendChild(lightbox);
        
        // Close lightbox
        lightbox.addEventListener('click', () => {
            lightbox.remove();
        });
    });
});

// Form submission simulation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you! We will contact you soon.');
        this.reset();
    });
});

// Add active state to navigation
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200 && window.pageYOffset < sectionTop + sectionHeight) {
            const sectionId = section.getAttribute('id');
            document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Parallax effect for background images
window.addEventListener('scroll', function() {
    const parallaxElements = document.querySelectorAll('[style*="background-image"]');
    
    parallaxElements.forEach(element => {
        if (element.style.backgroundAttachment === 'fixed') {
            const scrollPosition = window.pageYOffset;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            
            element.style.backgroundPosition = `center ${distance * 0.5}px`;
        }
    });
});

// Intersection Observer for fade-in animations
const fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe product cards and other elements
document.querySelectorAll('.product-card, .feature-card, .article-card, .process-stage').forEach(el => {
    el.style.opacity = '0';
    fadeInObserver.observe(el);
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        if (!this.style.position || this.style.position === 'static') {
            this.style.position = 'relative';
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add smooth scrolling behavior
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const element = document.querySelector(href);
                const offsetTop = element.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Performance optimization - Debounce scroll events
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

// Optimize scroll events
window.addEventListener('scroll', debounce(function() {
    // Add your scroll-based logic here
}, 100));

// Add page load animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Set initial body opacity
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.3s ease';

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page
    document.body.style.opacity = '1';
    
    // Add animation delays to elements
    const animatedElements = document.querySelectorAll('[data-delay]');
    animatedElements.forEach((el, index) => {
        const delay = el.getAttribute('data-delay');
        el.style.animationDelay = `${delay}ms`;
    });
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-enabled');
}

// Accessibility - Add focus styles
document.querySelectorAll('button, a, input, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = `2px solid var(--primary-color)`;
        this.style.outlineOffset = '2px';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

console.log('Premium Flour Manufacturing - Website initialized');
