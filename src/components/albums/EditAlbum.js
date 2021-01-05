import { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap'
import useAlbum from '../../hooks/useAlbum'
import EditTitle from './EditTitle'

const EditAlbum = () => {
	const [editTitle, setEditTitle] = useState(false);
	const { album, loading } = useAlbum()
	
	const handleEditTitle = () => {
        setEditTitle(true);
    };

	return (
		<Row>
			<Col>
				{loading
					? <div>Loading...</div>
					: <>
						{editTitle 
							? <EditTitle album={album}/> 
							: <h2>{album.title} <span onClick={handleEditTitle}>🖋</span></h2>
						}
					</> 
				}
			</Col>
		</Row>
	)
}

export default EditAlbum