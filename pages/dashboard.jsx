import {Component} from "react"
import {parseCookies, setCookie} from 'nookies'
import {Container, Col, Row, Form, Nav} from "react-bootstrap"
import {Navigation} from "../components/navigation"
import FormBox from "../components/formbox";

class Dashboard extends Component {
	constructor(props) {
        super(props)
		this.state = {
			filters: [],
            search: "",
            currProvider: Object.keys(this.props.providers)[0]
        }
        console.log(props)
    }

	renderLogos() {
		const logos = []
		for (const [i, val] of Object.entries(this.props.providers)) {
            const drawShadow = this.state.currProvider == i ? {
                border: "2px solid purple",
                borderRadius: "5px",
            } : {}
			logos.push(
                <Row key={i} className="ml-0 mr-5">
                    <img 
                        style={drawShadow}
                        onClick={(e) => {
                            this.logoClicked(i)
                        }}
                        key={i}
                        src={val.logo}
                        height="50"
                        width="300"
                    />
                </Row>
			)
		}
		return logos
	}

    logoClicked(i) {
        this.setState({currProvider: i})
    }

    renderFormBox() {
		const search = this.state.search
		const forms = []
        this.props.providers[this.state.currProvider].forums.forms.map((val, i) => {
			if (search === "" || val.title.toLowerCase().includes(search)) {
				forms.push(
					<div key={i} className="mr-4">
						<FormBox key={i} form={val}/>
					</div>
				)
			}
        })
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
									<Form.Control onChange={(e) => {this.setState({search:e.target.value.toLocaleLowerCase()})}} placeholder="Form name" />
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
        const res = await fetch(`${process.env.protocol + ctx.req.headers.host}/api/dash/providers`, {method: "POST", body: JSON.stringify({token: cookies.glc_token}) })
        const json = await res.json()
        console.log(json)
        return {
            props: {
				providers: json
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