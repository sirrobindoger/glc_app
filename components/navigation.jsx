import {Component} from "react"
import {Navbar, Nav, NavDropdown} from "react-bootstrap"
import {destroyCookie} from "nookies"
import {withRouter} from "next/router";
import '../node_modules/font-awesome/css/font-awesome.min.css';

class Navigation extends Component {
    constructor(props) {
        super(props)
    }
	logout() {
		localStorage.removeItem("glc_token")
		destroyCookie({}, "glc_token", {
			path: "/"
		})
		this.props.router.push("/login")
	}
    render() {
        return (
            <Navbar expand="lg" className="container">
                <Navbar.Brand href="#home"><b>MyForms</b></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="pr-4" href="#" active={this.props.Fourms}>My Forms</Nav.Link>
                        <Nav.Link className="pr-4" href="#" active={this.props.Providers}>Manage Providers</Nav.Link>
                        <Nav.Link className="pr-4" href="#" active={this.props.Homescreen}>Add To Homescreen</Nav.Link>
                    </Nav>
					<NavDropdown title={<i className="fa fa-user-circle"/>} >
						<NavDropdown.Item>My Info</NavDropdown.Item>
						<NavDropdown.Item>Billing</NavDropdown.Item>
						<NavDropdown.Item onClick={() => {this.logout()}}>Logout</NavDropdown.Item>

					</NavDropdown>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default withRouter(Navigation);