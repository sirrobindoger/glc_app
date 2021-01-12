import {withRouter} from "next/router"
import {Component} from "react"
import { setCookie } from 'nookies'

class Check extends Component {
	componentDidMount() {
		const router = this.props.router
		const token = localStorage.getItem("glc_token")
		if (this.props.redirect) {
			this.props.router.prefetch(this.props.redirect)
		}
		if (token) {
			fetch("api/users/check", {
				method: "POST",
				body: JSON.stringify({token: token})
			}).then((data) => {
				return data.json()
			}).then((data) => {
				if (!data.op) {
					localStorage.removeItem("glc_token")
					router.push("/login")
				} else if (this.props.redirect) {
                    router.push(this.props.redirect)
                    setCookie(null, "glc_token", token)
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
export default withRouter(Check);