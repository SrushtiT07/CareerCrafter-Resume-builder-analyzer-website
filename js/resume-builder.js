// Resume Builder System for AI Resume Builder

class ResumeBuilder {
    constructor() {
        this.resumeData = {
            id: null,
            personal: {
                fullName: '',
                email: '',
                phone: '',
                location: '',
                summary: ''
            },
            experience: [],
            education: [],
            skills: [],
            projects: [],
            certifications: [],
            languages: [],
            achievements: []
        };
        this.currentTab = 'personal';
        this.experienceCounter = 0;
        this.educationCounter = 0;
        this.apiBaseUrl = '/api';
    }

    async init() {
        await this.loadResumeData();
        this.showTab('personal');
        this.updatePreview();
    }

    // Load resume data from backend or localStorage
    async loadResumeData() {
        try {
            // First try to load from localStorage
            const localData = localStorage.getItem('airesume_data_backup');
            if (localData) {
                try {
                    this.resumeData = JSON.parse(localData);
                    this.populateForm();
                } catch (parseError) {
                    console.error('Error parsing local resume data:', parseError);
                }
            }

            // If user is authenticated, try to load from backend
            if (window.auth && window.auth.currentUser) {
                const resumeId = window.auth.currentUser.resumeId;
                if (resumeId) {
                    const response = await window.auth.makeAuthenticatedRequest(
                        `${this.apiBaseUrl}/resume/${resumeId}`
                    );

                    if (response.ok) {
                        const data = await response.json();
                        this.resumeData = data.resume;
                        this.populateForm();
                    }
                }
            }
        } catch (error) {
            console.error('Error loading resume data:', error);
        }
    }

    // Save resume data to backend
    async saveResumeData() {
        try {
            // Always save to localStorage as backup
            localStorage.setItem('airesume_data_backup', JSON.stringify(this.resumeData));
            
            // If user is authenticated and has a resume ID, also save to backend
            if (window.auth && window.auth.currentUser && this.resumeData.id) {
                // Save personal information
                await window.auth.makeAuthenticatedRequest(
                    `${this.apiBaseUrl}/resume/${this.resumeData.id}/personal`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(this.resumeData.personal)
                    }
                );
            }
        } catch (error) {
            console.error('Error saving resume data:', error);
            // Still save to localStorage even if backend fails
            localStorage.setItem('airesume_data_backup', JSON.stringify(this.resumeData));
        }
    }

    // Show specific tab
    showTab(tabName) {
        // Hide all tabs
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        
        // Remove active class from all tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Show selected tab
        const selectedTab = document.getElementById(tabName + 'Tab');
        if (selectedTab) {
            selectedTab.classList.add('active');
        }
        
        // Add active class to selected tab button
        const selectedBtn = document.querySelector(`[onclick="showTab('${tabName}')"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }
        
        this.currentTab = tabName;
        
        // Initialize tab-specific content
        if (tabName === 'experience') {
            this.renderExperienceList();
        } else if (tabName === 'education') {
            this.renderEducationList();
        } else if (tabName === 'skills') {
            this.renderSkillsList();
        } else if (tabName === 'additional') {
            this.renderAdditionalSections();
        }
    }

    // Add new experience entry
    async addExperience() {
        try {
            if (!this.resumeData.id) return;

            const response = await window.auth.makeAuthenticatedRequest(
                `${this.apiBaseUrl}/resume/${this.resumeData.id}/experience`,
                {
                    method: 'POST',
                    body: JSON.stringify({
                        jobTitle: '',
                        company: '',
                        location: '',
                        startDate: '',
                        endDate: '',
                        current: false,
                        description: ''
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const newExperience = {
                    id: data.experienceId,
                    jobTitle: '',
                    company: '',
                    location: '',
                    startDate: '',
                    endDate: '',
                    current: false,
                    description: ''
                };
                
                this.resumeData.experience.push(newExperience);
                this.renderExperienceList();
                this.updatePreview();
            }
        } catch (error) {
            console.error('Error adding experience:', error);
            window.auth.showErrorMessage('Failed to add experience');
        }
    }

    // Remove experience entry
    async removeExperience(id) {
        try {
            if (!this.resumeData.id) return;

            const response = await window.auth.makeAuthenticatedRequest(
                `${this.apiBaseUrl}/resume/${this.resumeData.id}/experience/${id}`,
                { method: 'DELETE' }
            );

            if (response.ok) {
                this.resumeData.experience = this.resumeData.experience.filter(exp => exp.id !== id);
                this.renderExperienceList();
                this.updatePreview();
            }
        } catch (error) {
            console.error('Error removing experience:', error);
            window.auth.showErrorMessage('Failed to remove experience');
        }
    }

    // Render experience list
    renderExperienceList() {
        const container = document.getElementById('experienceList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.resumeData.experience.forEach((exp, index) => {
            const expDiv = document.createElement('div');
            expDiv.className = 'experience-item';
            expDiv.innerHTML = `
                <div class="experience-header">
                    <h4>Experience ${index + 1}</h4>
                    <button type="button" class="remove-btn" onclick="resumeBuilder.removeExperience('${exp.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="form-row">
                    <input type="text" placeholder="Job Title" value="${exp.jobTitle}" 
                           onchange="resumeBuilder.updateExperience('${exp.id}', 'jobTitle', this.value)">
                    <input type="text" placeholder="Company" value="${exp.company}"
                           onchange="resumeBuilder.updateExperience('${exp.id}', 'company', this.value)">
                </div>
                <div class="form-row">
                    <input type="text" placeholder="Location" value="${exp.location}"
                           onchange="resumeBuilder.updateExperience('${exp.id}', 'location', this.value)">
                    <input type="month" placeholder="Start Date" value="${exp.startDate}"
                           onchange="resumeBuilder.updateExperience('${exp.id}', 'startDate', this.value)">
                </div>
                <div class="form-row">
                    <input type="month" placeholder="End Date" value="${exp.endDate}" 
                           ${exp.current ? 'disabled' : ''}
                           onchange="resumeBuilder.updateExperience('${exp.id}', 'endDate', this.value)">
                    <label class="checkbox-label">
                        <input type="checkbox" ${exp.current ? 'checked' : ''}
                               onchange="resumeBuilder.toggleCurrentJob('${exp.id}', this.checked)">
                        Currently working here
                    </label>
                </div>
                <textarea placeholder="Job description and achievements" 
                          onchange="resumeBuilder.updateExperience('${exp.id}', 'description', this.value)">${exp.description}</textarea>
            `;
            container.appendChild(expDiv);
        });
    }

    // Update experience data
    async updateExperience(id, field, value) {
        const experience = this.resumeData.experience.find(exp => exp.id === id);
        if (experience) {
            experience[field] = value;
            
            try {
                await window.auth.makeAuthenticatedRequest(
                    `${this.apiBaseUrl}/resume/${this.resumeData.id}/experience/${id}`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(experience)
                    }
                );
                this.updatePreview();
            } catch (error) {
                console.error('Error updating experience:', error);
            }
        }
    }

    // Toggle current job status
    toggleCurrentJob(id, isCurrent) {
        const experience = this.resumeData.experience.find(exp => exp.id === id);
        if (experience) {
            experience.current = isCurrent;
            if (isCurrent) {
                experience.endDate = '';
            }
            this.renderExperienceList();
            this.saveResumeData();
            this.updatePreview();
        }
    }

    // Add new education entry
    addEducation() {
        const education = {
            id: 'edu_' + Date.now(),
            degree: '',
            institution: '',
            location: '',
            graduationDate: '',
            gpa: '',
            description: ''
        };
        
        this.resumeData.education.push(education);
        this.renderEducationList();
        this.updatePreview();
    }

    // Remove education entry
    removeEducation(id) {
        this.resumeData.education = this.resumeData.education.filter(edu => edu.id !== id);
        this.renderEducationList();
        this.updatePreview();
    }

    // Render education list
    renderEducationList() {
        const container = document.getElementById('educationList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.resumeData.education.forEach((edu, index) => {
            const eduDiv = document.createElement('div');
            eduDiv.className = 'education-item';
            eduDiv.innerHTML = `
                <div class="education-header">
                    <h4>Education ${index + 1}</h4>
                    <button type="button" class="remove-btn" onclick="resumeBuilder.removeEducation('${edu.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                <div class="form-row">
                    <input type="text" placeholder="Degree" value="${edu.degree}" 
                           onchange="resumeBuilder.updateEducation('${edu.id}', 'degree', this.value)">
                    <input type="text" placeholder="Institution" value="${edu.institution}"
                           onchange="resumeBuilder.updateEducation('${edu.id}', 'institution', this.value)">
                </div>
                <div class="form-row">
                    <input type="text" placeholder="Location" value="${edu.location}"
                           onchange="resumeBuilder.updateEducation('${edu.id}', 'location', this.value)">
                    <input type="month" placeholder="Graduation Date" value="${edu.graduationDate}"
                           onchange="resumeBuilder.updateEducation('${edu.id}', 'graduationDate', this.value)">
                </div>
                <div class="form-row">
                    <input type="text" placeholder="GPA (optional)" value="${edu.gpa}"
                           onchange="resumeBuilder.updateEducation('${edu.id}', 'gpa', this.value)">
                </div>
                <textarea placeholder="Additional details (optional)" 
                          onchange="resumeBuilder.updateEducation('${edu.id}', 'description', this.value)">${edu.description}</textarea>
            `;
            container.appendChild(eduDiv);
        });
    }

    // Update education data
    updateEducation(id, field, value) {
        const education = this.resumeData.education.find(edu => edu.id === id);
        if (education) {
            education[field] = value;
            this.saveResumeData();
            this.updatePreview();
        }
    }

    // Add skill
    addSkill() {
        const skillInput = document.getElementById('skillInput');
        const skill = skillInput.value.trim();
        
        if (skill && !this.resumeData.skills.includes(skill)) {
            this.resumeData.skills.push(skill);
            skillInput.value = '';
            this.renderSkillsList();
            this.saveResumeData();
            this.updatePreview();
        }
    }

    // Remove skill
    removeSkill(skill) {
        this.resumeData.skills = this.resumeData.skills.filter(s => s !== skill);
        this.renderSkillsList();
        this.saveResumeData();
        this.updatePreview();
    }

    // Render skills list
    renderSkillsList() {
        const container = document.getElementById('skillsList');
        if (!container) return;
        
        container.innerHTML = '';
        
        this.resumeData.skills.forEach(skill => {
            const skillTag = document.createElement('div');
            skillTag.className = 'skill-tag';
            skillTag.innerHTML = `
                ${skill}
                <span class="remove" onclick="resumeBuilder.removeSkill('${skill}')">&times;</span>
            `;
            container.appendChild(skillTag);
        });
    }

    // Toggle additional section
    toggleSection(sectionName) {
        const checkbox = document.getElementById(sectionName + 'Toggle');
        const isEnabled = checkbox.checked;
        
        if (isEnabled) {
            this.enableAdditionalSection(sectionName);
        } else {
            this.disableAdditionalSection(sectionName);
        }
    }

    // Enable additional section
    enableAdditionalSection(sectionName) {
        const container = document.getElementById('additionalContent');
        const sectionDiv = document.createElement('div');
        sectionDiv.id = sectionName + 'Section';
        sectionDiv.className = 'additional-section';
        
        switch (sectionName) {
            case 'projects':
                sectionDiv.innerHTML = this.getProjectsHTML();
                break;
            case 'certifications':
                sectionDiv.innerHTML = this.getCertificationsHTML();
                break;
            case 'languages':
                sectionDiv.innerHTML = this.getLanguagesHTML();
                break;
            case 'achievements':
                sectionDiv.innerHTML = this.getAchievementsHTML();
                break;
        }
        
        container.appendChild(sectionDiv);
    }

    // Disable additional section
    disableAdditionalSection(sectionName) {
        const section = document.getElementById(sectionName + 'Section');
        if (section) {
            section.remove();
        }
        
        // Clear data
        this.resumeData[sectionName] = [];
        this.saveResumeData();
        this.updatePreview();
    }

    // Get HTML for different sections
    getProjectsHTML() {
        return `
            <h4>Projects</h4>
            <div id="projectsList"></div>
            <button type="button" class="add-btn" onclick="resumeBuilder.addProject()">+ Add Project</button>
        `;
    }

    getCertificationsHTML() {
        return `
            <h4>Certifications</h4>
            <div id="certificationsList"></div>
            <button type="button" class="add-btn" onclick="resumeBuilder.addCertification()">+ Add Certification</button>
        `;
    }

    getLanguagesHTML() {
        return `
            <h4>Languages</h4>
            <div id="languagesList"></div>
            <button type="button" class="add-btn" onclick="resumeBuilder.addLanguage()">+ Add Language</button>
        `;
    }

    getAchievementsHTML() {
        return `
            <h4>Achievements</h4>
            <div id="achievementsList"></div>
            <button type="button" class="add-btn" onclick="resumeBuilder.addAchievement()">+ Add Achievement</button>
        `;
    }

    // Render additional sections
    renderAdditionalSections() {
        // This method can be expanded to render enabled additional sections
    }

    // Update personal information
    updatePersonalInfo() {
        this.resumeData.personal = {
            fullName: document.getElementById('fullName')?.value || '',
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || '',
            location: document.getElementById('location')?.value || '',
            summary: document.getElementById('summary')?.value || ''
        };
        
        this.saveResumeData();
        this.updatePreview();
    }

    // Populate form with saved data
    populateForm() {
        // Populate personal info
        if (document.getElementById('fullName')) {
            document.getElementById('fullName').value = this.resumeData.personal.fullName || '';
        }
        if (document.getElementById('email')) {
            document.getElementById('email').value = this.resumeData.personal.email || '';
        }
        if (document.getElementById('phone')) {
            document.getElementById('phone').value = this.resumeData.personal.phone || '';
        }
        if (document.getElementById('location')) {
            document.getElementById('location').value = this.resumeData.personal.location || '';
        }
        if (document.getElementById('summary')) {
            document.getElementById('summary').value = this.resumeData.personal.summary || '';
        }
        
        // Render other sections
        this.renderExperienceList();
        this.renderEducationList();
        this.renderSkillsList();
    }

    // Update live preview
    updatePreview() {
        const previewContainer = document.getElementById('resumePreview');
        if (!previewContainer) return;
        
        const resumeHTML = this.generateResumeHTML();
        previewContainer.innerHTML = resumeHTML;
    }

    // Generate resume HTML
    generateResumeHTML() {
        const { personal, experience, education, skills } = this.resumeData;
        
        return `
            <div class="resume-preview-header">
                <h1>${personal.fullName || 'Your Name'}</h1>
                <div class="contact-info">
                    ${personal.email ? `<span><i class="fas fa-envelope"></i> ${personal.email}</span>` : ''}
                    ${personal.phone ? `<span><i class="fas fa-phone"></i> ${personal.phone}</span>` : ''}
                    ${personal.location ? `<span><i class="fas fa-map-marker-alt"></i> ${personal.location}</span>` : ''}
                </div>
            </div>
            
            ${personal.summary ? `
                <div class="resume-section">
                    <h2>Professional Summary</h2>
                    <p>${personal.summary}</p>
                </div>
            ` : ''}
            
            ${experience.length > 0 ? `
                <div class="resume-section">
                    <h2>Work Experience</h2>
                    ${experience.map(exp => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h3>${exp.jobTitle} at ${exp.company}</h3>
                                <span class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</span>
                            </div>
                            ${exp.location ? `<p class="location">${exp.location}</p>` : ''}
                            ${exp.description ? `<p class="description">${exp.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${education.length > 0 ? `
                <div class="resume-section">
                    <h2>Education</h2>
                    ${education.map(edu => `
                        <div class="resume-item">
                            <div class="item-header">
                                <h3>${edu.degree} - ${edu.institution}</h3>
                                <span class="date">${edu.graduationDate}</span>
                            </div>
                            ${edu.location ? `<p class="location">${edu.location}</p>` : ''}
                            ${edu.gpa ? `<p class="gpa">GPA: ${edu.gpa}</p>` : ''}
                            ${edu.description ? `<p class="description">${edu.description}</p>` : ''}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            
            ${skills.length > 0 ? `
                <div class="resume-section">
                    <h2>Skills</h2>
                    <div class="skills-list">
                        ${skills.map(skill => `<span class="skill-item">${skill}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    }

    // Preview resume in full screen
    previewResume() {
        const previewWindow = window.open('', '_blank');
        const resumeHTML = this.generateResumeHTML();
        
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Resume Preview</title>
                <style>
                    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
                    .resume-preview-header h1 { color: #333; margin-bottom: 10px; }
                    .contact-info { display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap; }
                    .contact-info span { color: #666; }
                    .resume-section { margin-bottom: 30px; }
                    .resume-section h2 { color: #4a6bdf; border-bottom: 2px solid #4a6bdf; padding-bottom: 5px; }
                    .resume-item { margin-bottom: 20px; }
                    .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
                    .item-header h3 { margin: 0; color: #333; }
                    .date { color: #666; font-weight: bold; }
                    .location, .gpa { color: #666; margin: 5px 0; }
                    .description { margin: 10px 0; line-height: 1.6; }
                    .skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
                    .skill-item { background: #e3f2fd; color: #1976d2; padding: 5px 10px; border-radius: 15px; font-size: 14px; }
                </style>
            </head>
            <body>
                ${resumeHTML}
            </body>
            </html>
        `);
        previewWindow.document.close();
    }

    // Save resume
    saveResume() {
        try {
            this.updatePersonalInfo();
            this.saveResumeData();
            
            if (window.auth && window.auth.currentUser) {
                // Save to user account (implement server-side saving)
                window.auth.showSuccessMessage('Resume saved successfully!');
            } else {
                // Save to localStorage as backup
                localStorage.setItem('airesume_data_backup', JSON.stringify(this.resumeData));
                if (window.auth) {
                    window.auth.showSuccessMessage('Resume saved locally!');
                } else {
                    alert('Resume saved locally!');
                }
            }
        } catch (error) {
            console.error('Error saving resume:', error);
            if (window.auth) {
                window.auth.showErrorMessage('Failed to save resume. Please try again.');
            } else {
                alert('Failed to save resume. Please try again.');
            }
        }
    }

    // Download resume as PDF
    downloadResume() {
        // For now, open print dialog
        // In a real implementation, you would use a PDF generation library
        this.previewResume();
        setTimeout(() => {
            window.print();
        }, 1000);
        
        if (window.auth) {
            window.auth.showInfoMessage('Use your browser\'s print function to save as PDF');
        }
    }
}

// Initialize resume builder
const resumeBuilder = new ResumeBuilder();
window.resumeBuilder = resumeBuilder;

// Global functions for HTML onclick handlers
function showTab(tabName) {
    resumeBuilder.showTab(tabName);
}

function addExperience() {
    resumeBuilder.addExperience();
}

function addEducation() {
    resumeBuilder.addEducation();
}

function addSkill() {
    resumeBuilder.addSkill();
}

function toggleSection(sectionName) {
    resumeBuilder.toggleSection(sectionName);
}

function previewResume() {
    resumeBuilder.previewResume();
}

function saveResume() {
    resumeBuilder.saveResume();
}

function downloadResume() {
    resumeBuilder.downloadResume();
}

function closeResumeBuilder() {
    if (window.auth) {
        window.auth.closeResumeBuilder();
    }
}

// Add event listeners for personal info updates
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for personal info fields
    const personalFields = ['fullName', 'email', 'phone', 'location', 'summary'];
    personalFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', () => {
                resumeBuilder.updatePersonalInfo();
            });
        }
    });
    
    // Add event listener for skill input
    const skillInput = document.getElementById('skillInput');
    if (skillInput) {
        skillInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addSkill();
            }
        });
    }
});

// Add CSS for resume builder specific elements
const resumeBuilderStyles = document.createElement('style');
resumeBuilderStyles.innerHTML = `
    .experience-item, .education-item {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        background: #f8f9fa;
    }
    
    .experience-header, .education-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .experience-header h4, .education-header h4 {
        margin: 0;
        color: #333;
    }
    
    .remove-btn {
        background: #dc3545;
        color: white;
        border: none;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
    }
    
    .remove-btn:hover {
        background: #c82333;
        transform: scale(1.1);
    }
    
    .checkbox-label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #666;
        font-size: 0.9rem;
    }
    
    .checkbox-label input[type="checkbox"] {
        width: auto;
        margin: 0;
    }
    
    .additional-section {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 1.5rem;
        margin-bottom: 1rem;
        background: #f8f9fa;
    }
    
    .additional-section h4 {
        color: #333;
        margin-bottom: 1rem;
    }
    
    .resume-preview-header h1 {
        color: #333;
        margin-bottom: 10px;
        font-size: 2rem;
    }
    
    .contact-info {
        display: flex;
        gap: 20px;
        margin-bottom: 20px;
        flex-wrap: wrap;
    }
    
    .contact-info span {
        color: #666;
        font-size: 0.9rem;
    }
    
    .resume-section {
        margin-bottom: 25px;
    }
    
    .resume-section h2 {
        color: #4a6bdf;
        border-bottom: 2px solid #4a6bdf;
        padding-bottom: 5px;
        margin-bottom: 15px;
        font-size: 1.3rem;
    }
    
    .resume-item {
        margin-bottom: 20px;
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
    }
    
    .resume-item:last-child {
        border-bottom: none;
    }
    
    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 5px;
        flex-wrap: wrap;
        gap: 10px;
    }
    
    .item-header h3 {
        margin: 0;
        color: #333;
        font-size: 1.1rem;
    }
    
    .date {
        color: #666;
        font-weight: bold;
        font-size: 0.9rem;
    }
    
    .location, .gpa {
        color: #666;
        margin: 5px 0;
        font-size: 0.9rem;
    }
    
    .description {
        margin: 10px 0;
        line-height: 1.6;
        color: #555;
    }
    
    .skills-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }
    
    .skill-item {
        background: #e3f2fd;
        color: #1976d2;
        padding: 4px 12px;
        border-radius: 15px;
        font-size: 0.9rem;
        font-weight: 500;
    }
`;
document.head.appendChild(resumeBuilderStyles);