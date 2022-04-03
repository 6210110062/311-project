import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import jwt from "jsonwebtoken"
import axios from "axios"
import logger from "./logger/logger.js"
const app = express()
const port = 3001

import userRoutes from "./routes/users.js";


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

app.use(bodyParser.json());
app.use(cors());
app.get('/hello', authenticated, (req, res) => {
    res.send("hello");
    logger.info('INFO Message');
})

app.use('/', userRoutes);

/* app.all("*", (req, res) =>
    res.send("hello"));
 */
app.get('/api/info', authenticated, (req, res) => {
    res.send({ ok: 1, username: req.username })
    logger.error('Error Message');
})




app.post('/api/login', bodyParser.json(), async (req, res) => {
    let token = req.body.token
    let result = await axios.get('https://graph.facebook.com/me', {
        params: {
            fields: 'id,name,email',
            access_token: token

        }
    })
    if (!result.data.id) {
        res.sendStatus(403)
        return
    }
    let data = {
        username: result.data.email
    }
    let access_token = jwt.sign(data, TOKEN_SECRET, { expiresIn: "1800s" })
    res.send({ access_token, username: data.username })
    logger.info('INFO Message');
})

app.listen(port, () =>
    console.log(`Server is listening on port: http://localhost:${port}`)
    
);