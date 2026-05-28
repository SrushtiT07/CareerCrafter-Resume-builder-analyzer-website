const database = require('./config/database');

async function testActivityTracking() {
    try {
        console.log('🔄 Testing activity tracking system...');
        
        await database.connect();
        
        // Check if new tables exist
        console.log('\n📊 Checking database tables...');
        
        const tables = await database.all(`
            SELECT name FROM sqlite_master 
            WHERE type='table' 
            AND name IN ('user_sessions', 'user_activities', 'login_attempts')
            ORDER BY name
        `);
        
        console.log('Found tables:', tables.map(t => t.name));
        
        // Check if there are any user activities
        const activityCount = await database.get('SELECT COUNT(*) as count FROM user_activities');
        console.log(`\n📈 Total user activities: ${activityCount.count}`);
        
        const sessionCount = await database.get('SELECT COUNT(*) as count FROM user_sessions');
        console.log(`👥 Total user sessions: ${sessionCount.count}`);
        
        const loginAttemptCount = await database.get('SELECT COUNT(*) as count FROM login_attempts');
        console.log(`🔐 Total login attempts: ${loginAttemptCount.count}`);
        
        // Show recent activities if any
        if (activityCount.count > 0) {
            console.log('\n📋 Recent activities:');
            const recentActivities = await database.all(`
                SELECT 
                    ua.activity_type,
                    ua.activity_description,
                    ua.created_at,
                    u.name as user_name,
                    u.email as user_email
                FROM user_activities ua
                JOIN users u ON ua.user_id = u.id
                ORDER BY ua.created_at DESC
                LIMIT 5
            `);
            
            recentActivities.forEach(activity => {
                console.log(`  - ${activity.activity_type}: ${activity.activity_description} by ${activity.user_name} (${activity.user_email}) at ${activity.created_at}`);
            });
        }
        
        // Show active sessions if any
        if (sessionCount.count > 0) {
            console.log('\n🔄 Active sessions:');
            const activeSessions = await database.all(`
                SELECT 
                    us.device_info,
                    us.ip_address,
                    us.login_at,
                    us.is_active,
                    u.name as user_name,
                    u.email as user_email
                FROM user_sessions us
                JOIN users u ON us.user_id = u.id
                WHERE us.is_active = 1
                ORDER BY us.login_at DESC
                LIMIT 5
            `);
            
            activeSessions.forEach(session => {
                console.log(`  - ${session.user_name} (${session.user_email}) from ${session.ip_address} on ${session.device_info} since ${session.login_at}`);
            });
        }
        
        console.log('\n✅ Activity tracking system test completed!');
        
    } catch (error) {
        console.error('❌ Error testing activity tracking:', error);
    } finally {
        await database.close();
    }
}

// Run the test
testActivityTracking();