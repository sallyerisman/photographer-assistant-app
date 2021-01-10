import { Link, NavLink } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { Images, Person } from 'react-bootstrap-icons'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
    const { currentUser } = useAuth();

	return (
        <Navbar className="navigation">
            <Container className="navigation-container">
                <Link to="/" className="link logo-wrapper">
                    <Images className="logo" />
                    <span className="logo-text">Photo Helper</span>                
                </Link>

                {currentUser 
                    ? <div className="navlink-wrapper">
                        <NavLink to="/albums" className="link link-text navlink">Albums</NavLink>
                        <NavLink to="/logout" className="link link-text navlink login">Log out</NavLink>
                    </div>
                    : <Link to="/login" className="link login">
                        <Person className="icon icon__login" />
                    </Link>
                }           
            </Container>
        </Navbar>
	)
}

export default Navigation