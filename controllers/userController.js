
// POST - CREATE USER
exports.post_user = (req, res) => {
    res.send('NYI: Create user')
}

// GET - FETCH USER DATA: fetch user data to be edited 
exports.get_user = (req, res) => {
    res.json({ message: 'NYI: Fetch user details' });
}

// PUT - UPDATE USER: update user info
exports.put_user = (req, res) => {
    res.json({ message: 'NYI: update user details' });
}

// DELETE : Delete user from database
exports.delete_user = (req, res) => {
    res.json({ message: 'NYI: update user details' });
}