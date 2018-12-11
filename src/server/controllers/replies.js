const Post = require('../../models/post')
const User = require('../../models/user')
const Comment = require('../../models/comment')

module.exports = app => {
    app.get('/posts/:postId/comments/:commentId/replies/new', (request, response) => {
        let post
        Post.findById(request.params.postId)
            .then(post => {
                post = p
                return Comment.findById(request.params.commentId)
            })
            .then(comment => {
                response.render('replies-new', { post, comment })
            })
            .catch(error => {
                console.log(error.message)
            })

            // Create reply
            app.post('/posts/postId/comments/:commentId/replies', (request, response) => {
                Post.findById(request.params.Id)
                    .then(post => {
                        const comment = post.comments.unshift(request.params.commentId)
                        comment.comments.unshift(request.body)
                        return post.save()
                    })
                    .then(post => {
                        response.redirect(`/posts` + post._id)
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            })
    })
}
