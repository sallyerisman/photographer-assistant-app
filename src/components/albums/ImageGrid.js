import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import useApproveImages from '../../hooks/useApproveImages'
import useDeleteImage from '../../hooks/useDeleteImage'
import useUploadImages from '../../hooks/useUploadImages'
import Checkbox from '../../helpers/Checkbox'

const ImageGrid = (album) => {
	const { images, owner, title } = album
	const [approvedImages, setApprovedImages] = useState(null)
	const [checkedItems, setCheckedItems] = useState({})
	const { currentUser } = useAuth()
	const [errorMessage, setErrorMessage] = useState(false)
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const [deleteImage, setDeleteImage] = useState(null)
	const navigate = useNavigate()
	const [selectedImages, setSelectedImages] = useState([])
	const [successMessage, setSuccessMessage] = useState(false)
	const { reviewError, reviewSuccess } = useApproveImages(approvedImages, owner, title)
	const { error, isSuccess } = useUploadImages(imagesForUpload)
	const { deleteError, deleteSuccess } = useDeleteImage(deleteImage);

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the album could not be created.")
		} else if (isSuccess) {
			// Prevent duplicate upload
			setImagesForUpload(null);
			navigate('/albums')
		} 
	}, [error, isSuccess]);

	
	useEffect(() => {
		if (deleteError) {
			setErrorMessage("An error occurred and the album could not be created.")
		} else if (deleteSuccess) {
			setSuccessMessage("The image was successfully deleted.")
		} 
	}, [deleteError, deleteSuccess]);

	useEffect(() => {
		if (reviewError) {
			setErrorMessage("An error occurred and your selection could not be saved.")
		} else if (reviewSuccess) {
			// Prevent duplicate upload
			setApprovedImages(null);
			navigate('/thank-you')
		} 
	}, [reviewError, reviewSuccess]);

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

		currentUser ? setImagesForUpload(filteredImages) : setApprovedImages(filteredImages)
	}

	const handleDeleteImage = (image) => {
		if (confirm(`Are you sure you want to delete image "${image.name}"?`)) {
			setDeleteImage(image);
		}
	}

	return (
		<SRLWrapper>
			{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}
			{successMessage && (<Alert variant="warning">{successMessage}</Alert>)}

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
						<Button onClick={() => {handleDeleteImage(image)}}>Delete</Button>
					</Col>				
				))}

				{selectedImages && selectedImages.length > 0 &&		
					<Button onClick={() => handleCreateNewAlbum(selectedImages)}>{currentUser ? "Create new album" : "Finalize your selection"}</Button>
				}		
			</Row>
		</SRLWrapper>
	)
}

export default ImageGrid
