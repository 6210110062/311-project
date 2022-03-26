import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
const port = 3001
//const users = require('./info')

import userRoutes from "./routes/users.js";

app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);

app.get('/', (req, res) =>
    res.send("hello"));

app.all("*", (req, res) =>
    res.send("hello"));

//app.post('/api/login', bodyParser.json(), async (req, res) => {
//  let token = req.body.token
//  let result = await axios.get('https://graph.facebook.com/me', {
//    params: {
//      fields: 'id,name,email',
//    access_token: token
// }

// })
// console.log(result)
//res.send({ ok: 1 })
//})


//app.get('/users', (req, res) => {
//    res.json(users)
//})

//
//app.get('/users/:id', (req, res) => {
//   res.json(users.find(user => user.id === Number(req.params.id)))
//})

//app.post('/users', (req, res) => {
//    users.push(req.body)
//   let json = req.body
//    res.send(`Add new user '${json.username}' completed.`)
//})

//app.delete('/users/:id', (req, res) => {
//  const deletedIndex = users.findIndex(user => user.id === Number(req.params.id))
//   res.send(`Delete user '${users[deletedIndex].username}' completed.`)
//})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})