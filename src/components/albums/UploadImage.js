import { useCallback, useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadImage from '../../hooks/useUploadImage'

const UploadImage = () => {
	const [errorMessage, setErrorMessage] = useState(false)
	const [successMessage, setSuccessMessage] = useState(false)
	const [uploadImage, setUploadImage] = useState(null)
	const { error, isSuccess, uploadProgress } = useUploadImage(uploadImage)

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the image could not be uploaded.")
		} else if (isSuccess) {
			setSuccessMessage("The image was successfully uploaded.")
			// Prevent duplicate upload
			setUploadImage(null);
		} 
	}, [error, isSuccess]);

	const onDrop = useCallback(acceptedFiles => {
		if (acceptedFiles.length === 0) {
			return;
		}

		setUploadImage(acceptedFiles[0]);
	}, []);

	const { acceptedFiles, getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
		accept: 'image/jpeg, image/png',
		onDrop
	});

	return (
		<div {...getRootProps()} 
			id="upload-image-dropzone-wrapper" 
			className={`
				${isDragAccept 
					? `drag-accept`
					: ``
				} 
				${isDragReject 
					? `drag-reject`
					: ``
				}
			`}>

			<input {...getInputProps()} />
			
			{isDragActive
				? isDragAccept 
					? <p>Drop to upload</p> 
					: <p>Upload failed. Accepted file formats are .jpeg and .png</p>
				: <p>Upload your files here</p>
			}

			{acceptedFiles && (
				<div className="accepted-files mt-2">
					<ul className="list-unstyled">
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

export default UploadImage
