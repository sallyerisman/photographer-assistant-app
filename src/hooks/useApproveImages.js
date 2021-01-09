import { useEffect, useState } from 'react'
import { db } from '../firebase'
import moment from 'moment'

const useApproveImages = (images, owner, title) => {
	const [reviewError, setReviewError] = useState(false)
	const [reviewSuccess, setReviewSuccess] = useState(false)

	useEffect(() => {
		if (images === null || images.length === 0) {
			setReviewError(false)
			setReviewSuccess(false)
			return;
		}

		(async () => {
			const reviewTitle = `${title} - Reviewed ${moment().format('LLL')}` 

			try {
				// Generate new album based on selection
				await db.collection('albums').add({
					images: images,
					title: reviewTitle,
					owner,
				})
							
				// On success, set relevant statuses 
				setReviewError(false)
				setReviewSuccess(true)
			} catch (err) {
				setReviewError(true)
				setReviewSuccess(false)
			}
		})();		
	}, [images]);

	return { reviewError, reviewSuccess }
}

export default useApproveImages
