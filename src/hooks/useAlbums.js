import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useAlbums = () => {
	const [albums, setAlbums] = useState([])
	const [loading, setLoading] = useState(true)

	const { currentUser } = useAuth()

	useEffect(() => {
		// Snapshot listener for all of the user's albums in firebase
		const unsubscribe = db.collection('albums')
			.where('owner', '==', currentUser.uid)
			.onSnapshot(snapshot => {
				setLoading(true)
				const snapshotAlbums = []

				snapshot.forEach(doc => {
					snapshotAlbums.push({
						id: doc.id,
						...doc.data()
					})
				})

			// Sort the albums by title
			snapshotAlbums.sort(function(a, b){
				let titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase()
				if (titleA < titleB) 
					return -1 
				if (titleA > titleB)
					return 1
				return 0 
			})

			setAlbums(snapshotAlbums)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	return { albums, loading }
}

export default useAlbums
