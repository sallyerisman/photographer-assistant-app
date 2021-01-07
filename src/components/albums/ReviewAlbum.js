import { useParams } from 'react-router-dom'
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
				? <div>Loading...</div>
				: album && 
					<>
						<h2>{album.title}</h2>
						<ImageGrid album={album} />
					</>
			}
		</>
	)
}

export default ReviewAlbum


