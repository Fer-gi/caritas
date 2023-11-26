import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/authContext';
import Caritasnavbar from './Navbar';

test('Caritasnavbar Component renders and handles events', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <Caritasnavbar />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  const logoNav = screen.getByAltText('logo');
  expect(logoNav).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(logoNav);
  });

  const logoutButton = screen.getByText('Cerrar Sesión');
  expect(logoutButton).toBeInTheDocument();

  await act(async () => {
    fireEvent.click(logoutButton);
  });
});
