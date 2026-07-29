// Template Details Page JavaScript

// Template data with detailed information
const templateData = {
    'modern': {
        title: 'Modern Professional',
        subtitle: 'Perfect for tech and creative industries',
        category: 'Professional Template',
        features: [
            { icon: 'fas fa-check', text: 'ATS Optimized' },
            { icon: 'fas fa-check', text: 'Modern Design' },
            { icon: 'fas fa-check', text: 'Easy Customization' }
        ],
        designFeatures: [
            'Clean, minimalist layout with plenty of white space',
            'Modern typography with professional font combinations',
            'Strategic use of color accents to highlight key information',
            'Responsive design that looks great on all devices',
            'Professional icons and visual elements',
            'Optimized for both digital and print formats'
        ],
        bestFor: [
            'Software developers and engineers',
            'UX/UI designers and creative professionals',
            'Digital marketing specialists',
            'Startup employees and entrepreneurs',
            'Tech industry professionals',
            'Recent graduates entering tech fields'
        ],
        customizationOptions: [
            'Multiple color scheme options',
            'Flexible section arrangements',
            'Custom font selections',
            'Adjustable spacing and margins',
            'Optional photo placement',
            'Personalized accent colors'
        ],
        specifications: {
            'File Formats': 'PDF, DOCX, PNG, HTML',
            'Page Layout': 'Single page, optimized layout',
            'Color Schemes': '8 professional variations',
            'Font Options': '5 modern font combinations',
            'ATS Score': '98% compatibility rate',
            'Print Quality': '300 DPI, print-ready'
        },
        usageCount: '2.5K+',
        rating: '4.8',
        successRate: '95%',
        colorVariations: [
            { name: 'Ocean Blue', primary: '#2563eb', secondary: '#1e40af', description: 'Professional and trustworthy' },
            { name: 'Forest Green', primary: '#059669', secondary: '#047857', description: 'Growth and stability' },
            { name: 'Sunset Orange', primary: '#ea580c', secondary: '#c2410c', description: 'Creative and energetic' },
            { name: 'Royal Purple', primary: '#7c3aed', secondary: '#6d28d9', description: 'Innovative and bold' },
            { name: 'Charcoal Gray', primary: '#374151', secondary: '#1f2937', description: 'Classic and timeless' }
        ]
    },
    'classic': {
        title: 'Classic Executive',
        subtitle: 'Ideal for corporate and finance roles',
        category: 'Executive Template',
        features: [
            { icon: 'fas fa-check', text: 'Corporate Design' },
            { icon: 'fas fa-check', text: 'Traditional Layout' },
            { icon: 'fas fa-check', text: 'Professional Appeal' }
        ],
        designFeatures: [
            'Traditional, formal layout with structured sections',
            'Conservative typography with serif font options',
            'Subtle design elements that convey professionalism',
            'Emphasis on content hierarchy and readability',
            'Classic color palette with neutral tones',
            'Time-tested format preferred by traditional industries'
        ],
        bestFor: [
            'C-level executives and senior management',
            'Finance and banking professionals',
            'Legal and consulting professionals',
            'Government and public sector roles',
            'Traditional corporate environments',
            'Experienced professionals with extensive backgrounds'
        ],
        customizationOptions: [
            'Conservative color palette options',
            'Traditional font selections',
            'Formal section arrangements',
            'Professional header styles',
            'Classic bullet point styles',
            'Elegant border and line options'
        ],
        specifications: {
            'File Formats': 'PDF, DOCX, PNG',
            'Page Layout': 'Traditional single/multi-page',
            'Color Schemes': '6 conservative variations',
            'Font Options': '4 classic font combinations',
            'ATS Score': '96% compatibility rate',
            'Print Quality': '300 DPI, premium quality'
        },
        usageCount: '1.8K+',
        rating: '4.7',
        successRate: '92%',
        colorVariations: [
            { name: 'Navy Blue', primary: '#1e3a8a', secondary: '#1e40af', description: 'Trustworthy and professional' },
            { name: 'Deep Green', primary: '#166534', secondary: '#15803d', description: 'Stable and reliable' },
            { name: 'Burgundy Red', primary: '#991b1b', secondary: '#b91c1c', description: 'Sophisticated and bold' },
            { name: 'Slate Gray', primary: '#475569', secondary: '#334155', description: 'Neutral and versatile' },
            { name: 'Classic Black', primary: '#1f2937', secondary: '#111827', description: 'Timeless and elegant' }
        ]
    },
    'creative': {
        title: 'Creative Portfolio',
        subtitle: 'Great for designers and artists',
        category: 'Creative Template',
        features: [
            { icon: 'fas fa-check', text: 'Visual Impact' },
            { icon: 'fas fa-check', text: 'Creative Layout' },
            { icon: 'fas fa-check', text: 'Portfolio Ready' }
        ],
        designFeatures: [
            'Bold, eye-catching design with creative elements',
            'Flexible layout accommodating portfolio pieces',
            'Vibrant color schemes and modern typography',
            'Visual hierarchy emphasizing creative work',
            'Unique design elements and custom graphics',
            'Space for showcasing visual projects and achievements'
        ],
        bestFor: [
            'Graphic designers and visual artists',
            'Photographers and videographers',
            'Creative directors and art directors',
            'Freelance creatives and consultants',
            'Marketing and advertising professionals',
            'Creative industry newcomers and students'
        ],
        customizationOptions: [
            'Vibrant color palette selections',
            'Creative font combinations',
            'Flexible portfolio sections',
            'Custom graphic elements',
            'Artistic border and frame options',
            'Creative layout arrangements'
        ],
        specifications: {
            'File Formats': 'PDF, PNG, HTML, PSD',
            'Page Layout': 'Creative multi-section design',
            'Color Schemes': '10 vibrant variations',
            'Font Options': '6 creative font combinations',
            'ATS Score': '89% compatibility rate',
            'Print Quality': '300 DPI, high-quality output'
        },
        usageCount: '3.2K+',
        rating: '4.9',
        successRate: '88%',
        colorVariations: [
            { name: 'Electric Blue', primary: '#3b82f6', secondary: '#2563eb', description: 'Dynamic and modern' },
            { name: 'Vibrant Pink', primary: '#ec4899', secondary: '#db2777', description: 'Bold and creative' },
            { name: 'Lime Green', primary: '#65a30d', secondary: '#4d7c0f', description: 'Fresh and energetic' },
            { name: 'Sunset Yellow', primary: '#f59e0b', secondary: '#d97706', description: 'Warm and inviting' },
            { name: 'Purple Gradient', primary: '#8b5cf6', secondary: '#7c3aed', description: 'Artistic and unique' }
        ]
    }
};

// Similar templates mapping
const similarTemplates = {
    'modern': ['creative', 'classic'],
    'classic': ['modern', 'creative'],
    'creative': ['modern', 'classic']
};

// Current template state
let currentTemplate = 'modern';
let currentColorScheme = 0;
let currentFontStyle = 0;
let currentLayoutStyle = 0;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('template') || 'modern';
    
    currentTemplate = templateId;
    loadTemplateContent(templateId);
    initializeAnimations();
    createBackgroundElements();
    initializeCustomizer();
});

// Load template content dynamically
function loadTemplateContent(templateId) {
    const template = templateData[templateId];
    if (!template) return;

    // Update page title and meta
    document.title = `${template.title} - CareerCrafter Templates`;
    
    // Update breadcrumb
    document.getElementById('template-breadcrumb').textContent = template.title;
    
    // Update hero section
    document.getElementById('template-category').innerHTML = `
        <i class="fas fa-palette"></i>
        <span>${template.category}</span>
    `;
    document.getElementById('template-title').textContent = template.title;
    document.getElementById('template-subtitle').textContent = template.subtitle;
    
    // Update features
    const featuresContainer = document.getElementById('template-features');
    featuresContainer.innerHTML = template.features.map(feature => `
        <div class="feature-item">
            <i class="${feature.icon}"></i>
            <span>${feature.text}</span>
        </div>
    `).join('');
    
    // Update design features
    const designFeaturesContainer = document.getElementById('design-features');
    designFeaturesContainer.innerHTML = `
        <ul>
            ${template.designFeatures.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // Update best for
    const bestForContainer = document.getElementById('best-for');
    bestForContainer.innerHTML = `
        <ul>
            ${template.bestFor.map(item => `<li>${item}</li>`).join('')}
        </ul>
    `;
    
    // Update customization options
    const customizationContainer = document.getElementById('customization-options');
    customizationContainer.innerHTML = `
        <ul>
            ${template.customizationOptions.map(option => `<li>${option}</li>`).join('')}
        </ul>
    `;
    
    // Update specifications
    const specsContainer = document.querySelector('.specs-grid');
    specsContainer.innerHTML = Object.entries(template.specifications)
        .map(([label, value]) => `
            <div class="spec-item">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${value}</div>
            </div>
        `).join('');
    
    // Update CTA stats
    document.getElementById('usage-count').textContent = template.usageCount;
    document.querySelector('.cta-stats .stat-item:nth-child(2) .stat-number').textContent = template.rating;
    document.querySelector('.cta-stats .stat-item:nth-child(3) .stat-number').textContent = template.successRate;
    
    // Load color variations
    loadColorVariations(templateId);
    
    // Load similar templates
    loadSimilarTemplates(templateId);
    
    // Update template preview
    updateTemplatePreview(templateId);
}

// Load color variations
function loadColorVariations(templateId) {
    const template = templateData[templateId];
    const container = document.querySelector('.variations-grid');
    
    container.innerHTML = template.colorVariations.map((variation, index) => `
        <div class="variation-item ${index === 0 ? 'active' : ''}" onclick="selectVariation(${index})">
            <div class="variation-preview" style="background: linear-gradient(135deg, ${variation.primary}, ${variation.secondary});">
            </div>
            <div class="variation-name">${variation.name}</div>
            <div class="variation-description">${variation.description}</div>
        </div>
    `).join('');
}

// Load similar templates
function loadSimilarTemplates(currentTemplateId) {
    const similar = similarTemplates[currentTemplateId] || [];
    const container = document.getElementById('similar-templates-grid');
    
    container.innerHTML = similar.map(templateId => {
        const template = templateData[templateId];
        return `
            <div class="similar-template-card" onclick="navigateToTemplate('${templateId}')">
                <div class="similar-template-preview">
                    <div class="template-mockup-small ${templateId}"></div>
                </div>
                <h4>${template.title}</h4>
                <p>${template.subtitle}</p>
            </div>
        `;
    }).join('');
}

// Navigate to another template
function navigateToTemplate(templateId) {
    window.location.href = `template-details.html?template=${templateId}`;
}

// Select color variation
function selectVariation(index) {
    currentColorScheme = index;
    
    // Update active state
    document.querySelectorAll('.variation-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    // Update live preview
    updateLivePreview();
}

// Initialize customizer
function initializeCustomizer() {
    const template = templateData[currentTemplate];
    
    // Setup color options
    const colorOptionsContainer = document.getElementById('color-options');
    colorOptionsContainer.innerHTML = template.colorVariations.map((variation, index) => `
        <div class="color-option ${index === 0 ? 'active' : ''}" 
             style="background: linear-gradient(135deg, ${variation.primary}, ${variation.secondary});"
             onclick="selectColorOption(${index})"
             title="${variation.name}">
        </div>
    `).join('');
    
    // Setup font options
    const fontOptionsContainer = document.getElementById('font-options');
    const fontOptions = ['Modern Sans', 'Classic Serif', 'Creative Display', 'Professional', 'Elegant Script'];
    fontOptionsContainer.innerHTML = fontOptions.map((font, index) => `
        <div class="font-option ${index === 0 ? 'active' : ''}" onclick="selectFontOption(${index})">
            ${font}
        </div>
    `).join('');
    
    // Setup layout options
    const layoutOptionsContainer = document.getElementById('layout-options');
    const layoutOptions = ['Standard', 'Compact', 'Expanded', 'Two-Column'];
    layoutOptionsContainer.innerHTML = layoutOptions.map((layout, index) => `
        <div class="layout-option ${index === 0 ? 'active' : ''}" onclick="selectLayoutOption(${index})">
            ${layout}
        </div>
    `).join('');
    
    // Initialize live preview
    updateLivePreview();
}

// Select color option
function selectColorOption(index) {
    currentColorScheme = index;
    
    // Update active state
    document.querySelectorAll('.color-option').forEach((option, i) => {
        option.classList.toggle('active', i === index);
    });
    
    // Update variation selection
    document.querySelectorAll('.variation-item').forEach((item, i) => {
        item.classList.toggle('active', i === index);
    });
    
    updateLivePreview();
}

// Select font option
function selectFontOption(index) {
    currentFontStyle = index;
    
    // Update active state
    document.querySelectorAll('.font-option').forEach((option, i) => {
        option.classList.toggle('active', i === index);
    });
    
    updateLivePreview();
}

// Select layout option
function selectLayoutOption(index) {
    currentLayoutStyle = index;
    
    // Update active state
    document.querySelectorAll('.layout-option').forEach((option, i) => {
        option.classList.toggle('active', i === index);
    });
    
    updateLivePreview();
}

// Update live preview
function updateLivePreview() {
    const template = templateData[currentTemplate];
    const colorScheme = template.colorVariations[currentColorScheme];
    const previewContainer = document.getElementById('live-preview');
    
    // Create dynamic preview based on current selections
    previewContainer.innerHTML = `
        <div class="preview-template ${currentTemplate}" 
             style="--primary-color: ${colorScheme.primary}; --secondary-color: ${colorScheme.secondary};">
            <div class="preview-header" style="background: ${colorScheme.primary};"></div>
            <div class="preview-content">
                <div class="preview-line" style="background: ${colorScheme.secondary};"></div>
                <div class="preview-line short" style="background: ${colorScheme.primary};"></div>
                <div class="preview-line" style="background: ${colorScheme.secondary};"></div>
                <div class="preview-section" style="border-left: 3px solid ${colorScheme.primary};"></div>
            </div>
        </div>
    `;
    
    // Add CSS for preview styling
    if (!document.getElementById('preview-styles')) {
        const style = document.createElement('style');
        style.id = 'preview-styles';
        style.innerHTML = `
            .preview-template {
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
            }
            
            .preview-header {
                height: 60px;
                width: 100%;
            }
            
            .preview-content {
                padding: 20px;
            }
            
            .preview-line {
                height: 8px;
                border-radius: 4px;
                margin: 12px 0;
            }
            
            .preview-line.short {
                width: 60%;
            }
            
            .preview-section {
                height: 40px;
                background: #f8fafc;
                margin-top: 20px;
                padding-left: 15px;
                border-radius: 4px;
            }
        `;
        document.head.appendChild(style);
    }
}

// Update template preview in hero section
function updateTemplatePreview(templateId) {
    const previewContainer = document.getElementById('template-preview-large');
    
    // Create template-specific preview
    previewContainer.innerHTML = createTemplatePreview(templateId);
}

// Create template preview
function createTemplatePreview(templateId) {
    const template = templateData[templateId];
    const colorScheme = template.colorVariations[0];
    
    switch(templateId) {
        case 'modern':
            return `
                <div class="modern-preview">
                    <div class="modern-header" style="background: ${colorScheme.primary};"></div>
                    <div class="modern-content">
                        <div class="modern-section">
                            <div class="modern-title" style="background: ${colorScheme.secondary};"></div>
                            <div class="modern-lines">
                                <div class="modern-line"></div>
                                <div class="modern-line short"></div>
                                <div class="modern-line"></div>
                            </div>
                        </div>
                        <div class="modern-sidebar" style="background: ${colorScheme.primary};">
                            <div class="modern-skill-bar"></div>
                            <div class="modern-skill-bar"></div>
                            <div class="modern-skill-bar"></div>
                        </div>
                    </div>
                </div>
            `;
        case 'classic':
            return `
                <div class="classic-preview">
                    <div class="classic-header">
                        <div class="classic-name" style="background: ${colorScheme.primary};"></div>
                        <div class="classic-contact"></div>
                    </div>
                    <div class="classic-content">
                        <div class="classic-section">
                            <div class="classic-title" style="border-bottom: 2px solid ${colorScheme.primary};"></div>
                            <div class="classic-text">
                                <div class="classic-line"></div>
                                <div class="classic-line"></div>
                                <div class="classic-line short"></div>
                            </div>
                        </div>
                        <div class="classic-section">
                            <div class="classic-title" style="border-bottom: 2px solid ${colorScheme.primary};"></div>
                            <div class="classic-text">
                                <div class="classic-line"></div>
                                <div class="classic-line short"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        case 'creative':
            return `
                <div class="creative-preview">
                    <div class="creative-header" style="background: linear-gradient(135deg, ${colorScheme.primary}, ${colorScheme.secondary});">
                        <div class="creative-avatar"></div>
                        <div class="creative-name"></div>
                    </div>
                    <div class="creative-content">
                        <div class="creative-portfolio">
                            <div class="creative-item" style="background: ${colorScheme.primary};"></div>
                            <div class="creative-item" style="background: ${colorScheme.secondary};"></div>
                            <div class="creative-item" style="background: ${colorScheme.primary};"></div>
                        </div>
                        <div class="creative-text">
                            <div class="creative-line"></div>
                            <div class="creative-line short"></div>
                        </div>
                    </div>
                </div>
            `;
        default:
            return '<div class="default-preview">Template Preview</div>';
    }
}

// Use template function
function useTemplate() {
    if (window.auth && window.auth.currentUser) {
        // Store selected template and customizations
        localStorage.setItem('selectedTemplate', currentTemplate);
        localStorage.setItem('templateCustomizations', JSON.stringify({
            colorScheme: currentColorScheme,
            fontStyle: currentFontStyle,
            layoutStyle: currentLayoutStyle
        }));
        
        window.auth.showResumeBuilder();
    } else {
        showAuthModal('signup');
    }
}

// Open preview modal
function openPreview() {
    const modal = document.getElementById('previewModal');
    const previewContainer = document.getElementById('preview-container');
    const previewTitle = document.getElementById('preview-title');
    
    const template = templateData[currentTemplate];
    previewTitle.textContent = `${template.title} - Full Preview`;
    
    // Create full-size preview
    previewContainer.innerHTML = `
        <div class="full-template-preview">
            <div class="preview-loading">
                <div class="loading-spinner"></div>
                <p>Loading full preview...</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Simulate loading
    setTimeout(() => {
        previewContainer.innerHTML = `
            <div class="full-preview-content">
                <h3>Full Template Preview</h3>
                <p>This would show a complete, interactive preview of the ${template.title} template.</p>
                <div class="preview-placeholder">
                    ${createTemplatePreview(currentTemplate)}
                </div>
            </div>
        `;
    }, 1500);
}

// Close preview modal
function closePreview() {
    document.getElementById('previewModal').style.display = 'none';
}

// Zoom preview
function zoomPreview() {
    const previewContainer = document.getElementById('preview-container');
    previewContainer.classList.toggle('zoomed');
}

// Download sample
function downloadSample() {
    const template = templateData[currentTemplate];
    alert(`Downloading sample PDF for ${template.title}...`);
    // In a real implementation, this would trigger a PDF download
}

// Go back to templates
function goBack() {
    window.location.href = 'index.html#templates';
}

// Initialize animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.template-content-card, .template-variations, .template-customizer, .template-specs, .similar-templates').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Create background elements
function createBackgroundElements() {
    const backgroundAnimation = document.querySelector('.background-animation');
    if (!backgroundAnimation) return;
    
    // Create floating shapes
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        shape.classList.add('bg-shape');
        
        const size = Math.random() * 40 + 20;
        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${Math.random() * 100}%`;
        shape.style.top = `${Math.random() * 100}%`;
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : `${Math.random() * 20}%`;
        
        const hue = Math.random() * 360;
        shape.style.backgroundColor = `hsla(${hue}, 70%, 70%, 0.1)`;
        
        const duration = Math.random() * 15 + 10;
        shape.style.animation = `templateFloat ${duration}s ease-in-out infinite`;
        shape.style.animationDelay = `${Math.random() * 5}s`;
        
        backgroundAnimation.appendChild(shape);
    }
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const previewModal = document.getElementById('previewModal');
        if (event.target === previewModal) {
            closePreview();
        }
    });
});

// Add CSS for template previews
const templatePreviewStyles = document.createElement('style');
templatePreviewStyles.innerHTML = `
    /* Modern Template Preview */
    .modern-preview {
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
    }
    
    .modern-header {
        height: 80px;
        width: 100%;
    }
    
    .modern-content {
        flex: 1;
        display: flex;
        padding: 20px;
        gap: 20px;
    }
    
    .modern-section {
        flex: 2;
    }
    
    .modern-sidebar {
        flex: 1;
        padding: 15px;
        border-radius: 8px;
    }
    
    .modern-title {
        height: 20px;
        width: 60%;
        border-radius: 4px;
        margin-bottom: 15px;
    }
    
    .modern-lines {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .modern-line {
        height: 6px;
        background: #e5e7eb;
        border-radius: 3px;
    }
    
    .modern-line.short {
        width: 70%;
    }
    
    .modern-skill-bar {
        height: 8px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 4px;
        margin: 10px 0;
    }
    
    /* Classic Template Preview */
    .classic-preview {
        width: 100%;
        height: 100%;
        background: white;
        padding: 25px;
    }
    
    .classic-header {
        text-align: center;
        margin-bottom: 25px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e5e7eb;
    }
    
    .classic-name {
        height: 25px;
        width: 60%;
        margin: 0 auto 10px;
        border-radius: 4px;
    }
    
    .classic-contact {
        height: 12px;
        width: 40%;
        background: #e5e7eb;
        margin: 0 auto;
        border-radius: 2px;
    }
    
    .classic-section {
        margin-bottom: 20px;
    }
    
    .classic-title {
        height: 18px;
        width: 30%;
        background: #f3f4f6;
        margin-bottom: 10px;
        padding-bottom: 5px;
    }
    
    .classic-text {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }
    
    .classic-line {
        height: 5px;
        background: #e5e7eb;
        border-radius: 2px;
    }
    
    .classic-line.short {
        width: 65%;
    }
    
    /* Creative Template Preview */
    .creative-preview {
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        flex-direction: column;
    }
    
    .creative-header {
        height: 120px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 10px;
        color: white;
    }
    
    .creative-avatar {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
    }
    
    .creative-name {
        width: 80px;
        height: 15px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 8px;
    }
    
    .creative-content {
        flex: 1;
        padding: 20px;
    }
    
    .creative-portfolio {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
    }
    
    .creative-item {
        width: 60px;
        height: 40px;
        border-radius: 6px;
        opacity: 0.8;
    }
    
    .creative-text {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
    
    .creative-line {
        height: 6px;
        background: #e5e7eb;
        border-radius: 3px;
    }
    
    .creative-line.short {
        width: 60%;
    }
    
    /* Preview Modal Styles */
    .preview-loading {
        text-align: center;
        padding: 60px 20px;
    }
    
    .loading-spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #e2e8f0;
        border-top: 4px solid #4f46e5;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 20px;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .full-preview-content {
        text-align: center;
        padding: 40px;
    }
    
    .full-preview-content h3 {
        margin-bottom: 15px;
        color: #1e293b;
    }
    
    .full-preview-content p {
        color: #64748b;
        margin-bottom: 30px;
    }
    
    .preview-placeholder {
        max-width: 400px;
        height: 500px;
        margin: 0 auto;
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }
    
    .preview-container.zoomed .preview-placeholder {
        transform: scale(1.2);
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(templatePreviewStyles);