import {Form, Button, Nav, Container, Row, Alert} from "react-bootstrap";
import React from "react"

class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: "",
            buissness: "",
			buissnessForm: () => {},
			alert: () => {},
            loginText: "Login"
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
                this.generateAlert("Login Email Sent", "success")
            } else {
                this.generateAlert(dat.dat)
            }
        })
		
    }

	generateAlert = (message, variant) => {
		if (message.length > 0) {
			this.setState({alert: () => {
				return (
					<Alert variant={variant || "danger"}>
						{message}
					</Alert>
				)
			}
			})
		} else {
			this.setState({alert: () => {}})
		}	
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
							{this.state.alert()}
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