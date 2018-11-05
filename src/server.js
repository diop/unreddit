const express = require('express')
const app = express()
const router = express.Router()
const handlebars = require('express-handlebars')
const port = process.env.PORT || 3000

const routes = ('./server/routes')
const errorHandler = ('./server/errorHandler/')
const notFound = ('./server/notFound')

const mongoose = require('mongoose')
const schema = mongoose.Schema
const Post = ('./models/post')
const Comment ('./models/comment')

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({defaultLayout: 'main'}))

app.use(routes)
app.use(errorHandler)
app.use(notFound)

app.listen(port, () => console.log(`Listening on port ${port}...`))
