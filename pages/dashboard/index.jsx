import {Component} from "react"
import {parseCookies, setCookie, destroyCookie } from 'nookies'
import {Container, Col, Image, Row, Form, Nav} from "react-bootstrap"
import {Navigation} from "../../components/navigation"
import FormBox from "../../components/formbox";

class Dashboard extends Component {
	constructor(props) {
        super(props)
        console.log(props)
    }

    

	renderLogos() {
		const logos = []
		{this.props.providers.map((val, i) => {
			logos.push(	
                <img 
                    key={i}
                    src={val.logo}
                    height="50"
                    width="150"
                />
			)
		})}
		return logos
	}

    renderFormBox() {
        const forms = []
        {this.props.providers[0].forums.forms.map((val, i) => {

            forms.push(
				<div className="mr-4">
                	<FormBox key={i} form={val}/>
				</div>
            )
        })}
        return forms
    }
	render() {
        return (
 
			<body style={{"backgroundColor": "#f6f9fd"}}>
				<Navigation Fourms={true}/>
				<Container fluid={true} className="mx-3 mt-3">
					<p className="text-muted"><b>Providers(s)</b></p>
					<Row className="ml-0">   
						{this.renderLogos()}
					</Row>
				</Container>
				
				<Container fluid={true} className="mx-3 pt-3">
					<h6>Affiliate Guard Forums</h6>
					<Row >
						<Col>
							
							<Form>
								<Form.Group>
									<Form.Label><small><b>Search</b></small></Form.Label>
									<Form.Control placeholder="Form name" />
								</Form.Group>
							</Form>
						</Col>
						<Col xs={8}>
							<p><b>Filter</b></p>
							<Nav defaultActiveKey="all" className="pr-0">
								<Nav.Item>
									<Nav.Link eventKey="all"><b>All</b></Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="text-muted" eventKey="waivers"><b>Waivers</b></Nav.Link>
								</Nav.Item>
								<Nav.Item>
									<Nav.Link className="text-muted" eventKey="hiringcoaches"><b>Hiring Coaches</b></Nav.Link>
								</Nav.Item>
							</Nav>
						</Col>
					</Row>
				</Container>
				<Container fluid={true} className="mx-3 pt-3">
					<Row className="ml-0">
						{this.renderFormBox()}
					</Row>
				</Container>
			</body>

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
				providers: [json]
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