import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Images } from 'react-bootstrap-icons'

const Footer = () => {
	return (
        <footer className="footer">
            <Container>
                <div className="footer-content-wrapper">
                    <p className="footer-text">Copyright © Sally Erisman</p>
                    <Link to="/" className="link logo-wrapper logo-wrapper--footer">
                        <Images className="logo" />
                        <span className="logo-text">PHOTO HELPER</span>                
                    </Link>
                </div>
            </Container>
        </footer >
	)
}

export default Footer