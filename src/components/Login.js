import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
	const emailRef = useRef()
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const { login } = useAuth()
	const navigate = useNavigate()
	const passwordRef = useRef()

	const handleSubmit = async (e) => {
		e.preventDefault()

		setError(null);

		try {
			// Attempt log in using the specified credentials
			setLoading(true)
			await login(emailRef.current.value, passwordRef.current.value)
			navigate('/albums')
		} catch (e) {
			setError("Log in failed. Please check the credentials you entered.")
			setLoading(false)
		}
	}

	return (
		<Row>
			<Col>
				<h2>Log in</h2>

				{error && <Alert variant="danger">{error}</Alert>}

				<Form onSubmit={handleSubmit} className="form form__login">
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} autoFocus required />
					</Form.Group>

					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>

					<Button disabled={loading} type="submit" className="btn btn__log-in">Log in</Button>
				</Form>

				<Link to="/reset-password">Forgot your password?</Link>
				<div>Don't have an account? Create one <Link to="/create-account">here</Link>!</div>
			</Col>
		</Row>
	)
}

export default Login
