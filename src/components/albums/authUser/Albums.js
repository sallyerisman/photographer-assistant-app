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
			<Col md={{ span: 8, offset: 2 }} className="page-content">
				<h1>My albums</h1>

				{loading
					? <PuffLoader className="loading-spinner"/>
					: albums.length > 0
						? <AlbumGrid albums={albums}/>
						: <div>You currently do not have any albums.</div>
				}

				{currentUser &&
					<div className="button-wrapper">
						<Button 
							className="btn button__primary button--left" 
							onClick={() => {navigate('/albums/create')}}
							variant="info" 
						>
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

