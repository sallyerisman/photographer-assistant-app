import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useDeleteImage = image => {
	const [deleteError, setDeleteError] = useState(false)
	const [deleteSuccess, setDeleteSuccess] = useState(false)

	const { albumId } = useParams()
	const { currentUser } = useAuth()

	useEffect(() => {
		if (!image) {
			return;
		}

		(async () => {
			try {
				// Get array of images in current album in firestore
				let doc = await db.collection('albums').doc(albumId).get()
				let allImages
				if (doc.exists) {
					allImages = doc.data().images
				} else {
					setDeleteError(true)
					return;
				}

				// Remove image from image array in album
				allImages.forEach((imgItem, index) => {
					if (imgItem.url === image.url) {
						allImages.splice(index, 1) 	
					}
				})
				
				// Update array of image in current album in firestore 
				await db.collection('albums').doc(albumId).update({
					images: allImages,
				});

				// Get all albums owned by current user	
				let albumsRef = db.collection('albums').where('owner', '==', currentUser.uid)
				let allAlbums = await albumsRef.get()
				
				// Check if the image also exist in other albums
				let multipleExists = []
				for(const doc of allAlbums.docs){
					let imageArray = doc.data().images
					imageArray.map(imgItem => {
						if (imgItem.path === image.path) { 
							multipleExists.push(imgItem)	
						}
					})
				}

				if (!multipleExists.length) {
					// Delete image from storage
					await storage.ref(image.path).delete();
				}

				setDeleteSuccess(true)

			} catch (err) {
				setDeleteError(true)
				setDeleteSuccess(false)
			}
		})();
	}, [image]);
	return { deleteError, deleteSuccess }
}

export default useDeleteImage
