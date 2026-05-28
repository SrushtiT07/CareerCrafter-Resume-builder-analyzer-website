// Update user registration dates to show varied dates
const Database = require('./config/database');

async function updateUserDates() {
    const database = new Database();

    try {
        await database.connect();

        console.log('🔄 Updating user registration dates...');

        // Update John Doe
        await database.run(`
            UPDATE users
            SET created_at = '2025-06-15T10:30:00.000Z'
            WHERE name = 'John Doe'
        `);

        // Update Jane Smith
        await database.run(`
            UPDATE users
            SET created_at = '2025-07-08T09:45:00.000Z'
            WHERE name = 'Jane Smith'
        `);

        // Update Bob Johnson
        await database.run(`
            UPDATE users
            SET created_at = '2025-09-19T14:20:00.000Z'
            WHERE name = 'Bob Johnson'
        `);

        console.log('✅ User registration dates updated successfully!');

        // Verify the updates
        const users = await database.all('SELECT name, created_at FROM users ORDER BY created_at');
        console.log('📊 Updated user dates:');
        users.forEach(user => {
            console.log(`  - ${user.name}: ${user.created_at}`);
        });

    } catch (error) {
        console.error('❌ Error updating user dates:', error);
    } finally {
        await database.close();
    }
}

updateUserDates();