import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import AlertEl from '../../helpers/Alert'

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
			setError("We were not able to create the account. Are you sure you don't already have one with the same email address?")
			setLoading(false)
		}
	}

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1>Create a new account</h1>

				{error && <AlertEl status="danger" message={error}/>}

				<Form onSubmit={handleSubmit}>
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

					<Button 
						disabled={loading} 
						className="btn button__primary" 
						type="submit"
						>Create account
					</Button>
				</Form>
				
				<p>Already have an account? <Link to="/login" className="link text-link">Log in here</Link></p>
			</Col>
		</Row>
	)
}

export default CreateAccount
