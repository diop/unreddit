/* Mongoose Connection */
const mongoose = require('mongoose')
assert = require('assert')

// const url = 'mongodb://localhost/unreddit-db'
const url = 'mongodb://heroku_bwmfv4z2:uv8ib9u34342i6o9jej8s2l4vl@ds117711.mlab.com:17711/heroku_bwmfv4z2'
mongoose.Promise = global.Promise
mongoose.connect(url, { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection Error:'))
mongoose.set('debug', true)

module.exports = mongoose.connection
