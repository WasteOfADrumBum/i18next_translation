const { Pool } = require('pg')
const fs = require('fs')

console.log('password: ', process.env.POSTGRES_SUPERUSER_PASSWORD)

// Create a writable stream to a log file
const logStream = fs.createWriteStream('pool.log', { flags: 'a' })

// Create a PostgreSQL connection pool
const pool = new Pool({
	user: 'postgres',
	host: 'postgres', // Docker service name
	database: 'eventDB',
	password: process.env.POSTGRES_SUPERUSER_PASSWORD,
	port: 5432,
})

console.log('pool: ', pool)

// Log connection status to the console and the log file
pool.connect((err, client, release) => {
	if (err) {
		console.error('\x1b[31mError connecting to PostgreSQL database:', err)
		logStream.write(`Error connecting to PostgreSQL database: ${err}\n`)
	} else {
		console.log('\x1b[32mConnected to PostgreSQL database')
		logStream.write('Connected to PostgreSQL database\n')
		release()
	}
})

// Export the pool object
module.exports = pool
