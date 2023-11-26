// TeacherHome.test.jsx
import { test } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider } from '../../../context/authContext';
import { BrowserRouter } from 'react-router-dom';
import TeacherHome from './TeacherHome';

const { expect } = window;

test('renders TeacherHome component', async () => {
  // Renderiza el componente con vitest
  const { unmount } = render(
    <BrowserRouter>
      <AuthProvider>
        <TeacherHome />
      </AuthProvider>
    </BrowserRouter>
  );

  // Espera a que el componente se actualice
  await waitFor(() => {
    // Busca el elemento por su contenido
    const welcomeElement = screen.getByText(/Bienvenid@/);

    // Verifica que el elemento esté presente
    expect(welcomeElement).toBeTruthy();
  });

  // Verifica que el resto del componente se renderice correctamente después de cargar
  expect(screen.getByAltText('Avatar')).toBeTruthy();
  expect(screen.getByText('Alumnos')).toBeTruthy();
  expect(screen.getByText('Talleres')).toBeTruthy();

  // Puedes agregar más pruebas según tus necesidades

  // Desmonta el componente después de las pruebas
  unmount();
});
