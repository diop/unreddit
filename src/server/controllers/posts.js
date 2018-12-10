const Post = require('../../models/post')

module.exports = app => {

    app.get('/posts', (request, response) => {
        Post.find({})
            .then(posts => {
                console.log(posts)
                response.render('posts-index', { posts })
            })
            .catch(error => {
                console.log(error.message)
        })
    })

    app.get('/posts/new', (request, response) => {
        response.render('posts-new')
    })

    app.post('/posts/new', (request, response) => {
        if (request.user) {
            const post = new Post(request.body)
            post.author = request.user._id

            post
                .save()
                .then(post => {
                    return User.findById
                }) => {
                return response.redirect(`/`)
            })
        } else {
            return response.status(401) // Unauthorized
        }
    })

    app.get('/posts/:id', (request, response) => {
        const id = request.params.id
        Post.findById(id)
            .then(post => {
                response.render('post-show', { post })
            })
            .catch(error => {
                console.log(error.message)
            })
    })

    app.get('/n/:unsubreddit', function(request, response) {
        Post.find({ subunreddit: request.params.unsubreddit })
            .then(posts => {
                response.render('posts-index', { posts })
            })
            .catch(error => {
                console.log(error)
            })
    })

}