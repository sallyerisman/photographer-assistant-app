import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../../App'

describe('<ForgotPassword />', () => {
	
	it('should render reset-password button', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/reset-password')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByRole('button', { name: 'Reset password' })).toBeInTheDocument()	
	})
})