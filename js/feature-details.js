// Feature Details Page JavaScript

// Feature data with detailed information
const featureData = {
    'ai-content': {
        title: 'AI Content Generation',
        subtitle: 'Generate compelling resume content based on your job description and industry',
        icon: 'fas fa-robot',
        tags: ['AI-Powered', 'Smart', 'Professional'],
        howItWorks: [
            'Input your job title and industry',
            'AI analyzes thousands of successful resumes',
            'Generates tailored content suggestions',
            'Refine and customize the generated content',
            'Apply changes instantly to your resume'
        ],
        benefits: [
            'Save hours of writing time',
            'Professional, industry-specific language',
            'ATS-optimized keywords',
            'Consistent tone and style',
            'Multiple content variations'
        ],
        useCases: [
            'Career changers entering new industries',
            'Recent graduates with limited experience',
            'Professionals updating outdated resumes',
            'Non-native speakers seeking professional language',
            'Busy executives needing quick updates'
        ],
        techSpecs: {
            'AI Model': 'GPT-4 based language model',
            'Languages': '25+ languages supported',
            'Industries': '100+ industry templates',
            'Response Time': 'Under 3 seconds',
            'Accuracy': '95% user satisfaction rate'
        },
        demoType: 'content-generator'
    },
    'smart-suggestions': {
        title: 'Smart Suggestions',
        subtitle: 'Get AI-powered recommendations to improve your existing resume content',
        icon: 'fas fa-magic',
        tags: ['Intelligent', 'Optimization', 'Enhancement'],
        howItWorks: [
            'Upload or paste your existing resume',
            'AI scans and analyzes your content',
            'Identifies improvement opportunities',
            'Suggests specific enhancements',
            'Apply suggestions with one click'
        ],
        benefits: [
            'Improve resume effectiveness',
            'Identify missing keywords',
            'Enhance readability and flow',
            'Optimize for ATS systems',
            'Increase interview callbacks'
        ],
        useCases: [
            'Experienced professionals optimizing resumes',
            'Job seekers with low response rates',
            'Career coaches helping clients',
            'HR professionals reviewing resumes',
            'Students preparing for job applications'
        ],
        techSpecs: {
            'Analysis Engine': 'Machine Learning algorithms',
            'Suggestion Types': '15+ improvement categories',
            'Processing Time': 'Real-time analysis',
            'Accuracy': '92% improvement rate',
            'File Formats': 'PDF, DOC, DOCX, TXT'
        },
        demoType: 'suggestion-engine'
    },
    'templates': {
        title: 'Multiple Templates',
        subtitle: 'Choose from professional templates designed for different industries',
        icon: 'fas fa-palette',
        tags: ['Design', 'Professional', 'Customizable'],
        howItWorks: [
            'Browse our template gallery',
            'Preview templates with your content',
            'Select your preferred design',
            'Customize colors and fonts',
            'Download in multiple formats'
        ],
        benefits: [
            'Professional, modern designs',
            'Industry-specific layouts',
            'ATS-friendly formatting',
            'Easy customization options',
            'Regular template updates'
        ],
        useCases: [
            'Creative professionals showcasing portfolios',
            'Corporate executives needing formal layouts',
            'Tech professionals wanting modern designs',
            'Healthcare workers requiring clean formats',
            'Students seeking entry-level templates'
        ],
        techSpecs: {
            'Template Count': '50+ professional templates',
            'Categories': '12 industry categories',
            'Customization': 'Colors, fonts, layouts',
            'Export Formats': 'PDF, PNG, HTML',
            'Mobile Support': 'Responsive design'
        },
        demoType: 'template-showcase'
    },
    'skill-recommendations': {
        title: 'Skill Recommendations',
        subtitle: 'AI suggests relevant skills based on your industry and experience',
        icon: 'fas fa-lightbulb',
        tags: ['Skills', 'AI-Driven', 'Relevant'],
        howItWorks: [
            'Analyze your work experience',
            'Identify your industry and role',
            'Compare with market trends',
            'Suggest in-demand skills',
            'Rank skills by importance'
        ],
        benefits: [
            'Stay current with industry trends',
            'Identify skill gaps',
            'Improve job match rates',
            'Enhance professional profile',
            'Competitive advantage'
        ],
        useCases: [
            'Career changers identifying transferable skills',
            'Professionals planning skill development',
            'Students building relevant skill sets',
            'Freelancers expanding service offerings',
            'Managers updating team requirements'
        ],
        techSpecs: {
            'Skill Database': '10,000+ skills tracked',
            'Industries': '100+ industry mappings',
            'Update Frequency': 'Monthly trend analysis',
            'Relevance Score': 'AI-calculated importance',
            'Integration': 'LinkedIn, job boards'
        },
        demoType: 'skill-analyzer'
    },
    'export-formats': {
        title: 'Multiple Formats',
        subtitle: 'Export your resume in PDF, Word, or share with a custom link',
        icon: 'fas fa-download',
        tags: ['Export', 'Flexible', 'Sharing'],
        howItWorks: [
            'Complete your resume creation',
            'Choose your preferred format',
            'Customize export settings',
            'Generate downloadable file',
            'Share via custom link'
        ],
        benefits: [
            'Universal compatibility',
            'Professional formatting',
            'Easy sharing options',
            'Print-ready outputs',
            'Version control'
        ],
        useCases: [
            'Job applications requiring specific formats',
            'Printing for in-person interviews',
            'Email attachments to recruiters',
            'Online portfolio integration',
            'Social media profile links'
        ],
        techSpecs: {
            'Export Formats': 'PDF, DOCX, PNG, HTML',
            'Quality': 'High-resolution outputs',
            'File Size': 'Optimized compression',
            'Sharing': 'Custom URLs, QR codes',
            'Analytics': 'View tracking available'
        },
        demoType: 'export-preview'
    },
    'ats-optimization': {
        title: 'ATS Optimized',
        subtitle: 'Ensure your resume passes Applicant Tracking Systems',
        icon: 'fas fa-shield-alt',
        tags: ['ATS', 'Optimization', 'Compatibility'],
        howItWorks: [
            'Scan resume for ATS compatibility',
            'Check formatting and structure',
            'Validate keyword density',
            'Test with major ATS systems',
            'Provide optimization score'
        ],
        benefits: [
            'Higher application success rate',
            'Proper keyword optimization',
            'Compatible formatting',
            'Reduced rejection risk',
            'Improved visibility'
        ],
        useCases: [
            'Large corporation applications',
            'Online job board submissions',
            'Recruitment agency processes',
            'Government position applications',
            'High-volume hiring scenarios'
        ],
        techSpecs: {
            'ATS Systems': '25+ major systems tested',
            'Compatibility': '98% pass rate',
            'Keyword Analysis': 'Industry-specific optimization',
            'Format Check': 'Real-time validation',
            'Score Range': '0-100 optimization score'
        },
        demoType: 'ats-scanner'
    },
    'real-time-feedback': {
        title: 'Real-time Resume Feedback',
        subtitle: 'Receive instant AI-powered feedback as you build your resume',
        icon: 'fas fa-rocket',
        tags: ['Real-time', 'Feedback', 'Interactive'],
        howItWorks: [
            'Type content in real-time',
            'AI analyzes as you write',
            'Instant feedback appears',
            'Suggestions update dynamically',
            'Continuous improvement tracking'
        ],
        benefits: [
            'Immediate improvement suggestions',
            'Prevent common mistakes',
            'Learn best practices',
            'Save revision time',
            'Build confidence'
        ],
        useCases: [
            'First-time resume builders',
            'Professionals learning new formats',
            'Students developing writing skills',
            'Career coaches training clients',
            'Quick resume updates'
        ],
        techSpecs: {
            'Response Time': 'Under 1 second',
            'Feedback Types': '20+ improvement categories',
            'Learning Model': 'Adaptive AI system',
            'Languages': '15+ languages supported',
            'Integration': 'Real-time editor'
        },
        demoType: 'live-feedback'
    },
    'mock-interview': {
        title: 'Mock Interview Generator',
        subtitle: 'Practice with AI-generated mock interview questions based on your resume and job role',
        icon: 'fas fa-microphone-alt',
        tags: ['AI-Powered', 'Interview Prep', 'Practice'],
        howItWorks: [
            'Upload your resume and target job description',
            'AI analyzes your background and role requirements',
            'Generates personalized interview questions',
            'Practice with voice or text responses',
            'Receive detailed feedback and improvement tips'
        ],
        benefits: [
            'Realistic interview simulation',
            'Personalized question generation',
            'Confidence building through practice',
            'Detailed performance analytics',
            'Industry-specific scenarios'
        ],
        useCases: [
            'Job seekers preparing for interviews',
            'Career changers practicing new industry questions',
            'Students preparing for first interviews',
            'Professionals updating interview skills',
            'HR teams training interview techniques'
        ],
        techSpecs: {
            'Question Database': '5,000+ curated questions',
            'Industries': '50+ industry specializations',
            'Response Analysis': 'AI-powered feedback engine',
            'Practice Modes': 'Voice, text, and video options',
            'Performance Tracking': 'Detailed analytics dashboard'
        },
        demoType: 'interview-simulator'
    },
    'cover-letter-assistant': {
        title: 'Built-in Cover Letter Assistant',
        subtitle: 'Create compelling cover letters that complement your resume perfectly',
        icon: 'fas fa-file-alt',
        tags: ['AI-Generated', 'Personalized', 'Professional'],
        howItWorks: [
            'Import details from your resume',
            'Input job description and company info',
            'AI generates tailored cover letter content',
            'Customize tone and style preferences',
            'Export in multiple formats'
        ],
        benefits: [
            'Seamless resume integration',
            'Personalized for each application',
            'Professional writing quality',
            'Time-saving automation',
            'Consistent branding with resume'
        ],
        useCases: [
            'Job applications requiring cover letters',
            'Professionals applying to multiple positions',
            'Career changers explaining transitions',
            'Students with limited writing experience',
            'Executives needing executive-level communication'
        ],
        techSpecs: {
            'Template Library': '30+ professional templates',
            'Customization': 'Tone, style, and length options',
            'Integration': 'Direct resume data import',
            'Export Formats': 'PDF, DOCX, TXT',
            'Language Support': '20+ languages available'
        },
        demoType: 'cover-letter-builder'
    },
    'realtime-feedback': {
        title: 'Real-time Resume Feedback',
        subtitle: 'Receive instant AI-powered feedback as you build your resume',
        icon: 'fas fa-comments',
        tags: ['Real-time', 'Feedback', 'Interactive'],
        howItWorks: [
            'Type content in real-time',
            'AI analyzes as you write',
            'Instant feedback appears',
            'Suggestions update dynamically',
            'Continuous improvement tracking'
        ],
        benefits: [
            'Immediate improvement suggestions',
            'Prevent common mistakes',
            'Learn best practices',
            'Save revision time',
            'Build confidence'
        ],
        useCases: [
            'First-time resume builders',
            'Professionals learning new formats',
            'Students developing writing skills',
            'Career coaches training clients',
            'Quick resume updates'
        ],
        techSpecs: {
            'Response Time': 'Under 1 second',
            'Feedback Types': '20+ improvement categories',
            'Learning Model': 'Adaptive AI system',
            'Languages': '15+ languages supported',
            'Integration': 'Real-time editor'
        },
        demoType: 'live-feedback'
    },
    'cover-letter': {
        title: 'Built-in Cover Letter Assistant',
        subtitle: 'Create compelling cover letters that complement your resume perfectly',
        icon: 'fas fa-file-alt',
        tags: ['AI-Generated', 'Personalized', 'Professional'],
        howItWorks: [
            'Import details from your resume',
            'Input job description and company info',
            'AI generates tailored cover letter content',
            'Customize tone and style preferences',
            'Export in multiple formats'
        ],
        benefits: [
            'Seamless resume integration',
            'Personalized for each application',
            'Professional writing quality',
            'Time-saving automation',
            'Consistent branding with resume'
        ],
        useCases: [
            'Job applications requiring cover letters',
            'Professionals applying to multiple positions',
            'Career changers explaining transitions',
            'Students with limited writing experience',
            'Executives needing executive-level communication'
        ],
        techSpecs: {
            'Template Library': '30+ professional templates',
            'Customization': 'Tone, style, and length options',
            'Integration': 'Direct resume data import',
            'Export Formats': 'PDF, DOCX, TXT',
            'Language Support': '20+ languages available'
        },
        demoType: 'cover-letter-builder'
    },
    'qr-code-generator': {
        title: 'QR Code Resume Generator',
        subtitle: 'Generate QR codes linking to digital resume versions',
        icon: 'fas fa-qrcode',
        tags: ['Modern', 'Networking', 'Trackable'],
        howItWorks: [
            'Complete your digital resume',
            'Choose sharing preferences and privacy settings',
            'Generate unique QR code with custom branding',
            'Download or print QR code for business cards',
            'Track scans and engagement analytics'
        ],
        benefits: [
            'Easy sharing at networking events',
            'Modern, tech-savvy impression',
            'Trackable engagement metrics',
            'Instant access to updated resume',
            'Eco-friendly paperless sharing'
        ],
        useCases: [
            'Networking events and conferences',
            'Business card integration',
            'Career fair presentations',
            'Email signature enhancement',
            'Social media profile linking'
        ],
        techSpecs: {
            'QR Code Types': 'Static and dynamic codes',
            'Analytics': 'Scan tracking and location data',
            'Customization': 'Colors, logos, and branding',
            'Formats': 'PNG, SVG, PDF downloads',
            'Security': 'Password protection available'
        },
        demoType: 'qr-code-simulator'
    }
};

// Related features mapping
const relatedFeatures = {
    'ai-content': ['smart-suggestions', 'skill-recommendations', 'real-time-feedback'],
    'smart-suggestions': ['ai-content', 'ats-optimization', 'real-time-feedback'],
    'templates': ['export-formats', 'ats-optimization', 'ai-content'],
    'skill-recommendations': ['ai-content', 'smart-suggestions', 'real-time-feedback'],
    'export-formats': ['templates', 'ats-optimization', 'qr-code-generator'],
    'ats-optimization': ['smart-suggestions', 'export-formats', 'templates'],
    'real-time-feedback': ['ai-content', 'smart-suggestions', 'skill-recommendations'],
    'mock-interview': ['ai-content', 'cover-letter-assistant', 'skill-recommendations'],
    'cover-letter-assistant': ['ai-content', 'mock-interview', 'templates'],
    'qr-code-generator': ['export-formats', 'templates', 'cover-letter-assistant']
};

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const featureId = urlParams.get('feature') || 'ai-content';
    
    loadFeatureContent(featureId);
    initializeAnimations();
    createBackgroundElements();
    initializeInteractiveDemo(featureId);
});

// Load feature content dynamically
function loadFeatureContent(featureId) {
    const feature = featureData[featureId];
    if (!feature) return;

    // Update page title and meta
    document.title = `${feature.title} - CareerCrafter`;
    
    // Update breadcrumb
    document.getElementById('feature-breadcrumb').textContent = feature.title;
    
    // Update hero section
    document.getElementById('feature-icon-large').innerHTML = `<i class="${feature.icon}"></i>`;
    document.getElementById('feature-title').textContent = feature.title;
    document.getElementById('feature-subtitle').textContent = feature.subtitle;
    
    // Update tags
    const tagsContainer = document.getElementById('feature-tags');
    tagsContainer.innerHTML = feature.tags.map(tag => `<span class="tag">${tag}</span>`).join('');
    
    // Update how it works
    const howItWorksContainer = document.getElementById('how-it-works');
    howItWorksContainer.innerHTML = `
        <ol>
            ${feature.howItWorks.map(step => `<li>${step}</li>`).join('')}
        </ol>
    `;
    
    // Update benefits
    const benefitsContainer = document.getElementById('key-benefits');
    benefitsContainer.innerHTML = `
        <ul>
            ${feature.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
        </ul>
    `;
    
    // Update use cases
    const useCasesContainer = document.getElementById('use-cases');
    useCasesContainer.innerHTML = `
        <ul>
            ${feature.useCases.map(useCase => `<li>${useCase}</li>`).join('')}
        </ul>
    `;
    
    // Update technical specifications
    const techSpecsContainer = document.querySelector('.specs-grid');
    techSpecsContainer.innerHTML = Object.entries(feature.techSpecs)
        .map(([label, value]) => `
            <div class="spec-item">
                <div class="spec-label">${label}</div>
                <div class="spec-value">${value}</div>
            </div>
        `).join('');
    
    // Update related features
    loadRelatedFeatures(featureId);
    
    // Update feature animation
    updateFeatureAnimation(featureId);
}

// Load related features
function loadRelatedFeatures(currentFeatureId) {
    const related = relatedFeatures[currentFeatureId] || [];
    const container = document.getElementById('related-features-grid');
    
    container.innerHTML = related.map(featureId => {
        const feature = featureData[featureId];
        return `
            <div class="related-feature-card" onclick="navigateToFeature('${featureId}')">
                <div class="related-feature-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h4>${feature.title}</h4>
                <p>${feature.subtitle}</p>
            </div>
        `;
    }).join('');
}

// Navigate to another feature
function navigateToFeature(featureId) {
    window.location.href = `feature-details.html?feature=${featureId}`;
}

// Update feature animation based on feature type
function updateFeatureAnimation(featureId) {
    const container = document.getElementById('feature-animation');
    const feature = featureData[featureId];
    
    // Clear existing content
    container.innerHTML = '';
    
    // Create feature-specific animation
    switch(feature.demoType) {
        case 'content-generator':
            createContentGeneratorAnimation(container);
            break;
        case 'suggestion-engine':
            createSuggestionEngineAnimation(container);
            break;
        case 'template-showcase':
            createTemplateShowcaseAnimation(container);
            break;
        case 'skill-analyzer':
            createSkillAnalyzerAnimation(container);
            break;
        case 'export-preview':
            createExportPreviewAnimation(container);
            break;
        case 'ats-scanner':
            createATSScannerAnimation(container);
            break;
        case 'live-feedback':
            createLiveFeedbackAnimation(container);
            break;
        case 'interview-simulator':
            createInterviewSimulatorAnimation(container);
            break;
        case 'cover-letter-builder':
            createCoverLetterBuilderAnimation(container);
            break;
        case 'qr-code-simulator':
            createQRCodeSimulatorAnimation(container);
            break;
        default:
            createDefaultAnimation(container);
    }
}

// Animation creators for different feature types
function createContentGeneratorAnimation(container) {
    container.innerHTML = `
        <div class="content-gen-demo">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
            <div class="generated-text">
                <div class="text-line"></div>
                <div class="text-line short"></div>
                <div class="text-line"></div>
            </div>
        </div>
    `;
    
    // Add CSS for animation
    const style = document.createElement('style');
    style.innerHTML = `
        .content-gen-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
        }
        
        .typing-indicator {
            display: flex;
            gap: 5px;
        }
        
        .typing-dot {
            width: 8px;
            height: 8px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: typing 1.4s infinite;
        }
        
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .generated-text {
            width: 80%;
            opacity: 0;
            animation: fadeInText 2s ease-in-out 2s forwards;
        }
        
        .text-line {
            height: 4px;
            background: rgba(255, 255, 255, 0.6);
            margin: 8px 0;
            border-radius: 2px;
            animation: expandLine 0.8s ease-out forwards;
        }
        
        .text-line.short {
            width: 60%;
        }
        
        @keyframes typing {
            0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
            30% { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes fadeInText {
            to { opacity: 1; }
        }
        
        @keyframes expandLine {
            from { width: 0; }
            to { width: 100%; }
        }
    `;
    document.head.appendChild(style);
}

function createSuggestionEngineAnimation(container) {
    container.innerHTML = `
        <div class="suggestion-demo">
            <div class="document-icon">
                <i class="fas fa-file-alt"></i>
            </div>
            <div class="suggestion-bubbles">
                <div class="suggestion-bubble">💡</div>
                <div class="suggestion-bubble">✨</div>
                <div class="suggestion-bubble">🎯</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .suggestion-demo {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .document-icon {
            font-size: 60px;
            color: rgba(255, 255, 255, 0.8);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .suggestion-bubbles {
            position: absolute;
        }
        
        .suggestion-bubble {
            position: absolute;
            font-size: 20px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: float-around 3s ease-in-out infinite;
        }
        
        .suggestion-bubble:nth-child(1) {
            animation-delay: 0s;
            top: -60px;
            left: -30px;
        }
        
        .suggestion-bubble:nth-child(2) {
            animation-delay: 1s;
            top: -40px;
            right: -40px;
        }
        
        .suggestion-bubble:nth-child(3) {
            animation-delay: 2s;
            bottom: -50px;
            left: 10px;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes float-around {
            0%, 100% { transform: translateY(0px) scale(0.8); opacity: 0.6; }
            50% { transform: translateY(-10px) scale(1); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function createTemplateShowcaseAnimation(container) {
    container.innerHTML = `
        <div class="template-demo">
            <div class="template-carousel">
                <div class="template-slide active">
                    <div class="template-preview modern"></div>
                </div>
                <div class="template-slide">
                    <div class="template-preview classic"></div>
                </div>
                <div class="template-slide">
                    <div class="template-preview creative"></div>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .template-demo {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        
        .template-carousel {
            position: relative;
            width: 200px;
            height: 250px;
        }
        
        .template-slide {
            position: absolute;
            width: 100%;
            height: 100%;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.5s ease;
        }
        
        .template-slide.active {
            opacity: 1;
            transform: scale(1);
        }
        
        .template-preview {
            width: 100%;
            height: 100%;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.9);
            position: relative;
            overflow: hidden;
        }
        
        .template-preview::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            height: 30px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 5px;
        }
        
        .template-preview::after {
            content: '';
            position: absolute;
            top: 70px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            background: repeating-linear-gradient(
                0deg,
                rgba(0,0,0,0.1) 0px,
                rgba(0,0,0,0.1) 2px,
                transparent 2px,
                transparent 15px
            );
        }
    `;
    document.head.appendChild(style);
    
    // Rotate templates
    let currentSlide = 0;
    const slides = container.querySelectorAll('.template-slide');
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 2000);
}

function createSkillAnalyzerAnimation(container) {
    container.innerHTML = `
        <div class="skill-demo">
            <div class="skill-chart">
                <div class="skill-bar" style="--width: 90%">
                    <span class="skill-name">JavaScript</span>
                    <div class="skill-progress"></div>
                </div>
                <div class="skill-bar" style="--width: 75%">
                    <span class="skill-name">Python</span>
                    <div class="skill-progress"></div>
                </div>
                <div class="skill-bar" style="--width: 85%">
                    <span class="skill-name">React</span>
                    <div class="skill-progress"></div>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .skill-demo {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .skill-chart {
            width: 80%;
        }
        
        .skill-bar {
            margin: 15px 0;
            position: relative;
        }
        
        .skill-name {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            margin-bottom: 5px;
            display: block;
        }
        
        .skill-progress {
            height: 8px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
            position: relative;
            overflow: hidden;
        }
        
        .skill-progress::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: var(--width);
            background: linear-gradient(90deg, #10b981, #34d399);
            border-radius: 4px;
            animation: fillSkill 2s ease-out forwards;
        }
        
        @keyframes fillSkill {
            from { width: 0; }
            to { width: var(--width); }
        }
    `;
    document.head.appendChild(style);
}

function createExportPreviewAnimation(container) {
    container.innerHTML = `
        <div class="export-demo">
            <div class="document-stack">
                <div class="document pdf">PDF</div>
                <div class="document word">DOC</div>
                <div class="document image">PNG</div>
            </div>
            <div class="download-arrow">
                <i class="fas fa-download"></i>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .export-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
        }
        
        .document-stack {
            position: relative;
            width: 120px;
            height: 150px;
        }
        
        .document {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 12px;
            color: #333;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            animation: stackFloat 3s ease-in-out infinite;
        }
        
        .document.pdf {
            background: #ff6b6b;
            color: white;
            z-index: 3;
            animation-delay: 0s;
        }
        
        .document.word {
            background: #4ecdc4;
            color: white;
            z-index: 2;
            transform: translate(10px, 10px);
            animation-delay: 1s;
        }
        
        .document.image {
            background: #45b7d1;
            color: white;
            z-index: 1;
            transform: translate(20px, 20px);
            animation-delay: 2s;
        }
        
        .download-arrow {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.8);
            animation: bounce 2s infinite;
        }
        
        @keyframes stackFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
        }
    `;
    document.head.appendChild(style);
}

function createATSScannerAnimation(container) {
    container.innerHTML = `
        <div class="ats-demo">
            <div class="scanner-line"></div>
            <div class="ats-score">
                <div class="score-circle">
                    <span class="score-number">95</span>
                    <span class="score-label">%</span>
                </div>
                <div class="score-text">ATS Compatible</div>
            </div>
            <div class="check-marks">
                <div class="check-item">✓ Keywords</div>
                <div class="check-item">✓ Format</div>
                <div class="check-item">✓ Structure</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .ats-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 20px;
            position: relative;
        }
        
        .scanner-line {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
            animation: scan 3s ease-in-out infinite;
        }
        
        .ats-score {
            text-align: center;
        }
        
        .score-circle {
            width: 80px;
            height: 80px;
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top: 4px solid #10b981;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 10px;
            animation: rotate 2s linear infinite;
        }
        
        .score-number {
            font-size: 24px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.9);
        }
        
        .score-label {
            font-size: 12px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        .score-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
        }
        
        .check-marks {
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .check-item {
            background: rgba(16, 185, 129, 0.2);
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            animation: fadeInCheck 0.5s ease-out forwards;
            opacity: 0;
        }
        
        .check-item:nth-child(1) { animation-delay: 1s; }
        .check-item:nth-child(2) { animation-delay: 1.5s; }
        .check-item:nth-child(3) { animation-delay: 2s; }
        
        @keyframes scan {
            0% { transform: translateY(0); }
            50% { transform: translateY(280px); }
            100% { transform: translateY(0); }
        }
        
        @keyframes fadeInCheck {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function createLiveFeedbackAnimation(container) {
    container.innerHTML = `
        <div class="feedback-demo">
            <div class="typing-area">
                <div class="cursor-line"></div>
            </div>
            <div class="feedback-bubbles">
                <div class="feedback-bubble tip">💡 Add action verbs</div>
                <div class="feedback-bubble warning">⚠️ Too generic</div>
                <div class="feedback-bubble success">✅ Great keyword!</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .feedback-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
        }
        
        .typing-area {
            width: 200px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            position: relative;
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .cursor-line {
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            width: 2px;
            height: 20px;
            background: rgba(255, 255, 255, 0.8);
            animation: blink 1s infinite;
        }
        
        .feedback-bubbles {
            display: flex;
            flex-direction: column;
            gap: 8px;
            align-items: center;
        }
        
        .feedback-bubble {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 12px;
            border-radius: 20px;
            font-size: 12px;
            color: rgba(255, 255, 255, 0.9);
            opacity: 0;
            transform: translateX(-20px);
            animation: slideInFeedback 0.5s ease-out forwards;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .feedback-bubble.tip {
            animation-delay: 1s;
        }
        
        .feedback-bubble.warning {
            animation-delay: 2s;
        }
        
        .feedback-bubble.success {
            animation-delay: 3s;
        }
        
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
        
        @keyframes slideInFeedback {
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

function createInterviewSimulatorAnimation(container) {
    container.innerHTML = `
        <div class="interview-demo">
            <div class="microphone-icon">
                <i class="fas fa-microphone-alt"></i>
                <div class="sound-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
            </div>
            <div class="question-bubble">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div class="question-text">Tell me about your experience with...</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .interview-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 40px;
        }
        
        .microphone-icon {
            position: relative;
            font-size: 50px;
            color: rgba(255, 255, 255, 0.9);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .sound-waves {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
        
        .wave {
            position: absolute;
            border: 2px solid rgba(16, 185, 129, 0.6);
            border-radius: 50%;
            animation: soundWave 2s ease-out infinite;
        }
        
        .wave-1 {
            width: 80px;
            height: 80px;
            top: -40px;
            left: -40px;
            animation-delay: 0s;
        }
        
        .wave-2 {
            width: 120px;
            height: 120px;
            top: -60px;
            left: -60px;
            animation-delay: 0.5s;
        }
        
        .wave-3 {
            width: 160px;
            height: 160px;
            top: -80px;
            left: -80px;
            animation-delay: 1s;
        }
        
        .question-bubble {
            background: rgba(255, 255, 255, 0.1);
            padding: 20px;
            border-radius: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 250px;
            text-align: center;
            position: relative;
        }
        
        .question-bubble::before {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 0;
            border-left: 10px solid transparent;
            border-right: 10px solid transparent;
            border-top: 10px solid rgba(255, 255, 255, 0.1);
        }
        
        .typing-dots {
            display: flex;
            justify-content: center;
            gap: 4px;
            margin-bottom: 10px;
        }
        
        .typing-dots span {
            width: 6px;
            height: 6px;
            background: rgba(255, 255, 255, 0.7);
            border-radius: 50%;
            animation: typingDot 1.4s infinite;
        }
        
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        .question-text {
            color: rgba(255, 255, 255, 0.9);
            font-size: 14px;
            opacity: 0;
            animation: fadeInQuestion 1s ease-in-out 2s forwards;
        }
        
        @keyframes soundWave {
            0% {
                transform: scale(0.8);
                opacity: 1;
            }
            100% {
                transform: scale(1.4);
                opacity: 0;
            }
        }
        
        @keyframes typingDot {
            0%, 60%, 100% { transform: scale(1); opacity: 0.5; }
            30% { transform: scale(1.2); opacity: 1; }
        }
        
        @keyframes fadeInQuestion {
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function createCoverLetterBuilderAnimation(container) {
    container.innerHTML = `
        <div class="cover-letter-demo">
            <div class="document-preview">
                <div class="document-header">
                    <div class="header-line long"></div>
                    <div class="header-line short"></div>
                </div>
                <div class="document-body">
                    <div class="body-line"></div>
                    <div class="body-line"></div>
                    <div class="body-line short"></div>
                    <div class="body-line"></div>
                    <div class="body-line medium"></div>
                </div>
                <div class="document-signature">
                    <div class="signature-line"></div>
                </div>
            </div>
            <div class="ai-suggestions">
                <div class="suggestion-icon">
                    <i class="fas fa-magic"></i>
                </div>
                <div class="suggestion-text">AI Enhancing...</div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .cover-letter-demo {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 30px;
        }
        
        .document-preview {
            width: 180px;
            height: 240px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            position: relative;
            overflow: hidden;
        }
        
        .document-header {
            margin-bottom: 20px;
        }
        
        .header-line {
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
            margin: 6px 0;
            animation: fillLine 1s ease-out forwards;
            transform-origin: left;
            transform: scaleX(0);
        }
        
        .header-line.long {
            width: 100%;
            animation-delay: 0.5s;
        }
        
        .header-line.short {
            width: 60%;
            animation-delay: 0.8s;
        }
        
        .document-body {
            margin-bottom: 20px;
        }
        
        .body-line {
            height: 2px;
            background: rgba(0, 0, 0, 0.3);
            border-radius: 1px;
            margin: 8px 0;
            width: 100%;
            animation: fillLine 0.8s ease-out forwards;
            transform-origin: left;
            transform: scaleX(0);
        }
        
        .body-line:nth-child(1) { animation-delay: 1.2s; }
        .body-line:nth-child(2) { animation-delay: 1.4s; }
        .body-line:nth-child(3) { animation-delay: 1.6s; width: 70%; }
        .body-line:nth-child(4) { animation-delay: 1.8s; }
        .body-line:nth-child(5) { animation-delay: 2s; width: 80%; }
        
        .document-signature {
            position: absolute;
            bottom: 20px;
            right: 20px;
        }
        
        .signature-line {
            width: 60px;
            height: 2px;
            background: #667eea;
            border-radius: 1px;
            animation: fillLine 0.5s ease-out 2.5s forwards;
            transform-origin: left;
            transform: scaleX(0);
        }
        
        .ai-suggestions {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }
        
        .suggestion-icon {
            font-size: 30px;
            color: rgba(255, 255, 255, 0.9);
            animation: magicSpin 2s ease-in-out infinite;
        }
        
        .suggestion-text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 12px;
            text-align: center;
            animation: fadeInOut 2s ease-in-out infinite;
        }
        
        @keyframes fillLine {
            to { transform: scaleX(1); }
        }
        
        @keyframes magicSpin {
            0%, 100% { transform: rotate(0deg) scale(1); }
            25% { transform: rotate(90deg) scale(1.1); }
            50% { transform: rotate(180deg) scale(1); }
            75% { transform: rotate(270deg) scale(1.1); }
        }
        
        @keyframes fadeInOut {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
}

function createQRCodeSimulatorAnimation(container) {
    container.innerHTML = `
        <div class="qr-demo">
            <div class="qr-generation-area">
                <div class="resume-icon">
                    <i class="fas fa-file-alt"></i>
                </div>
                <div class="generation-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
                <div class="qr-code-container">
                    <div class="qr-code">
                        <div class="qr-grid">
                            ${Array.from({length: 64}, (_, i) => `<div class="qr-pixel" style="--delay: ${Math.random() * 2}s"></div>`).join('')}
                        </div>
                        <div class="qr-logo">
                            <i class="fas fa-user"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="scanning-simulation">
                <div class="phone-mockup">
                    <div class="phone-screen">
                        <div class="camera-viewfinder">
                            <div class="scan-line"></div>
                            <div class="corner-frame top-left"></div>
                            <div class="corner-frame top-right"></div>
                            <div class="corner-frame bottom-left"></div>
                            <div class="corner-frame bottom-right"></div>
                        </div>
                        <div class="scan-success">
                            <i class="fas fa-check-circle"></i>
                            <span>Resume Accessed!</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="analytics-preview">
                <div class="stat-item">
                    <span class="stat-number">24</span>
                    <span class="stat-label">Scans</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number">18</span>
                    <span class="stat-label">Views</span>
                </div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .qr-demo {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 30px;
            padding: 20px;
        }
        
        .qr-generation-area {
            display: flex;
            align-items: center;
            gap: 20px;
        }
        
        .resume-icon {
            font-size: 40px;
            color: rgba(255, 255, 255, 0.9);
            animation: pulse 2s ease-in-out infinite;
        }
        
        .generation-arrow {
            font-size: 24px;
            color: rgba(255, 255, 255, 0.7);
            animation: slideArrow 2s ease-in-out infinite;
        }
        
        .qr-code-container {
            position: relative;
        }
        
        .qr-code {
            width: 120px;
            height: 120px;
            background: white;
            border-radius: 8px;
            padding: 10px;
            position: relative;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }
        
        .qr-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(8, 1fr);
            gap: 1px;
            width: 100%;
            height: 100%;
        }
        
        .qr-pixel {
            background: #000;
            opacity: 0;
            animation: pixelAppear 0.1s ease-out forwards;
            animation-delay: var(--delay);
        }
        
        .qr-pixel:nth-child(odd) {
            animation-delay: calc(var(--delay) + 0.5s);
        }
        
        .qr-logo {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: white;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: #667eea;
            border: 2px solid #667eea;
            opacity: 0;
            animation: logoAppear 0.5s ease-out 2s forwards;
        }
        
        .scanning-simulation {
            margin-top: 20px;
        }
        
        .phone-mockup {
            width: 80px;
            height: 140px;
            background: #333;
            border-radius: 15px;
            padding: 8px;
            position: relative;
        }
        
        .phone-screen {
            width: 100%;
            height: 100%;
            background: #000;
            border-radius: 8px;
            position: relative;
            overflow: hidden;
        }
        
        .camera-viewfinder {
            width: 100%;
            height: 100%;
            position: relative;
            background: rgba(255, 255, 255, 0.1);
        }
        
        .scan-line {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
            animation: scanLine 2s ease-in-out 3s infinite;
        }
        
        .corner-frame {
            position: absolute;
            width: 15px;
            height: 15px;
            border: 2px solid #10b981;
        }
        
        .corner-frame.top-left {
            top: 10px;
            left: 10px;
            border-right: none;
            border-bottom: none;
        }
        
        .corner-frame.top-right {
            top: 10px;
            right: 10px;
            border-left: none;
            border-bottom: none;
        }
        
        .corner-frame.bottom-left {
            bottom: 10px;
            left: 10px;
            border-right: none;
            border-top: none;
        }
        
        .corner-frame.bottom-right {
            bottom: 10px;
            right: 10px;
            border-left: none;
            border-top: none;
        }
        
        .scan-success {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            color: #10b981;
            font-size: 10px;
            opacity: 0;
            animation: successAppear 0.5s ease-out 5s forwards;
        }
        
        .scan-success i {
            font-size: 16px;
            margin-bottom: 4px;
            display: block;
        }
        
        .analytics-preview {
            display: flex;
            gap: 20px;
            margin-top: 10px;
        }
        
        .stat-item {
            text-align: center;
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 12px;
            border-radius: 8px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            opacity: 0;
            animation: statAppear 0.5s ease-out 6s forwards;
        }
        
        .stat-item:nth-child(2) {
            animation-delay: 6.2s;
        }
        
        .stat-number {
            display: block;
            font-size: 18px;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.9);
            animation: countUp 1s ease-out 6.5s forwards;
        }
        
        .stat-label {
            display: block;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.7);
            margin-top: 2px;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.1); opacity: 1; }
        }
        
        @keyframes slideArrow {
            0%, 100% { transform: translateX(0); opacity: 0.7; }
            50% { transform: translateX(5px); opacity: 1; }
        }
        
        @keyframes pixelAppear {
            to { opacity: 1; }
        }
        
        @keyframes logoAppear {
            to { opacity: 1; }
        }
        
        @keyframes scanLine {
            0% { transform: translateY(0); }
            50% { transform: translateY(120px); }
            100% { transform: translateY(0); }
        }
        
        @keyframes successAppear {
            to { opacity: 1; }
        }
        
        @keyframes statAppear {
            to { opacity: 1; }
        }
        
        @keyframes countUp {
            from { transform: scale(0.8); }
            to { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

function createDefaultAnimation(container) {
    container.innerHTML = `
        <div class="default-demo">
            <div class="feature-icon-animated">
                <i class="fas fa-cog"></i>
            </div>
            <div class="pulse-rings">
                <div class="pulse-ring"></div>
                <div class="pulse-ring"></div>
                <div class="pulse-ring"></div>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.innerHTML = `
        .default-demo {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }
        
        .feature-icon-animated {
            font-size: 60px;
            color: rgba(255, 255, 255, 0.9);
            z-index: 2;
            animation: rotate 4s linear infinite;
        }
        
        .pulse-rings {
            position: absolute;
        }
        
        .pulse-ring {
            position: absolute;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            animation: pulse-ring 2s ease-out infinite;
        }
        
        .pulse-ring:nth-child(1) {
            width: 100px;
            height: 100px;
            top: -50px;
            left: -50px;
            animation-delay: 0s;
        }
        
        .pulse-ring:nth-child(2) {
            width: 140px;
            height: 140px;
            top: -70px;
            left: -70px;
            animation-delay: 0.7s;
        }
        
        .pulse-ring:nth-child(3) {
            width: 180px;
            height: 180px;
            top: -90px;
            left: -90px;
            animation-delay: 1.4s;
        }
        
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-ring {
            0% {
                transform: scale(0.8);
                opacity: 1;
            }
            100% {
                transform: scale(1.2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize interactive demo
function initializeInteractiveDemo(featureId) {
    const demoContainer = document.querySelector('.demo-container');
    const feature = featureData[featureId];
    
    demoContainer.innerHTML = `
        <div class="demo-placeholder">
            <div class="demo-icon">
                <i class="${feature.icon}"></i>
            </div>
            <h3>Interactive Demo</h3>
            <p>Experience ${feature.title} in action</p>
            <button class="demo-btn" onclick="startDemo('${featureId}')">
                <i class="fas fa-play"></i>
                Start Demo
            </button>
        </div>
    `;
}

// Start interactive demo
function startDemo(featureId) {
    const demoContainer = document.querySelector('.demo-container');
    demoContainer.innerHTML = `
        <div class="demo-active">
            <div class="demo-loading">
                <div class="loading-spinner"></div>
                <p>Loading interactive demo...</p>
            </div>
        </div>
    `;
    
    // Simulate demo loading
    setTimeout(() => {
        demoContainer.innerHTML = `
            <div class="demo-content">
                <h4>Demo: ${featureData[featureId].title}</h4>
                <p>This would be an interactive demonstration of the feature.</p>
                <div class="demo-controls">
                    <button onclick="initializeInteractiveDemo('${featureId}')">Reset Demo</button>
                </div>
            </div>
        `;
    }, 2000);
}

// Try feature function
function tryFeature() {
    // Get current feature from URL or default
    const urlParams = new URLSearchParams(window.location.search);
    const currentFeature = urlParams.get('feature') || 'ai-content';
    
    // Redirect to feature demo page
    window.location.href = `feature-demo.html?feature=${currentFeature}`;
}

// Go back to features
function goBack() {
    window.location.href = 'index.html#features';
}

// Initialize animations
function initializeAnimations() {
    // Fade in animations
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
    document.querySelectorAll('.feature-content-card, .interactive-demo, .tech-specs, .related-features').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Create background elements
function createBackgroundElements() {
    const backgroundAnimation = document.querySelector('.background-animation');
    if (!backgroundAnimation) return;
    
    // Create floating shapes
    for (let i = 0; i < 10; i++) {
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
        shape.style.animation = `float ${duration}s ease-in-out infinite`;
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
});

// Add CSS for demo styles
const demoStyles = document.createElement('style');
demoStyles.innerHTML = `
    .demo-placeholder {
        text-align: center;
        padding: 40px;
    }
    
    .demo-icon {
        font-size: 48px;
        color: #4f46e5;
        margin-bottom: 20px;
    }
    
    .demo-placeholder h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        color: #1e293b;
    }
    
    .demo-placeholder p {
        color: #64748b;
        margin-bottom: 30px;
    }
    
    .demo-btn {
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0 auto;
        transition: all 0.3s ease;
    }
    
    .demo-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
    }
    
    .demo-loading {
        text-align: center;
        padding: 40px;
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
    
    .demo-content {
        text-align: center;
        padding: 40px;
    }
    
    .demo-content h4 {
        font-size: 1.3rem;
        margin-bottom: 15px;
        color: #1e293b;
    }
    
    .demo-controls {
        margin-top: 20px;
    }
    
    .demo-controls button {
        background: #f1f5f9;
        border: 1px solid #cbd5e1;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .demo-controls button:hover {
        background: #e2e8f0;
    }
`;
document.head.appendChild(demoStyles);