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

  expect(screen.getByText(/./)).toBeInTheDocument();

});
