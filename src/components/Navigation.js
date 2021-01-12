import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { Images, PersonFill } from 'react-bootstrap-icons'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
    const { currentUser } = useAuth();

	return (
        <Navbar className="navigation">
            <Container className="navigation-container">
                <Link to="/" className="link logo-wrapper">
                    <Images className="logo" />
                    <span className="logo-text">PHOTO HELPER</span>                
                </Link>

                {currentUser 
                    ? <div className="navlink-wrapper">
                        <NavLink to="/albums" className="link navlink">Albums</NavLink>
                        <NavLink to="/logout" className="link navlink login">Log out</NavLink>
                    </div>
                    : <Link to="/login" className="link login">
                        <PersonFill className="icon icon__login" />
                    </Link>
                }           
            </Container>
        </Navbar>
	)
}

export default Navigation