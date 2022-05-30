const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash')


app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(cors())
app.set('json spaces', 2)

app.listen(3002)

const con = mysql.createConnection({
    "socketPath": "/Applications/MAMP/tmp/mysql/mysql.sock",
    "user": "admin",
    "password": "admin",
    "host": "127.0.0.1",
    "database": "goodsailors",
})

con.connect(function (err) {
    if (err) throw err
    // console.log("DATABABE CONNECTED!")
})

const log_event = (data) => {
    console.clear()
    console.log(data)
}

app.get("/", (req, res) => {
    res.send({ status: "ONLINE", mysql_status: "ON" })
    log_event({
        request: "/",
        return: true,
    })
})

app.get('/posts', (req, res) => {
    con.query(`SELECT * FROM posts INNER JOIN users ON posts.post_author_id = users.user_id`, (err, result) => {
        if (err) throw err
        res.send(result)
        log_event({
            request: "/posts",
            return_length: result.length,
            return: result,
        })
    })
})

app.get("/post/:id", (req, res) => {
    con.query(`SELECT * FROM posts INNER JOIN users ON posts.post_author_id = users.user_id WHERE posts.post_id = ${req.params.id}`, (err, result) => {
        res.send(result)
    })
})