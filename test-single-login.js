// Test a single login to check if tracking works
const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

async function testLogin() {
    try {
        console.log('🔐 Testing login with existing user...');
        
        // Try to login with an existing user
        const response = await axios.post(`${baseURL}/auth/login`, {
            email: 'john.doe@example.com',
            password: 'password123'  // This might not be the right password
        });
        
        console.log('✅ Login successful!');
        console.log('Response:', response.data);
        
    } catch (error) {
        if (error.response) {
            console.log('❌ Login failed (expected):', error.response.data.error);
            console.log('Status:', error.response.status);
        } else {
            console.log('❌ Network error:', error.message);
        }
    }
    
    // Wait a moment then check the database
    setTimeout(async () => {
        const database = require('./config/database');
        try {
            await database.connect();
            
            const loginAttempts = await database.all('SELECT * FROM login_attempts ORDER BY attempted_at DESC LIMIT 5');
            console.log('\n🔍 Login attempts after test:', loginAttempts.length);
            loginAttempts.forEach(attempt => {
                console.log(`  - ${attempt.email} - ${attempt.success ? 'SUCCESS' : 'FAILED'} - ${attempt.failure_reason || 'N/A'} - ${attempt.attempted_at}`);
            });
            
        } catch (error) {
            console.error('❌ Error checking database:', error);
        } finally {
            await database.close();
        }
    }, 1000);
}

testLogin();