/* 
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import Myworkshops from './Myworkshops';

test('Myworkshops Component renders without errors', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Myworkshops />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  expect(screen.getByText(/Mis Talleres/i)).toBeInTheDocument();
});

*/