import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const AlbumGrid = ({ albums }) => {
	return (
		<> 
			{albums.map(album => (
				<Link to={`/albums/${album.id}`} key={album.id}>
					<Card>
						<Card.Body>
							<Card.Title>{album.title}</Card.Title>
						</Card.Body>
					</Card>
				</Link>
			))}
		</>
	)
}

export default AlbumGrid
