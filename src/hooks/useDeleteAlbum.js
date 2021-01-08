import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useDeleteAlbum = album => {
	const { currentUser } = useAuth()
	const [deleteError, setDeleteError] = useState(false)
	const [deleteSuccess, setDeleteSuccess] = useState(false)

	useEffect(() => {
		if (!album) {
			return;
		}

		(async () => {
			let albumImages = album.images.map(image => image.path)

			// Get all albums owned by current user		
			let albumsRef = db.collection('albums').where('owner', '==', currentUser.uid)
			let allAlbums = await albumsRef.get()
			
			// Check if the album images also exist in other albums
			let multipleExists = []
			albumImages.forEach(image => {				
				for(const doc of allAlbums.docs){
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

			const intersections = albumImages.filter(img => multipleExists.indexOf(img) === -1);

			// Delete album and its content from firestore
			await db.collection('albums').doc(album.id).delete()

			intersections.forEach(async img => {
				// Delete image from storage
				await storage.ref(img).delete();
			})
			
			setDeleteSuccess(true)
		})();
	}, [album]);
	return { deleteError, deleteSuccess }
}

export default useDeleteAlbum
