import {Component} from "react"
import {Button, Card, Row, Col} from "react-bootstrap"

export default class FormBox extends Component {
	renderSubmission() {
		if (this.props.form.count > 0) {
			return <Button className="float-right" style={{"borderRadius":"0"}}>Submissions</Button>
		}
	}
	renderFormProps() {
		
	}
    render() {
        return (
            <Card style={{ width: '20rem' }}>
                <Card.Header>{this.props.form.title}</Card.Header>
                <Card.Body>
					Use this form whenever you have an
					accident in the gym. It's important you fill
					it out right away.
                </Card.Body>
				<Row>
					<Button className="float-left ml-3 mr-1" variant="link" style={{"color":"red"}}>Use Form</Button>
					<Button href={this.props.form.url} variant="link">View Form</Button>
					{this.renderSubmission()}
					
				</Row>

            </Card>
        )
    }
}