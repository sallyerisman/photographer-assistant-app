import { useEffect, useState } from 'react'
import { db } from '../firebase'

const useInvitedAlbum = (inviteLink) => {
	const [foundAlbumId, setFoundAlbumId] = useState()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = db.collection('albums')
			.where('inviteLink', '==', inviteLink)
			.onSnapshot(snapshot => {
				setIsLoading(true)

				snapshot.forEach(doc => {
					setFoundAlbumId(doc.id)
				})

			setIsLoading(false)
		})

		return unsubscribe
	}, [inviteLink]);
	
	return { foundAlbumId, isLoading }
}

export default useInvitedAlbum;


