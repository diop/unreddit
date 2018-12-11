const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../src/server')
const should = chai.should()
chai.use(chaiHttp)

const agent = chai.request.agent(server)

const User = require('../src/models/user')

describe('User', function(){
    it('Should not be able to login if they have not registered', done => {
        agent.post('/login', { email: 'wrong@wrong.com', password: 'nope'}).end(function(error, response) {
            response.status.should.be.equal(401)
            done()
        })
    })

    // Signup
    it('Should be able to signup', done => {
        User.findOneAndRemove({ username: 'testone' }, function() {
            agent
                .post('/sign-up')
                .send({ username: 'testone', password: 'password'})
                .end(function(error, response) {
                    console.log(response.body)
                    response.should.have.status(200)
                    agent.should.have.cookie('nToken')
                    done()
                })
        })
    })

    // Login
    it('Should be able to logout', done => {
        agent.get('/logout').end(function(error, response) {
            response.should.have.status(200)
            agent.should.not.have.cookie('nToken')
            done()
        })
    })

    // Additional Login
    it('should be able to login', done => {
        agent
            .post('/login')
            .send({ username: 'username', password: 'password'})
            .end(function(error, response) {
                response.should.have.status(200)
                agent.should.have.cookie('nToken')
                done()
            })
    })

})
