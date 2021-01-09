import { Link } from 'react-router-dom'
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
                    Photo Helper                
                </Link>

                {currentUser 
                    ? <Link to="/logout" className="link login">Log out</Link>
                    : <Link to="/login" className="link login">
                        <Person className="icon icon__login" />
                    </Link>
                }           
            </Container>
        </Navbar>
	)
}

export default Navigation