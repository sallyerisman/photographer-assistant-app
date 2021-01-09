import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SimpleReactLightbox from 'simple-react-lightbox'
import { Container } from 'react-bootstrap'
import './assets/scss/app.scss'

import AuthContextProvider from './contexts/AuthContext'

import Album from './components/albums/authUser/Album'
import Albums from './components/albums/authUser/Albums'
import AuthRoute from './components/AuthRoute'
import CreateAccount from './components/userAccount/CreateAccount'
import CreateAlbumByTitle from './components/albums/authUser/CreateAlbumByTitle'
import ForgotPassword from './components/userAccount/ForgotPassword'
import Home from './components/Home'
import LogedOut from './components/userAccount/LogedOut'
import Login from './components/userAccount/Login'
import Logout from './components/userAccount/Logout'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'
import ReviewAlbum from './components/albums/user/ReviewAlbum'
import ReviewConfirmation from './components/albums/user/ReviewConfirmation'

const App = () => {
	return (
		<Router>
			<AuthContextProvider>
				<SimpleReactLightbox>
					<Navigation />

					<Container>
						<Routes>

							<Route path="/">
								<Home />
							</Route>

							<Route path="/albums/:albumId/review">
								<ReviewAlbum />
							</Route>

							<AuthRoute path="/albums">
								<AuthRoute path="/">
									<Albums />
								</AuthRoute>

								<AuthRoute path="/create">
									<CreateAlbumByTitle />
								</AuthRoute>

								<AuthRoute path="/:albumId">
									<Album />
								</AuthRoute>
							</AuthRoute>
							
							<Route path="/create-account">
								<CreateAccount />
							</Route>

							<Route path="/reset-password">
								<ForgotPassword />
							</Route>

							<Route path="/login">
								<Login />
							</Route>

							<Route path="/logout">
								<Logout />
							</Route>

							<Route path="/good-bye">
								<LogedOut />
							</Route>

							<Route path="/thank-you">
								<ReviewConfirmation />
							</Route>

							<Route path="*" element={<NotFound />} />

						</Routes>
					</Container>
				</SimpleReactLightbox>
			</AuthContextProvider>
		</Router>
	)
}

export default App
