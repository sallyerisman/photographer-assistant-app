import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../../../hooks/useUploadImages'

const UploadImages = () => {
	const [errorMessage, setErrorMessage] = useState(false)
	const [successMessage, setSuccessMessage] = useState(false)
	const [uploadImages, setUploadImages] = useState(null)

	const { albumId } = useParams()
	const { error, success, uploadProgress } = useUploadImages(uploadImages, albumId)

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the upload could not be performed.")
		} else if (success) {
			setSuccessMessage("The upload was successful!")
			
			// Prevent duplicate upload
			setUploadImages(null);
		} 
	}, [error, success]);

	const onDrop = useCallback(acceptedFiles => {
		if (acceptedFiles.length === 0) {
			return;
		}

		setUploadImages(acceptedFiles);
	}, []);

	const { acceptedFiles, getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
		accept: 'image/jpeg, image/png',
		onDrop
	});

	return (
		<div {...getRootProps()} 
			id="upload-image-dropzone-wrapper" 
			className={`
				${isDragAccept && `drag-accept`} 
				${isDragReject && `drag-reject`}
			`}>

			<input {...getInputProps()} />
			
			{isDragActive
				? isDragAccept 
					? <p>Drop to upload</p> 
					: <p>Upload failed. Accepted file formats are .jpeg and .png</p>
				: <p>Upload your files here</p>
			}

			{acceptedFiles && (
				<div className="accepted-files">
					<ul>
						{acceptedFiles.map(file => (
							<li key={file.name}><small>{file.name} ({Math.round(file.size / 1024)} kb)</small></li>
						))}
					</ul>
				</div>
			)}

			{uploadProgress !== null && (<ProgressBar variant="info" label={`${uploadProgress}%`} now={uploadProgress} />)}

			{errorMessage && (<Alert variant="danger">{errorMessage}</Alert>)}
			{successMessage && (<Alert variant="success">{successMessage}</Alert>)}
		</div>
	)
}

export default UploadImages
