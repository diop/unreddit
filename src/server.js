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

require('./data/unreddit-db')
require('./server/controllers/posts')(app)
require('./server/controllers/comments')(app)


app.listen(port, () => console.log(`Listening on port ${port}...`))

module.exports = app
