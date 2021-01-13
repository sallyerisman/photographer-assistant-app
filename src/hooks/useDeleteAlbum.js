import { useEffect, useState } from 'react'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useDeleteAlbum = album => {
	const [deleteError, setDeleteError] = useState(false)
	const [deleteSuccess, setDeleteSuccess] = useState(false)

	const { currentUser } = useAuth()

	useEffect(() => {
		if (!album) {
			return;
		}

		let isCancelled = false;

		(async () => {
			let albumImages = album.images.map(image => image.path)

			try {
				// Get all albums owned by current user		
				let albumsRef = await db.collection('albums').where('owner', '==', currentUser.uid).get()
				
				// Check if the album images also exist in other albums
				let multipleExists = []
				albumImages.forEach(image => {				
					for(const doc of albumsRef.docs){
						if (doc.id === album.id) {
							continue
						} else {
							let imageArray = doc.data().images

							imageArray.forEach(arrayItem => {
								if (arrayItem.path === image) {
									multipleExists.push(image)
								}
							})
						}
					}
				})

				const intersections = albumImages.filter(img => multipleExists.indexOf(img) === -1)

				// Delete album and its content from firestore
				await db.collection('albums').doc(album.id).delete()

				intersections.forEach(async img => {
					// Delete image from storage
					await storage.ref(img).delete();
				})
				
				setDeleteSuccess(true);
			} catch (err) {
				setDeleteError(true)
				setDeleteSuccess(false)
			}
		})();

		return () => {
			isCancelled = true;
		};

	}, [album]);
	return { deleteError, deleteSuccess }
}

export default useDeleteAlbum
