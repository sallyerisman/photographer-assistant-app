import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import moment from 'moment'
import { useAuth } from '../contexts/AuthContext'

const useUploadImages = (images, albumId = null) => {
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(null)

	const { currentUser } = useAuth()

	useEffect(() => {
		if (images === null || images.length === 0) {
			setError(null)
			setSuccess(false)
			setUploadProgress(null)
			return;
		}

		// Reset upload status
		setError(null)
		setSuccess(false)

		// Get specific album (if specified)
		if (albumId) {
			images.forEach(image => {			
				// Create image reference and attach image to it 
				const uploadTask = storage.ref(`images/${currentUser.uid}/${image.name}`).put(image);

				// Listen for 'state changed' event
				uploadTask.on('state_changed', taskSnapshot => {
					setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
				});

				uploadTask.then(async snapshot => {
					// Get image URL
					const url = await snapshot.ref.getDownloadURL();

					// Create image object to be added to db
					const img = {
						name: image.name,
						owner: currentUser.uid,
						path: snapshot.ref.fullPath,
						size: image.size,
						type: image.type,
						url,
					};

					let allImages;

					// Find images in specific album
					await db.collection('albums').doc(albumId).get().then(doc => {
						const data = doc.data();
						allImages = data.images
					})
	
					// Add image to images array in specific album
					await db.collection('albums').doc(albumId).update({
						images: [...allImages, img],
					});	
					
					// On success, set relevant statuses 
					setError(false)
					setSuccess(true);
					setUploadProgress(null);

				}).catch(error => {
					setError(true)
				});	
			});	
		} else {
			(async () => {
				const title = `New album ${moment().format('LLL')}` 

				try {
					await db.collection('albums').add({
						images: images,
						title,
						owner: currentUser.uid,
					})
								
					// On success, set relevant statuses 
					setError(false)
					setSuccess(true)
					setUploadProgress(null)

				} catch (err) {
					setError(true)
					setSuccess(false)
					setUploadProgress(null)
				}
			})();
		}
	}, [currentUser, images]);

	return { error, success, uploadProgress }
}

export default useUploadImages
