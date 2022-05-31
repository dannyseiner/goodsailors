const express = require("express")
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const config = require("./config")
const urlencodedParser = bodyParser.urlencoded({ extended: true, limit: '50mb' })


app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(cors())
app.set('json spaces', 2)

app.listen(3002)

const con = mysql.createConnection(config.macos)

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

app.post("/createpost", urlencodedParser, (req, res) => {
    if (!req.body.user_id) return
    con.query(`INSERT INTO posts (post_author_id, post_title, post_message) VALUES (${req.body.user_id}, '${req.body.title}', '${req.body.message}')`, (err, result) => {
        res.send({ status: "OK" })
    })
})


app.post("/login", urlencodedParser, (req, res) => {
    con.query(`SELECT * FROM users WHERE user_name = '${req.body.username}' AND user_password = '${req.body.password}' `, (err, result) => {
        res.send(result.length === 0 ? { status: false } : result)
    })
})

app.post('/editpost', urlencodedParser, (req, res) => {
    con.query(`UPDATE posts SET post_title = '${req.body.title}', post_message = '${req.body.message}' WHERE post_id = ${req.body.post_id} AND post_author_id = ${req.body.post_author_id}`, (err, result) => {
        if (err) throw err
        res.send({ status: "OK" })
    })
})

app.post('/deletepost', urlencodedParser, (req, res) => {
    con.query(`DELETE FROM posts WHERE post_id = ${req.body.post_id} AND post_author_id = ${req.body.post_author_id}`, (err, result) => {
        if (err) throw err
        res.send({ status: "OK" })
    })
})