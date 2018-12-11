const Post = require('../../models/post')
const User = require('../../models/user')

module.exports = app => {

    app.get('/posts', (request, response) => {
        Post.find({})
            .then(posts => {
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
                    return User.findById(request.user._id)
                })
                .then(user => {
                    user.posts.unshift(post)
                    user.save()
                    response.redirect(`/posts/` + post._id)
                })
                .catch(error => {
                    console.log(error)
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
