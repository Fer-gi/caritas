// AdminHome.test.js
import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../context/authContext';
import { BrowserRouter } from 'react-router-dom';
import AdminHome from './AdminHome';

const { expect } = window;

const AdminHomeControllerMock = {
  fetchUsername: () => {},
};

test('renders AdminHome component', async () => {
    
  const { unmount } = render(
    <BrowserRouter>
      <AuthProvider>
        <AdminHome />
      </AuthProvider>
    </BrowserRouter>
  );

  AdminHomeControllerMock.fetchUsername = (user, setUsername) => {
    setUsername('MockedUsername');
  };

  await waitFor(() => {
    const welcomeElement = screen.getByText(/Bienvenid@/);
    expect(welcomeElement).toBeTruthy();
  });
  expect(screen.getByAltText('Avatar')).toBeTruthy();
  unmount();
});
