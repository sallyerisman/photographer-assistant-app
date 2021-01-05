import { Card, Col, Row } from 'react-bootstrap'
import { SRLWrapper } from 'simple-react-lightbox'

const ImageGrid = ({ images }) => {

	console.log("What is images:", images)
	return (
		<SRLWrapper>
			<Row>
				<Col>
					{images.map(image => (
						<Card key={image.url}>
							<a href={image.url} title="View image in lightbox" data-attribute="SRL">
								<Card.Img variant="top" src={image.url} title={image.name} />
							</a>
							<Card.Body>
								<Card.Text>
									{image.name} ({Math.round(image.size/1024)} kb)
								</Card.Text>
							</Card.Body>
						</Card>
					))}
				</Col>
			</Row>
		</SRLWrapper>
	)
}

export default ImageGrid
