const Post = require('../../models/post')

module.exports = app => {

    app.get('/posts/new', (request, response) => {
        response.render('posts-new')
    })

    app.post('/posts/new', (request, response) => {
        const post = new Post(request.body)

        post.save((error, post) => {
            return response.redirect(`/`)
        })
    })

}