import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const ForgotPassword = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [message, setMessage] = useState(null)
	const [loading, setLoading] = useState(false)
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
			<Col>
				<h2>Forgot your password?</h2>

				{error && <Alert variant="danger">{error}</Alert>}
				{message && <Alert variant="success">{message}</Alert>}

				<Form onSubmit={handleSubmit} className="form form__reset-password">
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} autoFocus required />
					</Form.Group>

					<Button disabled={loading} type="submit">Reset your password</Button>
				</Form>

				<Link to="/login">Login?</Link>
			</Col>
		</Row>		
	)
}

export default ForgotPassword
