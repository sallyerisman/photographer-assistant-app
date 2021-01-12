import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'

const LogedOut = () => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate('/login')
	}

	return (		
		<Row>
			<Col className="page__goodbye">
				<h1>Goodbye!</h1>
				<p>Hope to see you again soon!</p>
				
				<div>
					<Button className="btn button__primary" onClick={handleClick}>Log in again</Button>
				</div>
			</Col>
		</Row>		
	)
}

export default LogedOut
