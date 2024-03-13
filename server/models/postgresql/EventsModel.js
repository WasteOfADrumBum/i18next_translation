// Import required dependencies
const { pool } = require('../../server')

// Function to fetch all events from PostgreSQL
const getAllEventsFromPostgres = async () => {
	try {
		const client = await pool.connect()
		const result = await client.query('SELECT * FROM events')
		client.release()
		console.log('\x1b[32mEvents fetched from PostgreSQL (Model)\x1b[0m')
		return result.rows
	} catch (err) {
		console.error('\x1b[31mError fetching events from PostgreSQL: (Model)\x1b[0m', err)
		throw err
	}
}

// Function to create a new event in PostgreSQL
const createEventInPostgres = async (title, description, tagging, methodOfReceipt) => {
	try {
		const client = await pool.connect()
		const result = await client.query(
			'INSERT INTO events(title, description, tagging, method_of_receipt) VALUES($1, $2, $3, $4) RETURNING *',
			[title, description, tagging, methodOfReceipt],
		)
		client.release()
		console.log('\x1b[32mEvent created in PostgreSQL (Model)\x1b[0m', result.rows[0])
		return result.rows[0]
	} catch (err) {
		console.error('\x1b[31mError creating new event in PostgreSQL: (Model)\x1b[0m', err)
		throw err
	}
}

// Function to update an event in PostgreSQL
const updateEventInPostgres = async (id, title, description, tagging, methodOfReceipt) => {
	try {
		const client = await pool.connect()
		const result = await client.query(
			'UPDATE events SET title=$1, description=$2, tagging=$3, method_of_receipt=$4 WHERE id=$5 RETURNING *',
			[title, description, tagging, methodOfReceipt, id],
		)
		client.release()
		console.log('\x1b[32mEvent updated in PostgreSQL (Model)\x1b[0m', result.rows[0])
		return result.rows[0]
	} catch (err) {
		console.error('\x1b[31mError updating event in PostgreSQL: (Model)\x1b[0m', err)
		throw err
	}
}

// Function to delete an event from PostgreSQL
const deleteEventFromPostgres = async (id) => {
	try {
		const client = await pool.connect()
		const result = await client.query('DELETE FROM events WHERE id = $1 RETURNING *', [id])
		client.release()
		console.log('\x1b[32mEvent deleted from PostgreSQL (Model)\x1b[0m', result.rows[0])
		return result.rows[0]
	} catch (err) {
		console.error('\x1b[31mError deleting event from PostgreSQL: (Model)\x1b[0m', err)
		throw err
	}
}

console.log('\x1b[36mPostgreSQL:\x1b[0m Model \x1b[32mEvents\x1b[0m')

module.exports = {
	getAllEventsFromPostgres,
	createEventInPostgres,
	updateEventInPostgres,
	deleteEventFromPostgres,
}
