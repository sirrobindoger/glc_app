import {Component} from "react"
import {Button, Card, Row, Col, Form} from "react-bootstrap"
import {parseCookies} from 'nookies'

export default class FormBox extends Component {
	constructor(props) {
		super(props)
		this.state = {
			formprops: null
		}
	}
	renderSubmission() {
		if (this.props.form.count > 0) {
			return <Button className="float-right view-submissions" style={{"borderRadius":"0"}}>Submissions</Button>
		}
	}

	sendToZap = (event) => {
		const cookies = parseCookies()
		if (cookies.glc_token) {
			fetch("api/dash/webhook", {method: "POST", body: JSON.stringify({
				formID: this.props.form.id,
				token: cookies.glc_token,
				webhook: event.target.value
			})})
		}
	}

	renderFormProps = () => {
		this.setState({
			formprops: this.state.formprops ? null : (
				<Row>	
					{/* Use Link */}
					<Row className="mx-0 my-2">				
						Use Link
						<Form.Control style={{
							backgroundColor:"white", 
							fontWeight:"light",
							border: "2px solid #f7f8f9",
							borderRadius: "5px",
							padding: "5px"
						}} type="text" className="text-muted" plaintext readOnly defaultValue={this.props.form.url} />	
						<Form.Text className="text-muted my-0 py-0">
							Copy this link and re-use it wherever you'd like.
						</Form.Text>
					</Row>
					{/* Embed */}
					<Row className="mx-0 my-2">
						Embed
						<Form.Control style={{
							backgroundColor:"white", 
							fontWeight:"light",
							border: "2px solid #f7f8f9",
							borderRadius: "5px",
							padding: "5px",
						}} type="text" className="text-muted" plaintext readOnly defaultValue={`<script src="${this.props.form.url}"> </script>`} />
						<Form.Text className="text-muted my-0 py-0">
							Embed this code into a page on your website.
						</Form.Text>
					</Row>					
					{/* Webhook */}
					<Row className="mx-0 my-2">
						Send Submissions To Zapier
						<Form.Control style={{
							backgroundColor:"white", 
							fontWeight:"light",
							border: "2px solid #f7f8f9",
							borderRadius: "5px",
							padding: "5px",
						}} type="text" onChange={this.sendToZap} className="text-muted"  placeholder="https://zapier.com"/>
						<Form.Text className="text-muted my-0 py-0">
							Add a zapier webhook url to send new submissions to a zap.
						</Form.Text>						
					</Row>
				</Row>
			)
			
		})
	}
    render() {
        return (
		<Col sm={12} md={6} lg={4}>
			<div className="panel mb-3 p-3 pt-4">
				<h4>{this.props.form.title}</h4>
				<ul className="inline-list formbox-btns">
					<li>
						<Button onClick={this.renderFormProps} variant="link" className="link link-red use-form">Use Form</Button>
					</li>	
					<li>
						<Button href={this.props.form.url} variant="link" target="_blank" className="link">View</Button>
					</li>
					{this.renderSubmission()}	
				</ul>
				<Col>
					{this.state.formprops}
				</Col>
			</div>
		</Col>
        )
    }
}