// Authentication System for AI Resume Builder

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        // Check if user is already logged in (must include token)
        const savedUser = localStorage.getItem('airesume_user');
        if (savedUser) {
            try {
                const parsed = JSON.parse(savedUser);
                if (parsed && parsed.token) {
                    this.currentUser = parsed;
                    this.updateUIForLoggedInUser();
                } else {
                    // Legacy/local demo users without token are not considered authenticated
                    localStorage.removeItem('airesume_user');
                    this.currentUser = null;
                }
            } catch (_) {
                this.currentUser = null;
            }
        }
    }

    // Show authentication modal
    showAuthModal(type = 'login') {
        const modal = document.getElementById('authModal');
        const loginForm = document.getElementById('loginForm');
        const signupForm = document.getElementById('signupForm');
        
        if (type === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Close authentication modal
    closeAuthModal() {
        const modal = document.getElementById('authModal');
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Switch between login and signup forms
    switchToSignup() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'block';
    }

    switchToLogin() {
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('loginForm').style.display = 'block';
    }

    // Switch to forgot password form
    showForgotPassword() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('signupForm').style.display = 'none';
        document.getElementById('forgotPasswordForm').style.display = 'block';
    }

    // Handle login form submission (real backend)
    async handleLogin(event) {
        event.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                this.showErrorMessage(data.error || 'Invalid email or password');
                return;
            }

            // Persist user with token and resumeId for authenticated requests
            this.currentUser = { ...data.user, token: data.token };
            localStorage.setItem('airesume_user', JSON.stringify(this.currentUser));

            this.updateUIForLoggedInUser();
            this.closeAuthModal();
            this.showSuccessMessage('Welcome back!');

            // Open resume builder quickly
            setTimeout(() => {
                this.showResumeBuilder();
            }, 500);
        } catch (error) {
            this.showErrorMessage('Login failed. Please try again.');
            console.error('Login error:', error);
        }
    }

    // Handle signup form submission (always succeed)
    async handleSignup(event) {
        event.preventDefault();

        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            this.showErrorMessage('Passwords do not match');
            return;
        }

        // Always succeed - no validation
        try {
            // Create user data locally
            const userData = {
                id: 'user_' + Date.now(),
                name: name || 'Demo User',
                email: email || 'demo@example.com',
                plan: 'free',
                provider: 'local',
                resumeId: 'resume_' + Date.now()
            };

            // Persist user with token
            this.currentUser = { ...userData, token: 'demo-token-' + Date.now() };
            localStorage.setItem('airesume_user', JSON.stringify(this.currentUser));

            // Also save to localStorage users list for admin panel
            const existingUsers = JSON.parse(localStorage.getItem('airesume_users') || '[]');
            existingUsers.push({
                id: userData.id,
                name: userData.name,
                email: userData.email,
                password: password,
                plan: userData.plan,
                joinDate: new Date().toISOString()
            });
            localStorage.setItem('airesume_users', JSON.stringify(existingUsers));

            this.updateUIForLoggedInUser();
            this.closeAuthModal();
            this.showSuccessMessage('Account created successfully!');

            setTimeout(() => {
                this.showResumeBuilder();
            }, 500);
        } catch (error) {
            this.showErrorMessage('Registration failed. Please try again.');
            console.error('Signup error:', error);
        }
    }

    // Handle forgot password form submission
    async handleForgotPassword(event) {
        event.preventDefault();
        
        const email = document.getElementById('resetEmail').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        
        // Validate passwords match
        if (newPassword !== confirmNewPassword) {
            this.showErrorMessage('Passwords do not match');
            return;
        }
        
        // Validate password strength
        if (newPassword.length < 6) {
            this.showErrorMessage('Password must be at least 6 characters long');
            return;
        }
        
        try {
            // Reset password
            const success = await this.resetUserPassword(email, newPassword);
            
            if (success) {
                this.showSuccessMessage('Password reset successfully! You can now login with your new password.');
                
                // Clear form
                document.getElementById('resetEmail').value = '';
                document.getElementById('newPassword').value = '';
                document.getElementById('confirmNewPassword').value = '';
                
                // Switch back to login form after 2 seconds
                setTimeout(() => {
                    this.switchToLogin();
                }, 2000);
            } else {
                this.showErrorMessage('Email not found. Please check your email address.');
            }
        } catch (error) {
            this.showErrorMessage('Password reset failed. Please try again.');
            console.error('Password reset error:', error);
        }
    }

    // Reset user password using API
    async resetUserPassword(email, newPassword) {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    newPassword: newPassword
                })
            });

            const data = await response.json();

            if (response.ok) {
                return true;
            } else {
                // Show specific error message from server
                this.showErrorMessage(data.error || 'Password reset failed');
                return false;
            }
        } catch (error) {
            console.error('Password reset API error:', error);
            
            // Fallback to localStorage for demo purposes
            const existingUsers = JSON.parse(localStorage.getItem('airesume_users') || '[]');
            const userIndex = existingUsers.findIndex(u => u.email === email);
            
            if (userIndex !== -1) {
                existingUsers[userIndex].password = newPassword;
                localStorage.setItem('airesume_users', JSON.stringify(existingUsers));
                return true;
            }
            
            // Check for demo user
            if (email === 'demo@airesume.com') {
                return true;
            }
            
            return false;
        }
    }

    // Simulate user authentication (replace with real API)
    async authenticateUser(email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if user exists in localStorage (demo purposes)
        const existingUsers = JSON.parse(localStorage.getItem('airesume_users') || '[]');
        const user = existingUsers.find(u => u.email === email && u.password === password);
        
        if (user) {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                plan: user.plan || 'free',
                joinDate: user.joinDate
            };
        }
        
        // Demo user for testing
        if (email === 'demo@airesume.com' && password === 'demo123') {
            return {
                id: 'demo-user',
                name: 'Demo User',
                email: 'demo@airesume.com',
                plan: 'pro',
                joinDate: new Date().toISOString()
            };
        }
        
        return null;
    }

    // Simulate user registration (replace with real API)
    async registerUser(name, email, password) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Check if email already exists
        const existingUsers = JSON.parse(localStorage.getItem('airesume_users') || '[]');
        if (existingUsers.find(u => u.email === email)) {
            return null;
        }
        
        // Create new user
        const newUser = {
            id: 'user_' + Date.now(),
            name,
            email,
            password, // In real app, this should be hashed
            plan: 'free',
            joinDate: new Date().toISOString()
        };
        
        // Save to localStorage (demo purposes)
        existingUsers.push(newUser);
        localStorage.setItem('airesume_users', JSON.stringify(existingUsers));
        
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            plan: newUser.plan,
            joinDate: newUser.joinDate
        };
    }

    // Google OAuth login
    async loginWithGoogle() {
        try {
            // Simulate Google OAuth (replace with actual Google OAuth implementation)
            this.showInfoMessage('Google OAuth integration coming soon!');
            
            // For demo purposes, create a mock Google user
            const mockGoogleUser = {
                id: 'google_' + Date.now(),
                name: 'Google User',
                email: 'user@gmail.com',
                plan: 'free',
                joinDate: new Date().toISOString(),
                provider: 'google',
                // Provide a demo token so session persists across pages
                token: 'demo-oauth-token'
            };
            
            this.currentUser = mockGoogleUser;
            localStorage.setItem('airesume_user', JSON.stringify(mockGoogleUser));
            this.updateUIForLoggedInUser();
            this.closeAuthModal();
            this.showSuccessMessage('Logged in with Google!');
            
            setTimeout(() => {
                this.showResumeBuilder();
            }, 1000);
        } catch (error) {
            this.showErrorMessage('Google login failed');
            console.error('Google login error:', error);
        }
    }

    // GitHub OAuth login
    async loginWithGitHub() {
        try {
            // Simulate GitHub OAuth (replace with actual GitHub OAuth implementation)
            this.showInfoMessage('GitHub OAuth integration coming soon!');
            
            // For demo purposes, create a mock GitHub user
            const mockGitHubUser = {
                id: 'github_' + Date.now(),
                name: 'GitHub User',
                email: 'user@github.com',
                plan: 'free',
                joinDate: new Date().toISOString(),
                provider: 'github',
                // Provide a demo token so session persists across pages
                token: 'demo-oauth-token'
            };
            
            this.currentUser = mockGitHubUser;
            localStorage.setItem('airesume_user', JSON.stringify(mockGitHubUser));
            this.updateUIForLoggedInUser();
            this.closeAuthModal();
            this.showSuccessMessage('Logged in with GitHub!');
            
            setTimeout(() => {
                this.showResumeBuilder();
            }, 1000);
        } catch (error) {
            this.showErrorMessage('GitHub login failed');
            console.error('GitHub login error:', error);
        }
    }

    // Google OAuth signup
    async signupWithGoogle() {
        await this.loginWithGoogle();
    }

    // GitHub OAuth signup
    async signupWithGitHub() {
        await this.loginWithGitHub();
    }

    // Update UI for logged in user
    updateUIForLoggedInUser() {
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons && this.currentUser) {
            authButtons.innerHTML = `
                <div class="user-menu">
                    <span class="user-name">Hi, ${this.currentUser.name}</span>
                    <button class="dashboard-btn" onclick="auth.showResumeBuilder()">Dashboard</button>
                    <button class="logout-btn" onclick="auth.logout()">Logout</button>
                </div>
            `;
        }
    }

    // Show resume builder and ensure resume data is loaded from backend
    async showResumeBuilder() {
        if (!this.currentUser) {
            this.showAuthModal('login');
            return;
        }

        const modal = document.getElementById('resumeBuilderModal');
        if (modal) {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            // Initialize resume builder and fetch server resume
            if (window.resumeBuilder) {
                await window.resumeBuilder.init();
                // If we have a resumeId from backend, keep it synced
                if (this.currentUser.resumeId && !window.resumeBuilder.resumeData.id) {
                    window.resumeBuilder.resumeData.id = this.currentUser.resumeId;
                }
            }
        }
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('airesume_user');
        
        // Reset UI
        const authButtons = document.querySelector('.auth-buttons');
        if (authButtons) {
            authButtons.innerHTML = `
                <button class="login-btn" onclick="auth.showAuthModal('login')">Login</button>
                <button class="signup-btn" onclick="auth.showAuthModal('signup')">Sign Up</button>
            `;
        }
        
        // Close any open modals
        this.closeAuthModal();
        this.closeResumeBuilder();
        
        this.showSuccessMessage('Logged out successfully');
    }

    // Close resume builder
    closeResumeBuilder() {
        const modal = document.getElementById('resumeBuilderModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    // Utility methods for showing messages
    showSuccessMessage(message) {
        this.showToast(message, 'success');
    }

    showErrorMessage(message) {
        this.showToast(message, 'error');
    }

    showInfoMessage(message) {
        this.showToast(message, 'info');
    }

    showToast(message, type = 'info') {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        // Set background color based on type
        switch (type) {
            case 'success':
                toast.style.background = '#28a745';
                break;
            case 'error':
                toast.style.background = '#dc3545';
                break;
            case 'info':
                toast.style.background = '#17a2b8';
                break;
            default:
                toast.style.background = '#6c757d';
        }
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize authentication system
const auth = new AuthSystem();
window.auth = auth;

// Centralized authenticated fetch helper
auth.makeAuthenticatedRequest = async function(url, options = {}) {
    if (!auth.currentUser || !auth.currentUser.token) {
        throw new Error('Not authenticated');
    }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${auth.currentUser.token}`,
        ...(options.headers || {})
    };
    return fetch(url, { ...options, headers });
};

// Global functions for HTML onclick handlers
function showAuthModal(type) {
    auth.showAuthModal(type);
}

function closeAuthModal() {
    auth.closeAuthModal();
}

function switchToSignup() {
    auth.switchToSignup();
}

function switchToLogin() {
    auth.switchToLogin();
}

function handleLogin(event) {
    auth.handleLogin(event);
}

function handleSignup(event) {
    auth.handleSignup(event);
}

function loginWithGoogle() {
    auth.loginWithGoogle();
}

function loginWithGitHub() {
    auth.loginWithGitHub();
}

function signupWithGoogle() {
    auth.signupWithGoogle();
}

function signupWithGitHub() {
    auth.signupWithGitHub();
}

function showForgotPassword() {
    auth.showForgotPassword();
}

function handleForgotPassword(event) {
    auth.handleForgotPassword(event);
}

function showResumeBuilder() {
    auth.showResumeBuilder();
}

function closeResumeBuilder() {
    auth.closeResumeBuilder();
}

// Add CSS for toast animations
const toastStyles = document.createElement('style');
toastStyles.innerHTML = `
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
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .user-menu {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
    
    .user-name {
        color: #333;
        font-weight: 600;
    }
    
    .dashboard-btn, .logout-btn {
        padding: 0.5rem 1rem;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-weight: 600;
        transition: all 0.3s ease;
    }
    
    .dashboard-btn {
        background: linear-gradient(135deg, #4a6bdf, #8a56e8);
        color: white;
    }
    
    .logout-btn {
        background: #dc3545;
        color: white;
    }
    
    .dashboard-btn:hover, .logout-btn:hover {
        transform: translateY(-1px);
        opacity: 0.9;
    }
`;
document.head.appendChild(toastStyles);

// --- Minimal bootstrap to expose auth globally and wire inline handlers ---
(function bootstrapAuth() {
    try {
        // Create a single global instance if missing
        if (!window.auth) {
            window.auth = new AuthSystem();
        }
        // Expose functions used by inline HTML if not already defined
        if (typeof window.showAuthModal !== 'function') {
            window.showAuthModal = function(type) { window.auth.showAuthModal(type || 'login'); };
        }
        if (typeof window.closeAuthModal !== 'function') {
            window.closeAuthModal = function() { window.auth.closeAuthModal(); };
        }
        if (typeof window.handleLogin !== 'function') {
            window.handleLogin = function(event) { window.auth.handleLogin(event); };
        }
        if (typeof window.handleSignup !== 'function') {
            window.handleSignup = function(event) { window.auth.handleSignup(event); };
        }
    } catch (e) {
        console.error('Auth bootstrap error:', e);
    }
})();