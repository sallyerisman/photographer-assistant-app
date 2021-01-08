import { useState } from 'react';
import { useParams } from 'react-router-dom'
import { Alert, Button } from 'react-bootstrap'
import PuffLoader from 'react-spinners/PuffLoader'
import useAlbum from '../../hooks/useAlbum'
import EditTitle from './EditTitle'
import ImageGrid from './ImageGrid'
import UploadImage from './UploadImage'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const [editTitle, setEditTitle] = useState(false)
	const [invite, setInvite] = useState(null)

	const handleEditTitle = () => {
        setEditTitle(true);
	};
	
	const handleInvite = (inviteLink) => {
        setInvite(inviteLink);
    };
	
	return (
		<>	
			{invite && <Alert variant="warning">{invite}</Alert>}

			{loading
				? <PuffLoader className="loading-spinner"/>
				: album && 
					<>
						{editTitle 
							? <EditTitle album={album}/> 
							: <>
								<h2>{album.title} <span onClick={handleEditTitle}>🖋</span></h2>
								<UploadImage albumId={albumId} />
								<ImageGrid images={album.images}/>
								<Button 
									disabled={loading} 
									onClick={() => handleInvite(album.inviteLink)}
									>Create invite link
								</Button>
							</>
						}
					</>
			}
		</>
	)
}

export default Album


