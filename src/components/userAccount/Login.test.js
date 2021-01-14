import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../../App'

describe('<Login />', () => {
	
	it('should render a log-in form', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/login')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByRole('form')).toBeInTheDocument()	
	})
})