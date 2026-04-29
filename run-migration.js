#!/usr/bin/env node
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
	const migrationSQL = fs.readFileSync(path.join(__dirname, './src/shared/infra/database/drizzle/0000_mushy_reptil.sql'), 'utf-8');

	// Create a temporary file
	const tmpFile = `/tmp/migration_${Date.now()}.sql`;
	fs.writeFileSync(tmpFile, migrationSQL);

	// Execute using psql
	const result = execSync(`PGPASSWORD=postgres psql -U postgres -h localhost -d school_control -f ${tmpFile} 2>&1`, {
		encoding: 'utf-8',
		stdio: 'pipe'
	});

	fs.unlinkSync(tmpFile);
	console.log('SUCCESS: Migration applied');
	process.exit(0);
} catch (error) {
	console.error('ERROR:', error.message);
	process.exit(1);
}
