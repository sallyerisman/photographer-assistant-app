import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import useAlbum from '../../hooks/useAlbum'
import EditAlbum from './EditAlbum'
import NotFound from '../NotFound'

const Album = () => {
	const { currentUser } = useAuth()
	const { album, loading } = useAlbum()

	return (
		<>
			<Row>
				<Col>
				{!album.id 
					? <NotFound />
					: loading
						? <div>Loading...</div>
						: currentUser && <EditAlbum album={album}/>
				}
				</Col>	
			</Row>
			<Link to={'/albums/'}>Tillbaka till kategorier</Link>	
		</>
	)
}

export default Album

