import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import ImageGrid from './ImageGrid'
import UploadImage from './UploadImage'

const Album = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)
	
	return (
		<>
			<h2>{album && album.title}</h2>

			<UploadImage albumId={albumId} />

			{loading
				? <div>Loading...</div>
				: album && 
					<ImageGrid images={album.images} />
			}
		</>
	)
}

export default Album


