const Post = require('../../models/post')

module.exports = app => {
    app.post('/posts/:id/comments', (request, response) => {
        Post.findById(request.params.postId).exec(function(error, post) {
            post.comments.unshift(request.body)
            post.save()

            return response.redirect(`/posts` + post._id)
        })
    })
}
