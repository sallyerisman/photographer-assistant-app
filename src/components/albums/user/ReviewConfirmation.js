import { Col, Row } from 'react-bootstrap'

const ReviewConfirmation = () => {
	return (		
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1 className="heading__good-bye">Thank you for your selection!</h1>
			</Col>
		</Row>		
	)
}

export default ReviewConfirmation


