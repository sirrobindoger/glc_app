import SQL from "mysql";
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
    
    const toDate = (date) => {
        const t = date.toString().split(/[- :]/);
        return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));
    }

	const payload = JSON.parse(req.body || "{}")
    const token = payload.token
    if (token) {
        const dat1 = await query( format("SELECT email FROM glc_login WHERE token = ?", token) ) // check if they have a valid login token
        const email = dat1[0] ? dat1[0].email : false
        console.log(email)
        console.log(dat1)
        if (email) {
            const dat2 = await query( format("SELECT pwd, expiry FROM glc_users WHERE email = ?", email) ) // fetch the users account token
            if (dat2[0]) {
                const {pwd, expiry} = dat2[0]
                if (!pwd || ( expiry && new Date() > toDate(expiry)) ) {// current token has expired or there is no token, lets create a new one	
                    const pwdToken = crypt.randomBytes(32).toString("hex") // generate password		
                    await query( `UPDATE glc_users SET pwd = '${pwdToken}', expiry = now() + interval 3 month WHERE email = '${email}';`)
                    res.json({op:true, dat:{token:pwdToken}})
                } else { // a token exists, let's just reset the expiration
                    await query( `UPDATE glc_users SET expiry = now() + interval 3 month WHERE email = '${email}';`)
                    res.json({op:true, dat:pwd})
                }
            }
            query( `DELETE FROM glc_login WHERE token = '${token}'` ) // login token is one time, so let's delete it now
        } else {
            res.json({op:false, dat:"email not found"})
        }
    } else {
        res.json({op:false, dat:"Token not found"})
    }
}

export default Handler;