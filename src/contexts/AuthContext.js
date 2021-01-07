import { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import PuffLoader from 'react-spinners/PuffLoader'

const AuthContext = createContext()

const useAuth = () => {
	return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
	const [currentUser, setCurrentUser] = useState(null)
	const [loading, setLoading] = useState(true)

	const createAccount = (email, password) => {
		return auth.createUserWithEmailAndPassword(email, password)
	}

	const login = (email, password) => {
		return auth.signInWithEmailAndPassword(email, password)
	}

	const logout = () => {
		return auth.signOut()
	}

	const resetPassword = (email) => {
		return auth.sendPasswordResetEmail(email)
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(user => {
			// Auth state change (user logging in/out)
			setCurrentUser(user)
			setLoading(false)
		})

		return unsubscribe
	}, [])

	const contextValues = {
		createAccount,
		currentUser,
		loading,
		login,
		logout,
		resetPassword,
	}

	return (
		<AuthContext.Provider value={contextValues}>
			{loading && <PuffLoader className="loading-spinner"/>}
			{!loading && props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, useAuth, AuthContextProvider as default }
