import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Card, Col, Row} from 'react-bootstrap'
import { Dash } from 'react-bootstrap-icons'
import swal from '@sweetalert/with-react'
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
		swal({
			title: "Are you sure?",
			text: `The action to delete album "${album.title}" cannot be undone`,
			icon: "warning",
			buttons: true,
			dangerMode: true,
		}).then((willDelete) => {
			if (willDelete) {
				setDeleteAlbum(album);
			} else {
			  return
			}
		});
	}

	return (
		<Row className="album-grid"> 
			<Col>
				{albums.map(album => (
					<Card key={album.id} className="card__album">
						<Card.Body>
							<Link to={`/albums/${album.id}`} className="link text-link">
								<Card.Title>{album.title}</Card.Title>
							</Link>
							<Button	className="btn button__danger button--small button__delete" onClick={() => {handleDeleteAlbum(album)}}>	
								<Dash className="icon button-icon button-icon--small" />
								Delete
							</Button>
						</Card.Body>
					</Card>
				))}
			</Col>
		</Row>
	)
}

export default AlbumGrid
