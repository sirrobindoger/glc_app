import {Form, Button, Nav, Container, Row, Col} from "react-bootstrap";
import React from "react"
import Head from "next/head";

class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: "",
            buissness: "",
            buissnessForm: () => {},
            loginText: "Login"
        }
    }

    

    handleLogin = (e) => {
        e.preventDefault()
        const {data, err} = fetch("api/user", {method:"POST", body: JSON.stringify(
            {
            email:this.state.email,
            type:"auth"
            })
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

					<Row className="justify-content-center" onSubmit={this.handleLogin}>	
						<Form>
							<p>My Forms</p>
							<Form.Group>
								<Form.Control onChange={(val) => this.setState({email:val.target.value})} size="lg" type="email" placeholder="Enter email"/>
                                {this.state.buissnessForm()}
							</Form.Group>
							<Button className="float-left"  variant="link" type="submit" onClick={this.renderGymBox}>
									Forgot Email?
							</Button>
							<Button className="float-right"  variant="primary" type="submit">
								{this.state.loginText}
							</Button>
						</Form>
					</Row>
			</div>

        )
    }
}

/*const Login = () => {
    return (
        <>
            <Head>
                <title>GLC | LOGIN</title>
                <meta name="description" content="Please login."/>
            </Head>
            <style jsx global>{`
                    * {
                        background-color: #f6f9fd;
                    }
            `}</style>       
            <Nav className="justify-content-end mr-5">
                <Nav.Item>
                    <Nav.Link href="/#">
                        Create Account
                    </Nav.Link>
                </Nav.Item>
            </Nav>
            <main className="login-m1">
                    <div className="login-d1">
                        <p className="login m-1">
                            <b>My Forms</b>
                        </p>
                    </div>
                    <div>
                        <Form className="login-d2" onSubmit={handleSubmit}>
                            <Form.Group controlId="form-email-login">
                                <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange}/>
                            </Form.Group>
                            <Button className="float-left" size="sm" variant="link" type="submit">
                                Forgot Email?
                            </Button>
                            <Button className="float-right" variant="primary" type="submit" onClick={console.log("gamer")}>
                                Login
                            </Button>
                        </Form>
                    </div>

            </main>
        </>
    )
}*/
export default Login;