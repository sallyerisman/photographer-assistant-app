import { useParams } from 'react-router-dom'
import PuffLoader from 'react-spinners/PuffLoader'
import useAlbum from '../../hooks/useAlbum'
import useInvitedAlbum from '../../hooks/useInvitedAlbum'
import ImageGrid from './ImageGrid'

const ReviewAlbum = () => {
	const { inviteLink } = useParams()
	const { foundAlbumId, isLoading } = useInvitedAlbum(inviteLink)
	const { album, loading } = useAlbum(foundAlbumId)

	return (
		<>	
			{loading || isLoading
				? <PuffLoader className="loading-spinner"/>
				: album && 
					<>
						<h2>{album.title}</h2>
						<ImageGrid images={album.images} owner={album.owner} title={album.title} />
					</>
			}
		</>
	)
}

export default ReviewAlbum


