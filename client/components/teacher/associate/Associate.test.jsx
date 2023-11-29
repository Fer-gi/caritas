import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import AssociateStudent from './AssociateStudent';

test('AssociateStudent Component renders without errors', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <AssociateStudent />
      </AuthProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByTestId('associate-student-component')).toBeInTheDocument();
  });
});
