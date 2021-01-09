import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Image, Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'
import useApproveImages from '../../../hooks/useApproveImages'

const ImageGrid = ({ images, owner, title }) => {
	const [approvedImages, setApprovedImages] = useState(null)
	const [dislikedImages, setDislikedImages] = useState([])
	const [errorMessage, setErrorMessage] = useState(false)
	const [likedImages, setLikedImages] = useState([])
	const [showThumbnails, setShowThumbnails] = useState(false)

	const navigate = useNavigate()
	const { reviewError, reviewSuccess } = useApproveImages(approvedImages, owner, title)

	useEffect(() => {
		if (reviewError) {
			setErrorMessage("An error occurred and your selection could not be saved.")
		} else if (reviewSuccess) {
			// Prevent duplicate upload
			setApprovedImages(null);
			navigate('/thank-you')
		} 
	}, [reviewError, reviewSuccess]);
	
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

	const handleReviewSelection = () => {
		setShowThumbnails(true)
	}

	const handleFinalizeSelection = (likedImages) => {
		setApprovedImages(likedImages)
	}

	return (
		<SRLWrapper>
			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

			<Row>
				{images && likedImages && likedImages.length > 0 &&
					<div>{`You have liked ${likedImages.length}/${images.length}`}</div>
				}
			</Row>

			{!showThumbnails
					? <Row>
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

									<div>
										<span onClick={() => handleLike(image)}>👍</span>
										<span onClick={() => handleDislike(image)}>👎</span>
									</div>							
								</Card>
							</Col>				
						))}

						{dislikedImages.length + likedImages.length === images.length &&		
							<Button onClick={handleReviewSelection}>Review selection</Button>
						}		
					</Row>
					: <>
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
