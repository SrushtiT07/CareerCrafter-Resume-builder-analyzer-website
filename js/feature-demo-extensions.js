// Feature Demo Extensions - Additional functionality for new features

// Setup Real-time Feedback
function setupRealtimeFeedback() {
    const textarea = document.getElementById('realtimeContent');
    const feedbackDiv = document.getElementById('realtimeFeedback');
    const statsDiv = document.querySelector('.feedback-stats');

    let feedbackTimeout;
    
    textarea.addEventListener('input', function() {
        clearTimeout(feedbackTimeout);
        
        if (this.value.trim().length === 0) {
            feedbackDiv.innerHTML = `
                <div class="feedback-placeholder">
                    <i class="fas fa-lightbulb"></i>
                    <p>Start typing to see real-time suggestions and improvements!</p>
                </div>
            `;
            statsDiv.style.display = 'none';
            return;
        }
        
        feedbackDiv.innerHTML = '<div class="loading-spinner"></div><p style="text-align: center; margin-top: 1rem;">Analyzing content...</p>';
        
        feedbackTimeout = setTimeout(() => {
            generateRealtimeFeedback(this.value);
        }, 1000);
    });
}

// Generate Real-time Feedback
function generateRealtimeFeedback(content) {
    const feedbackDiv = document.getElementById('realtimeFeedback');
    const statsDiv = document.querySelector('.feedback-stats');

    const suggestions = [
        { type: 'grammar', text: 'Consider using "developed" instead of "made" for more professional tone', line: 1 },
        { type: 'keyword', text: 'Add relevant keywords like "JavaScript", "React", or "Node.js"', line: 1 },
        { type: 'ats', text: 'Use bullet points to improve ATS readability', line: 2 },
        { type: 'style', text: 'Start with action verbs like "Led", "Implemented", "Designed"', line: 1 }
    ];

    const feedbackHTML = `
        <div class="feedback-list">
            ${suggestions.map(suggestion => `
                <div class="feedback-item ${suggestion.type}">
                    <div class="feedback-icon">
                        <i class="fas ${suggestion.type === 'grammar' ? 'fa-spell-check' :
                            suggestion.type === 'keyword' ? 'fa-key' :
                                    suggestion.type === 'ats' ? 'fa-robot' : 'fa-magic'}"></i>
                    </div>
                    <div class="feedback-content">
                        <span class="feedback-type">${suggestion.type.toUpperCase()}</span>
                        <p>${suggestion.text}</p>
                    </div>
                    <button class="apply-suggestion" onclick="applySuggestion('${suggestion.type}')">
                        <i class="fas fa-check"></i>
                        Apply
                    </button>
                </div>
            `).join('')}
        </div>
    `;
    
    feedbackDiv.innerHTML = feedbackHTML;
    
    document.getElementById('improvementCount').textContent = suggestions.length;
    document.getElementById('atsScore').textContent = '78%';
    document.getElementById('readabilityScore').textContent = '85';
    statsDiv.style.display = 'flex';
}

// Setup Mock Interview
function setupMockInterview() {
    console.log('Mock interview setup complete');
}

// Start Mock Interview
function startMockInterview() {
    const role = document.getElementById('interviewRole').value;
    const level = document.getElementById('interviewLevel').value;
    const type = document.getElementById('interviewType').value;
    
    if (!role) {
        showNotification('Please select a job role to continue.', 'error');
        return;
    }
    
    const button = document.querySelector('.generate-btn');
    const originalText = button.innerHTML;
    addLoadingToButton(button, originalText);
    
    const output = document.getElementById('interviewOutput');
    const controls = document.querySelector('.interview-controls');
    
    setTimeout(() => {
        const questions = getInterviewQuestions(role, level, type);
        output.innerHTML = `
            <div class="interview-session">
                <div class="question-counter">Question 1 of 5</div>
                <div class="current-question">
                    <h4>Behavioral Question:</h4>
                    <p>${questions[0]}</p>
                </div>
                <div class="question-timer">
                    <i class="fas fa-clock"></i>
                    <span id="timer">2:00</span>
                </div>
            </div>
        `;
        controls.style.display = 'flex';
        startTimer();
    }, 2000);
}

// Generate Cover Letter
function generateCoverLetter() {
    const company = document.getElementById('companyName').value;
    const position = document.getElementById('jobPosition').value;
    const description = document.getElementById('jobDescription').value;
    const tone = document.getElementById('coverLetterTone').value;
    const achievements = document.getElementById('keyAchievements').value;
    
    if (!company || !position) {
        showNotification('Please fill in at least the company name and job position.', 'error');
        return;
    }
    
    const button = document.querySelector('.generate-btn');
    const originalText = button.innerHTML;
    addLoadingToButton(button, originalText);
    
    const output = document.getElementById('coverLetterOutput');
    const actions = document.querySelector('.cover-letter-actions');
    
    setTimeout(() => {
        const coverLetter = generateSampleCoverLetter(company, position, tone, achievements);
        output.innerHTML = `<div class="cover-letter-content">${coverLetter}</div>`;
        actions.style.display = 'flex';
        showNotification('Cover letter generated successfully!', 'success');
    }, 2000);
}

// Helper functions
function applySuggestion(type) {
    showNotification(`${type.toUpperCase()} suggestion applied!`, 'success');
}

function getInterviewQuestions(role, level, type) {
    return [
        "Tell me about a time when you had to work under pressure to meet a deadline.",
        "Describe a situation where you had to learn a new technology quickly.",
        "How do you handle conflicts with team members?",
        "What's your greatest professional achievement?",
        "Where do you see yourself in 5 years?"
    ];
}

function startTimer() {
    let timeLeft = 120;
    const timerElement = document.getElementById('timer');
    
    const countdown = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        if (timeLeft <= 0) {
            clearInterval(countdown);
            showNotification('Time\'s up! Moving to next question.', 'info');
        }
        timeLeft--;
    }, 1000);
}

function generateSampleCoverLetter(company, position, tone, achievements) {
    return `
        <div class="letter-header">
            <p><strong>Your Name</strong><br>Your Address<br>City, State ZIP<br>your.email@example.com<br>(555) 123-4567</p>
            <p style="margin-top: 2rem;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Hiring Manager</strong><br>${company}<br>Company Address</p>
        </div>
        <div class="letter-body">
            <p><strong>Dear Hiring Manager,</strong></p>
            <p>I am writing to express my strong interest in the ${position} position at ${company}. With my background in technology and proven track record of success, I am confident I would be a valuable addition to your team.</p>
            <p>${achievements ? `My key achievements include: ${achievements}. These experiences have prepared me well for the challenges of this role.` : 'Throughout my career, I have consistently delivered exceptional results and contributed to team success.'}</p>
            <p>I am particularly drawn to ${company} because of your reputation for innovation and excellence. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your continued success.</p>
            <p>Thank you for considering my application. I look forward to hearing from you soon.</p>
            <p><strong>Sincerely,</strong><br>Your Name</p>
        </div>
    `;
}

function recordAnswer() { 
    showNotification('Voice recording feature would be implemented here.', 'info'); 
}

function typeAnswer() { 
    showNotification('Text input feature would be implemented here.', 'info'); 
}

function skipQuestion() { 
    showNotification('Moving to next question...', 'info'); 
}

function downloadCoverLetter(format) { 
    showNotification(`Downloading cover letter as ${format.toUpperCase()}...`, 'success'); 
}

function copyCoverLetter() {
    const content = document.querySelector('.cover-letter-content').textContent;
    navigator.clipboard.writeText(content).then(() => {
        showNotification('Cover letter copied to clipboard!', 'success');
    });
}