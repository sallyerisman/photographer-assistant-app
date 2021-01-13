import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProgressBar from 'react-bootstrap/esm/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadImages from '../../../hooks/useUploadImages'
import CustomAlert from '../../../helpers/CustomAlert'

const UploadImages = () => {
	const [errorMessage, setErrorMessage] = useState(false)
	const [successMessage, setSuccessMessage] = useState(false)
	const [uploadImages, setUploadImages] = useState(null)

	const { albumId } = useParams()
	const { error, success, uploadProgress } = useUploadImages(uploadImages, albumId)

	useEffect(() => {
		if (error) {
			setErrorMessage("An error occurred and the upload could not be performed")
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

	const { getInputProps, getRootProps, isDragAccept, isDragActive, isDragReject } = useDropzone({
		accept: 'image/jpeg, image/png',
		onDrop
	});

	return (
		<>
			<div {...getRootProps()} 
				id="upload-image-dropzone-wrapper" 
				className={`
					${isDragAccept && `drag-accept`} 
					${isDragReject && `drag-reject`}
				`}>

				<input {...getInputProps()} />
				
				{isDragActive
					? isDragAccept 
						? <p className="dropzone-text">Drop to upload</p> 
						: <p className="dropzone-text">Upload failed. Accepted file formats are .jpeg and .png</p>
					: <p className="dropzone-text">Upload your files here</p>
				}

				{uploadProgress !== null && 
					<ProgressBar className="whereAreYou" variant="info" label={`${uploadProgress}%`} now={uploadProgress}/>
				}
			</div>

			{errorMessage && <CustomAlert status="danger" message={errorMessage}/>}
			{successMessage && <CustomAlert status="success" message={successMessage}/>}
		</>
	)
}

export default UploadImages
