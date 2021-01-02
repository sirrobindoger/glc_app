//placeholder

import {UseRouter} from "next/router";
import SQL from "mysql";
import Mail from "nodemailer";
import {format} from "sqlstring";


var con = SQL.createConnection({
    host: "box.sprojects.org",
    user: "sirro",
    password: "Robindoger8",
    database: "glc_app",
})


const Handler = (req, res) => {
    const payload = JSON.parse(req.body)
    if (req.method = "POST" && payload.type) {
        console.log("ys")
        if (payload.type == "auth") {
            console.log("Recieved auth")
            const email = payload.email.toLowerCase()
            con.query(format("SELECT * FROM users WHERE email = ?", email), (err, dat) => {
                console.log(err)
            })
            
        }
    }
    res.end("test")
}

export default Handler;
