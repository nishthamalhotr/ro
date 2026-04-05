const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

async function verifyDatabase() {
  try {
    console.log('🔍 Verifying database...\n');

    // Check users
    const usersResult = await pool.query('SELECT id, name, phone, email, created_at FROM users ORDER BY id');
    console.log('📊 Users in database:');
    usersResult.rows.forEach(user => {
      console.log(`  ID ${user.id}: ${user.name} (${user.phone})`);
    });
    console.log();

    // Check leads
    const leadsResult = await pool.query('SELECT COUNT(*) FROM leads');
    console.log(`📨 Total leads: ${leadsResult.rows[0].count}`);

    console.log('\n✅ Database verification complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

verifyDatabase();
