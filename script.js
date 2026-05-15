/* ============================================
   CHARITRA - CUSTOM DESIGNER CLOTHING
   Interactive JavaScript Features
   ============================================ */

console.log('🧵 Welcome to Charitra - Custom Designer Handmade Clothing');

// ============================================
// SMOOTH SCROLLING & NAVIGATION
// ============================================

/**
 * Scroll to a specific section smoothly
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        console.log(`📍 Scrolled to section: ${sectionId}`);
    }
}

/**
 * Active navigation link highlighting on scroll
 */
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Initialize animations on page load
    initializeAnimations();
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

/**
 * Handle contact form submission
 */
function handleFormSubmit(event) {
    event.preventDefault();
    console.log('📝 Form submission initiated');

    // Get form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const type = document.getElementById('type').value;
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!validateForm(name, email, message)) {
        console.warn('⚠️ Form validation failed');
        return;
    }

    // Create form data
    const formData = {
        name: name,
        email: email,
        phone: phone || 'Not provided',
        designType: type,
        message: message,
        timestamp: new Date().toLocaleString()
    };

    // Log form data (In real scenario, send to backend)
    console.log('✅ Form submitted successfully:', formData);
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('🎨 Design Type:', type);

    // Show success message
    showSuccessMessage('Thank you! Your inquiry has been received. We\'ll contact you soon!');

    // Reset form
    document.querySelector('form').reset();

    // Here you would typically send data to a backend server
    // Example: sendFormToBackend(formData);
}

/**
 * Validate form inputs
 */
function validateForm(name, email, message) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.length < 2) {
        showErrorMessage('Please enter a valid name (at least 2 characters)');
        return false;
    }

    if (!emailRegex.test(email)) {
        showErrorMessage('Please enter a valid email address');
        return false;
    }

    if (message.length < 10) {
        showErrorMessage('Please enter a message with at least 10 characters');
        return false;
    }

    return true;
}

/**
 * Show success message
 */
function showSuccessMessage(message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);

    console.log('✅ ' + message);
}

/**
 * Show error message
 */
function showErrorMessage(message) {
    const alertBox = document.createElement('div');
    alertBox.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 20px 30px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
        animation: slideInRight 0.5s ease;
    `;
    alertBox.textContent = message;
    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);

    console.error('❌ ' + message);
}

// ============================================
// ANIMATIONS & SCROLL EFFECTS
// ============================================

/**
 * Initialize scroll animations using Intersection Observer
 */
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all cards and steps
    const cards = document.querySelectorAll('.collection-card, .process-step, .about-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    console.log('🎬 Animations initialized');
}

/**
 * Add CSS animations dynamically
 */
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .active {
            color: #C4A747 !important;
        }

        .active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Format date to readable format
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Log page analytics (for tracking)
 */
function logPageView() {
    console.log('📊 Page Analytics');
    console.log('URL:', window.location.href);
    console.log('User Agent:', navigator.userAgent);
    console.log('Timestamp:', new Date().toLocaleString());
}

/**
 * Track button clicks
 */
function trackButtonClick(buttonText) {
    console.log('🖱️ Button clicked:', buttonText);
}

// ============================================
// INITIALIZATION
// ============================================

// Add animation styles on page load
document.addEventListener('DOMContentLoaded', function() {
    addAnimationStyles();
    logPageView();
    console.log('✨ Charitra website fully loaded and ready!');
});

// Track CTA button clicks
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            trackButtonClick(this.textContent);
        });
    });
});

// ============================================
// EXPORT FUNCTIONS (for reuse)
// ============================================
window.scrollToSection = scrollToSection;
window.handleFormSubmit = handleFormSubmit;
window.trackButtonClick = trackButtonClick;

console.log('✅ All scripts loaded successfully!');
