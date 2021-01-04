import { useState } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import useAlbums from '../../hooks/useAlbums'
import AlbumGrid from './AlbumGrid'
import CreateAlbum from './CreateAlbum'

const Albums = () => {
	const { currentUser } = useAuth()
	const { albums, loading } = useAlbums()
	const [createAlbum, setCreateAlbum] = useState(false);

	const handleCreateAlbum = () => {
        setCreateAlbum(true);
	};

	return (
		<Row>
			<Col>
				<h2>My albums</h2>

				{loading
					? <div>Loading...</div>
					: albums.length < 0
						? <AlbumGrid albums={albums}/>
						: <div>You currently do not have any albums.</div>
				}

				{currentUser && createAlbum 
					? <CreateAlbum />
					: <Button onClick={handleCreateAlbum} type="button">Create a new album</Button>
				}		
			</Col>
		</Row>
	)
}

export default Albums

