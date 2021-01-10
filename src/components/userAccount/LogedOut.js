import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'

const LogedOut = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/login')
	}

	return (		
		<Row>
			<Col md={{ span: 8, offset: 2 }} className="page-content" >
				<h1>Goodbye, hope to see you again soon!</h1>
				
				<div className="button-wrapper">
					<Button className="btn button__primary button--left" onClick={handleClick} variant="info">Log in again</Button>
				</div>
			</Col>
		</Row>		
	)
}

export default LogedOut
