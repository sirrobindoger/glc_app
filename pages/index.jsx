import {Component} from "react"
import {parseCookies, setCookie} from 'nookies'
import {Container, Col, Row, Form, Nav} from "react-bootstrap"
import Navigation from "../components/navigation"
import FormBox from "../components/formbox";

class Dashboard extends Component {
	constructor(props) {
        super(props)
		this.state = {
			filters: [],
            search: "",
            currProvider: [Object.keys(this.props.providers)[0]]
            
		}
    }

	renderLogos() {
		const logos = []
		for (const [i, val] of Object.entries(this.props.providers)) {
            let activeClass = this.state.currProvider == i ? "active" : "";
			logos.push(
                <Col xs="auto" key={i} className={ activeClass + " provider-logos"}>
                    <img 
                        onClick={(e) => {
                            this.logoClicked(i)
                        }}
                        key={i}
                        src={val.logo}
                        height="35"
                        width="auto"
                    />
					<span/>
                </Col>
			)
		}
		return logos
	}

    logoClicked(i) {
        this.setState({currProvider: i, filters:[]})
    }

    renderFormBox() {
		const search = this.state.search
		const forms = []
        this.props.providers[this.state.currProvider].forums.map((val, i) => {
			var disabled = false
			if (this.state.filters.length > 0) {
				disabled = true
				this.state.filters.map(filter => {
					if (val.filters.includes(filter)) {
						disabled = false
					}
				})
			}
			if ((search === "" || val.title.toLowerCase().includes(search) ) && !disabled) {
				forms.push(
					<FormBox key={i} form={val}/>
				)
			} 
        })
		return forms
	}
	
	renderFormTitle() {
		return (this.props.providers[this.state.currProvider].description)
	}


	renderFilters() {
		const filters = []
		this.props.providers[this.state.currProvider].filter.map((filter, i) => {
			filters.push(
				<Row key={i} className="ml-0 mr-4">
					<Nav.Item
						key={i}
						style={{
							color: this.state.filters.includes(filter) ? "#4C3EE5" : "#7c7c7c",
							fontWeight: "bold"
						}} 
						onClick={() => {
							if (this.state.filters.includes(filter)) {
								const newarray = []
								this.state.filters.map(sfilter => {
									if (sfilter != filter) {
										newarray.push(sfilter)
									}
								})
								this.setState({filters: newarray})
							} else {
								this.setState({filters: [...this.state.filters, filter]})
							}
						}}
						>{filter}
					</Nav.Item>
				</Row>
			)
		})
		return filters
	}


	render() {
        return (
			<body style={{"backgroundColor": "#f6f9fd"}}>
				<Navigation Fourms={true}/>
				<Container fluid={true} className="container mt-3">
					<p>Provider(s)</p>
					<Row className="ml-0 mt-3">   
						{this.renderLogos()}
					</Row>
				</Container>
				
				<Container fluid={true} className="dashboard container pt-3">
					<h4>{this.renderFormTitle()}</h4>
					<Row >
						<Col>
							<Form>
								<Form.Group>
									<Form.Label>Search</Form.Label>
									<Form.Control onChange={(e) => {this.setState({search:e.target.value.toLocaleLowerCase()})}} placeholder="Form name" />
								</Form.Group>
							</Form>
						</Col>
						<Col xs={8}>
							<p style={{"marginBottom": ".5rem"}}>Filter</p>
							<Nav defaultActiveKey="all" className="pr-0">
								{this.renderFilters()}
							</Nav>
						</Col>
					</Row>
				</Container>
				<Container fluid={true} className="container pt-3">
					<Row>
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
    if (cookies.glc_token && cookies.glc_token !== "null") {
        const res = await fetch(`${process.env.protocol + ctx.req.headers.host}/api/dash/providers`, {method: "POST", body: JSON.stringify({token: cookies.glc_token}) })
        const json = await res.json()
        return {
            props: {
				providers: json
			}
        }

    } else {
        console.log("NO COOKIES!")
        return {
            redirect: {
                destination: "/login/check",
                permanent: false,
            }
        }
    }
}


export default Dashboard;