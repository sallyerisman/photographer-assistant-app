import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const Logout = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	
	const { logout } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			// Attempt log out of current user
			setLoading(true)
			await logout()
			navigate('/login')
		} catch (e) {
			setError("Log out failed. Please try again.")
			setLoading(false)
		}
	}

	return (		
		<Row>
			<Col>
				{error && <Alert variant="danger">{error}</Alert>}

				<h2>Are you sure you want to log out?</h2>

				<Form onSubmit={handleSubmit} className="form form__logout">
					<Button disabled={loading} type="submit" className="btn btn__log-out">Yes, please log me out</Button>					
					<Link to="/albums">No, take me home</Link>
				</Form>
			</Col>
		</Row>		
	)
}

export default Logout
