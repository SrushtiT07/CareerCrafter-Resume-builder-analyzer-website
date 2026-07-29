// AI Resume Builder - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!nav.contains(event.target) && !menuToggle.contains(event.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
        }
    });
    
    // Dynamic Background Elements
    createBackgroundElements();
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .hero-content, .footer-section, .template-card, .pricing-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Add animation class to CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-card, .hero-content, .footer-section, .template-card, .pricing-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animated, .hero-content.animated, .footer-section.animated, 
        .template-card.animated, .pricing-card.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hero-content {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(2), .template-card:nth-child(2), .pricing-card:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .feature-card:nth-child(3), .template-card:nth-child(3), .pricing-card:nth-child(3) {
            transition-delay: 0.4s;
        }
        
        .feature-card:nth-child(4) {
            transition-delay: 0.6s;
        }
        
        .feature-card:nth-child(5) {
            transition-delay: 0.8s;
        }
        
        .feature-card:nth-child(6) {
            transition-delay: 1s;
        }
        
        .footer-section:nth-child(2) {
            transition-delay: 0.2s;
        }
        
        .footer-section:nth-child(3) {
            transition-delay: 0.4s;
        }
    `;
    document.head.appendChild(style);
    
    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Create dynamic background elements
    function createBackgroundElements() {
        const backgroundAnimation = document.querySelector('.background-animation');
        
        if (!backgroundAnimation) return;
        
        // Create floating shapes
        for (let i = 0; i < 15; i++) {
            const shape = document.createElement('div');
            shape.classList.add('bg-shape');
            
            // Random size between 10px and 60px
            const size = Math.random() * 50 + 10;
            shape.style.width = `${size}px`;
            shape.style.height = `${size}px`;
            
            // Random position
            shape.style.left = `${Math.random() * 100}%`;
            shape.style.top = `${Math.random() * 100}%`;
            
            // Random shape (circle or square)
            shape.style.borderRadius = Math.random() > 0.5 ? '50%' : `${Math.random() * 30}%`;
            
            // Random color
            const hue = Math.random() * 360;
            shape.style.backgroundColor = `hsla(${hue}, 70%, 70%, 0.1)`;
            
            // Random animation duration
            const duration = Math.random() * 20 + 10;
            shape.style.animation = `float ${duration}s ease-in-out infinite`;
            shape.style.animationDelay = `${Math.random() * 5}s`;
            
            backgroundAnimation.appendChild(shape);
        }
        
        // Add CSS for the shapes
        const shapeStyle = document.createElement('style');
        shapeStyle.innerHTML = `
            .bg-shape {
                position: absolute;
                pointer-events: none;
                z-index: -1;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            }
        `;
        document.head.appendChild(shapeStyle);
    }
    
    // Add parallax effect to background
    window.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        const bgShapes = document.querySelectorAll('.bg-shape');
        const heroElements = document.querySelectorAll('.floating-element');
        
        bgShapes.forEach(shape => {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        heroElements.forEach((elem, index) => {
            const factor = (index + 1) * 5;
            const moveX = (mouseX - 0.5) * factor;
            const moveY = (mouseY - 0.5) * factor;
            elem.style.transform = `translate(${moveX}px, ${moveY}px) translateY(0) rotate(0deg)`;
        });
    });
    
    // Template selection functionality
    document.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', function() {
            const templateType = this.dataset.template;
            openTemplateDetails(templateType);
        });
    });
    
    // Pricing plan selection
    document.querySelectorAll('.pricing-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent.toLowerCase();
            selectPlan(plan);
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Template selection function
function selectTemplate(templateType) {
    if (!window.auth || !window.auth.currentUser) {
        window.auth.showAuthModal('signup');
        return;
    }
    
    // Store selected template
    localStorage.setItem('selectedTemplate', templateType);
    
    // Show success message
    window.auth.showSuccessMessage(`${templateType.charAt(0).toUpperCase() + templateType.slice(1)} template selected!`);
    
    // Open resume builder
    setTimeout(() => {
        window.auth.showResumeBuilder();
    }, 1000);
}

// Plan selection function
function selectPlan(plan) {
    if (plan === 'free') {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showAuthModal('signup');
        } else {
            window.auth.showResumeBuilder();
        }
    } else if (plan === 'pro') {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showAuthModal('signup');
        } else {
            // Simulate upgrade process
            window.auth.showInfoMessage('Pro plan upgrade coming soon! Enjoy free features for now.');
            setTimeout(() => {
                window.auth.showResumeBuilder();
            }, 2000);
        }
    } else if (plan === 'enterprise') {
        window.auth.showInfoMessage('Please contact our sales team for Enterprise plans.');
    }
}

// Add scroll-based header styling
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.9)';
        header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.05)';
    }
});

// Open feature details page
function openFeatureDetails(featureId) {
    window.location.href = `feature-details.html?feature=${featureId}`;
}

// Open template details page
function openTemplateDetails(templateId) {
    window.location.href = `template-details.html?template=${templateId}`;
}