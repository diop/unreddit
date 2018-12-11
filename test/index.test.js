const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

describe('site', () => {
    it('should have a home page', done => {
        chai
            .request('http://localhost:3000')
            .get('/')
            .end((error, result) => {
                if (error) {
                    return done(error)
                }
                result.status.should.be.equal(200)
                return done()
            })
    })
})
