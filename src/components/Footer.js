import { Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import logo from '../assets/images/logo.png'

const Footer = () => {
	return (
        <footer className="footer">
            <Container>
                <div className="footer-content-wrapper">
                    <p className="footer-text">Copyright © Sally Erisman</p>
                    <Link to="/" className="link logo-wrapper logo-wrapper--footer">
                        <img src={logo} className="logo logo--footer" alt="Logo"/>
                        <span className="logo-text">Review my photos</span>                
                    </Link>
                </div>
            </Container>
        </footer >
	)
}

export default Footer