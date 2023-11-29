import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import StudentWorkshops from './Workshops';


test('Incription Component renders without errors', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <StudentWorkshops />
      </AuthProvider>
    </BrowserRouter>
  );

  await waitFor(() => {
    expect(screen.getByTestId('workshopStudent-component')).toBeInTheDocument();
  });
});
