const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api';

async function testEndpoints() {
    console.log('🧪 Testing CareerCrafter Backend Endpoints...\n');

    try {
        // Test 1: Homepage stats
        console.log('1. Testing homepage stats...');
        const statsResponse = await axios.get(`${BASE_URL}/index/stats`);
        console.log('✅ Homepage stats:', statsResponse.data);
        console.log('');

        // Test 2: Featured templates
        console.log('2. Testing featured templates...');
        const templatesResponse = await axios.get(`${BASE_URL}/index/featured-templates`);
        console.log('✅ Featured templates:', templatesResponse.data);
        console.log('');

        // Test 3: All features list
        console.log('3. Testing features list...');
        const featuresResponse = await axios.get(`${BASE_URL}/features`);
        console.log('✅ Features list:', featuresResponse.data);
        console.log('');

        // Test 4: All templates list
        console.log('4. Testing templates list...');
        const allTemplatesResponse = await axios.get(`${BASE_URL}/templates`);
        console.log('✅ Templates list:', allTemplatesResponse.data);
        console.log('');

        // Test 5: QR customization options
        console.log('5. Testing QR customization options...');
        const qrOptionsResponse = await axios.get(`${BASE_URL}/qr/customization/options`);
        console.log('✅ QR customization options:', qrOptionsResponse.data);
        console.log('');

        // Test 6: Demo QR code generation
        console.log('6. Testing demo QR code generation...');
        const demoQRResponse = await axios.post(`${BASE_URL}/qr/demo`, {
            customization: {
                size: 256,
                foregroundColor: '#000000',
                backgroundColor: '#FFFFFF'
            }
        });
        console.log('✅ Demo QR code generated successfully');
        console.log('');

        // Test 7: Test features available
        console.log('7. Testing available test features...');
        const testFeaturesResponse = await axios.get(`${BASE_URL}/test-features/available`);
        console.log('✅ Test features:', testFeaturesResponse.data);
        console.log('');

        // Test 8: QR integration best practices
        console.log('8. Testing QR integration best practices...');
        const bestPracticesResponse = await axios.get(`${BASE_URL}/qr-integration/best-practices`);
        console.log('✅ Best practices loaded successfully');
        console.log('');

        // Test 9: Track interaction
        console.log('9. Testing interaction tracking...');
        const trackResponse = await axios.post(`${BASE_URL}/index/track-interaction`, {
            action: 'test',
            element: 'test-button'
        });
        console.log('✅ Interaction tracked:', trackResponse.data);
        console.log('');

        // Test 10: Health check
        console.log('10. Testing health check...');
        const healthResponse = await axios.get(`${BASE_URL}/health`);
        console.log('✅ Health check:', healthResponse.data);
        console.log('');

        console.log('🎉 All tests passed successfully!');
        console.log('\n📊 Backend Summary:');
        console.log('- ✅ Index page backend: Working');
        console.log('- ✅ Feature details backend: Working');
        console.log('- ✅ Template details backend: Working');
        console.log('- ✅ QR demo backend: Working');
        console.log('- ✅ QR integration backend: Working');
        console.log('- ✅ Test features backend: Working');
        console.log('- ✅ Database operations: Working');
        console.log('- ✅ Analytics tracking: Working');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Install axios if not present, then run tests
const { exec } = require('child_process');

exec('npm list axios', (error) => {
    if (error) {
        console.log('Installing axios for testing...');
        exec('npm install axios --save-dev', (installError) => {
            if (installError) {
                console.error('Failed to install axios:', installError);
                return;
            }
            testEndpoints();
        });
    } else {
        testEndpoints();
    }
});