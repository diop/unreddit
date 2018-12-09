const Post = require('../../models/post')
const Comment = require('../../models/comment')

module.exports = app => {
    app.post('/posts/:id/comments', (request, response) => {
        const comment = new Comment(request.body)

        comment
            .save()
            .then(comment => {
                return Post.findById(request.params.id)
            })
            .then(post => {
                post.comments.unshift(comment)
                return post.save()
            })
            .then(post => {
                response.redirect(`/`)
            })
            .catch(error => {
                console.log(error)
            })
    })
}