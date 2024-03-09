const { Pool } = require('pg')

// Create a PostgreSQL connection pool
const pool = new Pool({
	user: 'postgres',
	host: 'postgres', // Docker service name
	database: 'eventDB',
	password: '',
	port: 5432,
})

// Export the pool object
module.exports = pool
