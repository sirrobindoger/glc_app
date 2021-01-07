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
                        <Nav.Item className="pr-3" href="#">My Fourms</Nav.Item>
                        <Nav.Item className="pr-3" href="#">Manage Providers</Nav.Item>
                        <Nav.Item className="pr-3" href="#">Add To Homescreen</Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}