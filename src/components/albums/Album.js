import { useState } from 'react';
import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import EditTitle from './EditTitle'
import ImageGrid from './ImageGrid'
import UploadImage from './UploadImage'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	const [editTitle, setEditTitle] = useState(false);

	const handleEditTitle = () => {
        setEditTitle(true);
    };
	
	return (
		<>	
			{loading
				? <div>Loading...</div>
				: album && 
					<>
						{editTitle 
							? <EditTitle album={album}/> 
							: <>
								<h2>{album.title} <span onClick={handleEditTitle}>🖋</span></h2>
								<UploadImage albumId={albumId} />
								<ImageGrid images={album.images} />
							</>
						}
					</>
			}
		</>
	)
}

export default Album


