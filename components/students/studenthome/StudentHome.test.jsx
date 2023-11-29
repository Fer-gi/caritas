// StudentHome.test.js
import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../context/authContext';
import { BrowserRouter } from 'react-router-dom';
import StudentHome from './StudentHome';

const { expect } = window;

const StudentHomeControllerMock = {
  fetchUsername: () => {},
};

test('renders StudentHome component', async () => {

  const { unmount } = render(
    <BrowserRouter>
      <AuthProvider>
        <StudentHome />
      </AuthProvider>
    </BrowserRouter>
  );

  StudentHomeControllerMock.fetchUsername = (user, setUsername) => {
    setUsername('MockedUsername');
  };


  await waitFor(() => {
    const welcomeElement = screen.getByText(/Bienvenid@/);
    expect(welcomeElement).toBeTruthy();
  });

  expect(screen.getByAltText('Avatar')).toBeTruthy();
  unmount();
});
