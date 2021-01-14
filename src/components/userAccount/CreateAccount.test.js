import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../../App'

describe('<CreateAccount />', () => {
	
	it('should render a create-account heading', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/create-account')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByRole('heading', { name: 'Create a new account' })).toBeInTheDocument()	
	})
})