import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Check units switch', () => {
  render(<App />);

  expect(screen.getByText('Units')).toBeInTheDocument();

  const switchUnits = screen.getByTestId('unitsId');
  expect(switchUnits).toBeInTheDocument();
  expect(switchUnits).toBeChecked();
});

test('Check address input', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('Address');
  expect(input).toBeInTheDocument();
  expect(input).toBeEnabled();
});

test('Check zip code input', () => {
  render(<App />);

  const input = screen.getByPlaceholderText('ZIP');
  expect(input).toBeInTheDocument();
  expect(input).toBeEnabled();
});

test('Check action button', () => {
  render(<App />);

  const button = screen.getByText('Get forecast');
  expect(button).toBeInTheDocument();
  expect(button).toBeEnabled();
});
