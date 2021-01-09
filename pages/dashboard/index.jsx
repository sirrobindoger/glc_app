import {Component} from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {Navbar, Nav} from "react-bootstrap"
import {Navigation} from "../../components/navigation"

class Dashboard extends Component {
	constructor(props) {
        super(props)
        console.log(props)
    }

    componentDidMount() {

    }

	render() {
        return ( 
            <layout>
                <Navigation Fourms={true}/>
            </layout>
        )
	}
}

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)
    // user has no cookie/login session, send them back to the main page to verify
    if (cookies.glc_token) {
        const res = await fetch("http://localhost:3000/api/dash/providers", {method: "POST", body: JSON.stringify({token: cookies.glc_token}) })
        const json = await res.json()
        return {
            props: json
        }

    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
}


export default Dashboard;