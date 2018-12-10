const User = require('../../models/user')
const jwt = require('jsonwebtoken')

module.exports = app => {
    app.get('/sign-up', (request, response ) => {
        response.render('sign-up')
    })

    app.get('/login', (request, response ) => {
        response.render('login')
    })

    app.post('/sign-up', (request, response) => {
        const user = new User(request.body)

        user
            .save()
            .then(user => {
                const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '60 days'}) 
                response.redirect(`/`)
            })
            .catch(error => {
                console.log(error.message)
                return response.status(400).send({ error })
            })
    })
}