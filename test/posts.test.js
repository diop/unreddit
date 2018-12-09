const Post = require('../src/models/post')
const post = { 
    title: 'post title', 
    url: 'https://www.makeschool.com', 
    summary: 'post summary'
}

describe('Posts', () => {
    it('should create valid attibutes at POST /posts', done => {
        Post.findOneAndRemove(post, function() {
            Post.find(function(error, posts){
                var postCount = posts.count
                const url = 'http://localhost:3000'
    
                chai
                    .request(url)
                    .post('/posts/new')
                    .send(post)
                    .then(response => {
                        Post.find(function(error, posts) {
                            postCount.should.be.equal(posts.length + 1)
                            response.should.have.status(200)
                            return done()
                        })
                    })
                    .catch(error => {
                        return done(error)
                    })
            })
        })
    })
})