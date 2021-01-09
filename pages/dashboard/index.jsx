import {Component} from "react"
import { parseCookies, setCookie, destroyCookie } from 'nookies'
import {Container, Col, Image, Row} from "react-bootstrap"
import {Navigation} from "../../components/navigation"

class Dashboard extends Component {
	constructor(props) {
        super(props)
        console.log(props)
    }

	renderLogos() {
		const logos = []
		{this.props.providers.map((val, i) => {
			logos.push(				
				<Image
					style={{height: "70px", width: "150px"}}
					key={i}
					src={val.logo}
					fluid={true}
					className={"mr-5 " + (i == 0 ? "ml-2" : "" )}
				/>
			)
		})}
		return logos
	}

	render() {

        return ( 
            <div>
                <Navigation Fourms={true}/>
				<Container fluid={true} className="mx-3 mt-3">
					<p>Providers(s)</p>
					<Row className="">
						{this.renderLogos()}
					</Row>
				</Container>
            </div>
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
            props: {
				providers: [json, json]
			}
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