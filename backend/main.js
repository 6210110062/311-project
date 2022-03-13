const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const users = require('./info')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})