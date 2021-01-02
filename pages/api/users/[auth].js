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
const transporter = Mail.createTransport({
	service: 'gmail',
	auth: {
	  user: 'glcapp.courier@gmail.com',
	  pass: 'Robindoger8'
	}
  });
const query = util.promisify(con.query).bind(con);
const mail = util.promisify(transporter.sendMail).bind(transporter);

const callTypes = {
	auth: async (payload, res, host) => {
		const email = payload.email ? payload.email.toLowerCase() : false
		if (email) {
			try {
				const users = await query( format("SELECT * FROM glc_users WHERE email = ?", email) )
				if (users.length > 0) {
					const loginHash = crypt.randomBytes(32).toString("hex")
					const emailCtor = {
						from: "glcapp.courier@gmail.com",
						to: email,
						subject: "Login Here",
						html: `<p> <a href="http://${host + "?token=" + loginHash}">Click here to login</a> </p>`
					}
					await query(`DELETE FROM glc_login WHERE email= '${email}';`)
					await query(`INSERT INTO glc_login (email, token) VALUES ('${email}', '${loginHash}');`)
					const response = await mail(emailCtor)
					res.end(json({op:true ,dat: ""})) // inform clients that we found the password
				} else {
					res.end(json({op:false ,dat: "Email not found."}))
				}
			} catch(e) {
				console.log(e)
				res.end(json({op:false ,dat: "Database Error"}))
			}
		}
	}
}

const Handler = async (req, res) => {
    const payload = JSON.parse(req.body)
	if (callTypes[ req.query.auth ]) {
		return await callTypes[ req.query.auth ](payload, res, req.headers.host)
	}
	res.end(json({op: false, dat: "User call not found"}))
}

export default Handler;
