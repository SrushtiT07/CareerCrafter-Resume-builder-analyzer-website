const fetch = require('node-fetch');

async function testLogin() {
    try {
        console.log('🔐 Testing user login...');
        
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Test-Agent/1.0'
            },
            body: JSON.stringify({
                email: 'john.doe@example.com',
                password: 'password123'
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('✅ Login successful');
            console.log('User:', data.user.name);
            console.log('Token received:', data.token ? 'Yes' : 'No');
        } else {
            const error = await response.json();
            console.log('❌ Login failed:', error.error);
        }
        
    } catch (error) {
        console.error('❌ Test error:', error.message);
    }
}

// Test if server is running
async function checkServer() {
    try {
        const response = await fetch('http://localhost:3000/api/health');
        if (response.ok) {
            console.log('✅ Server is running');
            await testLogin();
        } else {
            console.log('❌ Server health check failed');
        }
    } catch (error) {
        console.log('❌ Server is not running. Please start the server first.');
        console.log('Run: npm start or node server.js');
    }
}

checkServer();