import {withRouter} from "next/router";
import {Component} from "react"
import { setCookie } from 'nookies'
const query = require("query-string")

class Verify extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoaded: true
		}
	}

	componentDidMount() {
		const router = this.props.router
		const dat = query.parse(location.search)
		if (dat.token) {
			const token = localStorage.getItem("glc_token");
			
			fetch(process.env.protocol + location.host + "/api/users/verify", {method:"POST", body: JSON.stringify(
				{
					token:dat.token,
				})
			}).then((data) => {
				return data.json()
			}).then((dat) => {
				if (dat.op) {
                    localStorage.setItem("glc_token", dat.dat)
                    setCookie(null, "glc_token", dat.dat)
                    router.push("/dashboard")
				} else {
                    console.log(dat.dat)
					//router.push("/login")
				}
			})
		} else {
			router.push("/login")
		}
	}
	render() {
		return null;
	}
}
export default withRouter(Verify);