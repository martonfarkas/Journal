import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import App from "./App.jsx"
import { BrowserRouter } from "react-router-dom"
import { describe, it, expect } from 'vitest'
import user from '@testing-library/user-event'

describe("App Component", () => {
    let container

    beforeEach(() => {
        container = render(
            <BrowserRouter>
              <App />
            </BrowserRouter>
          ).container
    })
  it("Renders the Home component", () => {
    expect(container.querySelector('h2')).not.toBeNull()
    expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
    // expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Journal Entries')
  })

it("Renders the CategorySelection component when New Entry is clicked", async () => {
    await user.click(screen.getByText('New Entry'))

    expect(container.querySelector('h3')).not.toBeNull()
    expect(container.querySelector('h3')).toHaveTextContent('Please select a category:')
    // expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Journal Entries')
  })
})