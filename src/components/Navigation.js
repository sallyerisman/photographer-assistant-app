import { Link } from 'react-router-dom'
import { Container, Navbar } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'

const Navigation = () => {
    const { currentUser } = useAuth();

	return (
        <Navbar className="navigation">
            <Container>
                <Link to="/">Photographer assistant</Link>

                {currentUser 
                    ? <Link to="/logout">Log out</Link>
                    : <Link to="/login">Log in</Link>
                }           
            </Container>
        </Navbar>
	)
}

export default Navigation