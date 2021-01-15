import {Component} from "react"
import {Navbar, Nav} from "react-bootstrap"

export class Navigation extends Component {
    constructor(props) {
        super(props)
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
                </Navbar.Collapse>
            </Navbar>
        )
    }
}