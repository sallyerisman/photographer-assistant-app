import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import { ArrowLeft } from 'react-bootstrap-icons'
import { useAuth } from '../../contexts/AuthContext'

const Logout = () => {
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(false)
	
	const { logout } = useAuth()
	const navigate = useNavigate()

	const handleClick = async () => {
		setError(null);

		try {
			// Attempt log out of current user
			setLoading(true)
			await logout()
			navigate('/good-bye')
		} catch (e) {
			setError("Log out failed. Please try again.")
			setLoading(false)
		}
	}

	return (		
		<Row>
			<Col md={{ span: 8, offset: 2 }} className="page-content">
				{error && <Alert variant="danger">{error}</Alert>}

				<h1>Are you sure you want to log out?</h1>

				<div className="button-wrapper">
					<Button 
						className="btn button__danger button--left"
						disabled={loading} 
						onClick={handleClick} 
						>Yes, please log me out
					</Button>
				</div>

				<div>
					<Link to="/albums" className="link text-link">
						<ArrowLeft className="icon icon__arrow-left" />
						No, take me back to albums
					</Link>				
				</div>
			</Col>
		</Row>		
	)
}

export default Logout
