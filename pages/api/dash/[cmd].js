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
	},
	webhook: async(payload, res, host) => {
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
}


const Handler = async (req, res) => {
	const payload = JSON.parse(req.body || "{}")
	if (callTypes[ req.query.cmd ]) {
		return await callTypes[ req.query.cmd ](payload, res, req.headers.host)
	}
	res.json({op: false})
}

export default Handler;