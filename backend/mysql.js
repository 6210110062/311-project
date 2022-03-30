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

app.listen('3001',()=>{
    console.log('server is running on port 3001');
})