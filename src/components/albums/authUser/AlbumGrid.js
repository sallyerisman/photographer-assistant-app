import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Col, Row} from 'react-bootstrap'
import { DashCircleFill } from 'react-bootstrap-icons'
import swal from '@sweetalert/with-react'
import useDeleteAlbum from '../../../hooks/useDeleteAlbum'
import CustomAlert from '../../../helpers/CustomAlert'

const AlbumGrid = ({ albums }) => {
	const [deleteAlbum, setDeleteAlbum] = useState(false)
	const [errorMessage, setErrorMessage] = useState(false)
	const [successMessage, setSuccessMessage] = useState(false)

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
		<>
			{errorMessage && <CustomAlert status="danger" message={errorMessage}/>}
			{successMessage && <CustomAlert status="success" message={successMessage}/>}

			<Row className="album-grid"> 
				<Col>
					{albums.map(album => (
						<Card key={album.id} className="card__album">
							<Card.Body>
								<Link to={`/albums/${album.id}`} className="link">
									<Card.Title>{album.title}</Card.Title>
								</Link>
								<DashCircleFill	className="icon icon__delete-album" onClick={() => {handleDeleteAlbum(album)}} />	
							</Card.Body>
						</Card>
					))}
				</Col>
			</Row>
		</>
	)
}

export default AlbumGrid
