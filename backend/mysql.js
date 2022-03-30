import express from "express"
import mysql from "Mysql"
import cors from "cors"
const app = express();


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user:"root",
    host:"localhost",
    password:"",
    database:"addUser"
})

app.get('/addUser',(req, res)=>{
    db.query("SELECT * FROM addUser",(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.get('/view/:id',(req, res)=>{
    db.query("SELECT id FROM addUser LIKE ':id'",(err,result)=>{
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
app.post('/addUser',(req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const contact = req.body.contact
    db.query("INSERT INTO addUser (name, email, contact) VALUES (?,?,?)",[name,email,contact],
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send("Add User Success");
        }
    });
})
app.listen('3001',()=>{
    console.log('server is running on port 3001');
})