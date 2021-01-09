import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'

const CreateAccount = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const passwordConfirmRef = useRef()
	const passwordRef = useRef()

	const { createAccount } = useAuth()
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()

		// Check that user entered the same password in both input fields
		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords your entered do not match.")
		}

		setError(null);

		try {
			// Try to create account with the specified credentials
			setLoading(true)
			await createAccount(emailRef.current.value, passwordRef.current.value)
			navigate('/login')
		} catch (e) {
			setError("Was not able to create a new account. Please try again.")
			setLoading(false)
		}
	}

	return (
		<Row>
			<Col>
				<h2>Create new account</h2>

				{error && (<Alert variant="danger">{error}</Alert>)}

				<Form onSubmit={handleSubmit} className="form form__create-account">
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} autoFocus required />
					</Form.Group>

					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>

					<Form.Group id="password-confirm">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control type="password" ref={passwordConfirmRef} required />
					</Form.Group>

					<Button disabled={loading} type="submit">Create account</Button>
				</Form>

				<div>
					Already have an account? <Link to="/login">Log in</Link>
				</div>
			</Col>
		</Row>
	)
}

export default CreateAccount