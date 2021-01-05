import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase'

const useAlbum = () => {
	const [album, setAlbum] = useState({})
	const { albumId } = useParams()
	const [loading, setLoading] = useState(true)

	// useEffect(() => {
	// 	const unsubscribe = db.collection('albums')
	// 		.where('owner', '==', currentUser.uid)
	// 		.onSnapshot(querySnapshot => {
	// 			querySnapshot.forEach(doc => {	
	// 				const documentId = doc.id;
	// 				const data = doc.data();

	// 				if (!data) {
	// 					return;
	// 				} else {
	// 					setCategory({
	// 						products: data.products && data.products.sort(),
	// 						title: data.title,
	// 						id: documentId,
	// 						urlParam: categoryUrl,
	// 					})
	// 				};

	// 				setLoading(false)
	// 			});
	// 		})
	// 	return unsubscribe
	// }, [])

	useEffect(() => {
		setLoading(true)
		db.collection('albums').doc(albumId).get().then(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})

			setLoading(false)
		})
	}, [albumId])

	return { album, loading }
}

export default useAlbum

