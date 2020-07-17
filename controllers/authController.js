

exports.auth_login = (req, res) => {
    res.json({ message: 'This will use local strategy once setup' })
}

exports.auth_logout = (req, res) => {
    res.json({ message: 'This is will use passport local strategy once set up' })
}