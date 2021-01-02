//placeholder
import SQL from "mysql";
import Mail from "nodemailer";
import {format} from "sqlstring";
const crypt = require("crypto");

var con = SQL.createConnection({
    host: "box.sprojects.org",
    user: "glc",
    password: "FEStr34tW$TG",
	database: "glc_app"
})


const Handler = async (req, res) => {
    const payload = JSON.parse(req.body)
    if (req.method = "POST" && payload.type) {
        if (payload.type == "auth") {
            console.log("Recieved auth")
			const email = payload.email.toLowerCase()
			const result = await new Promise((reso, rej) => {
				con.query(format("SELECT * FROM glc_users WHERE EMAIL = ?", email), (err, dat) => {
					if (err) {reso({type: 0, dat: "Internal Server Error"}); return;}
					if (dat.length === 0) {reso({type: 1, dat: "Email Not Found"}); return;}

					reso({type: 2, dat: dat})
				})
			})
			
			if (result.type === 2) {

			} else {
				res.end(JSON.stringify(result))

			}
			
		}
    }
}

export default Handler;
