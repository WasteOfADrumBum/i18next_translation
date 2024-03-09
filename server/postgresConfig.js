const { Pool } = require('pg')

// Create a PostgreSQL connection pool
const pool = new Pool({
	user: 'postgres',
	host: 'postgres', // Docker service name
	database: 'eventDB',
	password: '',
	port: 5432,
})

// Log connection status
pool.connect((err, client, release) => {
	if (err) {
		console.error('\x1b[31mError connecting to PostgreSQL database:', err)
	} else {
		console.log('\x1b[32mConnected to PostgreSQL database')
		release()
	}
})

// Export the pool object
module.exports = pool
