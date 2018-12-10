const User = require('../../models/user')
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
                response.redirect(`/`)
            })
            .catch(error => {
                console.log(error.message)
            })
    })
}