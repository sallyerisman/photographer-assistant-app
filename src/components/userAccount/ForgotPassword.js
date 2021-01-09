import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useAuth } from '../../contexts/AuthContext'

const ForgotPassword = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState(null)
	const emailRef = useRef()
	
	const { resetPassword } = useAuth()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			// Send a password reset email to the user
			setLoading(true)
			await resetPassword(emailRef.current.value)
			setMessage("A reset link has been sent to your email address.")
		} catch (e) {
			setError("Was unable to send reset link. Please check make sure the email address you entered is correct.")
			setLoading(false)
		}
	}

	return (
		<Row>
			<Col md={{ span: 6, offset: 3 }} className="page">
				<h1>Forgot your password?</h1>

				{error && <Alert variant="danger">{error}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}

				<Form onSubmit={handleSubmit} className="form form__reset-password">
					<Form.Group id="email">
						<Form.Label>Enter your email address</Form.Label>
						<Form.Control type="email" ref={emailRef} autoFocus required />
					</Form.Group>

					<Button 
						className="btn btn__reset-password"
						disabled={loading} 
						type="submit"
						variant="info" 
						>Reset your password
					</Button>
				</Form>

				<Link to="/login" className="link text-link">
					<ArrowLeft className="icon icon__arrow-left" />
					Go back to login
				</Link>
			</Col>
		</Row>		
	)
}

export default ForgotPassword
