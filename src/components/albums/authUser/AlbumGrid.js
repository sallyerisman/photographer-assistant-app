import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card} from 'react-bootstrap'
import { Dash } from 'react-bootstrap-icons'
import useDeleteAlbum from '../../../hooks/useDeleteAlbum'

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
		if (confirm(`Are you sure you want to delete album "${album.title}"?`)) {
			setDeleteAlbum(album);
		}
	}

	return (
		<> 
			{albums.map(album => (
				<Card key={album.id}>
					<Link to={`/albums/${album.id}`} className="link text-link">
						<Card.Body>
							<div className="title-wrapper">
								<Card.Title>{album.title}</Card.Title>
								<Button 
									className="btn button__danger button--small"
									onClick={() => {handleDeleteAlbum(album)}}
								>	
									<Dash className="icon button-icon" />
									Delete
								</Button>
							</div>
						</Card.Body>
					</Link>
				</Card>
			))}
		</>
	)
}

export default AlbumGrid
