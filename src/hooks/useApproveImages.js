import { useEffect, useState } from 'react'
import { db } from '../firebase'
import moment from 'moment'

const useApproveImages = (images, owner, title) => {
	const [reviewError, setReviewError] = useState(false)
	const [reviewSuccess, setReviewSuccess] = useState(false)

	useEffect(() => {
		if (images === null || images.length === 0) {
			setReviewError(null)
			setReviewSuccess(false)
			return;
		}

		(async () => {
			const reviewTitle = `${title} - Reviewed ${moment().format('LLL')}` 
			const urlifiedTitle = reviewTitle
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/å/g, 'a')
				.replace(/ä/g, 'a')
				.replace(/ö/g, 'o');
			const inviteLink = `${urlifiedTitle}-${Date.now()}`

			await db.collection('albums').add({
				images: images,
				inviteLink,
				title: reviewTitle,
				owner,
			})
						
			// On success, set relevant statuses 
			setReviewError(false)
			setReviewSuccess(true);
		})();
		
	}, [images]);

	return { reviewError, reviewSuccess };
}

export default useApproveImages
