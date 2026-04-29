const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
	connectionString: 'postgres://postgres:postgres@localhost:5432/school_control'
});

async function runMigration() {
	const client = await pool.connect();
	try {
		const migrationFile = fs.readFileSync(path.join(__dirname, './src/shared/infra/database/drizzle/0000_mushy_reptil.sql'), 'utf-8');
		await client.query(migrationFile);

		process.stdout.write('SUCCESS: Migration completed\n');
		process.exit(0);
	} catch (error) {
		process.stderr.write(`ERROR: ${error.message}\n`);
		process.exit(1);
		await pool.end();
	}
}

runMigration();
