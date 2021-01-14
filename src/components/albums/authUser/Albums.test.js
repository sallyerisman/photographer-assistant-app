import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { createMemoryHistory } from 'history'


describe('<Albums />', () => {
	it('should return an album-id object', () => {
		const history = createMemoryHistory()
		window.history.pushState({}, '', '/albums/123456789')
		let params = {}
		const Albums = () => {
			params = useParams()
			return null;
		}

		render(
			<Router history={history}>
				<Routes>
					<Route path="/albums/:albumId">
						<Albums />
					</Route>
				</Routes>
			</Router>,
		)

		expect(params).toMatchObject({
			albumId: '123456789'
		})
	})
})

