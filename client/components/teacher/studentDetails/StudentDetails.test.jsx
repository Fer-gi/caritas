/*
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import StudentDetails from './StudentDetails';

test('StudentDetails Component renders without errors', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <StudentDetails />
      </AuthProvider>
    </BrowserRouter>
  );

  // Utiliza findByTestId en lugar de waitFor + getByTestId
  const studentDetailsContainer = await screen.findByTestId('student-details-container');
  expect(studentDetailsContainer).toBeInTheDocument();
});
*/