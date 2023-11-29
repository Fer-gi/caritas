import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import StudentList from './StudentList';

test('StudentList Component renders without errors', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <StudentList />
      </AuthProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByTestId('studentlist-student-component')).toBeInTheDocument();
  });
});
