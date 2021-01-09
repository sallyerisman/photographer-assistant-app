import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../../contexts/AuthContext'
import useDeleteImage from '../../../hooks/useDeleteImage'
import useUploadImages from '../../../hooks/useUploadImages'
import Checkbox from '../../../helpers/Checkbox'

const AuthImageGrid = ({ images }) => {
	const [checkedItems, setCheckedItems] = useState({})
	const [deleteImage, setDeleteImage] = useState(null)
	const [errorMessage, setErrorMessage] = useState(false)
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const [selectedImages, setSelectedImages] = useState([])
	const [successMessage, setSuccessMessage] = useState(false)

	const { currentUser } = useAuth()
	const { deleteError, deleteSuccess } = useDeleteImage(deleteImage)
	const { error, success } = useUploadImages(imagesForUpload)
	const navigate = useNavigate()

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the image could not be uploaded.")
		} else if (success) {
			// Prevent duplicate upload
			setImagesForUpload(null);
			navigate('/albums')
		} 
	}, [error, success]);
	
	useEffect(() => {
		if (deleteError) {
			setErrorMessage("An error occurred and the image could not be deleted.")
		} else if (deleteSuccess) {
			setSuccessMessage("The image was successfully deleted.")
		} 
	}, [deleteError, deleteSuccess]);

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
		let imagesToSave = []
		let allImages = images

		allImages.forEach(imgItem => {
			if (newImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		setImagesForUpload(imagesToSave)
	}

	const handleDeleteImage = (image) => {
		if (confirm(`Are you sure you want to delete image "${image.name}"?`)) {
			setDeleteImage(image);
		}
	}

	return (
		<SRLWrapper>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
			{successMessage && <Alert variant="info">{successMessage}</Alert>}

			<Row>
				{images &&
				images.map((image, index) => (
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

							{currentUser &&
								<>
									<Checkbox
										name={image.url}
										checked={checkedItems[image.url]}
										onChange={handleChange}
									/>

									<Button onClick={() => {handleDeleteImage(image)}}>Delete</Button>
								</>	
							}
						</Card>
					</Col>				
				))}

				{currentUser && selectedImages && selectedImages.length > 0 &&		
					<Button onClick={() => handleCreateNewAlbum(selectedImages)}>Create new album</Button>
				}
			</Row>
		</SRLWrapper>
	)
}

export default AuthImageGrid
