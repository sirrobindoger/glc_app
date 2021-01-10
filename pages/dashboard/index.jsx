import {Component} from "react"
import {parseCookies, setCookie, destroyCookie } from 'nookies'
import {Container, Col, Image, Row, Form, Nav} from "react-bootstrap"
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
                <img
                    src={val.logo}
                    height="50"
                    width="150"
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
                    <p><small>Providers(s)</small></p>
					<Row className="ml-0">   
						{this.renderLogos()}
					</Row>
				</Container>
                
                <Container fluid={true} className="mx-3 pt-3">
                    <h6>Affiliate Guard Forums</h6>
                    <Row>
                        <Col>
                            
                            <Form>
                                <Form.Group controlID="searchForms">
                                    <Form.Label><small>Search</small></Form.Label>
                                    <Form.Control placeholder="Form name" />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col xs={8}>
                            <p>Filter</p>
                            <Nav defaultActiveKey="all" className="pr-0">
                                <Nav.Item>
                                    <Nav.Link eventKey="all">All</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="waivers">Waivers</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="hiringcoaches">Hiring Coaches</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
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