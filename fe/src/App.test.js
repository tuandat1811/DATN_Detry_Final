import { render, screen } from '@testing-library/react'; //import render and screen from testing-library/react
import App from './App'; //import App component

test('renders learn react link', () => {
  render(<App />); //render App component
  const linkElement = screen.getByText(/learn react/i); //get element that contains text "learn react"
  expect(linkElement).toBeInTheDocument(); //assert that the element is in the document
});
