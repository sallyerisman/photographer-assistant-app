import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useAlbum = (albumId) => {
	const [album, setAlbum] = useState()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true);

		// Snapshot listener for specific album
		const unsubscribe = db.collection('albums').doc(albumId)
		.onSnapshot(doc => {
			setAlbum({
				id: doc.id,
				...doc.data(),
			})
		});

		setLoading(false)

		return unsubscribe;
	}, [albumId]);
	
	return { album, loading }
}

export default useAlbum;


