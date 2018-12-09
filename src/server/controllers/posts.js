const Post = require('../../models/post')

module.exports = app => {

    // app.get('/', (request, response) => {
    //     Post.find({})
    //         .then(posts => {
    //             console.log(posts)
    //             response.render('posts-index', { posts })
    //         })
    //         .catch(error => {
    //             console.log(error.message)
    //         })
    // })

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