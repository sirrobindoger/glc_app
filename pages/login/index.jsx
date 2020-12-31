import {Row, Form, Button, Nav} from "react-bootstrap";
import Head from "next/head";

const Login = () => {
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
                        <Form className="login-d2">
                            <Form.Group controlId="form-email-login">
                                <Form.Control type="email" placeholder="Enter email" />
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
export default Login;