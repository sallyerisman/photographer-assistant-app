import { Col, Row } from 'react-bootstrap'
import logo from '../../../assets/images/logo.png'

const ReviewConfirmation = () => {
	return (		
		<Row>
			<Col>
				<div className="logo-icon--wrapper"><img src={logo} className="logo logo--home-page"/></div>
				<h1 className="heading__goodbye">Thank you!</h1>
			</Col>
		</Row>		
	)
}

export default ReviewConfirmation


