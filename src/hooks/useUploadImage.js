import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useUploadImage = (image) => {
	const { albumId } = useParams()
	const { currentUser } = useAuth()
	const [error, setError] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false)
	const [uploadedImage, setUploadedImage] = useState(null);
	const [uploadProgress, setUploadProgress] = useState(null)

	useEffect(() => {
		if (!image) {
			setError(null);
			setIsSuccess(false);
			setUploadedImage(null);
			setUploadProgress(null);
			return;
		}

		// Reset upload status
		setError(null);
		setIsSuccess(false);

		// Create image reference and attach image to it 
		const uploadTask = storage.ref(`images/${currentUser.uid}/${image.name}`).put(image);

		// Listen for 'state changed' event
		uploadTask.on('state_changed', taskSnapshot => {
			setUploadProgress(Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100));
		});

		uploadTask.then(async snapshot => {
			// Get image URL
			const url = await snapshot.ref.getDownloadURL();

			// Add uploaded image to storage
			const img = {
				name: image.name,
				owner: currentUser.uid,
				path: snapshot.ref.fullPath,
				size: image.size,
				type: image.type,
				url,
			};

			// Add image to 'images' collection
			await db.collection('images').add(img)

			let images;

			// Find images in specific album
			await db.collection('albums').doc(albumId).get().then(doc => {
				const data = doc.data();
				images = data.images
			})

			// Add image to images array in specific album
			await db.collection('albums').doc(albumId).update({
				images: [...images, img],
			});

			// On success, set uploaded image and appropriate statuses 
			setError(false)
			setIsSuccess(true);
			setUploadProgress(null);
			setUploadedImage(img);

		}).catch(error => {
			setError("An error occurred and the image could not be uploaded.")
		});
	}, [currentUser, image]);

	return { error, isSuccess, uploadedImage, uploadProgress };
}

export default useUploadImage;
