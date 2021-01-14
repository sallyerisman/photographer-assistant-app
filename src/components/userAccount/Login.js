import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import CustomAlert from '../../helpers/CustomAlert'

const Login = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	const emailRef = useRef()
	const passwordRef = useRef()

	const { login } = useAuth()
	const navigate = useNavigate()

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
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1>Log in</h1>

				{error && <CustomAlert status="danger" message={error}/>}

				<Form aria-label="form" onSubmit={handleSubmit}>
					<Form.Group id="email">
						<Form.Label>Email</Form.Label>
						<Form.Control type="email" ref={emailRef} autoFocus required />
					</Form.Group>

					<Form.Group id="password">
						<Form.Label>Password</Form.Label>
						<Form.Control type="password" ref={passwordRef} required />
					</Form.Group>

					<Button 
						disabled={loading} 
						type="submit" 
						className="btn button__primary" 
						variant="info"
						>Log in
					</Button>
				</Form>

				<Link to="/reset-password" className="link text-link">Forgot your password?</Link>
				<p>Don't have an account? Create one <Link to="/create-account" className="link text-link">here</Link>!</p>
			</Col>
		</Row>
	)
}

export default Login
