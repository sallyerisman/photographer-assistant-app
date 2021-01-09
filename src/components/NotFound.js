import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { ArrowLeft, XOctagonFill } from 'react-bootstrap-icons'

const NotFound = () => {
	return (
		<Row>
			<Col className="page page__not-found">
				<XOctagonFill className="icon icon__not-found" />
				<h1>The page you requested could not be found</h1>				

				<Link to="/albums" className="link text-link">
					<ArrowLeft className="icon icon__arrow-left" />
					Go back
				</Link>				
			</Col>
		</Row>
	)
}

export default NotFound
