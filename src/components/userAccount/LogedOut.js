import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'

const LogedOut = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/login')
	}

	return (		
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1 className="heading__good-bye">Goodbye, hope to see you again soon!</h1>
				
				<div>
					<Button className="btn button__primary" onClick={handleClick}>Log in again</Button>
				</div>
			</Col>
		</Row>		
	)
}

export default LogedOut
