import express from "express";
import { v4 as uuid } from "uuid";
const router = express.Router();
import jwt from "jsonwebtoken"

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

app.get('/users', authenticated, (req, res) => {
    res.send(users);
})

app.post('/user', authenticated, async (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuid() });
    res.send(" เพิ่มสำเร็จ ");
})

app.get('/user/:id', authenticated, (req, res) => {
    const singleUser = users.filter((user) => user.id === req.params.id);
    res.send(singleUser);
})

app.delete('/user/:id', authenticated, (req, res) => {
    users = users.filter((user) => user.id !== req.params.id);
    res.send("ลบสำเร็จ");
})

app.put("/user/:id", authenticated, (req, res) => {
    const user = users.find((user) => user.id === req.params.id);

    user.name = req.body.name;
    user.email = req.body.email;
    user.age = req.body.age;

    res.send(" แก่ไขสำเร็จ");
})

export default app;