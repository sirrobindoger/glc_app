import SQL from "mysql";
import {format} from "sqlstring";


const Handler = async (req, res) => {
    const util = require("util")
    const con = SQL.createConnection({
        host: "box.sprojects.org",
        user: "glc",
        password: "FEStr34tW$TG",
        database: "glc_app"
    })
    const query = util.promisify(con.query).bind(con);

	const payload = JSON.parse(req.body || "{}")
    const token = payload.token
    if (token) {
        try {
            // fetch on condition that password is valid AND it isn't expired
            const user = await query( format("SELECT COUNT(*) FROM glc_users WHERE pwd = ? AND expiry >= now();", token) )
            if (user[0]['COUNT(*)'] > 0) {
                res.json({op:true}) // valid password
            } else {
                res.json({op:false}) // invalid password
            }
        } catch(e) {
            console.log(e)
        }
    } else {
        res.json({op:false})
    }
}

export default Handler;