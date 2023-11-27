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
  // Renderiza el componente con vitest
  const { unmount } = render(
    <BrowserRouter>
      <AuthProvider>
        <StudentHome />
      </AuthProvider>
    </BrowserRouter>
  );

  // Mock fetchUsername para devolver un nombre de usuario específico
  StudentHomeControllerMock.fetchUsername = (user, setUsername) => {
    setUsername('MockedUsername');
  };

  // Espera a que la función fetchUsername se resuelva y el componente se actualice
  await waitFor(() => {
    // Busca el elemento por su contenido
    const welcomeElement = screen.getByText(/Bienvenid@/);

    // Verifica que el elemento esté presente
    expect(welcomeElement).toBeTruthy();
  });

  // Verifica que el resto del componente se renderice correctamente después de cargar
  expect(screen.getByAltText('Avatar')).toBeTruthy();

  // Puedes continuar con más pruebas según tus necesidades

  // Desmonta el componente después de las pruebas
  unmount();
});
