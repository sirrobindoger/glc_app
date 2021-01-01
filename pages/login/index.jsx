import {Row, Form, Button, Nav} from "react-bootstrap";
import React from "react"
import Head from "next/head";
import useSWR from "swr";





class Login extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            email: "",
            buissness: ""
        }

    }

    handleLogin(e) {
        e.preventDefault()
        const {data, err} = fetch("api/user", {method:"POST", body: JSON.stringify(
            {
            email:this.state.email,
            type:"auth"
            })
        })
    }

    render() {
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
                            <Form className="login-d2" onSubmit={(ev, val) => this.handleLogin(ev, val)}>
                                <Form.Group controlId="form-email-login">
                                    <Form.Control type="email" onChange={(event) => this.setState({email: event.target.value })} placeholder="Enter email" />
                                </Form.Group>
                                <Button className="float-left" size="sm" variant="link" type="submit">
                                    Forgot Email?
                                </Button>
                                <Button className="float-right" variant="primary" type="submit">
                                    Login
                                </Button>
                            </Form>
                        </div>

                </main>
            </>
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