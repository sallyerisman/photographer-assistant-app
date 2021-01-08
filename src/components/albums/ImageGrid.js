import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Image, Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import { useAuth } from '../../contexts/AuthContext'
import useApproveImages from '../../hooks/useApproveImages'
import useDeleteImage from '../../hooks/useDeleteImage'
import useUploadImages from '../../hooks/useUploadImages'
import Checkbox from '../../helpers/Checkbox'

const ImageGrid = ({ images, owner, title }) => {
	const [approvedImages, setApprovedImages] = useState(null)
	const [checkedItems, setCheckedItems] = useState({})
	const { currentUser } = useAuth()
	const [deleteImage, setDeleteImage] = useState(null)
	const [dislikedImages, setDislikedImages] = useState([])
	const [errorMessage, setErrorMessage] = useState(false)
	const [imagesForUpload, setImagesForUpload] = useState(null)
	const [likedImages, setLikedImages] = useState([])
	const navigate = useNavigate()
	const [selectedImages, setSelectedImages] = useState([])
	const [showThumbnails, setShowThumbnails] = useState(false)
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
	
	const handleDislike = (image) => {
		let regretedLiked = likedImages;

		if (regretedLiked.includes(image)) {
			for (let i = 0; i < regretedLiked.length; i++){     
				regretedLiked[i] === image && regretedLiked.splice(i, 1) 	
				setDislikedImages(regretedLiked)	
			}
		} 

		let imagesToRemove;

		if (dislikedImages.length > 0) {
			imagesToRemove = [...dislikedImages]
		} else {
			imagesToRemove = []
		}

		imagesToRemove.push(image)

		setDislikedImages(imagesToRemove);
	}

	const handleLike = (image) => {
		let regretedDisliked = dislikedImages;

		if (regretedDisliked.includes(image)) {
			for (let i = 0; i < regretedDisliked.length; i++){     
				regretedDisliked[i] === image && regretedDisliked.splice(i, 1) 	
				setDislikedImages(regretedDisliked)	
			}
		} 

		let imagesToSave;

		if (likedImages.length > 0) {
			imagesToSave = [...likedImages]
		} else {
			imagesToSave = []
		}

		imagesToSave.push(image)

		setLikedImages(imagesToSave)
	}

	const handleCreateNewAlbum = (newImages) => {
		let imagesToSave = []
		let allImages = images

		allImages.forEach(imgItem => {
			if (newImages.includes(imgItem.url)) {
				imagesToSave.push(imgItem)
			}
		})

		currentUser ? setImagesForUpload(imagesToSave) : setApprovedImages(imagesToSave)
	}

	const handleDeleteImage = (image) => {
		if (confirm(`Are you sure you want to delete image "${image.name}"?`)) {
			setDeleteImage(image);
		}
	}

	const handleReviewSelection = () => {
		setShowThumbnails(true)
	}

	const handleFinalizeSelection = (likedImages) => {
		setApprovedImages(likedImages)
	}

	return (
		<SRLWrapper>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
			{successMessage && <Alert variant="warning">{successMessage}</Alert>}

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

							{currentUser 
								? <>
									<Checkbox
										name={image.url}
										checked={checkedItems[image.url]}
										onChange={handleChange}
									/>

									<Button onClick={() => {handleDeleteImage(image)}}>Delete</Button>
								</>
								: <div>
									<span onClick={() => handleLike(image)}>👍</span>
									<span onClick={() => handleDislike(image)}>👎</span>
								</div>							
							}
						</Card>
					</Col>				
				))}

				{currentUser && selectedImages && selectedImages.length > 0 &&		
					<Button onClick={() => handleCreateNewAlbum(selectedImages)}>Create new album</Button>
				}

				{!currentUser && dislikedImages.length + likedImages.length === images.length &&		
					<Button onClick={handleReviewSelection}>Review selection</Button>
				}		
			</Row>

			{showThumbnails &&
				<>
					<Row>
						<Col>
							{likedImages && likedImages.length > 0 &&
								<>
									<h3>Images to keep:</h3>
									{likedImages.map((image, index) => (
										<Col xs={6} md={4} key={index}>
											<Image src={image.url} alt="" fluid thumbnail/>
											<Button variant="danger" onClick={() => handleDislike(image)}>X</Button>
										</Col>
									))}
								</>
							}
						</Col>

						<Col>
							{dislikedImages && dislikedImages.length > 0 &&
								<>
									<h3>Images to remove:</h3>
									{dislikedImages.map((image, index) => (
										<Col xs={6} md={4} key={index}>
											<Image src={image.url} alt="" fluid thumbnail/>
											<Button variant="danger" onClick={() => handleLike(image)}>X</Button>	
										</Col>
									))}
								</>
							}	
						</Col>			
					</Row>

					{dislikedImages.length + likedImages.length === images.length &&
						<Button onClick={() => handleFinalizeSelection(likedImages)}>Finalize your selection</Button>
					}
				</>			
			}
		</SRLWrapper>
	)
}

export default ImageGrid
