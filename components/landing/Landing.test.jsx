import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

test('Landing Component renders and redirects after delay', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
  });

  const landingContainer = screen.getByAltText('Logo');
  expect(landingContainer).toBeInTheDocument();

  await screen.findByTestId('welcome-page'); 
});
