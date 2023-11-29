import '@testing-library/jest-dom';
import UpdateAndDeleteTeachers from './UpdateAndDeleteTeacher';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext'
import { render, act, waitFor, screen } from '@testing-library/react';

test('renders teachers correctly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <UpdateAndDeleteTeachers />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  await waitFor(() => {
    expect(screen.getByText(/Profesores/i)).toBeInTheDocument();
  });
});
