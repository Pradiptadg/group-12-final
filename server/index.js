const express = require('express')
const bodyParser = require ('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
const dotenv = require('dotenv').config()
const validator = require('email-validator')
 




const db = mysql.createPool({ // createConnection
    host: 'localhost',
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DATABASE,
    port: process.env.DBPORT
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

// READ
app.get("/api/read", (req, res) => {
    const sqlSelect = "SELECT * FROM volunteers;"
    db.query(sqlSelect, (err, result) => {
        if(err){
            throw err;
        }
        res.send(result);
    })
})

// CREATE
app.post("/api/create", (req, res) => {
    const fn = req.body.first
    const ln = req.body.last
    const ea = req.body.email
    const ag = parseInt(req.body.age)
    /*const tog = req.body.toggle*/
   
    const valid = validator.validate(ea)

    const isValid = Number.isInteger(ag)

    const validString = !containsNumbers(fn)

    

    console.log(isValid)
    console.log(validString)

    if(!validString) {
        app.get("/api/stringError", function (req, res) {
            res.send({500: 'showAlert' });
        });
        

    }

    if(valid && fn!=ln && isValid && validString)  {
        const sqlInsert = 'INSERT INTO volunteers (first_name, last_name, email_address, user_age) SELECT * FROM ( SELECT ?, ?, ?, ?) AS tmp WHERE NOT EXISTS (SELECT email_address from volunteers WHERE email_address = ?) LIMIT 1; '
        db.query(sqlInsert, [fn, ln, ea, ag, ea], (err, result) => {
            if(err) throw err
            console.log("Server posted: ", fn, ln)
            res.send(result)
        })
    }

    else if(!valid || fn==ln)
    {
            res.status(409).json({error: "Invalid"})
            console.log("Email")
        
    }

    
})

// DELETE
app.delete("/api/delete/:emailAddress", (req, res) => {
    const ea = req.params.emailAddress;
    console.log(ea)
    const sqlDelete = "DELETE FROM volunteers WHERE email_address = ?";
    db.query(sqlDelete, [ea], (err, result) => {
        if(err) throw err
        console.log("Server: deleted: ", ea)
        res.send(result)
    })
})

// UPDATE
app.put("/api/update", (req, res) => {
    // console.log(req)

    const ne = req.body.new;
    const oe = req.body.old;
    console.log("Ready to change: ", oe, "to", ne)
    const sqlUpdate = "UPDATE volunteers SET email_address = ? WHERE email_address = ?"
    db.query(sqlUpdate, [ne, oe], (err, result)=>{
        if(err)  throw err;
        console.log("Server changed: ", oe, "to", ne)
        res.send(result)
    })
})

const PORT = process.env.EXPRESSPORT;
const msg = `Running on PORT ${PORT}`
app.get("/", (req, res) => {
    res.send(`<h1>Express Server</h1><p>${msg}<p>`)
})
app.listen(PORT, () => {
    console.log(msg)
})



function containsNumbers(str) 
{
    return /\d/.test(str);
}

