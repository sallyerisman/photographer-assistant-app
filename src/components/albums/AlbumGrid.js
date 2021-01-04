import { Card } from 'react-bootstrap'

const AlbumGrid = ({ albums }) => {
	return (
		<> 
			{albums.map(album => (
				<Card key={album.id}>
					<Card.Body>
						<Card.Title>{album.title}</Card.Title>
					</Card.Body>
				</Card>
			))}
		</>
	)
}

export default AlbumGrid
