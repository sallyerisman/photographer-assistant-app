import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const Home = () => {
	return (
		<Row>
			<Col className="page page__home-page">			
				<h1 className="heading heading__home-page">Welcome to your Photo Helper!</h1>

				<p className="ingress">Your one-stop-shop for all of your customer review process needs</p>
				<p>Here you can create albums, upload photos and have your customer review them.</p>

				<div className="link-wrapper">
					<p>Start by <Link to="/create-account" className="link text-link">creating an account</Link></p>
					<p>Already have an account? <Link to="/login" className="link text-link">Log in here</Link></p>
				</div>
			</Col>
		</Row>
	)
}

export default Home
