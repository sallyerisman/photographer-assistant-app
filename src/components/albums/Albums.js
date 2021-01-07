import { Link } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import PuffLoader from 'react-spinners/PuffLoader'
import { useAuth } from '../../contexts/AuthContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumGrid from './AlbumGrid'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums()

	return (
		<Row>
			<Col>
				<h2>My albums</h2>

				{loading
					? <PuffLoader className="loading-spinner"/>
					: albums.length > 0
						? <AlbumGrid albums={albums}/>
						: <div>You currently do not have any albums.</div>
				}

				{currentUser && 
					<Link to="/albums/create">Create a new Album</Link>					
				}				
			</Col>
		</Row>
	)
}

export default Albums

