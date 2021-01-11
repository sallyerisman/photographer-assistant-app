import { useNavigate } from 'react-router-dom'
import { Button, Col, Row } from 'react-bootstrap'
import { Plus } from 'react-bootstrap-icons'
import PuffLoader from 'react-spinners/PuffLoader'
import { useAuth } from '../../../contexts/AuthContext'
import useAlbums from '../../../hooks/useAlbums'
import AlbumGrid from './AlbumGrid'

const Albums = () => {
	const { albums, loading } = useAlbums()
	const { currentUser } = useAuth()
	const navigate = useNavigate()

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1>My albums</h1>

				{loading
					? <div className="spinner-wrapper"><PuffLoader color="#117a8b"/></div>
					: albums.length > 0
						? <AlbumGrid albums={albums}/>
						: <div>You currently do not have any albums.</div>
				}

				{currentUser &&
					<div>
						<Button className="btn button__primary"	onClick={() => {navigate('/albums/create')}}>
							<Plus className="icon button-icon" />
							New album
						</Button>
					</div> 		
				}				
			</Col>
		</Row>
	)
}

export default Albums

