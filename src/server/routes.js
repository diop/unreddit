const express = require('express')
const router = express.Router()
const morgan = require('morgan')

const home = require('routes/home')
const posts = require('routes/posts')
const users = require('routes/users')

router.use(home)
router.use('/posts', posts)
router.use('/users', users)

module.exports = router
