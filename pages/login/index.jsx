import {Form, Button, Nav, Container, Row, Alert} from "react-bootstrap";
import {Component} from "react"

class Login extends Component {

	constructor (props) {
		super(props)
		this.state = {
			email: "",
			buissness: "",
			buissnessForm: () => {},
			loginText: "Login",
			alert: {
				variant: "success",
				show: false,
				message: "Placeholder"
			}
		}
	}

	handleLogin = (e) => {
		e.preventDefault()
		fetch("api/users/auth", {method:"POST", body: JSON.stringify(
			{
				email:this.state.email,
				type:"auth"
			})
		}).then((data) => {
			return data.json()
		}).then((dat) => {
			if (dat.op) {
				this.setAlert("Login Email Sent", "success")
			} else {
				this.setAlert(dat.dat)
			}
		})
		
	}

	setAlert = (message, variant, show) => {
		this.setState({
			alert: {
				message: message,
				variant: variant || "danger",
				show: show || true,
			}
		})
	}

	renderGymBox = () => {
		if (!this.state.buissnessActive) {
				this.setState({buissnessForm: () => {
				return (
						<Form.Control className="my-2" onChange={(val) => this.setState({buissness:val.target.value})} size="lg" type="email" placeholder="Buissness Name"/>
					)
				}, 
				buissnessActive: true, 
				loginText: "Search"
			})
		}
	}

	render() {	  
		return (
			<div style={{height:"25%"}}>
					<Nav className="justify-content-end mr-5">
						<Nav.Item>
							<Nav.Link active={false}>
								Create Account
							</Nav.Link>
						</Nav.Item>
					</Nav>

					<Row className="justify-content-center">
						<Form onSubmit={(e) => {e.preventDefault()}}>
							<Alert variant={this.state.alert.variant} show={this.state.alert.show}>
								{this.state.alert.message}
							</Alert>
							<p>My Forms</p>
							<Form.Group>
								<Form.Control onChange={(val) => this.setState({email:val.target.value})} size="lg" type="email" placeholder="Enter email"/>
								{this.state.buissnessForm()}
							</Form.Group>
							<Button className="float-left"  variant="link" onClick={this.renderGymBox}>
									Forgot Email?
							</Button>
							<Button className="float-right"  variant="primary" type="submit" onClick={this.handleLogin}>
								{this.state.loginText}
							</Button>
						</Form>
					</Row>
			</div>

		)
	}
}

export default Login;