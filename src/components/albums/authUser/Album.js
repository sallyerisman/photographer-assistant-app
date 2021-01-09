import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import PuffLoader from 'react-spinners/PuffLoader'
import { useAuth } from '../../../contexts/AuthContext'
import useAlbum from '../../../hooks/useAlbum'
import EditTitle from './EditTitle'
import AuthImageGrid from './AuthImageGrid'
import UploadImage from './UploadImage'

const Album = () => {
	const [editTitle, setEditTitle] = useState(false)
	const [invite, setInvite] = useState(null)

	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { currentUser } = useAuth()

	const handleEditTitle = () => {
        setEditTitle(true);
	};
	
	const handleInvite = (albumId) => {
        setInvite(`review/${albumId}`);
    };
	
	return (
		<Row>
			<Col>		
				{invite && <Alert variant="info">{invite}</Alert>}

				{loading
					? <PuffLoader className="loading-spinner"/>
					: album && 
						<>
							{currentUser &&
								editTitle 
									? <EditTitle album={album}/> 
									: <>
										<h2>{album.title} <span onClick={handleEditTitle}>🖋</span></h2>
										<UploadImage albumId={albumId} />
										<AuthImageGrid images={album.images}/>
										<Button 
											disabled={loading} 
											onClick={() => handleInvite(albumId)}
											>Create invite link
										</Button>
									</>					
							}
						</>
				}
			</Col>
		</Row>
	)
}

export default Album


