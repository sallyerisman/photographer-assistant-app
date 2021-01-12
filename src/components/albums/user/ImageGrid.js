import { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { DashCircleFill, PlusCircleFill } from 'react-bootstrap-icons'
import { SRLWrapper } from 'simple-react-lightbox'
import { useRateImageContext } from '../../../contexts/RateImageContext'
import AlertEl from '../../../helpers/Alert'
import ThumbnailGrid from './ThumbnailGrid'

const ImageGrid = ({ images, owner, title }) => {
	const [showThumbnails, setShowThumbnails] = useState(false)
	const { dislikedImages, handleDislike, handleLike, likedImages  } = useRateImageContext()

	const handleReviewSelection = () => {
		setShowThumbnails(true)
	}

	return (
		<SRLWrapper>
			<p className="info-ingress">Please choose which images you want to keep and which to discard</p>

			{images && likedImages.length > 0 || dislikedImages.length > 0 &&
				<AlertEl status="info" message={`You have approved ${likedImages.length}/${images.length} images`}/> 
			}

			{!showThumbnails
				? <>
					<Row className="image-grid">
						{images &&
							images.map((image, index) => (
								<Col xs={6} lg={4} key={index} className="card-col">
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
								<div className="button-wrapper">
									<Button className="btn button__secondary" onClick={handleReviewSelection}>Review selection</Button>													
								</div>
							}
						</Col>
					</Row>
				</>
				: <ThumbnailGrid images={images} owner={owner} title={title}/>						
			}
		</SRLWrapper>
	)
}

export default ImageGrid
