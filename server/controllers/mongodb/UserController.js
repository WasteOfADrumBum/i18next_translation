const User = require('../../models/mongodb/UserModel')

exports.createUser = async (req, res) => {
	try {
		const newUser = new User(req.body)
		await newUser.save()
		res.status(201).json(newUser)
	} catch (error) {
		res.status(500).json({ error: error.message })
	}
}
