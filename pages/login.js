import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";

const Login = () => {
    return (
    <Jumbotron>
        <Container fluid>
            <div>
                <form>
                    <input type="text" id="email" name="email" placeholder = "Email"/>
                </form>
            </div>
        </Container>
    </Jumbotron>
    )
}

export default Login;