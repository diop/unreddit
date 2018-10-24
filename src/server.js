const express = require('express')
const app = express()
const handlebars = require('handlebars')
const path = require('path')
const port = process.env.PORT || 3000

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => res.render('index.html'))
app.listen(port, () => console.log(`Listening on port ${port}...!`))
