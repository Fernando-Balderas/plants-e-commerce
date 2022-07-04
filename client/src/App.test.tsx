import { render, screen } from '@testing-library/react'
import GlobalFooter from './components/GlobalFooter'

test('renders footer', () => {
  render(<GlobalFooter />)
  const element = screen.getByText(/Support local farmers./i)
  expect(element).toBeInTheDocument()
})
