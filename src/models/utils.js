const isEmpty = (name, email, password) => {
    return (name === '' || email === '' || password === '')
}

module.exports = { isEmpty }
