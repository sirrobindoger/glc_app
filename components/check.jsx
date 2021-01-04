import {withRouter} from "next/router"
import {Component} from "react"

class Check extends Component {
    componentDidMount() {
        const router = this.props.router
        const token = localStorage.getItem("glc_token")
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