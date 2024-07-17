import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HomeHeader } from '../HomeHeader'

describe('@components/Header/HomeHeader', () => {
  it('should render the correct logo, title and description', () => {
    render(<HomeHeader />)
    const loremIpsum = `Lorem ipsum dolor sit amet consectetur. A volutpat adipiscing placerat turpis magna sem tempor amet faucibus. Arcu praesent viverra pellentesque nisi quam in rhoncus.`

    const logoIcon = screen.getByTestId('cycle-map-logo')
    const logoText = screen.getByText('CycleMap')
    const description = screen.getByText(loremIpsum)

    expect(logoIcon).toContainHTML('<title>CycleMap logo</title>')
    expect(logoText).toBeInTheDocument()
    expect(description).toBeInTheDocument()
  })
})
