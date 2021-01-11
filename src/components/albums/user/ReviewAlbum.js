import { useParams } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import useAlbum from '../../../hooks/useAlbum'
import ImageGrid from './ImageGrid'

const ReviewAlbum = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)

	return (
		<>	
			{loading 
				? <div className="spinner-wrapper"><PuffLoader color="#117a8b"/></div>
				: album && 
					<>
						<h1>{album.title}</h1>
						<ImageGrid images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum


