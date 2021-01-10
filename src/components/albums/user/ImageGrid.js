import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Image, Card, Col, Row } from 'react-bootstrap'
import { DashCircleFill, PlusCircleFill, XSquareFill } from 'react-bootstrap-icons'
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
			setApprovedImages(null)
			setInsufficientSelection(false)
			navigate('/thank-you')
		} 
	}, [reviewError, reviewSuccess]);
	
	const handleDislike = (image) => {
		let regretedLiked = likedImages

		if (regretedLiked.includes(image)) {
			for (let i = 0; i < regretedLiked.length; i++){     
				regretedLiked[i] === image && regretedLiked.splice(i, 1) 	
				setDislikedImages(regretedLiked)	
			}
		} 

		let imagesToRemove
		if (dislikedImages.length > 0) {
			imagesToRemove = [...dislikedImages]
			
			if (imagesToRemove.includes(image)) {
				for (let i = 0; i < imagesToRemove.length; i++){     
					imagesToRemove[i] === image && imagesToRemove.splice(i, 1) 	
				}
			} 
		} else {
			imagesToRemove = []
		}

		imagesToRemove.push(image)
		setDislikedImages(imagesToRemove);
	}

	const handleLike = (image) => {
		let regretedDisliked = dislikedImages
		if (regretedDisliked.includes(image)) {
			for (let i = 0; i < regretedDisliked.length; i++){     
				regretedDisliked[i] === image && regretedDisliked.splice(i, 1) 	
				setDislikedImages(regretedDisliked)	
			}
		} 

		let imagesToSave
		if (likedImages.length > 0) {
			imagesToSave = [...likedImages]

			if (imagesToSave.includes(image)) {
				for (let i = 0; i < imagesToSave.length; i++){     
					imagesToSave[i] === image && imagesToSave.splice(i, 1) 	
				}
			} 
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
			<Row>
				<Col>
					{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
					{images && likedImages && likedImages.length > 0 &&
						<div className="info-ingress">{`You have approved ${likedImages.length}/${images.length} images`}</div>
					}
					{images && dislikedImages && dislikedImages.length > 0 &&
						<div className="info-ingress">{`You have rejected ${dislikedImages.length}/${images.length} images`}</div>
					}
				</Col>
			</Row>

			{!showThumbnails
				? <>
					<Row className="image-grid">
						{images &&
						images.map((image, index) => (
							<Col xs={6} lg={4} key={index}>
								<Card className="card card__photo">
									<a href={image.url} title="View image in lightbox" data-attribute="SRL">
										<Card.Img variant="top" src={image.url} title={image.name} />
									</a>
									<Card.Body>
										<div className="rate-icon-wrapper">
											<DashCircleFill className={`${dislikedImages && dislikedImages.includes(image) ? "icon icon__dislike selected" : "icon icon__dislike"}`} onClick={() => handleDislike(image)} />
											<PlusCircleFill className={`${likedImages && likedImages.includes(image) ? "icon icon__like selected" : "icon icon__like"}`} onClick={() => handleLike(image)} />
										</div>
									</Card.Body>
								</Card>
							</Col>				
						))}
					</Row>
					<Row>
						<Col>
							{dislikedImages.length + likedImages.length === images.length &&		
								<Button className="btn button__primary" onClick={handleReviewSelection} variant="info">Review selection</Button>
							}
						</Col>
					</Row>
				</>
				: <Row className="thumbnail-grid">
					{likedImages && likedImages.length > 0 &&
						<>
							<h2>Images to keep:</h2>
							{likedImages.map((image, index) => (
								<Col xs={6} md={4} key={index}>
									<Image src={image.url} alt="" fluid thumbnail/>
									<XSquareFill className="icon icon__remove" onClick={() => handleDislike(image)} />
								</Col>
							))}
						</>
					}							
						
					{dislikedImages && dislikedImages.length > 0 &&
						<>
							<h2>Images to remove:</h2>
							{dislikedImages.map((image, index) => (
								<Col xs={6} md={4} key={index}>
									<Image src={image.url} alt="" fluid thumbnail/>
									<XSquareFill className="icon icon__remove" onClick={() => handleLike(image)} />	
								</Col>
							))}
						</>
					}	
		
					<Button className="btn button__primary" onClick={() => handleFinalizeSelection(likedImages)} variant="info">Finalize your selection</Button>
				</Row>					
			}
		</SRLWrapper>
	)
}

export default ImageGrid
