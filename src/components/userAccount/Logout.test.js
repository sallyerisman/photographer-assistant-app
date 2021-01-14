import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../../App'

describe('<Logout />', () => {
	
	it('should render a log-out button', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/logout')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByRole('button')).toBeInTheDocument()	
	})

	it('should render a log-out button', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/logout')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByRole('heading', { name: 'Are you sure you want to log out?' })).toBeInTheDocument()
	})
})

