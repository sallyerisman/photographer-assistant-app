import { useEffect, useState } from 'react'
import { db } from '../firebase'

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
			const reviewTitle = `${title} - Reviewed - -${Date.now()}` 
			const urlifiedTitle = reviewTitle
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/å/g, 'a')
				.replace(/ä/g, 'a')
				.replace(/ö/g, 'o');

			await db.collection('albums').add({
				images: images,
				inviteLink: urlifiedTitle,
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
