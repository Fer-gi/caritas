import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import StudentInscription from './StudentInscription';

test('StudentInscription Component renders without errors', () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <StudentInscription />
      </AuthProvider>
    </BrowserRouter>
  );

  // Espera que algún texto dentro de StudentInscription esté presente
  expect(screen.getByText(/./)).toBeInTheDocument();
  // Puedes ajustar el selector según el texto o el contenido específico que esperas ver.
});
