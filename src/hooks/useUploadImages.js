import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useUploadImages = (images, albumId = null) => {
	const { currentUser } = useAuth()
	const [error, setError] = useState(false)
	const [isSuccess, setIsSuccess] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(null)

	useEffect(() => {
		if (images === null || images.length === 0) {
			setError(null)
			setIsSuccess(false)
			setUploadProgress(null)
			return;
		}

		// Reset upload status
		setError(null)
		setIsSuccess(false)

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
					setIsSuccess(true);
					setUploadProgress(null);

				}).catch(error => {
					setError(true)
				});	
			});	
		} else {
			(async () => {
				const timestamp = new Date().toLocaleString();
				const title = `New album ${timestamp}` 
				const urlifiedTitle = title
					.toLowerCase()
					.replace(/\s+/g, '-')
					.replace(/å/g, 'a')
					.replace(/ä/g, 'a')
					.replace(/ö/g, 'o');
				const inviteLink = `${urlifiedTitle}-${Date.now()}`
	
				await db.collection('albums').add({
					images: images,
					inviteLink,
					title,
					owner: currentUser.uid,
				})
							
				// On success, set relevant statuses 
				setError(false)
				setIsSuccess(true);
				setUploadProgress(null);
			})();
		}
	}, [currentUser, images]);

	return { error, isSuccess, uploadProgress };
}

export default useUploadImages
