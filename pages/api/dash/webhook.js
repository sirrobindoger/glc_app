import SQL from "mysql";

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
	const {formID, token, webhook} = payload
	const dat1 = await query(`SELECT apikey FROM glc_providers WHERE JSON_CONTAINS((SELECT providers FROM glc_users WHERE pwd = '${token}'), JSON_ARRAY(ID), "$")`)
	const apiKey = dat1[0] ? dat1[0].apikey : false
	console.log(apiKey)
	if (formID && apiKey && webhook) {
		try{
			const raw = await fetch(`https://api.jotform.com/form/${formID}/webhooks?apiKey=${apiKey}`)
			const webhooks = await raw.json()
			console.log(webhooks)
			for (const [i, val] of Object.entries(webhooks.content)) {
				if (val.includes("hooks.zapier.com")) {
					//delete zapwebhook
					fetch(`https://api.jotform.com/form/${formID}/webhooks/${i}?apiKey=${apiKey}`, {method: "DELETE"})
					console.log("delete" + val, i)
				}
			}
			
			fetch(`https://api.jotform.com/form/${formID}/webhooks?apiKey=${apiKey}`, {
				method:"POST", 
				body: "webhookURL=" + webhook, 
				headers: {
					"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
				}
			}).then((e) => {return e.json()}).then((e) => {console.log(e)})
			console.log(`webhookURL=${webhook}`)
			
			
		} catch (e) {
			res.statusCode = 200
			res.end()
		}
	}
	res.statusCode = 200
	res.end()
}

export default Handler;