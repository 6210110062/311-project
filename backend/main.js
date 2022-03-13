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

app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.json(users.find(user => user.id === Number(req.params.id)))
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})