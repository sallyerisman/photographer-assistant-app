import { useParams } from 'react-router-dom'
import useAlbum from '../../hooks/useAlbum'
import useInvitedAlbum from '../../hooks/useInvitedAlbum'
import ImageGrid from './ImageGrid'

const ReviewAlbum = () => {
	const { inviteLink } = useParams()
	const { foundAlbumId, isLoading } = useInvitedAlbum(inviteLink)
	console.log("what us foundAlbumId", foundAlbumId)
	const { album, loading } = useAlbum(foundAlbumId)

	return (
		<>	<div>Hello from reviewAlbum</div>

			{loading || isLoading
				? <div>Loading...</div>
				: album && 
					<>
						<h2>{album.title}</h2>
						<ImageGrid images={album.images} />
					</>
			}
		</>
	)
}

export default ReviewAlbum


