import { act, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import App from '../App'

describe('<Navigation />', () => {	
	it('should render a logo', async () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/')
	
		await act(async () => {
			render(
				<Router history={history}>
					<App />
				</Router>
			)
		})
	
		expect(screen.getByAltText('logo')).toBeInTheDocument()	
	})
})

