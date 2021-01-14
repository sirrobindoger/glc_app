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


const Handler = async (req, res) => {
	const payload = JSON.parse(req.body || "{}")
	const token = payload.token
	const forms = {}
	try {
		const providers = await query(`SELECT * FROM glc_providers WHERE JSON_CONTAINS((SELECT providers FROM glc_users WHERE pwd = '${token}'), JSON_ARRAY(ID), "$") ORDER BY ID ASC`)
		if (providers.length > 0) {
			await Promise.all(
					providers.map(async (val, i) => {
					const forums = await fetch(`https://api.jotform.com/folder/${val.folderid}?apiKey=${val.apikey}`)
					const content = await forums.json()
					forms[val.ID] = {
						forums: content.content,
						logo: val.logo,
						description: val.description,
						uid: val.ID
					}
				}) 
			)
			res.json( json(forms) )
		}
	} catch(e) {
		res.json("{}")
	}
}

export default Handler;