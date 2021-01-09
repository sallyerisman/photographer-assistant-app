import { Link } from 'react-router-dom'
import { Images } from 'react-bootstrap-icons'

const Home = () => {
	return (
		<div className="home-page">			
			<h1 className="heading heading__home-page">
				<span>Welcome to your Photo Helper!</span>
				<Images className="icon icon__images" />
			</h1>

			<p className="ingress">Your one-stop-shop for all of your customer review process needs</p>
			<p>Here you can create albums, upload photos and have your customer review them.</p>

			<p>Start by <Link to="/create-account" className="link text-link">creating an account</Link></p>

			<p>Already have an account? <Link to="/logout" className="link text-link">Log in here</Link></p>
		</div>
	)
}

export default Home
