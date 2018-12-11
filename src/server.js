require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const path = require('path')
const expressValidator = require('express-validator')
const port = process.env.PORT || 3000

const errorHandler = require('./server/errorHandler')
const notFound = require('./server/notFound')

const mongoose = require('mongoose')
const schema = mongoose.Schema
const Post = require('./models/post')
const Comment = require('./models/comment')

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

var checkAuth = (request, response, next) => {
    console.log('Checking authentication')
    if (typeof request.cookies.nToken === 'undefined' || request.cookies.nToken === null) {
        request.user = null
    } else {
        const token = request.cookies.nToken
        const decodedToken = jwt.decode(token, { complete: true }) || {}
        request.user = decodedToken.payload
    }
    next()
}

// app.use(checkAuth)

require('./data/unreddit-db')
require('./server/controllers/auth')(app)
require('./server/controllers/posts')(app)
require('./server/controllers/comments')(app)

app.get('/', (request, response) => {
    const currentUser = request.user

    Post.find({})
        .then(posts => {
            response.render('posts-index', { posts, currentUser })
        })
        .catch(error => {
            console.log(error.message)
        })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = app
