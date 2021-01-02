//placeholder
import SQL from "mysql";
import Mail from "nodemailer";
import {format} from "sqlstring";

const json = JSON.stringify
const crypt = require("crypto");
const util = require("util")
const con = SQL.createConnection({
    host: "box.sprojects.org",
    user: "glc",
    password: "FEStr34tW$TG",
	database: "glc_app"
})
const query = util.promisify(con.query).bind(con);


const callTypes = {
	auth: async (payload, res) => {
		const email = payload.email ? payload.email.toLowerCase() : false
		if (email) {
			try {
				const users = await query( format("SELECT * FROM glc_users WHERE email = ?", email) )
				if (users.length > 0) {
					res.end(json({op:true ,dat: users}))
				} else {
					res.end(json({op:false ,dat: "Email not found."}))
				}
			} catch(e) {
				res.end(json({op:false ,dat: "Database Error"}))
			}
		}
	}
}


const Handler = async (req, res) => {
    const payload = JSON.parse(req.body)

	if (callTypes[ req.query.auth ]) {
		return await callTypes[ req.query.auth ](payload, res)
	}
	res.end(json({op: false, dat: "User call not found"}))

}



/*const Handler = async (req, res) => {
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
}*/

export default Handler;
