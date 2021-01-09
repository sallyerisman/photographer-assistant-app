import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Alert, Button, Form } from 'react-bootstrap'
import { db } from '../../../firebase'

const EditTitle = ({ album }) => {
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [newTitle, setNewTitle] = useState("")
	
	const navigate = useNavigate()

	const handleTitleChange = (e) => {
		setNewTitle(e.target.value)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (newTitle.length < 3) {
			return;
		}

		setError(false)
		setLoading(true)

		const capitalizedTitle = newTitle.charAt(0).toUpperCase() + newTitle.slice(1)

		try {
			// Update album title in database
			await db.collection('albums').doc(album.id).update({
				title: capitalizedTitle,
			});

			navigate(`/albums/${album.id}`)
			// window.location.reload()

		} catch (e) {
			setError("Something went wrong and the title could not be updated. Please try again.")
		}
	}

	return (
		<>
            {error && <Alert variant="danger">{error}</Alert>}

			<Form onSubmit={handleSubmit}>
				<Form.Group id="title">
					<Form.Label>New album title</Form.Label>
					<Form.Control type="title" onChange={handleTitleChange} placeholder={album.title} value={newTitle} autoFocus />
					
					{album.title && album.title.length < 3 && 
						<Form.Text className="text__alert">The album title must be at least 3 characters long.</Form.Text>
					}
				</Form.Group>
				<Button  disabled={loading} type="submit">Update</Button>
			</Form>
		</>
	)
}

export default EditTitle