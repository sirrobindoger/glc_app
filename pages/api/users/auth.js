import SQL from "mysql";
import Mail from "nodemailer";
import {format} from "sqlstring";


const Handler = async (req, res) => {
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
    
	const payload = JSON.parse(req.body || "{}")
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
                    html: `<p> <a href="${process.env.protocol + req.headers.host + "/login/verify?token=" + loginHash}">Click here to login</a> </p>`
                }
                await transporter().sendMail(emailCtor)
                await query(`DELETE FROM glc_login WHERE email= '${email}';`)
                await query(`INSERT INTO glc_login (email, token) VALUES ('${email}', '${loginHash}');`) 
                res.json({op:true, dat:"Login Email Sent"})
            } else {
                res.json({op:false, dat: "Email Not Found"})
            }
        } catch(e) {
            console.log(e)
            res.json({op:false ,dat: "Database Error"})
        }
    }
}

export default Handler;