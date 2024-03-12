// Function to fetch all events from PostgreSQL
const getAllEventsFromPostgres = async (dbPool) => {
	try {
		const client = await dbPool.connect()
		const result = await client.query('SELECT * FROM events')
		client.release()
		console.log('\x1b[32mEvents fetched from PostgreSQL (Utils)\x1b[0m')
		return result.rows
	} catch (err) {
		console.error('\x1b[31mError fetching events from PostgreSQL: (Utils)\x1b[0m', err)
		throw err
	}
}

// Get all events from PostgreSQL
const getAllEventsFromPostgresController = async (req, res) => {
	try {
		console.log('\x1b[32mFetching all events from PostgreSQL (Controller)\x1b[0m')
		const eventsFromPostgres = await getAllEventsFromPostgres(req.dbPool)
		console.log('\x1b[32mEvents fetched from PostgreSQL: (Controller)\x1b[0m', eventsFromPostgres)
		res.json(eventsFromPostgres)
	} catch (err) {
		console.error('\x1b[31mError fetching all events from PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to create a new event in PostgreSQL
const createEventInPostgres = async (req, res) => {
	try {
		console.log('\x1b[32mCreating new event in PostgreSQL (Controller)\x1b[0m')
		const { title, description, tagging, methodOfReceipt } = req.body
		const client = await req.dbPool.connect()
		const result = await client.query(
			'INSERT INTO events(title, description, tagging, methodOfReceipt) VALUES($1, $2, $3, $4) RETURNING *',
			[title, description, tagging, methodOfReceipt],
		)
		client.release()
		console.log('\x1b[32mEvent created in PostgreSQL: (Controller)\x1b[0m', result.rows[0])
		res.json(result.rows[0])
	} catch (err) {
		console.error('\x1b[31mError creating new event in PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to update an event in PostgreSQL
const updateEventInPostgres = async (req, res) => {
	try {
		console.log('\x1b[32mUpdating event in PostgreSQL (Controller)\x1b[0m')
		const { title, description, tagging, methodOfReceipt } = req.body
		const client = await req.dbPool.connect()
		const result = await client.query(
			'UPDATE events SET title=$1, description=$2, tagging=$3, methodOfReceipt=$4 WHERE id=$5 RETURNING *',
			[title, description, tagging, methodOfReceipt, req.params.id],
		)
		client.release()
		console.log('\x1b[32mEvent updated in PostgreSQL: (Controller)\x1b[0m', result.rows[0])
		res.json(result.rows[0])
	} catch (err) {
		console.error('\x1b[31mError updating event in PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

// Function to delete an event from PostgreSQL
const deleteEventFromPostgres = async (req, res) => {
	try {
		console.log('\x1b[32mDeleting event from PostgreSQL (Controller)\x1b[0m')
		const client = await req.dbPool.connect()
		const result = await client.query('DELETE FROM events WHERE id = $1 RETURNING *', [req.params.id])
		client.release()
		console.log('\x1b[32mEvent deleted from PostgreSQL: (Controller)\x1b[0m', result.rows[0])
		res.json(result.rows[0])
	} catch (err) {
		console.error('\x1b[31mError deleting event from PostgreSQL: (Controller)\x1b[0m', err)
		res.status(500).json({ message: 'Server Error' })
	}
}

module.exports = {
	getAllEventsFromPostgresController,
	createEventInPostgres,
	updateEventInPostgres,
	deleteEventFromPostgres,
}
