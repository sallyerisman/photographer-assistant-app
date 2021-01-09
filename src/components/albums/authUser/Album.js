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
	const [copySuccess, setCopySuccess] = useState('')
	const [editTitle, setEditTitle] = useState(false)
	const [invite, setInvite] = useState(null)

	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const { currentUser } = useAuth()

	const handleCopyLink = async link => {
		try {
		  await navigator.clipboard.writeText(link);
		  setCopySuccess("Copied!");
		} catch (err) {
		  setCopySuccess("Failed to copy.");
		}
	}
	
	const handleEditTitle = () => {
        setEditTitle(true);
	};
	
	const handleInvite = () => {
		const href = window.location.href
        setInvite(`${href}/review`);
    };
	
	return (
		<Row>
			<Col>		
				{invite && 
					<Alert variant="info">{invite}
						<div>
							<Button onClick={() => handleCopyLink(invite)}>
								Copy
							</Button>
							{copySuccess}
						</div>		
					</Alert>
				}

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
											onClick={handleInvite}
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


