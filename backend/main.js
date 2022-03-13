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

app.post('/api/login', bodyParser.json(), async (req, res) => {
    let token = req.body.token
    let result = await axios.get('https://graph.facebook.com/me', {
        params: {
            fields: 'id,name,email',
            access_token: token
        }

    })
    console.log(result)
    res.send({ ok: 1 })
})
app.get('/users', (req, res) => {
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.json(users.find(user => user.id === Number(req.params.id)))
})

app.post('/users', (req, res) => {
    users.push(req.body)
    let json = req.body
    res.send(`Add new user '${json.username}' completed.`)
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})