const express = require('express')
const app = express()
const router = express.Router()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const path = require('path')
const port = process.env.PORT || 3000

const routes = ('./server/routes')
const errorHandler = ('./server/errorHandler/')
const notFound = ('./server/notFound')

const mongoose = require('mongoose')
const schema = mongoose.Schema
const Post = ('./models/post')
const Comment = ('./models/comment')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
// app.use(expressValidator())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

// app.use(routes)
// app.use(errorHandler)
// app.use(notFound)

app.listen(port, () => console.log(`Listening on port ${port}...`))
