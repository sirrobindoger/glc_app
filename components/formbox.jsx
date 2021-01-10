import {Component} from "react"
import {Nav, Card} from "react-bootstrap"

export default class FormBox extends Component {
    render() {
        return (
            <Card style={{ width: '17.7rem' }}>
                <Card.Header>Card Title</Card.Header>
                <Card.Body>
                    Test tTest tTest tTest tTest tTest tTest t
                </Card.Body>
                <Nav variant="pills" activeKey="1">
                    <Nav.Link><small style={{"color":"red"}}>Use Form</small></Nav.Link>
                    <Nav.Link><small>View Form</small></Nav.Link>
                    <Nav.Link eventKey="1"><small>Submissions</small></Nav.Link>
                </Nav>
            </Card>
        )
    }
}