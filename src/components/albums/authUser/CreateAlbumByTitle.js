import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Col, Form, Row } from 'react-bootstrap'
import { db } from '../../../firebase'
import { useAuth } from '../../../contexts/AuthContext'

const CreateAlbumByTitle = () => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [title, setTitle] = useState("")

	const { currentUser } = useAuth()
	const navigate = useNavigate()

	const handleTitleChange = (e) => {
		setTitle(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (title.length < 3) {
			return;
		}

		setError(false)
		setLoading(true)

		const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1)
		
		try {
			setLoading(true)

			// Add album to the 'albums' collection 
			await db.collection('albums').add({
				images: [],
				title: capitalizedTitle,
				owner: currentUser.uid,
			})

			setLoading(false)
			setTitle("");
			navigate('/albums')

		} catch (e) {
			setError("An error occurred and it was not possible to create your new album. Please try again.")
			setLoading(false)
		}		
	}

	return (
		<Row>
			<Col md={{ span: 8, offset: 2 }} lg={{ span: 6, offset: 3 }}>
				<h1>Create a new album</h1>

				{error && <Alert variant="danger">{error}</Alert>}

				<Form onSubmit={handleSubmit} className="form form__create-album">
					<Form.Group id="title">
						<Form.Control type="title" onChange={handleTitleChange} value={title} placeholder="Enter your album title" autoFocus required />

						{title && title.length < 3 && 
							<Form.Text className="text__alert">The album title must consist of at least 3 characters.</Form.Text>
						}

					</Form.Group>
					<Button disabled={loading} className="btn button__primary" type="submit">Create</Button>
				</Form>
			</Col>
		</Row>
	)
}

export default CreateAlbumByTitle
