import SQL from "mysql";

const Handler = async (req, res) => {
    const json = JSON.stringify
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
	const forms = {}
	try {
		const providers = await query(`SELECT * FROM glc_providers WHERE JSON_CONTAINS((SELECT providers FROM glc_users WHERE pwd = '${token}'), JSON_ARRAY(ID), "$") ORDER BY ID ASC`)
		if (providers.length > 0) {
			await Promise.all(
				providers.map(async (val, i) => {
					var forums = {}
					var filters = []
					const raw = await fetch("https://api.jotform.com/user/folders", {
						method:"GET", 
						headers: {
							"APIKEY": val.apikey,
							"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
						}
					})
					const folders = await raw.json()
					await Promise.all(
						folders.content.subfolders.map(async folder => {
							if (folder.name.toLowerCase() === "my forms") {
								folder.forms.map(form => {
									forums[ form.id ] = {
										id: form.id,
										title: form.title,
										status: form.status,
										last_submission: form.last_submission,
										url: form.url,
										filters: []
									}
								})
								await Promise.all( 
									folder.subfolders.map(async subfolder => {
										const raw1 = await fetch(`https://api.jotform.com/folder/${subfolder.id}?apiKey=${val.apikey}`)
										const subfolder1 = await raw1.json()
										filters.push(subfolder1.content.name)
										subfolder1.content.forms.map(subform => {
											if (forums[subform.id]) {
												forums[subform.id].filters.push(subfolder1.content.name)
											}
										})			
									})
								)

							}
						})
					)
					forms[val.ID] = {
						forums: Object.values(forums),
						filter: filters,
						logo: val.logo,
						description: val.description,
						uid: val.ID
					}			
				})
			)
			res.json( forms )
		}
	} catch(e) {
		res.json({})
	}
}

export default Handler;
/*
					const forums = await fetch(`https://api.jotform.com/folder/${val.folderid}?apiKey=${val.apikey}`)
					const content = await forums.json()
					forms[val.ID] = {
						forums: content.content,
						logo: val.logo,
						description: val.description,
						uid: val.ID
					}*/