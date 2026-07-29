// Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
});

function initializeContactPage() {
    setupFormHandlers();
    setupFAQAccordion();
    setupCharacterCounter();
    setupFormValidation();
}

// Form Handlers
function setupFormHandlers() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Show loading state
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    try {
        // Send form data to backend
        const response = await fetch('/api/contact/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            // Show success modal
            showSuccessModal(result.referenceId);
            form.reset();
            
            // Track successful form submission
            trackInteraction('form_submit', 'contact_form', {
                subject: data.subject,
                priority: data.priority
            });
        } else {
            throw new Error(result.error || 'Failed to send message');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        showErrorMessage('Failed to send message. Please try again or contact us directly.');
    } finally {
        // Reset button state
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
}

function showSuccessModal(referenceId) {
    const modal = document.getElementById('successModal');
    const referenceElement = document.getElementById('referenceId');
    
    if (referenceElement) {
        referenceElement.textContent = referenceId || generateReferenceId();
    }
    
    modal.style.display = 'block';
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        closeModal('successModal');
    }, 5000);
}

function generateReferenceId() {
    return 'CC-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substr(2, 4).toUpperCase();
}

function showErrorMessage(message) {
    // Create and show error notification
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-notification';
    errorDiv.innerHTML = `
        <div class="error-content">
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(errorDiv);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentElement) {
            errorDiv.remove();
        }
    }, 5000);
}

// FAQ Accordion
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                
                // Track FAQ interaction
                const questionText = question.querySelector('h3').textContent;
                trackInteraction('faq_open', 'faq_item', { question: questionText });
            }
        });
    });
}

// Character Counter
function setupCharacterCounter() {
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', function() {
            const currentLength = this.value.length;
            const maxLength = 1000;
            
            charCount.textContent = currentLength;
            
            // Change color based on character count
            if (currentLength > maxLength * 0.9) {
                charCount.style.color = '#dc3545';
            } else if (currentLength > maxLength * 0.7) {
                charCount.style.color = '#ffc107';
            } else {
                charCount.style.color = '#6c757d';
            }
            
            // Prevent exceeding max length
            if (currentLength > maxLength) {
                this.value = this.value.substring(0, maxLength);
                charCount.textContent = maxLength;
            }
        });
    }
}

// Form Validation
function setupFormValidation() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error
    clearFieldError(e);
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    if (!isValid) {
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    field.classList.add('error');
    
    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    
    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('error');
    
    // Remove error message
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Live Chat Function
function openLiveChat() {
    // Track live chat interaction
    trackInteraction('live_chat_open', 'chat_button');
    
    // In a real implementation, this would open your live chat widget
    // For demo purposes, we'll show an alert
    alert('Live chat feature would open here. For now, please use email or phone support.');
    
    // Example integration with popular chat services:
    // Intercom: Intercom('show');
    // Zendesk: zE('webWidget', 'open');
    // Freshchat: fcWidget.open();
}

// Modal Functions
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Click outside modal to close
window.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Analytics Tracking
function trackInteraction(action, element, data = {}) {
    // Track user interactions for analytics
    fetch('/api/index/track-interaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: action,
            element: element,
            page: 'contact',
            data: data,
            timestamp: new Date().toISOString()
        })
    }).catch(error => {
        console.log('Analytics tracking failed:', error);
    });
}

// Contact Method Tracking
document.addEventListener('click', function(e) {
    // Track contact method clicks
    if (e.target.closest('.method-card')) {
        const methodCard = e.target.closest('.method-card');
        const methodType = methodCard.querySelector('h3').textContent.toLowerCase().replace(' ', '_');
        trackInteraction('contact_method_click', methodType);
    }
    
    // Track social media clicks
    if (e.target.closest('.social-link')) {
        const socialLink = e.target.closest('.social-link');
        const platform = Array.from(socialLink.classList).find(cls => 
            ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'].includes(cls)
        );
        trackInteraction('social_click', platform);
    }
    
    // Track FAQ link clicks
    if (e.target.closest('.faq-link')) {
        const linkText = e.target.closest('.faq-link').textContent.trim();
        trackInteraction('faq_link_click', 'help_resource', { resource: linkText });
    }
});

// Form Field Focus Tracking
document.addEventListener('focus', function(e) {
    if (e.target.closest('#contactForm')) {
        const fieldName = e.target.name || e.target.id;
        if (fieldName) {
            trackInteraction('form_field_focus', fieldName);
        }
    }
}, true);

// Page Load Analytics
window.addEventListener('load', function() {
    trackInteraction('page_load', 'contact_page', {
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    });
});

// Add CSS for error states and notifications
const style = document.createElement('style');
style.textContent = `
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: #dc3545;
        background-color: #fff5f5;
    }
    
    .field-error {
        color: #dc3545;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }
    
    .field-error::before {
        content: '⚠';
        font-size: 0.75rem;
    }
    
    .error-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1001;
        background: #dc3545;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    }
    
    .error-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .error-content button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        margin-left: auto;
    }
    
    .error-content button:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);