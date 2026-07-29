// Pricing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializePricingPage();
});

function initializePricingPage() {
    setupBillingToggle();
    setupFAQAccordion();
    setupPlanTracking();
    loadPricingData();
}

// Billing Toggle (Monthly/Yearly)
function setupBillingToggle() {
    const billingToggle = document.getElementById('billingToggle');
    
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            toggleBilling(this.checked);
        });
    }
}

function toggleBilling(isYearly) {
    const monthlyElements = document.querySelectorAll('.monthly-price, .monthly-period, .monthly-note');
    const yearlyElements = document.querySelectorAll('.yearly-price, .yearly-period, .yearly-note');
    
    if (isYearly) {
        monthlyElements.forEach(el => el.style.display = 'none');
        yearlyElements.forEach(el => el.style.display = 'inline');
    } else {
        monthlyElements.forEach(el => el.style.display = 'inline');
        yearlyElements.forEach(el => el.style.display = 'none');
    }
    
    // Track billing toggle
    trackInteraction('billing_toggle', isYearly ? 'yearly' : 'monthly');
}

// Plan Selection
function selectPlan(planType) {
    const billingToggle = document.getElementById('billingToggle');
    const isYearly = billingToggle ? billingToggle.checked : false;
    
    const planData = getPlanData(planType, isYearly);
    
    // Track plan selection
    trackInteraction('plan_select', planType, {
        billing: isYearly ? 'yearly' : 'monthly',
        price: planData.price
    });
    
    if (planType === 'free') {
        // Redirect to signup for free plan
        showAuthModal('signup');
    } else {
        // Show payment modal for paid plans
        showPaymentModal(planData);
    }
}

function getPlanData(planType, isYearly) {
    const plans = {
        free: {
            name: 'Free Starter',
            price: 0,
            period: 'month',
            features: ['1 Resume', '3 Basic Templates', 'PDF Export', 'Basic AI Suggestions', 'Email Support']
        },
        pro: {
            name: 'Pro',
            price: isYearly ? 374 : 499,
            period: isYearly ? 'month (billed yearly)' : 'month',
            originalPrice: isYearly ? 499 : null,
            savings: isYearly ? 1500 : null,
            features: ['5 Resumes', '15+ Professional Templates', 'All Export Formats', 'Unlimited AI Content', 'QR Code Generation', 'ATS Optimization', 'Priority Support']
        },
        premium: {
            name: 'Premium',
            price: isYearly ? 749 : 999,
            period: isYearly ? 'month (billed yearly)' : 'month',
            originalPrice: isYearly ? 999 : null,
            savings: isYearly ? 3000 : null,
            features: ['Unlimited Resumes', '50+ Premium Templates', 'Custom Branding', 'Advanced AI', 'Expert Review', 'LinkedIn Optimization', '24/7 Support']
        }
    };
    
    return plans[planType];
}

// Payment Modal
function showPaymentModal(planData) {
    const modal = document.getElementById('paymentModal');
    const planName = document.getElementById('selectedPlanName');
    const planPrice = document.getElementById('selectedPlanPrice');
    const planPeriod = document.getElementById('selectedPlanPeriod');
    
    if (planName) planName.textContent = planData.name + ' Plan';
    if (planPrice) planPrice.textContent = '₹' + planData.price;
    if (planPeriod) planPeriod.textContent = '/' + planData.period;
    
    modal.style.display = 'block';
    
    // Track payment modal open
    trackInteraction('payment_modal_open', planData.name);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Payment Processing
function processPayment(paymentMethod) {
    // Track payment method selection
    trackInteraction('payment_method_select', paymentMethod);
    
    // Show loading state
    showPaymentLoading();
    
    // Simulate payment processing
    setTimeout(() => {
        // In a real implementation, this would integrate with actual payment gateways
        processPaymentMethod(paymentMethod);
    }, 1000);
}

function processPaymentMethod(method) {
    const paymentHandlers = {
        'googlepay': () => initiateGooglePay(),
        'paytm': () => initiatePaytm(),
        'phonepe': () => initiatePhonePe(),
        'card': () => showCardForm(),
        'netbanking': () => showNetBankingOptions(),
        'paypal': () => initiatePayPal(),
        'stripe': () => initiateStripe()
    };
    
    const handler = paymentHandlers[method];
    if (handler) {
        handler();
    } else {
        showPaymentError('Payment method not supported yet');
    }
}

// Payment Gateway Integrations
function initiateGooglePay() {
    // Google Pay integration
    if (window.google && window.google.payments) {
        // Real Google Pay implementation would go here
        simulatePaymentSuccess('Google Pay');
    } else {
        // Fallback for demo
        alert('Google Pay integration would be implemented here');
        simulatePaymentSuccess('Google Pay');
    }
}

function initiatePaytm() {
    // Paytm integration
    alert('Redirecting to Paytm payment gateway...');
    simulatePaymentSuccess('Paytm');
}

function initiatePhonePe() {
    // PhonePe integration
    alert('Redirecting to PhonePe payment gateway...');
    simulatePaymentSuccess('PhonePe');
}

function showCardForm() {
    // Show credit/debit card form
    const cardFormHTML = `
        <div class="card-form">
            <h3>Enter Card Details</h3>
            <form id="cardPaymentForm">
                <div class="form-group">
                    <label>Card Number</label>
                    <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" id="cardNumber">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" maxlength="5" id="expiryDate">
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" maxlength="3" id="cvv">
                    </div>
                </div>
                <div class="form-group">
                    <label>Cardholder Name</label>
                    <input type="text" placeholder="John Doe" id="cardholderName">
                </div>
                <button type="submit" class="pay-btn">Pay Now</button>
            </form>
        </div>
    `;
    
    const modalBody = document.querySelector('#paymentModal .modal-body');
    modalBody.innerHTML = cardFormHTML;
    
    // Setup card form handlers
    setupCardForm();
}

function setupCardForm() {
    const form = document.getElementById('cardPaymentForm');
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    
    // Format card number
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.replace(/(.{4})/g, '$1 ').trim();
        e.target.value = formattedValue;
    });
    
    // Format expiry date
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        simulatePaymentSuccess('Credit/Debit Card');
    });
}

function showNetBankingOptions() {
    const banks = [
        'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank',
        'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank'
    ];
    
    const bankOptionsHTML = `
        <div class="netbanking-options">
            <h3>Select Your Bank</h3>
            <div class="bank-grid">
                ${banks.map(bank => `
                    <button class="bank-option" onclick="selectBank('${bank}')">
                        ${bank}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
    
    const modalBody = document.querySelector('#paymentModal .modal-body');
    modalBody.innerHTML = bankOptionsHTML;
}

function selectBank(bankName) {
    alert(`Redirecting to ${bankName} net banking...`);
    simulatePaymentSuccess('Net Banking - ' + bankName);
}

function initiatePayPal() {
    // PayPal integration
    alert('Redirecting to PayPal...');
    simulatePaymentSuccess('PayPal');
}

function initiateStripe() {
    // Stripe integration
    alert('Processing with Stripe...');
    simulatePaymentSuccess('Stripe');
}

// Payment States
function showPaymentLoading() {
    const modalBody = document.querySelector('#paymentModal .modal-body');
    modalBody.innerHTML = `
        <div class="payment-loading">
            <div class="loading-spinner"></div>
            <h3>Processing Payment...</h3>
            <p>Please wait while we process your payment securely.</p>
        </div>
    `;
}

function simulatePaymentSuccess(method) {
    setTimeout(() => {
        const modalBody = document.querySelector('#paymentModal .modal-body');
        modalBody.innerHTML = `
            <div class="payment-success">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Payment Successful!</h3>
                <p>Your subscription has been activated successfully.</p>
                <p><strong>Payment Method:</strong> ${method}</p>
                <p><strong>Transaction ID:</strong> ${generateTransactionId()}</p>
                <button class="btn-primary" onclick="closeModal('paymentModal'); window.location.href='index.html';">
                    Continue to Dashboard
                </button>
            </div>
        `;
        
        // Track successful payment
        trackInteraction('payment_success', method);
    }, 2000);
}

function showPaymentError(message) {
    const modalBody = document.querySelector('#paymentModal .modal-body');
    modalBody.innerHTML = `
        <div class="payment-error">
            <div class="error-icon">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3>Payment Failed</h3>
            <p>${message}</p>
            <button class="btn-secondary" onclick="location.reload()">Try Again</button>
        </div>
    `;
}

function generateTransactionId() {
    return 'TXN' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 4).toUpperCase();
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
                trackInteraction('faq_open', 'pricing_faq', { question: questionText });
            }
        });
    });
}

// Plan Tracking
function setupPlanTracking() {
    // Track plan card hovers
    const planCards = document.querySelectorAll('.plan-card');
    planCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const planType = this.classList.contains('free-plan') ? 'free' :
                           this.classList.contains('pro-plan') ? 'pro' : 'premium';
            trackInteraction('plan_hover', planType);
        });
    });
    
    // Track feature comparisons
    const comparisonTable = document.querySelector('.comparison-table');
    if (comparisonTable) {
        comparisonTable.addEventListener('click', function() {
            trackInteraction('comparison_table_view', 'features');
        });
    }
}

// Load Pricing Data
async function loadPricingData() {
    try {
        // In a real implementation, this would fetch current pricing from the backend
        const response = await fetch('/api/pricing/plans');
        if (response.ok) {
            const data = await response.json();
            updatePricingDisplay(data);
        }
    } catch (error) {
        console.log('Using default pricing data');
    }
}

function updatePricingDisplay(pricingData) {
    // Update pricing display with backend data
    if (pricingData && pricingData.plans) {
        // Update plan prices, features, etc.
        console.log('Pricing data loaded:', pricingData);
    }
}

// Analytics Tracking
function trackInteraction(action, element, data = {}) {
    fetch('/api/index/track-interaction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: action,
            element: element,
            page: 'pricing',
            data: data,
            timestamp: new Date().toISOString()
        })
    }).catch(error => {
        console.log('Analytics tracking failed:', error);
    });
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

// Page Load Analytics
window.addEventListener('load', function() {
    trackInteraction('page_load', 'pricing_page', {
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    });
});

// Add CSS for payment modal states
const style = document.createElement('style');
style.textContent = `
    .payment-loading,
    .payment-success,
    .payment-error {
        text-align: center;
        padding: 2rem;
    }
    
    .loading-spinner {
        width: 50px;
        height: 50px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 1rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .success-icon i {
        font-size: 4rem;
        color: #28a745;
        margin-bottom: 1rem;
    }
    
    .error-icon i {
        font-size: 4rem;
        color: #dc3545;
        margin-bottom: 1rem;
    }
    
    .card-form {
        padding: 1rem;
    }
    
    .card-form .form-group {
        margin-bottom: 1rem;
    }
    
    .card-form .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
    }
    
    .card-form label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: #333;
    }
    
    .card-form input {
        width: 100%;
        padding: 12px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .card-form input:focus {
        outline: none;
        border-color: #667eea;
    }
    
    .pay-btn {
        width: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 1rem;
    }
    
    .pay-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
    }
    
    .netbanking-options {
        padding: 1rem;
    }
    
    .bank-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        margin-top: 1rem;
    }
    
    .bank-option {
        padding: 12px 16px;
        border: 2px solid #e1e5e9;
        border-radius: 8px;
        background: white;
        cursor: pointer;
        transition: all 0.3s ease;
        font-weight: 500;
    }
    
    .bank-option:hover {
        border-color: #667eea;
        background: rgba(102, 126, 234, 0.05);
    }
    
    .btn-primary {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-secondary {
        background: #6c757d;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .btn-primary:hover,
    .btn-secondary:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    }
`;
document.head.appendChild(style);