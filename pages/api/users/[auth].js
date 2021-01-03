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
const transporter = () => {
	return Mail.createTransport({
		service: 'gmail',
		auth: {
		  user: 'glcapp.courier@gmail.com',
		  pass: 'Robindoger8'
		}
	});
} 

const toDate = (date) => {
	const t = date.toString().split(/[- :]/);
	return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
}

const callTypes = {
	// handle user login and creating login token
	auth: async (payload, res, host) => {
		const email = payload.email ? payload.email.toLowerCase() : false
		if (email) {
			try {
				const user = await query( format("SELECT COUNT(*) FROM glc_users WHERE email = ?", email) )
				if (user[0]['COUNT(*)'] > 0) {
					const loginHash = crypt.randomBytes(32).toString("hex")
					const emailCtor = {
						from: "glcapp.courier@gmail.com",
						to: email,
						subject: "Login Here",
						html: `<p> <a href="http://${host + "/login/verify?token=" + loginHash}">Click here to login</a> </p>`
					}
					query(`DELETE FROM glc_login WHERE email= '${email}';`)
					query(`INSERT INTO glc_login (email, token) VALUES ('${email}', '${loginHash}');`)
					transporter().sendMail(emailCtor)
					res.end(json({op:true ,dat: ""})) // inform clients that we found the password
				} else {
					res.end(json({op:false ,dat: "Email not found."}))
				}
			} catch(e) {
				res.end(json({op:false ,dat: "Database Error"}))
			}
		}
	},
	// handle login token and password token creation
	verify: async(payload, res, host) => {
		const token = payload.token
		if (token) {
			const dat1 = await query( format("SELECT email FROM glc_login WHERE token = ?", token) ) // check if they have a valid login token
			const email = dat1[0] ? dat1[0].email : false
			if (email) {
				const dat2 = await query( format("SELECT pwd, expiry FROM glc_users WHERE email = ?", email) ) // fetch the users account token
				if (dat2[0]) {
					const {pwd, expiry} = dat2[0]
					if (!pwd || ( expiry && new Date() > toDate(expiry)) ) {// current token has expired or there is no token, lets create a new one	
						const pwdToken = crypt.randomBytes(32).toString("hex") // generate password		
						query( `UPDATE glc_users SET pwd = '${pwdToken}', expiry = now() + interval 3 month WHERE email = '${email}';`)
						res.end(json({op:true, dat:{token:pwdToken}}))
					} else { // a token exists, let's just reset the expiration
						query( `UPDATE glc_users SET expiry = now() + interval 3 month WHERE email = '${email}';`)
						res.end(json({op:true, dat:pwd}))
					}
				}
				query( `DELETE FROM glc_login WHERE token = '${token}'` ) // login token is one time, so let's delete it now
			} else {
				res.end(json({op:false, dat:"email not found"}))
			}
		} else {
			res.end(json({op:false, dat:"Token not found"}))
		}
	},
	// check if the users password token is valid
	check: async(payload, res) => {
		const token = payload.token
		console.log(payload)
		if (token) {
			try {
				// fetch on condition that password is valid AND it isn't expired
				const user = await query( format("SELECT COUNT(*) FROM glc_users WHERE pwd = ? AND expiry >= now();", token) )
				if (user[0]['COUNT(*)'] > 0) {
					res.end(json({op:true ,dat: ""})) // valid password
					return;
				} else {
					res.end(json({op:false ,dat: "USER NOT FOUND"})) // valid password
				}
			} catch(e) {
				console.log(e)
			}
		} else{
			res.end(json({op:false ,dat: "No TOKEN"}))
		}
	}
}

const Handler = async (req, res) => {
	const payload = JSON.parse(req.body || "{}")
	if (callTypes[ req.query.auth ]) {
		return await callTypes[ req.query.auth ](payload, res, req.headers.host)
	}
	res.end(json({op: false, dat: "User call not found"}))
}

export default Handler;
