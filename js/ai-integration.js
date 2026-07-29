// AI Integration for Resume Builder using OpenAI API

class AIIntegration {
    constructor() {
        // In a real application, this should be stored securely on the server
        // For demo purposes, we'll simulate AI responses
        this.apiKey = null; // Set this to your OpenAI API key
        this.baseURL = 'https://api.openai.com/v1';
        this.model = 'gpt-3.5-turbo';
        
        // Demo mode for when API key is not available
        this.demoMode = true;
    }

    // Set OpenAI API key
    setAPIKey(apiKey) {
        this.apiKey = apiKey;
        this.demoMode = !apiKey;
    }

    // Generate professional summary using AI
    async generateSummary() {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showErrorMessage('Please log in to use AI features');
            return;
        }

        const summaryField = document.getElementById('summary');
        if (!summaryField) return;

        // Get user's current data for context
        const personalData = this.getPersonalData();
        const experienceData = this.getExperienceData();
        
        try {
            // Show loading state
            const originalPlaceholder = summaryField.placeholder;
            summaryField.placeholder = 'AI is generating your summary...';
            summaryField.disabled = true;

            let generatedSummary;
            
            if (this.demoMode) {
                generatedSummary = await this.generateDemoSummary(personalData, experienceData);
            } else {
                generatedSummary = await this.callOpenAI('summary', {
                    personal: personalData,
                    experience: experienceData
                });
            }

            // Update the field
            summaryField.value = generatedSummary;
            summaryField.placeholder = originalPlaceholder;
            summaryField.disabled = false;
            
            // Update resume data
            if (window.resumeBuilder) {
                window.resumeBuilder.updatePersonalInfo();
            }
            
            window.auth.showSuccessMessage('Professional summary generated!');
            
        } catch (error) {
            console.error('Error generating summary:', error);
            summaryField.placeholder = originalPlaceholder;
            summaryField.disabled = false;
            window.auth.showErrorMessage('Failed to generate summary. Please try again.');
        }
    }

    // Enhance experience descriptions using AI
    async enhanceExperience() {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showErrorMessage('Please log in to use AI features');
            return;
        }

        if (!window.resumeBuilder || !window.resumeBuilder.resumeData.experience.length) {
            window.auth.showErrorMessage('Please add some work experience first');
            return;
        }

        try {
            window.auth.showInfoMessage('AI is enhancing your experience descriptions...');
            
            const experiences = window.resumeBuilder.resumeData.experience;
            
            for (let i = 0; i < experiences.length; i++) {
                const exp = experiences[i];
                if (exp.description && exp.description.trim()) {
                    let enhancedDescription;
                    
                    if (this.demoMode) {
                        enhancedDescription = await this.enhanceDemoExperience(exp);
                    } else {
                        enhancedDescription = await this.callOpenAI('enhance_experience', exp);
                    }
                    
                    exp.description = enhancedDescription;
                }
            }
            
            // Re-render the experience list
            window.resumeBuilder.renderExperienceList();
            window.resumeBuilder.saveResumeData();
            window.resumeBuilder.updatePreview();
            
            window.auth.showSuccessMessage('Experience descriptions enhanced!');
            
        } catch (error) {
            console.error('Error enhancing experience:', error);
            window.auth.showErrorMessage('Failed to enhance experience. Please try again.');
        }
    }

    // Suggest relevant skills using AI
    async suggestSkills() {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showErrorMessage('Please log in to use AI features');
            return;
        }

        try {
            const personalData = this.getPersonalData();
            const experienceData = this.getExperienceData();
            
            let suggestedSkills;
            
            if (this.demoMode) {
                suggestedSkills = await this.generateDemoSkills(personalData, experienceData);
            } else {
                suggestedSkills = await this.callOpenAI('suggest_skills', {
                    personal: personalData,
                    experience: experienceData
                });
            }
            
            // Show skills suggestion modal
            this.showSkillsSuggestionModal(suggestedSkills);
            
        } catch (error) {
            console.error('Error suggesting skills:', error);
            window.auth.showErrorMessage('Failed to suggest skills. Please try again.');
        }
    }

    // Generate resume content based on job description
    async generateFromJobDescription(jobDescription) {
        if (!window.auth || !window.auth.currentUser) {
            window.auth.showErrorMessage('Please log in to use AI features');
            return;
        }

        try {
            window.auth.showInfoMessage('AI is analyzing the job description...');
            
            let generatedContent;
            
            if (this.demoMode) {
                generatedContent = await this.generateDemoJobContent(jobDescription);
            } else {
                generatedContent = await this.callOpenAI('job_description_analysis', {
                    jobDescription: jobDescription
                });
            }
            
            // Apply the generated content
            this.applyGeneratedContent(generatedContent);
            
            window.auth.showSuccessMessage('Resume tailored to job description!');
            
        } catch (error) {
            console.error('Error generating from job description:', error);
            window.auth.showErrorMessage('Failed to analyze job description. Please try again.');
        }
    }

    // Call OpenAI API
    async callOpenAI(type, data) {
        if (!this.apiKey) {
            throw new Error('OpenAI API key not configured');
        }

        const prompt = this.generatePrompt(type, data);
        
        const response = await fetch(`${this.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: this.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a professional resume writer and career coach. Provide helpful, professional, and ATS-friendly content.'
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 500,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const result = await response.json();
        return result.choices[0].message.content.trim();
    }

    // Generate appropriate prompts for different AI tasks
    generatePrompt(type, data) {
        switch (type) {
            case 'summary':
                return `Create a professional summary for a resume based on this information:
                Name: ${data.personal.fullName || 'Professional'}
                Experience: ${data.experience.map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ')}
                
                Write a 2-3 sentence professional summary that highlights key strengths and career objectives. Make it ATS-friendly and impactful.`;

            case 'enhance_experience':
                return `Enhance this job description to be more professional and impactful:
                Job Title: ${data.jobTitle}
                Company: ${data.company}
                Current Description: ${data.description}
                
                Rewrite this to include action verbs, quantifiable achievements, and make it ATS-friendly. Keep it concise but impactful.`;

            case 'suggest_skills':
                return `Based on this professional background, suggest 8-12 relevant skills:
                Experience: ${data.experience.map(exp => `${exp.jobTitle} at ${exp.company}`).join(', ')}
                
                Provide a mix of technical and soft skills that would be valuable for someone with this background. Return as a comma-separated list.`;

            case 'job_description_analysis':
                return `Analyze this job description and suggest resume improvements:
                ${data.jobDescription}
                
                Provide suggestions for:
                1. Professional summary
                2. Key skills to highlight
                3. Experience keywords to include
                
                Format as JSON with keys: summary, skills, keywords`;

            default:
                return 'Please provide professional resume advice.';
        }
    }

    // Demo functions for when OpenAI API is not available
    async generateDemoSummary(personalData, experienceData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const summaries = [
            "Results-driven professional with proven expertise in delivering high-quality solutions and driving business growth. Strong analytical skills and collaborative approach to problem-solving.",
            "Experienced professional with a track record of success in fast-paced environments. Skilled in project management, team leadership, and strategic planning with focus on continuous improvement.",
            "Dynamic professional with strong technical skills and business acumen. Proven ability to manage complex projects and deliver results that exceed expectations.",
            "Innovative professional with expertise in modern technologies and methodologies. Committed to excellence and continuous learning with strong communication and leadership skills."
        ];
        
        return summaries[Math.floor(Math.random() * summaries.length)];
    }

    async enhanceDemoExperience(experience) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const enhancements = [
            "• Led cross-functional teams to deliver high-impact projects, resulting in improved efficiency and customer satisfaction\n• Implemented innovative solutions that reduced operational costs by 15% and increased productivity\n• Collaborated with stakeholders to identify opportunities for process optimization and strategic improvements",
            "• Managed end-to-end project lifecycle, ensuring timely delivery and adherence to quality standards\n• Developed and executed strategic initiatives that drove business growth and enhanced market position\n• Mentored team members and fostered a collaborative environment focused on continuous improvement",
            "• Spearheaded digital transformation initiatives that modernized business processes and improved user experience\n• Analyzed complex data sets to identify trends and provide actionable insights for decision-making\n• Built strong relationships with clients and stakeholders, resulting in increased customer retention and satisfaction"
        ];
        
        return enhancements[Math.floor(Math.random() * enhancements.length)];
    }

    async generateDemoSkills(personalData, experienceData) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const skillSets = [
            ['Project Management', 'Leadership', 'Strategic Planning', 'Data Analysis', 'Communication', 'Problem Solving', 'Team Collaboration', 'Process Improvement'],
            ['JavaScript', 'Python', 'React', 'Node.js', 'SQL', 'Git', 'Agile Methodology', 'API Development', 'Database Design', 'Cloud Computing'],
            ['Digital Marketing', 'SEO/SEM', 'Content Strategy', 'Social Media Management', 'Analytics', 'Brand Management', 'Customer Acquisition', 'Market Research'],
            ['Financial Analysis', 'Budget Management', 'Risk Assessment', 'Excel', 'Financial Modeling', 'Compliance', 'Audit', 'Reporting']
        ];
        
        return skillSets[Math.floor(Math.random() * skillSets.length)];
    }

    async generateDemoJobContent(jobDescription) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2500));
        
        return {
            summary: "Results-oriented professional with expertise in the technologies and methodologies mentioned in the target role. Proven track record of delivering high-quality solutions and driving business success.",
            skills: ['Leadership', 'Project Management', 'Strategic Thinking', 'Communication', 'Problem Solving', 'Team Collaboration'],
            keywords: ['innovative', 'results-driven', 'collaborative', 'strategic', 'efficient', 'customer-focused']
        };
    }

    // Get current personal data
    getPersonalData() {
        return {
            fullName: document.getElementById('fullName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            location: document.getElementById('location')?.value || ''
        };
    }

    // Get current experience data
    getExperienceData() {
        if (window.resumeBuilder && window.resumeBuilder.resumeData.experience) {
            return window.resumeBuilder.resumeData.experience;
        }
        return [];
    }

    // Show skills suggestion modal
    showSkillsSuggestionModal(suggestedSkills) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 500px;">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div style="padding: 2rem;">
                    <h2>AI Suggested Skills</h2>
                    <p>Select the skills you'd like to add to your resume:</p>
                    <div class="suggested-skills">
                        ${suggestedSkills.map(skill => `
                            <label class="skill-suggestion">
                                <input type="checkbox" value="${skill}">
                                <span>${skill}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div style="margin-top: 2rem; display: flex; gap: 1rem;">
                        <button class="add-selected-skills" onclick="aiIntegration.addSelectedSkills(this)">Add Selected</button>
                        <button onclick="this.closest('.modal').remove()">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Add selected skills to resume
    addSelectedSkills(button) {
        const modal = button.closest('.modal');
        const checkboxes = modal.querySelectorAll('input[type="checkbox"]:checked');
        
        checkboxes.forEach(checkbox => {
            const skill = checkbox.value;
            if (window.resumeBuilder && !window.resumeBuilder.resumeData.skills.includes(skill)) {
                window.resumeBuilder.resumeData.skills.push(skill);
            }
        });
        
        if (window.resumeBuilder) {
            window.resumeBuilder.renderSkillsList();
            window.resumeBuilder.saveResumeData();
            window.resumeBuilder.updatePreview();
        }
        
        modal.remove();
        
        if (checkboxes.length > 0) {
            window.auth.showSuccessMessage(`Added ${checkboxes.length} skills to your resume!`);
        }
    }

    // Apply generated content to resume
    applyGeneratedContent(content) {
        if (content.summary) {
            const summaryField = document.getElementById('summary');
            if (summaryField) {
                summaryField.value = content.summary;
            }
        }
        
        if (content.skills && Array.isArray(content.skills)) {
            content.skills.forEach(skill => {
                if (window.resumeBuilder && !window.resumeBuilder.resumeData.skills.includes(skill)) {
                    window.resumeBuilder.resumeData.skills.push(skill);
                }
            });
        }
        
        if (window.resumeBuilder) {
            window.resumeBuilder.updatePersonalInfo();
            window.resumeBuilder.renderSkillsList();
            window.resumeBuilder.updatePreview();
        }
    }

    // Show job description analyzer
    showJobDescriptionAnalyzer() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'block';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 600px;">
                <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
                <div style="padding: 2rem;">
                    <h2>Job Description Analyzer</h2>
                    <p>Paste the job description below and AI will help tailor your resume:</p>
                    <textarea id="jobDescriptionInput" placeholder="Paste the job description here..." 
                              style="width: 100%; height: 200px; margin-bottom: 1rem;"></textarea>
                    <div style="display: flex; gap: 1rem;">
                        <button onclick="aiIntegration.analyzeJobDescription()" class="ai-btn">
                            <i class="fas fa-robot"></i> Analyze with AI
                        </button>
                        <button onclick="this.closest('.modal').remove()">Cancel</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    // Analyze job description
    async analyzeJobDescription() {
        const jobDescriptionInput = document.getElementById('jobDescriptionInput');
        const jobDescription = jobDescriptionInput?.value.trim();
        
        if (!jobDescription) {
            window.auth.showErrorMessage('Please enter a job description');
            return;
        }
        
        // Close the modal
        jobDescriptionInput.closest('.modal').remove();
        
        // Generate content based on job description
        await this.generateFromJobDescription(jobDescription);
    }
}

// Initialize AI integration
const aiIntegration = new AIIntegration();

// Global functions for HTML onclick handlers
function generateSummary() {
    aiIntegration.generateSummary();
}

function enhanceExperience() {
    aiIntegration.enhanceExperience();
}

function suggestSkills() {
    aiIntegration.suggestSkills();
}

function showJobDescriptionAnalyzer() {
    aiIntegration.showJobDescriptionAnalyzer();
}

function showDemo() {
    // Create video demo modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content video-modal">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="video-container">
                <h2>CareerCrafter Demo Video</h2>
                <div class="video-wrapper">
                    <iframe width="560" height="315"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
                        title="CareerCrafter Demo"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen>
                    </iframe>
                </div>
                <p class="video-description">
                    Watch how CareerCrafter's AI can help you create professional resumes in minutes!
                </p>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Prevent modal from closing when clicking on video
    const videoWrapper = modal.querySelector('.video-wrapper');
    videoWrapper.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Add CSS for AI-specific elements
const aiStyles = document.createElement('style');
aiStyles.innerHTML = `
    .suggested-skills {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 0.5rem;
        margin: 1rem 0;
    }
    
    .skill-suggestion {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem;
        border: 1px solid #e0e0e0;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .skill-suggestion:hover {
        background: #f0f8ff;
        border-color: #4a6bdf;
    }
    
    .skill-suggestion input[type="checkbox"] {
        width: auto;
        margin: 0;
    }
    
    .add-selected-skills {
        background: linear-gradient(135deg, #4a6bdf, #8a56e8);
        color: white;
        border: none;
        padding: 0.8rem 1.5rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .add-selected-skills:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(74, 107, 223, 0.3);
    }
    
    .ai-feature-highlight {
        background: linear-gradient(135deg, #ff6b9d, #c44569);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        margin: 1rem 0;
        text-align: center;
    }
    
    .ai-feature-highlight h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.1rem;
    }
    
    .ai-feature-highlight p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
`;
document.head.appendChild(aiStyles);

// Add AI feature highlights to the page
document.addEventListener('DOMContentLoaded', function() {
    // Add job description analyzer button to hero section
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        const analyzerBtn = document.createElement('button');
        analyzerBtn.className = 'demo-button';
        analyzerBtn.innerHTML = '<i class="fas fa-robot"></i> Try AI Analyzer';
        analyzerBtn.onclick = showJobDescriptionAnalyzer;
        heroButtons.appendChild(analyzerBtn);
    }
});