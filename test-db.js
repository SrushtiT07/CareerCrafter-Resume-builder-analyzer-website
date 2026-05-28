const db = require('./config/database');

(async () => {
    try {
        await db.connect();
        
        // Check what tables exist
        const tables = await db.all("SELECT name FROM sqlite_master WHERE type='table'");
        console.log('Tables:', tables.map(t => t.name));
        
        // Check if contact_submissions table exists
        const contactExists = tables.find(t => t.name === 'contact_submissions');
        console.log('Contact submissions table exists:', !!contactExists);
        
        // Check if newsletter_subscribers table exists
        const newsletterExists = tables.find(t => t.name === 'newsletter_subscribers');
        console.log('Newsletter subscribers table exists:', !!newsletterExists);
        
        await db.close();
    } catch (error) {
        console.error('Error:', error);
    }
})();