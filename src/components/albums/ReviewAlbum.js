import { useParams } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import useAlbum from '../../hooks/useAlbum'
import VisitorImageGrid from './VisitorImageGrid'

const ReviewAlbum = () => {
	const { albumId } = useParams()
	const { album, loading } = useAlbum(albumId)

	return (
		<>	
			{loading 
				? <PuffLoader className="loading-spinner"/>
				: album && 
					<>
						<h2>{album.title}</h2>
						<VisitorImageGrid images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum


