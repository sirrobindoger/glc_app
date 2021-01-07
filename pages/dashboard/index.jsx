import {Component} from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {Navbar, Nav} from "react-bootstrap"

class Dashboard extends Component {
	constructor(props) {
		super(props)
    }


	render() {
        return ( 
            <layout>

            </layout>
        )
	}
}

export async function getServerSideProps(ctx) {
    const cookies = parseCookies(ctx)
    // user has no cookie/login session, send them back to the main page to verify
    if (!cookies.glc_token) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }
    return {
        props: {
            date: Date()
        }
    }
}


export default Dashboard;