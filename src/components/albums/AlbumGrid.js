import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'
import useDeleteAlbum from '../../hooks/useDeleteAlbum'

const AlbumGrid = ({ albums }) => {
	const [deleteAlbum, setDeleteAlbum] = useState(false)
	const { deleteError, deleteSuccess } = useDeleteAlbum(deleteAlbum)

	useEffect(() => {
		if (deleteError) {
			setErrorMessage("An error occurred and the album could not be deleted.")
		} else if (deleteSuccess) {
			setSuccessMessage("The album was successfully deleted.")
		} 
	}, [deleteError, deleteSuccess]);

	const handleDeleteAlbum = (album) => {
		if (confirm(`Are you sure you want to delete album "${album.title} and its content"?`)) {
			setDeleteAlbum(album);
		}
	}

	return (
		<> 
			{albums.map(album => (
				<Card>
					<Link to={`/albums/${album.id}`} key={album.id}>
						<Card.Body>
							<Card.Title>{album.title}</Card.Title>
						</Card.Body>
					</Link>
					<Button onClick={() => {handleDeleteAlbum(album)}}>Delete album</Button>
				</Card>
			))}
		</>
	)
}

export default AlbumGrid
