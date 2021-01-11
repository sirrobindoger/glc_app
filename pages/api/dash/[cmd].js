import SQL from "mysql";

const json = JSON.stringify
const util = require("util")
const con = SQL.createConnection({
	host: "box.sprojects.org",
	user: "glc",
	password: "FEStr34tW$TG",
	database: "glc_app"
})
const query = util.promisify(con.query).bind(con);


const callTypes = {
    providers: async(payload, res, host) => {
		const token = payload.token
        const response = ""

            try {
                const providers = await query(`SELECT * FROM glc_providers WHERE JSON_CONTAINS((SELECT providers FROM glc_users WHERE pwd = '${token}'), JSON_ARRAY(ID), "$")`)
                if (providers.length > 0) {
                    const forums = await fetch(`https://api.jotform.com/folder/${providers[0].folderid}?apiKey=${providers[0].apikey}`)
                    const content = await forums.json()
                    res.json( json({
                        forums: content.content,
                        logo: providers[0].logo,
						description: providers[0].description,
						uid: providers[0].ID
                    }) )
                }
            } catch {
                res.json("{}")
            }


    }
}


const Handler = async (req, res) => {
	const payload = JSON.parse(req.body || "{}")
	if (callTypes[ req.query.cmd ]) {
		return await callTypes[ req.query.cmd ](payload, res, req.headers.host)
	}
	res.json({op: false})
}

export default Handler;