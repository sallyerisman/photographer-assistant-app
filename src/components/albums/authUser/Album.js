import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Alert, Button, Col, Row } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
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

	const handleCopyLink = async (link) => {
		// Try to copy the link text to clipboard
		try {
		  await navigator.clipboard.writeText(link)
		  setCopySuccess("Successfully copied!")
		  setInvite(null)
		} catch (err) {
		  setCopySuccess("Failed to copy.")
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
		<>
			{loading
				? <PuffLoader className="loading-spinner"/>
				: album && 
					<>
						{currentUser &&
							editTitle 
								? <EditTitle album={album}/> 
								: <>
									<div className="title-wrapper">
										<h1>{album.title}</h1>
										<Button className="btn button__secondary button--small" onClick={handleEditTitle}>	
											<Pen className="icon button-icon" />
											Edit title
										</Button>
									</div>

									<UploadImage albumId={albumId} />

									{album.images.length > 0 &&
										<p className="info-ingress">You can also generate a new album by selecting from among your album images</p>
									}
									<AuthImageGrid images={album.images}/>
									<div className="button-wrapper">
										<Button 
											className="btn button__primary button--left"
											disabled={loading} 
											onClick={handleInvite}
											variant="info"
											>Generate invite link
										</Button>											
									</div>
									{invite && 
										<Alert variant="info">
											<div className="invite-link-wrapper">
												{invite}
												<Button className="btn button__secondary button--small" onClick={() => handleCopyLink(invite)} variant="info">
													Copy
												</Button>
											</div>
										</Alert>									
									}

									{copySuccess && 
										<Alert variant="info">											
											<div className="invite-link-wrapper">
												{invite}
												{copySuccess}											
											</div>
										</Alert>									
									}			
								</>					
						}
					</>
			}
		</>
	)
}

export default Album


