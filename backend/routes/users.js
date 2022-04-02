import express from "express";
import { v4 as uuid } from "uuid";
const router = express.Router();


const TOKEN_SECRET = '5df67f71e28fe771a86e4a9ab8caf6e45bbec2f2892976ec2cf9ac7f7f6202c80b32ba180c86d1b0750cfcdb18f41617d1d11751508538cfadf74591c6681b8b'
const authenticated = (req, res, next) => {
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')[1]
    if (!token)
        return res.sendStatus(401)
    jwt.verify(token, TOKEN_SECRET, (err, info) => {
        if (err) return res.sendStatus(403)
        req.username = info.username
        next()
    })
}

let users = [];

const app = express();

app.get('/users',(req, res) =>{
    res.send(users)
})

app.post('/user', (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuid() });
    res.send(" Added ");
})

app.get('/user/:id',(req, res) => {
    const singleUser = users.filter((user) => user.id === req.params.id);
    res.send(singleUser);
})

app.delete('/user/:id',(req, res) => {
    users = users.filter((user) => user.id !== req.params.id);
    res.send("Deleted");
})

app.put("/user/:id", (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    user.name = req.body.name;
    user.email = req.body.email;
    user.contact = req.body.contact;

    res.send(" Successfully");
})

export default app;