const Post = require('../src/models/post')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/server')
const should = chai.should()
chai.use(chaiHttp)

const agent = chai.request.agent(server)

const post = {
    title: 'post title',
    url: 'https://www.makeschool.com',
    summary: 'post summary'
}

before(done => {
    agent
        .post('login')
        .send({ username: 'testone', password: 'password'})
        .end(function(error, response) {
            done()
        })
})

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
                return done()
            })
        })
    })
})
