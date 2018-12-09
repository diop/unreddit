require('dotenv').config()
const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const path = require('path')
const expressValidator = require('express-validator')
const port = process.env.PORT || 3000

const errorHandler = require('./server/errorHandler')
const notFound = require('./server/notFound')

const mongoose = require('mongoose')
const schema = mongoose.Schema
const Post = ('./models/post')
const Comment = ('./models/comment')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(expressValidator())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

require('./server/controllers/posts')(app)
require('./data/unreddit-db')

console.log('sanity check')
app.get('/', (request, response) => {
    Post.find()
    .then(posts => {
        console.log(posts)
        response.render('posts-index', { posts: posts })
    }).catch((error) => {
        response.send(error.message)
    })
})

app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = app
