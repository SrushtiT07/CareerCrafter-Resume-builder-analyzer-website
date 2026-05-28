// Test script to generate sample login data for admin dashboard
const axios = require('axios');

const baseURL = 'http://localhost:3000/api';

// Sample users to create and test with
const testUsers = [
    { name: 'John Doe', email: 'john.doe@example.com', password: 'password123' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password123' },
    { name: 'Mike Johnson', email: 'mike.johnson@example.com', password: 'password123' },
    { name: 'Sarah Wilson', email: 'sarah.wilson@example.com', password: 'password123' },
    { name: 'David Brown', email: 'david.brown@example.com', password: 'password123' }
];

async function createTestData() {
    console.log('🚀 Creating test users and login data...');
    
    try {
        // Register test users
        for (const user of testUsers) {
            try {
                const response = await axios.post(`${baseURL}/auth/register`, user);
                console.log(`✅ Registered user: ${user.email}`);
            } catch (error) {
                if (error.response?.status === 409) {
                    console.log(`ℹ️  User already exists: ${user.email}`);
                } else {
                    console.log(`❌ Failed to register ${user.email}:`, error.response?.data?.error || error.message);
                }
            }
        }
        
        // Wait a bit
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate successful logins
        console.log('\n🔐 Generating successful login attempts...');
        for (const user of testUsers) {
            try {
                const response = await axios.post(`${baseURL}/auth/login`, {
                    email: user.email,
                    password: user.password
                });
                console.log(`✅ Successful login: ${user.email}`);
                
                // Wait between logins to simulate real usage
                await new Promise(resolve => setTimeout(resolve, 500));
            } catch (error) {
                console.log(`❌ Failed login for ${user.email}:`, error.response?.data?.error || error.message);
            }
        }
        
        // Generate some failed login attempts
        console.log('\n🚫 Generating failed login attempts...');
        const failedAttempts = [
            { email: 'john.doe@example.com', password: 'wrongpassword' },
            { email: 'nonexistent@example.com', password: 'password123' },
            { email: 'jane.smith@example.com', password: 'badpass' },
            { email: 'hacker@evil.com', password: 'admin123' }
        ];
        
        for (const attempt of failedAttempts) {
            try {
                await axios.post(`${baseURL}/auth/login`, attempt);
            } catch (error) {
                console.log(`✅ Expected failed login: ${attempt.email}`);
            }
            await new Promise(resolve => setTimeout(resolve, 300));
        }
        
        // Generate some additional successful logins to show recent activity
        console.log('\n🔄 Generating recent login activity...');
        for (let i = 0; i < 3; i++) {
            const randomUser = testUsers[Math.floor(Math.random() * testUsers.length)];
            try {
                await axios.post(`${baseURL}/auth/login`, {
                    email: randomUser.email,
                    password: randomUser.password
                });
                console.log(`✅ Recent login: ${randomUser.email}`);
                await new Promise(resolve => setTimeout(resolve, 800));
            } catch (error) {
                console.log(`❌ Failed recent login for ${randomUser.email}`);
            }
        }
        
        console.log('\n🎉 Test data generation completed!');
        console.log('📊 You can now check your admin dashboard at: http://localhost:3000/ui/admin-dashboard.html');
        console.log('🔍 Check the following tabs:');
        console.log('   - User Activities: See user registrations and logins');
        console.log('   - Active Sessions: See current user sessions');
        console.log('   - Security: See all login attempts (successful and failed)');
        
    } catch (error) {
        console.error('❌ Error generating test data:', error.message);
    }
}

// Run the test data generation
createTestData();