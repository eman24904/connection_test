const express = require("express")
const mysql = require("mysql2")

const app = express()
app.use(express.json())



const db = mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "test_api"
});

db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
    } else {
        console.log("MySQL connected");
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000")
})
// CRUD API
// read users
app.get("/users", (req, res) => {
    db.query("SELECT * FROM test_api", (err, result) => {
        if (err) return res.send(err)
        res.json(result)
    })
})
// create user
app.post("/users", (req, res) => {
    const { name, password } = req.body

    db.query(
        "INSERT INTO test_api (name, password) VALUES (?, ?)",
        [name, password],
        (err, result) => {
            if (err) return res.send(err)
            res.json({ message: "User added" })
        }
    )
})
// delete user 
app.delete("/users/:id", (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM test_api WHERE id = ?", [id], (err) => {
        if (err) return res.send(err)
        res.json({ message: "User deleted" })
    })
})
// update user 
app.put("/users/:id", (req, res) => {
    const id = req.params.id
    const { name, password } = req.body

    db.query(
        "UPDATE test_api SET name=?, password=? WHERE id=?",
        [name, password, id],
        (err) => {
            if (err) return res.send(err)
            res.json({ message: "User updated" })
        }
    )
})