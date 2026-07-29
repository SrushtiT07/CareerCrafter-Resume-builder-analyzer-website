// Feature Demo JavaScript

// Demo configurations for different features
const demoConfigs = {
    'ai-content': {
        title: 'AI Content Generation Demo',
        subtitle: 'Experience the power of AI-generated resume content in real-time',
        icon: 'fas fa-robot',
        instructions: [
            'Enter your job title and industry',
            'Provide a brief description of your experience',
            'Click "Generate Content" to see AI magic',
            'Review and refine the generated content',
            'Copy the results to use in your resume'
        ],
        tips: [
            'Be specific about your job title for better results',
            'Include key skills and technologies you use',
            'Mention your years of experience',
            'The more context you provide, the better the output'
        ]
    },
    'smart-suggestions': {
        title: 'Smart Suggestions Demo',
        subtitle: 'Get AI-powered recommendations to improve your resume content',
        icon: 'fas fa-magic',
        instructions: [
            'Upload your resume or paste content',
            'Wait for AI analysis to complete',
            'Review suggested improvements',
            'Apply suggestions you like',
            'Download the improved version'
        ],
        tips: [
            'Upload in PDF, DOC, or DOCX format',
            'Ensure text is readable (not scanned images)',
            'Review each suggestion carefully',
            'You can apply or dismiss individual suggestions'
        ]
    },
    'realtime-feedback': {
        title: 'Real-Time Feedback Demo',
        subtitle: 'Get instant feedback as you write your resume content',
        icon: 'fas fa-comments',
        instructions: [
            'Start typing your resume content',
            'Watch real-time suggestions appear',
            'See grammar and style improvements',
            'Get ATS optimization tips',
            'Apply suggestions with one click'
        ],
        tips: [
            'Write naturally - AI will help improve it',
            'Pay attention to keyword suggestions',
            'Use action verbs for better impact',
            'Keep sentences concise and clear'
        ]
    },
    'mock-interview': {
        title: 'Mock Interview Demo',
        subtitle: 'Practice interviews with AI-powered questions and feedback',
        icon: 'fas fa-microphone',
        instructions: [
            'Select your target job role',
            'Choose interview difficulty level',
            'Answer questions using voice or text',
            'Get instant feedback on your responses',
            'Review detailed performance analysis'
        ],
        tips: [
            'Practice common behavioral questions',
            'Use the STAR method for responses',
            'Speak clearly and at moderate pace',
            'Review feedback to improve weak areas'
        ]
    },
    'cover-letter': {
        title: 'Built-in Cover Letter Demo',
        subtitle: 'Generate personalized cover letters that match your resume',
        icon: 'fas fa-file-alt',
        instructions: [
            'Enter the job posting details',
            'Select your resume template',
            'AI generates matching cover letter',
            'Customize tone and style',
            'Download in multiple formats'
        ],
        tips: [
            'Include specific company details',
            'Mention relevant achievements',
            'Keep it concise (one page max)',
            'Match the tone to company culture'
        ]
    },
    'templates': {
        title: 'Template Gallery Demo',
        subtitle: 'Explore professional resume templates designed for different industries',
        icon: 'fas fa-palette',
        instructions: [
            'Browse available templates',
            'Filter by industry or style',
            'Preview templates with sample content',
            'Click "Use Template" to start building',
            'Customize colors and fonts to match your style'
        ],
        tips: [
            'Choose templates that match your industry',
            'Consider ATS-friendly designs for corporate jobs',
            'Creative fields can use more colorful templates',
            'Preview how your content looks before deciding'
        ]
    },
    'skill-recommendations': {
        title: 'Skill Recommendations Demo',
        subtitle: 'AI suggests relevant skills based on your industry and experience',
        icon: 'fas fa-lightbulb',
        instructions: [
            'Enter your job title and industry',
            'Add your current skills',
            'Get AI-powered skill suggestions',
            'Select skills that match your experience',
            'See how skills improve your profile strength'
        ],
        tips: [
            'Include both technical and soft skills',
            'Be honest about your skill levels',
            'Focus on skills relevant to your target role',
            'Update skills regularly as you learn'
        ]
    },
    'export-formats': {
        title: 'Export Formats Demo',
        subtitle: 'Export your resume in multiple formats and sharing options',
        icon: 'fas fa-download',
        instructions: [
            'Choose your preferred export format',
            'Customize export settings',
            'Preview before downloading',
            'Generate shareable links',
            'Track views and downloads'
        ],
        tips: [
            'PDF is best for most applications',
            'Word format for ATS systems',
            'Use shareable links for online applications',
            'Check formatting after export'
        ]
    },
    'ats-optimization': {
        title: 'ATS Optimization Demo',
        subtitle: 'Ensure your resume passes Applicant Tracking Systems',
        icon: 'fas fa-shield-alt',
        instructions: [
            'Upload your resume for ATS analysis',
            'Review compatibility score',
            'See specific improvement suggestions',
            'Apply ATS-friendly formatting',
            'Test with different ATS systems'
        ],
        tips: [
            'Use standard fonts and formatting',
            'Include relevant keywords',
            'Avoid complex layouts and graphics',
            'Test your resume with multiple ATS systems'
        ]
    },
    'qr-code-generator': {
        title: 'QR Code Generator Demo',
        subtitle: 'Generate QR codes linking to your digital resume',
        icon: 'fas fa-qrcode',
        instructions: [
            'Enter your resume URL or upload your resume',
            'Customize QR code appearance and branding',
            'Generate your unique QR code',
            'Download in various formats (PNG, SVG, PDF)',
            'Track scans and engagement analytics'
        ],
        tips: [
            'Use high contrast colors for better scanning',
            'Test QR code with multiple devices',
            'Include your logo for professional branding',
            'Consider adding a call-to-action around the QR code'
        ]
    }
};

// Current demo state
let currentDemo = null;
let demoData = {};

// Initialize demo page
document.addEventListener('DOMContentLoaded', function() {
    // Get feature from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const feature = urlParams.get('feature') || 'ai-content';
    
    initializeDemo(feature);
    
    // Update user count periodically
    updateUserCount();
    setInterval(updateUserCount, 30000); // Update every 30 seconds
});

// Initialize specific demo
function initializeDemo(featureId) {
    currentDemo = featureId;
    const config = demoConfigs[featureId];
    
    if (!config) {
        console.error('Demo configuration not found for:', featureId);
        return;
    }
    
    // Update page title and meta
    document.title = `${config.title} - CareerCrafter`;
    
    // Update header content
    document.getElementById('demo-icon').innerHTML = `<i class="${config.icon}"></i>`;
    document.getElementById('demo-title').textContent = config.title;
    document.getElementById('demo-subtitle').textContent = config.subtitle;
    
    // Update instructions
    const instructionsList = config.instructions.map(instruction => 
        `<li>${instruction}</li>`
    ).join('');
    document.getElementById('demo-instructions').innerHTML = `<ol>${instructionsList}</ol>`;
    
    // Update tips
    const tipsList = config.tips.map(tip => 
        `<li>${tip}</li>`
    ).join('');
    document.getElementById('demo-tips-content').innerHTML = `<ul>${tipsList}</ul>`;
    
    // Load demo interface
    loadDemoInterface(featureId);
}

// Load specific demo interface
function loadDemoInterface(featureId) {
    const demoInterface = document.getElementById('demo-interface');
    
    switch(featureId) {
        case 'ai-content':
            demoInterface.innerHTML = createAIContentDemo();
            break;
        case 'smart-suggestions':
            demoInterface.innerHTML = createSmartSuggestionsDemo();
            setupFileUpload();
            break;
        case 'realtime-feedback':
            demoInterface.innerHTML = createRealtimeFeedbackDemo();
            setupRealtimeFeedback();
            break;
        case 'mock-interview':
            demoInterface.innerHTML = createMockInterviewDemo();
            setupMockInterview();
            break;
        case 'cover-letter':
            demoInterface.innerHTML = createCoverLetterDemo();
            break;
        case 'templates':
            demoInterface.innerHTML = createTemplateGalleryDemo();
            loadTemplates();
            break;
        case 'skill-recommendations':
            demoInterface.innerHTML = createSkillRecommendationsDemo();
            break;
        case 'export-formats':
            demoInterface.innerHTML = createExportFormatsDemo();
            break;
        case 'ats-optimization':
            demoInterface.innerHTML = createATSOptimizationDemo();
            break;
        case 'qr-code-generator':
            demoInterface.innerHTML = createQRCodeGeneratorDemo();
            setupQRCodeGenerator();
            break;
        default:
            demoInterface.innerHTML = '<p>Demo not available for this feature.</p>';
    }
}

// Create AI Content Generation Demo
function createAIContentDemo() {
    return `
        <div class="ai-content-demo">
            <div class="demo-input-section">
                <h3><i class="fas fa-edit"></i> Input Information</h3>
                
                <div class="form-group">
                    <label for="jobTitle">Job Title</label>
                    <input type="text" id="jobTitle" placeholder="e.g., Senior Software Engineer">
                </div>
                
                <div class="form-group">
                    <label for="industry">Industry</label>
                    <select id="industry">
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>
                        <option value="education">Education</option>
                        <option value="retail">Retail</option>
                        <option value="manufacturing">Manufacturing</option>
                        <option value="consulting">Consulting</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="experience">Years of Experience</label>
                    <select id="experience">
                        <option value="">Select Experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="2-3">2-3 years</option>
                        <option value="4-6">4-6 years</option>
                        <option value="7-10">7-10 years</option>
                        <option value="10+">10+ years</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="skills">Key Skills (comma-separated)</label>
                    <textarea id="skills" placeholder="e.g., JavaScript, React, Node.js, Python, AWS"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="achievements">Key Achievements (optional)</label>
                    <textarea id="achievements" placeholder="e.g., Led team of 5 developers, Increased performance by 40%"></textarea>
                </div>
                
                <button class="generate-btn" onclick="generateAIContent()">
                    <i class="fas fa-magic"></i>
                    Generate Content
                </button>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-sparkles"></i> Generated Content</h3>
                <div class="demo-output" id="aiOutput">
                    <p style="color: #666; text-align: center; margin-top: 2rem;">
                        Fill in the information on the left and click "Generate Content" to see AI-powered resume content.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Create Smart Suggestions Demo
function createSmartSuggestionsDemo() {
    return `
        <div class="smart-suggestions-demo">
            <div class="upload-section" onclick="document.getElementById('fileInput').click()">
                <div class="upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text">
                    <h3>Upload Your Resume</h3>
                    <p>Drag and drop your resume here, or click to browse</p>
                    <p style="font-size: 0.8rem; margin-top: 0.5rem;">Supports PDF, DOC, DOCX files up to 5MB</p>
                </div>
                <input type="file" id="fileInput" class="file-input" accept=".pdf,.doc,.docx" onchange="handleFileUpload(event)">
            </div>
            
            <div class="suggestions-results" id="suggestionsResults" style="display: none;">
                <div class="original-content">
                    <h3>Original Content</h3>
                    <div id="originalText"></div>
                </div>
                
                <div class="suggested-improvements">
                    <h3>Suggested Improvements</h3>
                    <div id="suggestions"></div>
                </div>
            </div>
        </div>
    `;
}

// Create Template Gallery Demo
function createTemplateGalleryDemo() {
    return `
        <div class="template-gallery-demo">
            <div class="template-filters">
                <div class="filter-group">
                    <label>Industry</label>
                    <select id="industryFilter" onchange="filterTemplates()">
                        <option value="">All Industries</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="creative">Creative</option>
                        <option value="education">Education</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Style</label>
                    <select id="styleFilter" onchange="filterTemplates()">
                        <option value="">All Styles</option>
                        <option value="modern">Modern</option>
                        <option value="classic">Classic</option>
                        <option value="creative">Creative</option>
                        <option value="minimal">Minimal</option>
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>ATS-Friendly</label>
                    <select id="atsFilter" onchange="filterTemplates()">
                        <option value="">All Templates</option>
                        <option value="true">ATS-Friendly Only</option>
                    </select>
                </div>
            </div>
            
            <div class="templates-grid" id="templatesGrid">
                <!-- Templates will be loaded here -->
            </div>
        </div>
    `;
}

// Create Skill Recommendations Demo
function createSkillRecommendationsDemo() {
    return `
        <div class="skill-recommendations-demo">
            <div class="demo-input-section">
                <h3><i class="fas fa-user-tie"></i> Your Profile</h3>
                
                <div class="form-group">
                    <label for="skillJobTitle">Job Title</label>
                    <input type="text" id="skillJobTitle" placeholder="e.g., Frontend Developer">
                </div>
                
                <div class="form-group">
                    <label for="skillIndustry">Industry</label>
                    <select id="skillIndustry">
                        <option value="">Select Industry</option>
                        <option value="technology">Technology</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="finance">Finance</option>
                        <option value="marketing">Marketing</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="currentSkills">Current Skills</label>
                    <textarea id="currentSkills" placeholder="List your current skills..."></textarea>
                </div>
                
                <button class="generate-btn" onclick="generateSkillRecommendations()">
                    <i class="fas fa-lightbulb"></i>
                    Get Skill Recommendations
                </button>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-chart-line"></i> Recommended Skills</h3>
                <div class="demo-output" id="skillOutput">
                    <p style="color: #666; text-align: center; margin-top: 2rem;">
                        Enter your profile information to get personalized skill recommendations.
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Create Export Formats Demo
function createExportFormatsDemo() {
    return `
        <div class="export-formats-demo">
            <h3><i class="fas fa-download"></i> Export Options</h3>
            <p>Choose how you want to export and share your resume:</p>
            
            <div class="export-options">
                <div class="export-option">
                    <h4><i class="fas fa-file-pdf"></i> PDF Export</h4>
                    <p>Perfect for job applications and printing</p>
                    <button class="btn-primary" onclick="simulateExport('pdf')">Export as PDF</button>
                </div>
                
                <div class="export-option">
                    <h4><i class="fas fa-file-word"></i> Word Document</h4>
                    <p>Editable format for further customization</p>
                    <button class="btn-primary" onclick="simulateExport('docx')">Export as DOCX</button>
                </div>
                
                <div class="export-option">
                    <h4><i class="fas fa-link"></i> Shareable Link</h4>
                    <p>Online version with tracking analytics</p>
                    <button class="btn-primary" onclick="simulateExport('link')">Generate Link</button>
                </div>
            </div>
        </div>
    `;
}

// Create ATS Optimization Demo
function createATSOptimizationDemo() {
    return `
        <div class="ats-optimization-demo">
            <h3><i class="fas fa-shield-alt"></i> ATS Compatibility Check</h3>
            <p>Upload your resume to check ATS compatibility:</p>
            
            <div class="upload-section" onclick="document.getElementById('atsFileInput').click()">
                <div class="upload-icon">
                    <i class="fas fa-shield-alt"></i>
                </div>
                <div class="upload-text">
                    <h3>Upload Resume for ATS Analysis</h3>
                    <p>We'll analyze your resume for ATS compatibility</p>
                </div>
                <input type="file" id="atsFileInput" class="file-input" accept=".pdf,.doc,.docx" onchange="analyzeATS(event)">
            </div>
            
            <div id="atsResults" style="display: none;">
                <!-- ATS results will be shown here -->
            </div>
        </div>
    `;
}

// Generate AI Content
function generateAIContent() {
    const jobTitle = document.getElementById('jobTitle').value;
    const industry = document.getElementById('industry').value;
    const experience = document.getElementById('experience').value;
    const skills = document.getElementById('skills').value;
    const achievements = document.getElementById('achievements').value;
    
    if (!jobTitle || !industry) {
        showNotification('Please fill in at least the job title and industry.', 'error');
        return;
    }
    
    const button = document.querySelector('.generate-btn');
    const originalText = button.innerHTML;
    
    const output = document.getElementById('aiOutput');
    output.className = 'demo-output loading';
    output.innerHTML = '<div class="loading-spinner"></div><p style="text-align: center; margin-top: 1rem;">Generating AI content...</p>';
    
    // Add loading to button
    addLoadingToButton(button, originalText);
    
    // Simulate AI generation delay
    setTimeout(() => {
        const generatedContent = generateSampleContent(jobTitle, industry, experience, skills, achievements);
        output.className = 'demo-output';
        output.innerHTML = generatedContent;
        
        // Show results section
        const resultsSection = document.getElementById('demo-results');
        if (resultsSection) {
            resultsSection.style.display = 'block';
            document.getElementById('results-content').innerHTML = `
                <h3>Content Generated Successfully!</h3>
                <p>Your AI-generated resume content is ready. You can now copy this content and use it in your resume.</p>
                <div class="results-stats">
                    <div class="stat">
                        <span class="stat-number">95%</span>
                        <span class="stat-label">ATS Compatibility</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">8.5/10</span>
                        <span class="stat-label">Content Quality</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">12</span>
                        <span class="stat-label">Keywords Included</span>
                    </div>
                </div>
            `;
        }
    }, 2000);
}

// Generate sample content based on inputs
function generateSampleContent(jobTitle, industry, experience, skills, achievements) {
    const skillsArray = skills.split(',').map(s => s.trim()).filter(s => s);
    const achievementsArray = achievements.split(',').map(a => a.trim()).filter(a => a);
    
    return `
        <div class="generated-content">
            <h4>Professional Summary</h4>
            <p>Results-driven ${jobTitle} with ${experience || '3+'} years of experience in the ${industry} industry. Proven track record of delivering high-quality solutions and driving business growth through innovative approaches and technical expertise.</p>
            
            <h4>Key Skills</h4>
            <ul>
                ${skillsArray.slice(0, 6).map(skill => `<li>${skill}</li>`).join('')}
                <li>Problem-solving and analytical thinking</li>
                <li>Team collaboration and leadership</li>
            </ul>
            
            <h4>Professional Experience Bullet Points</h4>
            <ul>
                <li>Led cross-functional teams to deliver projects 20% ahead of schedule</li>
                <li>Implemented innovative solutions that improved efficiency by 35%</li>
                <li>Collaborated with stakeholders to define requirements and ensure alignment</li>
                ${achievementsArray.slice(0, 2).map(achievement => `<li>${achievement}</li>`).join('')}
            </ul>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196f3;">
                <strong>💡 AI Tip:</strong> This content is optimized for ATS systems and includes industry-relevant keywords. You can further customize it to match specific job requirements.
            </div>
        </div>
    `;
}

// Handle file upload for smart suggestions
function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    // Simulate file processing
    const uploadSection = document.querySelector('.upload-section');
    uploadSection.innerHTML = `
        <div class="upload-icon">
            <i class="fas fa-spinner fa-spin"></i>
        </div>
        <div class="upload-text">
            <h3>Processing ${file.name}...</h3>
            <p>Analyzing your resume content</p>
        </div>
    `;
    
    setTimeout(() => {
        showSmartSuggestions(file.name);
    }, 3000);
}

// Show smart suggestions results
function showSmartSuggestions(filename) {
    document.getElementById('suggestionsResults').style.display = 'grid';
    
    // Sample original content
    document.getElementById('originalText').innerHTML = `
        <h4>Current Resume Content</h4>
        <p><strong>Professional Summary:</strong></p>
        <p>Experienced software developer with 5 years of experience. Good at programming and working with teams.</p>
        
        <p><strong>Skills:</strong></p>
        <p>JavaScript, HTML, CSS, some Python</p>
        
        <p><strong>Experience:</strong></p>
        <p>Software Developer at ABC Company (2019-2024)</p>
        <p>- Worked on various projects</p>
        <p>- Helped team members</p>
        <p>- Fixed bugs</p>
    `;
    
    // Sample suggestions
    document.getElementById('suggestions').innerHTML = `
        <div class="suggestion-item">
            <div class="suggestion-type">Professional Summary</div>
            <div class="suggestion-text">
                <strong>Suggested improvement:</strong><br>
                "Results-driven software developer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications and collaborating effectively in agile environments."
            </div>
            <div class="suggestion-actions">
                <button class="apply-btn" onclick="applySuggestion(this)">Apply</button>
                <button class="dismiss-btn" onclick="dismissSuggestion(this)">Dismiss</button>
            </div>
        </div>
        
        <div class="suggestion-item">
            <div class="suggestion-type">Skills Enhancement</div>
            <div class="suggestion-text">
                <strong>Add missing skills:</strong><br>
                React.js, Node.js, Git, Agile/Scrum, RESTful APIs
            </div>
            <div class="suggestion-actions">
                <button class="apply-btn" onclick="applySuggestion(this)">Apply</button>
                <button class="dismiss-btn" onclick="dismissSuggestion(this)">Dismiss</button>
            </div>
        </div>
        
        <div class="suggestion-item">
            <div class="suggestion-type">Experience Bullets</div>
            <div class="suggestion-text">
                <strong>Quantify achievements:</strong><br>
                "• Developed and maintained 15+ web applications serving 10,000+ users<br>
                • Mentored 3 junior developers, improving team productivity by 25%<br>
                • Resolved 95% of critical bugs within 24 hours, improving system reliability"
            </div>
            <div class="suggestion-actions">
                <button class="apply-btn" onclick="applySuggestion(this)">Apply</button>
                <button class="dismiss-btn" onclick="dismissSuggestion(this)">Dismiss</button>
            </div>
        </div>
    `;
}

// Apply suggestion
function applySuggestion(button) {
    const suggestionItem = button.closest('.suggestion-item');
    suggestionItem.style.background = '#e8f5e8';
    suggestionItem.style.borderLeftColor = '#4CAF50';
    button.textContent = 'Applied';
    button.disabled = true;
    button.style.background = '#4CAF50';
}

// Dismiss suggestion
function dismissSuggestion(button) {
    const suggestionItem = button.closest('.suggestion-item');
    suggestionItem.style.opacity = '0.5';
    button.textContent = 'Dismissed';
    button.disabled = true;
}

// Load templates for template gallery
function loadTemplates() {
    const templatesGrid = document.getElementById('templatesGrid');
    
    const sampleTemplates = [
        {
            id: 1,
            name: 'Modern Professional',
            description: 'Clean, modern design perfect for tech professionals',
            industry: 'technology',
            style: 'modern',
            ats: true,
            tags: ['ATS-Friendly', 'Modern', 'Tech']
        },
        {
            id: 2,
            name: 'Classic Executive',
            description: 'Traditional layout ideal for senior positions',
            industry: 'finance',
            style: 'classic',
            ats: true,
            tags: ['Executive', 'Classic', 'Professional']
        },
        {
            id: 3,
            name: 'Creative Portfolio',
            description: 'Colorful design for creative professionals',
            industry: 'creative',
            style: 'creative',
            ats: false,
            tags: ['Creative', 'Portfolio', 'Colorful']
        },
        {
            id: 4,
            name: 'Healthcare Professional',
            description: 'Clean, trustworthy design for healthcare workers',
            industry: 'healthcare',
            style: 'minimal',
            ats: true,
            tags: ['Healthcare', 'Clean', 'Minimal']
        },
        {
            id: 5,
            name: 'Academic Scholar',
            description: 'Formal layout for academic positions',
            industry: 'education',
            style: 'classic',
            ats: true,
            tags: ['Academic', 'Formal', 'Research']
        },
        {
            id: 6,
            name: 'Startup Innovator',
            description: 'Dynamic design for startup environments',
            industry: 'technology',
            style: 'modern',
            ats: true,
            tags: ['Startup', 'Innovation', 'Dynamic']
        }
    ];
    
    renderTemplates(sampleTemplates);
}

// Render templates
function renderTemplates(templates) {
    const templatesGrid = document.getElementById('templatesGrid');
    
    templatesGrid.innerHTML = templates.map(template => `
        <div class="template-card" data-industry="${template.industry}" data-style="${template.style}" data-ats="${template.ats}">
            <div class="template-preview"></div>
            <div class="template-info">
                <h4>${template.name}</h4>
                <p>${template.description}</p>
                <div class="template-tags">
                    ${template.tags.map(tag => `<span class="template-tag">${tag}</span>`).join('')}
                </div>
                <div class="template-actions">
                    <button class="preview-btn" onclick="previewTemplate(${template.id})">Preview</button>
                    <button class="use-btn" onclick="useTemplate(${template.id})">Use Template</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter templates
function filterTemplates() {
    const industryFilter = document.getElementById('industryFilter').value;
    const styleFilter = document.getElementById('styleFilter').value;
    const atsFilter = document.getElementById('atsFilter').value;
    
    const templateCards = document.querySelectorAll('.template-card');
    
    templateCards.forEach(card => {
        const industry = card.dataset.industry;
        const style = card.dataset.style;
        const ats = card.dataset.ats;
        
        let show = true;
        
        if (industryFilter && industry !== industryFilter) show = false;
        if (styleFilter && style !== styleFilter) show = false;
        if (atsFilter === 'true' && ats !== 'true') show = false;
        
        card.style.display = show ? 'block' : 'none';
    });
}

// Preview template
function previewTemplate(templateId) {
    alert(`Preview for template ${templateId} would open in a new window.`);
}

// Use template
function useTemplate(templateId) {
    if (window.auth && window.auth.currentUser) {
        alert(`Template ${templateId} selected! Redirecting to resume builder...`);
        // In real implementation, this would redirect to resume builder with selected template
    } else {
        showAuthModal('signup');
    }
}

// Generate skill recommendations
function generateSkillRecommendations() {
    const jobTitle = document.getElementById('skillJobTitle').value;
    const industry = document.getElementById('skillIndustry').value;
    
    if (!jobTitle || !industry) {
        alert('Please fill in job title and industry.');
        return;
    }
    
    const output = document.getElementById('skillOutput');
    output.className = 'demo-output loading';
    output.innerHTML = 'Analyzing and generating skill recommendations...';
    
    setTimeout(() => {
        const recommendations = generateSkillSuggestions(jobTitle, industry);
        output.className = 'demo-output';
        output.innerHTML = recommendations;
    }, 2000);
}

// Generate skill suggestions based on job title and industry
function generateSkillSuggestions(jobTitle, industry) {
    const skillSuggestions = {
        technology: ['JavaScript', 'Python', 'React', 'Node.js', 'AWS', 'Docker', 'Git', 'Agile/Scrum'],
        healthcare: ['Patient Care', 'Medical Records', 'HIPAA Compliance', 'Clinical Research', 'EMR Systems'],
        finance: ['Financial Analysis', 'Risk Management', 'Excel', 'SQL', 'Regulatory Compliance', 'Bloomberg Terminal'],
        marketing: ['Digital Marketing', 'SEO/SEM', 'Google Analytics', 'Social Media', 'Content Strategy', 'A/B Testing']
    };
    
    const skills = skillSuggestions[industry] || ['Communication', 'Leadership', 'Problem Solving', 'Project Management'];
    
    return `
        <div class="generated-content">
            <h4>Recommended Skills for ${jobTitle}</h4>
            <p>Based on current market trends and job requirements in ${industry}:</p>
            
            <div class="skill-categories">
                <div class="skill-category">
                    <h5>Technical Skills</h5>
                    <div class="skills-list">
                        ${skills.slice(0, 4).map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>
                
                <div class="skill-category">
                    <h5>Soft Skills</h5>
                    <div class="skills-list">
                        <span class="skill-item">Leadership</span>
                        <span class="skill-item">Communication</span>
                        <span class="skill-item">Problem Solving</span>
                        <span class="skill-item">Team Collaboration</span>
                    </div>
                </div>
                
                <div class="skill-category">
                    <h5>Industry-Specific</h5>
                    <div class="skills-list">
                        ${skills.slice(4).map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>
            </div>
            
            <div style="margin-top: 1.5rem; padding: 1rem; background: #fff3e0; border-radius: 8px; border-left: 4px solid #ff9800;">
                <strong>💡 Pro Tip:</strong> Focus on skills that appear in multiple job postings for your target role. Consider getting certifications for technical skills to stand out.
            </div>
        </div>
    `;
}

// Simulate export functionality
function simulateExport(format) {
    const formatNames = {
        pdf: 'PDF',
        docx: 'Word Document',
        link: 'Shareable Link'
    };
    
    alert(`${formatNames[format]} export started! In a real application, your resume would be downloaded or a shareable link would be generated.`);
}

// Analyze ATS compatibility
function analyzeATS(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const results = document.getElementById('atsResults');
    results.style.display = 'block';
    results.innerHTML = `
        <div class="ats-analysis">
            <h4>ATS Compatibility Analysis</h4>
            <div class="ats-score">
                <div class="score-circle">
                    <span class="score">85%</span>
                </div>
                <div class="score-details">
                    <h5>Good ATS Compatibility</h5>
                    <p>Your resume is likely to pass most ATS systems</p>
                </div>
            </div>
            
            <div class="ats-recommendations">
                <h5>Recommendations:</h5>
                <ul>
                    <li>✅ Uses standard fonts and formatting</li>
                    <li>✅ Contains relevant keywords</li>
                    <li>⚠️ Consider adding more industry-specific terms</li>
                    <li>⚠️ Some formatting may not be ATS-friendly</li>
                </ul>
            </div>
        </div>
    `;
}

// Setup file upload drag and drop
function setupFileUpload() {
    const uploadSection = document.querySelector('.upload-section');
    
    uploadSection.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadSection.classList.add('dragover');
    });
    
    uploadSection.addEventListener('dragleave', () => {
        uploadSection.classList.remove('dragover');
    });
    
    uploadSection.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadSection.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            document.getElementById('fileInput').files = files;
            handleFileUpload({ target: { files: files } });
        }
    });
}

// Update user count
function updateUserCount() {
    const count = Math.floor(Math.random() * 100) + 1200;
    const element = document.getElementById('demo-users-count');
    if (element) {
        element.textContent = count.toLocaleString();
    }
}

// Show help modal
function showHelpModal() {
    showNotification('Help feature coming soon! For now, try the demo features above.', 'info');
}

// Show notification
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 400);
    }, 4000);
}

// Add loading animation to buttons
function addLoadingToButton(button, originalText) {
    button.disabled = true;
    button.innerHTML = `
        <div class="loading-spinner" style="width: 20px; height: 20px; margin: 0; border-width: 2px;"></div>
        <span>Processing...</span>
    `;
    
    // Simulate processing time
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
        showNotification('Content generated successfully!', 'success');
    }, 2000);
}

// Demo action functions
function saveDemo() {
    if (window.auth && window.auth.currentUser) {
        alert('Demo results saved to your account!');
    } else {
        showAuthModal('signup');
    }
}

function resetDemo() {
    if (confirm('Are you sure you want to reset the demo?')) {
        location.reload();
    }
}

function shareDemo() {
    const url = window.location.href;
    if (navigator.share) {
        navigator.share({
            title: 'Check out this CareerCrafter feature demo!',
            url: url
        });
    } else {
        navigator.clipboard.writeText(url).then(() => {
            alert('Demo link copied to clipboard!');
        });
    }
}

function goBackToFeature() {
    const urlParams = new URLSearchParams(window.location.search);
    const feature = urlParams.get('feature') || 'ai-content';
    window.location.href = `feature-details.html?feature=${feature}`;
}

// Create Real-time Feedback Demo
function createRealtimeFeedbackDemo() {
    return `
        <div class="demo-sections">
            <div class="demo-input-section">
                <h3><i class="fas fa-edit"></i> Write Your Resume Content</h3>
                <div class="form-group">
                    <label for="realtimeContent">Start typing your resume content:</label>
                    <textarea id="realtimeContent" placeholder="e.g., Experienced software engineer with 5+ years developing web applications..." rows="8"></textarea>
                </div>
                <div class="feedback-settings">
                    <h4>Feedback Settings</h4>
                    <div class="settings-grid">
                        <label class="checkbox-label">
                            <input type="checkbox" id="grammarCheck" checked>
                            <span>Grammar & Spelling</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="atsCheck" checked>
                            <span>ATS Optimization</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="keywordCheck" checked>
                            <span>Keyword Suggestions</span>
                        </label>
                        <label class="checkbox-label">
                            <input type="checkbox" id="styleCheck" checked>
                            <span>Style Improvements</span>
                        </label>
                    </div>
                </div>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-comments"></i> Real-time Feedback</h3>
                <div id="realtimeFeedback" class="demo-output">
                    <div class="feedback-placeholder">
                        <i class="fas fa-lightbulb"></i>
                        <p>Start typing to see real-time suggestions and improvements!</p>
                    </div>
                </div>
                
                <div class="feedback-stats" style="display: none;">
                    <div class="stat-item">
                        <span class="stat-number" id="improvementCount">0</span>
                        <span class="stat-label">Improvements</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="atsScore">0%</span>
                        <span class="stat-label">ATS Score</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="readabilityScore">0</span>
                        <span class="stat-label">Readability</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Create Mock Interview Demo
function createMockInterviewDemo() {
    return `
        <div class="demo-sections">
            <div class="demo-input-section">
                <h3><i class="fas fa-user-tie"></i> Interview Setup</h3>
                <div class="form-group">
                    <label for="interviewRole">Target Job Role:</label>
                    <select id="interviewRole">
                        <option value="">Select a role...</option>
                        <option value="software-engineer">Software Engineer</option>
                        <option value="product-manager">Product Manager</option>
                        <option value="data-scientist">Data Scientist</option>
                        <option value="marketing-manager">Marketing Manager</option>
                        <option value="sales-representative">Sales Representative</option>
                        <option value="business-analyst">Business Analyst</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="interviewLevel">Difficulty Level:</label>
                    <select id="interviewLevel">
                        <option value="entry">Entry Level</option>
                        <option value="mid">Mid Level</option>
                        <option value="senior">Senior Level</option>
                        <option value="executive">Executive Level</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="interviewType">Interview Type:</label>
                    <select id="interviewType">
                        <option value="behavioral">Behavioral Questions</option>
                        <option value="technical">Technical Questions</option>
                        <option value="situational">Situational Questions</option>
                        <option value="mixed">Mixed Interview</option>
                    </select>
                </div>
                
                <button class="generate-btn" onclick="startMockInterview()">
                    <i class="fas fa-play"></i>
                    Start Interview
                </button>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-microphone"></i> Interview Session</h3>
                <div id="interviewOutput" class="demo-output">
                    <div class="interview-placeholder">
                        <i class="fas fa-microphone-alt"></i>
                        <p>Configure your interview settings and click "Start Interview" to begin!</p>
                    </div>
                </div>
                
                <div class="interview-controls" style="display: none;">
                    <button class="btn-secondary" onclick="recordAnswer()">
                        <i class="fas fa-microphone"></i>
                        Record Answer
                    </button>
                    <button class="btn-outline" onclick="typeAnswer()">
                        <i class="fas fa-keyboard"></i>
                        Type Answer
                    </button>
                    <button class="btn-outline" onclick="skipQuestion()">
                        <i class="fas fa-forward"></i>
                        Skip Question
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create Cover Letter Demo
function createCoverLetterDemo() {
    return `
        <div class="demo-sections">
            <div class="demo-input-section">
                <h3><i class="fas fa-briefcase"></i> Job Details</h3>
                <div class="form-group">
                    <label for="companyName">Company Name:</label>
                    <input type="text" id="companyName" placeholder="e.g., Google, Microsoft, Apple">
                </div>
                
                <div class="form-group">
                    <label for="jobPosition">Job Position:</label>
                    <input type="text" id="jobPosition" placeholder="e.g., Senior Software Engineer">
                </div>
                
                <div class="form-group">
                    <label for="jobDescription">Job Description (paste key requirements):</label>
                    <textarea id="jobDescription" placeholder="Paste the job description or key requirements here..." rows="4"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="coverLetterTone">Cover Letter Tone:</label>
                    <select id="coverLetterTone">
                        <option value="professional">Professional</option>
                        <option value="enthusiastic">Enthusiastic</option>
                        <option value="confident">Confident</option>
                        <option value="creative">Creative</option>
                        <option value="formal">Formal</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label for="keyAchievements">Key Achievements to Highlight:</label>
                    <textarea id="keyAchievements" placeholder="e.g., Led a team of 10 developers, Increased sales by 30%, Built scalable systems..." rows="3"></textarea>
                </div>
                
                <button class="generate-btn" onclick="generateCoverLetter()">
                    <i class="fas fa-file-alt"></i>
                    Generate Cover Letter
                </button>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-file-text"></i> Generated Cover Letter</h3>
                <div id="coverLetterOutput" class="demo-output">
                    <div class="cover-letter-placeholder">
                        <i class="fas fa-file-alt"></i>
                        <p>Fill in the job details and click "Generate Cover Letter" to create a personalized cover letter!</p>
                    </div>
                </div>
                
                <div class="cover-letter-actions" style="display: none;">
                    <button class="btn-primary" onclick="downloadCoverLetter('pdf')">
                        <i class="fas fa-download"></i>
                        Download PDF
                    </button>
                    <button class="btn-secondary" onclick="downloadCoverLetter('docx')">
                        <i class="fas fa-file-word"></i>
                        Download DOCX
                    </button>
                    <button class="btn-outline" onclick="copyCoverLetter()">
                        <i class="fas fa-copy"></i>
                        Copy Text
                    </button>
                </div>
            </div>
        </div>
    `;
}

// Create QR Code Generator Demo
function createQRCodeGeneratorDemo() {
    return `
        <div class="demo-sections">
            <div class="demo-input-section">
                <h3><i class="fas fa-link"></i> Resume Information</h3>
                
                <div class="form-group">
                    <label for="resumeUrl">Resume URL (if hosted online):</label>
                    <input type="url" id="resumeUrl" placeholder="https://yourresume.com/john-doe">
                </div>
                
                <div class="form-group">
                    <label>Or upload your resume:</label>
                    <div class="file-upload-area" onclick="document.getElementById('resumeFile').click()">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Click to upload resume (PDF, DOC, DOCX)</p>
                        <input type="file" id="resumeFile" accept=".pdf,.doc,.docx" style="display: none;">
                    </div>
                </div>
                
                <h3><i class="fas fa-palette"></i> QR Code Customization</h3>
                
                <div class="form-group">
                    <label for="qrColor">QR Code Color:</label>
                    <input type="color" id="qrColor" value="#000000">
                </div>
                
                <div class="form-group">
                    <label for="qrBackground">Background Color:</label>
                    <input type="color" id="qrBackground" value="#ffffff">
                </div>
                
                <div class="form-group">
                    <label for="qrSize">Size:</label>
                    <select id="qrSize">
                        <option value="small">Small (200x200)</option>
                        <option value="medium" selected>Medium (400x400)</option>
                        <option value="large">Large (800x800)</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>
                        <input type="checkbox" id="includeLogo"> Include personal logo/branding
                    </label>
                </div>
                
                <button class="generate-btn" onclick="generateQRCode()">
                    <i class="fas fa-qrcode"></i>
                    Generate QR Code
                </button>
            </div>
            
            <div class="demo-output-section">
                <h3><i class="fas fa-qrcode"></i> Generated QR Code</h3>
                <div id="qrCodeOutput" class="demo-output">
                    <div class="qr-placeholder">
                        <i class="fas fa-qrcode"></i>
                        <p>Enter resume URL or upload file and click "Generate QR Code"!</p>
                    </div>
                </div>
                
                <div class="qr-actions" style="display: none;">
                    <button class="btn-primary" onclick="downloadQRCode('png')">
                        <i class="fas fa-download"></i>
                        Download PNG
                    </button>
                    <button class="btn-secondary" onclick="downloadQRCode('svg')">
                        <i class="fas fa-vector-square"></i>
                        Download SVG
                    </button>
                    <button class="btn-outline" onclick="downloadQRCode('pdf')">
                        <i class="fas fa-file-pdf"></i>
                        Download PDF
                    </button>
                </div>
                
                <div class="qr-analytics" style="display: none;">
                    <h4><i class="fas fa-chart-bar"></i> Analytics Preview</h4>
                    <div class="analytics-stats">
                        <div class="stat-item">
                            <span class="stat-number">0</span>
                            <span class="stat-label">Total Scans</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">0</span>
                            <span class="stat-label">Unique Views</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">0%</span>
                            <span class="stat-label">Conversion Rate</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup QR Code Generator
function setupQRCodeGenerator() {
    // Handle file upload
    document.getElementById('resumeFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const uploadArea = document.querySelector('.file-upload-area p');
            uploadArea.textContent = `Selected: ${file.name}`;
            uploadArea.parentElement.style.borderColor = '#4CAF50';
        }
    });
}

// Generate QR Code
async function generateQRCode() {
    const resumeUrl = document.getElementById('resumeUrl').value;
    const resumeFile = document.getElementById('resumeFile').files[0];
    
    if (!resumeUrl && !resumeFile) {
        alert('Please provide either a resume URL or upload a resume file.');
        return;
    }
    
    const qrColor = document.getElementById('qrColor').value;
    const qrBackground = document.getElementById('qrBackground').value;
    const qrSize = document.getElementById('qrSize').value;
    const includeLogo = document.getElementById('includeLogo').checked;
    
    const output = document.getElementById('qrCodeOutput');
    const actions = document.querySelector('.qr-actions');
    const analytics = document.querySelector('.qr-analytics');
    
    // Show loading
    output.innerHTML = `
        <div class="loading-animation">
            <i class="fas fa-spinner fa-spin"></i>
            <p>Generating QR Code...</p>
        </div>
    `;
    
    try {
        // Generate QR code using backend API
        const finalUrl = resumeUrl || 'https://careercrafter.com/resume/demo-user';
        
        // Get size dimensions
        const sizeMap = {
            'small': { width: '200px', height: '200px', size: 200 },
            'medium': { width: '300px', height: '300px', size: 300 },
            'large': { width: '400px', height: '400px', size: 400 }
        };
        const dimensions = sizeMap[qrSize];
        
        // Call backend to generate QR code
        const response = await fetch('/api/qr/demo/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                url: finalUrl,
                color: qrColor,
                background: qrBackground,
                size: dimensions.size,
                includeLogo: includeLogo
            })
        });
        
        if (response.ok) {
            const result = await response.json();
            
            output.innerHTML = `
                <div class="qr-code-result">
                    <div class="qr-code-display" style="background: ${qrBackground}; border: 2px solid ${qrColor}; width: ${dimensions.width}; height: ${dimensions.height};">
                        <img src="${result.qrCodeDataUrl}" alt="QR Code" style="max-width: 100%; max-height: 100%; border-radius: 10px;">
                        ${includeLogo ? '<div class="qr-logo"><i class="fas fa-user"></i></div>' : ''}
                    </div>
                    <div class="qr-info">
                        <p><strong>Target URL:</strong> ${finalUrl}</p>
                        <p><strong>Size:</strong> ${qrSize.charAt(0).toUpperCase() + qrSize.slice(1)} (${dimensions.width})</p>
                        <p><strong>Format:</strong> High-resolution, print-ready</p>
                        <p><strong>Colors:</strong> Foreground: ${qrColor}, Background: ${qrBackground}</p>
                    </div>
                </div>
            `;
            
            // Store the QR code data for download
            window.currentQRCode = result.qrCodeDataUrl;
            
            actions.style.display = 'flex';
            analytics.style.display = 'block';
            
            // Simulate analytics update
            setTimeout(() => {
                updateQRAnalytics();
            }, 1000);
            
            showNotification('✅ QR Code generated successfully! You can now download it in multiple formats.', 'success');
        } else {
            throw new Error('Failed to generate QR code');
        }
    } catch (error) {
        console.error('QR Code generation error:', error);
        
        // Fallback to pattern-based QR code
        const finalUrl = resumeUrl || 'https://careercrafter.com/resume/demo-user';
        const qrPattern = generateQRPattern();
        
        const sizeMap = {
            'small': { width: '200px', height: '200px' },
            'medium': { width: '300px', height: '300px' },
            'large': { width: '400px', height: '400px' }
        };
        const dimensions = sizeMap[qrSize];
        
        output.innerHTML = `
            <div class="qr-code-result">
                <div class="qr-code-display" style="background: ${qrBackground}; border: 2px solid ${qrColor}; width: ${dimensions.width}; height: ${dimensions.height};">
                    <div class="qr-pattern" style="color: ${qrColor};">
                        <div class="qr-grid" style="color: ${qrColor};">
                            ${qrPattern}
                        </div>
                        ${includeLogo ? '<div class="qr-logo"><i class="fas fa-user"></i></div>' : ''}
                    </div>
                </div>
                <div class="qr-info">
                    <p><strong>Target URL:</strong> ${finalUrl}</p>
                    <p><strong>Size:</strong> ${qrSize.charAt(0).toUpperCase() + qrSize.slice(1)} (${dimensions.width})</p>
                    <p><strong>Format:</strong> Demo pattern (Backend unavailable)</p>
                    <p><strong>Colors:</strong> Foreground: ${qrColor}, Background: ${qrBackground}</p>
                </div>
            </div>
        `;
        
        actions.style.display = 'flex';
        analytics.style.display = 'block';
        
        setTimeout(() => {
            updateQRAnalytics();
        }, 1000);
        
        showNotification('QR Code generated (demo mode)!', 'warning');
    }
}

// Generate a more realistic QR pattern
function generateQRPattern() {
    // Create a 21x21 QR code pattern (standard size)
    const size = 21;
    let pattern = '';
    
    // Generate finder patterns (corners)
    const finderPattern = [
        '███████░█████████████',
        '█░░░░░█░█████████████',
        '█░███░█░█████████████',
        '█░███░█░█████████████',
        '█░███░█░█████████████',
        '█░░░░░█░█████████████',
        '███████░█████████████',
        '░░░░░░░░█████████████',
        '██░█░██░█████████████',
        '░█░░█░█░█████████████',
        '█░██░░█░█████████████',
        '░░█░█░░░█████████████',
        '█░░░██░░█████████████',
        '░░░░░░░░█████████████',
        '███████░█████████████',
        '█░░░░░█░█████████████',
        '█░███░█░█████████████',
        '█░███░█░█████████████',
        '█░███░█░█████████████',
        '█░░░░░█░█████████████',
        '███████░█████████████'
    ];
    
    // Add some randomization to make it look more realistic
    for (let i = 0; i < size; i++) {
        let row = finderPattern[i] || '';
        // Fill remaining with random pattern
        while (row.length < size) {
            row += Math.random() > 0.5 ? '█' : '░';
        }
        pattern += row.substring(0, size);
        if (i < size - 1) pattern += '\n';
    }
    
    return pattern;
}

// Download QR Code
function downloadQRCode(format) {
    if (window.currentQRCode) {
        // Create download link
        const link = document.createElement('a');
        link.href = window.currentQRCode;
        link.download = `resume-qr-code.${format === 'svg' ? 'svg' : 'png'}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        showNotification(`QR Code downloaded as ${format.toUpperCase()}!`, 'success');
    } else {
        showNotification('Please generate a QR code first!', 'error');
    }
}

// Update QR Analytics
function updateQRAnalytics() {
    const stats = document.querySelectorAll('.stat-number');
    const scans = Math.floor(Math.random() * 50) + 10;
    const views = Math.floor(scans * 0.8);
    const conversion = Math.floor((views / scans) * 100);
    
    stats[0].textContent = scans;
    stats[1].textContent = views;
    stats[2].textContent = conversion + '%';
}