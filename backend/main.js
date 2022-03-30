import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
const app = express()
const port = 3001


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

app.listen(port, () =>
    console.log(`Server is listening on port: http://localhost:${port}`)
);