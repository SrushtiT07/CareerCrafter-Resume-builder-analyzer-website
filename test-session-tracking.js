const database = require('./config/database');

async function testSessionTracking() {
    try {
        await database.connect();
        
        // Test if we can insert a test session
        const testSessionId = 'test-session-' + Date.now();
        await database.run(`
            INSERT INTO user_sessions (
                id, user_id, session_token, ip_address, user_agent, 
                device_info, login_at, last_activity, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, 1)
        `, [testSessionId, '2b9a76c8-6886-40db-a335-85b449bddb35', 'test-token', '127.0.0.1', 'Test Agent', 'Desktop']);
        
        console.log('✅ Test session inserted successfully');
        
        // Check if it was inserted
        const session = await database.get('SELECT * FROM user_sessions WHERE id = ?', [testSessionId]);
        console.log('📋 Session found:', session ? 'Yes' : 'No');
        if (session) {
            console.log('Session details:', {
                id: session.id,
                user_id: session.user_id,
                device_info: session.device_info,
                is_active: session.is_active
            });
        }
        
        // Test login attempt insertion
        await database.run(`
            INSERT INTO login_attempts (
                email, ip_address, user_agent, success, failure_reason
            ) VALUES (?, ?, ?, ?, ?)
        `, ['test@example.com', '127.0.0.1', 'Test Agent', 1, null]);
        
        console.log('✅ Test login attempt inserted successfully');
        
        // Clean up
        await database.run('DELETE FROM user_sessions WHERE id = ?', [testSessionId]);
        await database.run('DELETE FROM login_attempts WHERE email = ?', ['test@example.com']);
        console.log('🧹 Test data cleaned up');
        
        // Check current session count
        const sessionCount = await database.get('SELECT COUNT(*) as count FROM user_sessions');
        console.log('📊 Current sessions in database:', sessionCount.count);
        
        const loginCount = await database.get('SELECT COUNT(*) as count FROM login_attempts');
        console.log('📊 Current login attempts in database:', loginCount.count);
        
    } catch (error) {
        console.error('❌ Database test error:', error);
    } finally {
        await database.close();
    }
}

testSessionTracking();