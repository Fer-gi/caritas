import '@testing-library/jest-dom';
import UpdateAndDeleteStudents from './UpdateAndDeleteStudents';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext'
import { render, act, waitFor, screen } from '@testing-library/react';

test('renders Students correctly', async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <UpdateAndDeleteStudents />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  await waitFor(() => {
    expect(screen.getByText(/Alumnos/i)).toBeInTheDocument();
  });
});
