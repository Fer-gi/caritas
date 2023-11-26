import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddWorkshops from './AddWorkshops';
import { test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';

test('submits form successfully', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <AddWorkshops />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  const file = new File([''], 'test-image.png', { type: 'image/png' });

  await act(async () => {
    fireEvent.change(screen.getByLabelText('Imagen'), { target: { files: [file] } });
    fireEvent.change(screen.getByLabelText('Nombre del curso'), { target: { value: 'Curso de prueba' } });
    fireEvent.change(screen.getByLabelText('Descripción del curso'), { target: { value: 'Descripción de prueba' } });
    fireEvent.change(screen.getByLabelText('Fecha del curso'), { target: { value: '2023-12-01' } });
    fireEvent.change(screen.getByLabelText('Tipo'), { target: { value: 'Online' } });
    fireEvent.change(screen.getByLabelText('Tipo de taller'), { target: { value: 'Obligatorio' } });
    fireEvent.change(screen.getByLabelText('Hora'), { target: { value: '14:00' } });
    fireEvent.change(screen.getByLabelText('Correo del Profesor'), { target: { value: 'profesor@example.com' } });
    // Add more simulated user input...
  });

  await act(async () => {
    fireEvent.click(screen.getByText('Submit'));
    // Add assertions for the expected behavior after submission
  });
});
