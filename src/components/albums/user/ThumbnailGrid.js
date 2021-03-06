import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Image, Col, Row } from 'react-bootstrap'
import { ArrowCounterclockwise } from 'react-bootstrap-icons'
import { SRLWrapper } from 'simple-react-lightbox'
import { useRateImageContext } from '../../../contexts/RateImageContext'
import useApproveImages from '../../../hooks/useApproveImages'
import CustomAlert from '../../../helpers/CustomAlert'

const ThumbnailGrid = ({ images, owner, title }) => {
	const [approvedImages, setApprovedImages] = useState(null)
	const [errorMessage, setErrorMessage] = useState(false)

	const navigate = useNavigate()
	const { reviewError, reviewSuccess } = useApproveImages(approvedImages, owner, title)
	const { dislikedImages, handleDislike, handleLike, likedImages  } = useRateImageContext()

	useEffect(() => {
		if (reviewError) {
			setErrorMessage("An error occurred and your selection could not be saved.")
		} else if (reviewSuccess) {
			// Prevent duplicate upload
			setApprovedImages(null)
			navigate('/thank-you')
		} 
	}, [reviewError, reviewSuccess]);

	const handleFinalizeSelection = (likedImages) => {
		setApprovedImages(likedImages)
	}

	return (
		<SRLWrapper>
			{errorMessage && <CustomAlert status="danger" message={errorMessage}/>}
			<p className="info-ingress">Any regrets? Here you can undo any selection you made</p>

			{images && likedImages.length > 0 || images && dislikedImages.length > 0 &&
				<CustomAlert status="info" message={`You have approved ${likedImages.length}/${images.length} images`}/>
			}

			<div className="thumbnail-section">
				{likedImages.length > 0 &&
					<>
						<h2>Images I want to keep:</h2>
						<Row className="thumbnail-grid">
							{likedImages.map((image, index) => (
								<Col xs={4} md={3} lg={2} key={index}>
									<div className="thumbnail-wrapper">
										<Image className="thumnail" src={image.url} alt={image.name} fluid thumbnail/>
										<ArrowCounterclockwise className="icon icon__undo" onClick={() => handleDislike(image)} />
									</div>
								</Col>
							))}
						</Row>
					</>
				}							
					
				{dislikedImages.length > 0 &&
					<>
						<h2>Images I want to remove:</h2>
						<Row className="thumbnail-grid">
							{dislikedImages.map((image, index) => (
								<Col xs={4} md={3} lg={2} key={index}>
									<div className="thumbnail-wrapper">
										<Image src={image.url} alt={image.name} fluid thumbnail/>
										<ArrowCounterclockwise className="icon icon__undo" onClick={() => handleLike(image)} />	
									</div>
								</Col>
							))}
						</Row>
					</>
				}	
			
				<div className="button-wrapper">
					<Button className="btn button__primary" onClick={() => handleFinalizeSelection(likedImages)}>Finalize my selection</Button>
				</div>
			</div>				
		</SRLWrapper>
	)
}

export default ThumbnailGrid
