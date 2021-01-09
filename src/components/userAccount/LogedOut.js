import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const LogedOut = () => {
	return (		
		<Row>
			<Col md={{ span: 8, offset: 2 }} className="page" >
				<h1>Goodbye, hope to see you soon!</h1>
				
				<Link to="/login" className="btn btn__login-again">Log in again</Link>
			</Col>
		</Row>		
	)
}

export default LogedOut
