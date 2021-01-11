import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { Pen } from 'react-bootstrap-icons'
import PuffLoader from 'react-spinners/PuffLoader'
import { useAuth } from '../../../contexts/AuthContext'
import useAlbum from '../../../hooks/useAlbum'
import AuthImageGrid from './AuthImageGrid'
import EditTitle from './EditTitle'
import Invite from './Invite'
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
	
	const handleInvite = () => {
		const href = window.location.href
        setInvite(`${href}/review`);
    };
	
	return (
		<>
			{loading
				? <div className="loading-spinner"><PuffLoader color="#117a8b"/></div>
				: album && currentUser &&
					<>
						{editTitle 
							? <EditTitle album={album}/> 
							: <>
								<div className="edit-title-wrapper">
									<h1>{album.title}</h1>
									<Button variant="light" className="btn button--small button--edit" onClick={handleEditTitle}>	
										<Pen className="icon button-icon button-icon--edit" />
										Edit title
									</Button>
								</div>

								<UploadImage albumId={albumId} />

								{album.images.length > 0 &&
									<p className="info-ingress">You can also create a new album by selecting from among your images</p>
								}

								<AuthImageGrid images={album.images}/>

								{album.images.length > 0 &&
									<div>
										<Button 
											className="btn button__secondary"
											disabled={loading} 
											onClick={handleInvite}
											>Invite link
										</Button>											
									</div>
								}
								
								{invite && <Invite invite={invite}/>}			
							</>					
						}
					</>
			}
		</>
	)
}

export default Album


