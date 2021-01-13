import { createContext, useContext, useState } from 'react'

const RateImageContext = createContext()

const useRateImageContext = () => {
	return useContext(RateImageContext)
}

const RateImageContextProvider = (props) => {
	const [dislikedImages, setDislikedImages] = useState([])
	const [likedImages, setLikedImages] = useState([])

	const handleDislike = (image) => {
		let regretedLiked = likedImages

		if (regretedLiked.includes(image)) {
			for (let i = 0; i < regretedLiked.length; i++){     
				regretedLiked[i] === image && regretedLiked.splice(i, 1) 	
				setLikedImages(regretedLiked)	
			}
		} 

		let imagesToRemove
		if (dislikedImages.length > 0) {
			imagesToRemove = [...dislikedImages]
			
			if (imagesToRemove.includes(image)) {
				for (let i = 0; i < imagesToRemove.length; i++){     
					imagesToRemove[i] === image && imagesToRemove.splice(i, 1) 	
				}
			} 
		} else {
			imagesToRemove = []
		}

		imagesToRemove.push(image)
		setDislikedImages(imagesToRemove)

		return dislikedImages
	}

	const handleLike = (image) => {
		let regretedDisliked = dislikedImages
		if (regretedDisliked.includes(image)) {
			for (let i = 0; i < regretedDisliked.length; i++){     
				regretedDisliked[i] === image && regretedDisliked.splice(i, 1) 	
				setDislikedImages(regretedDisliked)	
			}
		} 

		let imagesToSave
		if (likedImages.length > 0) {
			imagesToSave = [...likedImages]

			if (imagesToSave.includes(image)) {
				for (let i = 0; i < imagesToSave.length; i++){     
					imagesToSave[i] === image && imagesToSave.splice(i, 1) 	
				}
			} 
		} else {
			imagesToSave = []
		}

		imagesToSave.push(image)
		setLikedImages(imagesToSave)
	}

	const contextValues = {
		dislikedImages,
		handleDislike,
		handleLike,
		likedImages
	}

	return (
		<RateImageContext.Provider value={contextValues}>
			{props.children}
		</RateImageContext.Provider>
	)
}

export { RateImageContext, useRateImageContext, RateImageContextProvider as default }
