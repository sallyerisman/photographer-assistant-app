import { useState } from 'react';
import { Button, Form } from 'react-bootstrap'
import useDeleteImage from '../../hooks/useDeleteImage'

const ConfirmDelete = ({ image }) => {	
	const [deleteImage, setDeleteImage] = useState(null)

	deleteImage && useDeleteImage(deleteImage)	

	const handleSubmit = async (e) => {
		e.preventDefault()

		setDeleteImage(image.id);
	}

	return (		
		<>
			<h2>Are you sure you want to delete image '{image.name}'?</h2>

			<Form onSubmit={handleSubmit}>
				<Button type="submit">Yes, delete</Button>					
				<Button onClick={() => window.location.reload()}>No, do not delete</Button>
			</Form>
		</>		
	)
}

export default ConfirmDelete
