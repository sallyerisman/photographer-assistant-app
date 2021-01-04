import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SimpleReactLightbox from 'simple-react-lightbox'
import { Container } from 'react-bootstrap'
import './assets/scss/app.scss'

import AuthContextProvider from './contexts/AuthContext'

import Album from './components/albums/Album'
import Albums from './components/albums/Albums'
import AuthRoute from './components/AuthRoute'
import CreateAccount from './components/CreateAccount'
import CreateAlbum from './components/albums/CreateAlbum'
import ForgotPassword from './components/ForgotPassword'
import Home from './components/Home'
import Login from './components/Login'
import Logout from './components/Logout'
import Navigation from './components/Navigation'
import NotFound from './components/NotFound'

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

							<AuthRoute path="/albums">
								<Route path="/">
									<Albums />
								</Route>

								<Route path="/create">
									<CreateAlbum />
								</Route>

								<Route path="/:albumId">
									<Album />
								</Route>
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

							<Route path="*" element={<NotFound />} />

						</Routes>
					</Container>
				</SimpleReactLightbox>
			</AuthContextProvider>
		</Router>
	)
}

export default App
