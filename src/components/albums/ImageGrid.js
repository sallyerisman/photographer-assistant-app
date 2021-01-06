import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useUploadImages from '../../hooks/useUploadImages'
 import Checkbox from '../../helpers/Checkbox'

const ImageGrid = ({ images }) => {
	const [checkedItems, setCheckedItems] = useState({})
	const [errorMessage, setErrorMessage] = useState(false)
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const navigate = useNavigate()
	const [selectedImages, setSelectedImages] = useState([])
	const { error, isSuccess } = useUploadImages(imagesForUpload)
	

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the album could not be created.")
		} else if (isSuccess) {
			// Prevent duplicate upload
			setImagesForUpload(null);
			navigate('/albums')
		} 
	}, [error, isSuccess]);

	const handleChange = (e) => {
		const imageUrl = e.target.name
		setCheckedItems({...checkedItems, [imageUrl] : e.target.checked })
		
		let imageArray = selectedImages
		
		if (imageArray.includes(imageUrl)) {
			for (let i = 0; i < imageArray.length; i++){     
				imageArray[i] === imageUrl && imageArray.splice(i, 1) 			
			}
		} else {
			imageArray.push(imageUrl)
		}

		setSelectedImages(imageArray);
	}

	const handleCreateNewAlbum = (newImages) => {
		let filteredImages = []
		let allImages = images

		allImages.forEach(imgItem => {
			if (newImages.includes(imgItem.url)) {
				filteredImages.push(imgItem)
			}
		})

		setImagesForUpload(filteredImages)
	}

	return (
		<SRLWrapper>
			{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}

			<Row>
				{images.map((image, index) => (
					<Col sm={6} md={4} lg={3} key={index}>
						<Card>
							<a href={image.url} title="View image in lightbox" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
							</a>
							<Card.Body>
								<Card.Text>
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
							</Card.Body>
							<Checkbox
								name={image.url}
								checked={checkedItems[image.url]}
								onChange={handleChange}
							/>
						</Card>
					</Col>				
				))}

				{selectedImages && selectedImages.length > 0 &&
					<Button onClick={() => handleCreateNewAlbum(selectedImages)}>Create new album</Button>
				}
				
			</Row>
		</SRLWrapper>
	)
}

export default ImageGrid
