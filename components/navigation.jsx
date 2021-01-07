import {Component} from "react"
import {Navbar, Nav} from "react-bootstrap"

export class Navigation extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Forms Client</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link className="pr-4" href="#" active={this.props.Fourms}>My Fourms</Nav.Link>
                        <Nav.Link className="pr-4" href="#" active={this.props.Providers}>Manage Providers</Nav.Link>
                        <Nav.Link className="pr-4" href="#" active={this.props.Homescreen}>Add To Homescreen</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}