import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';
import Inscription from './Incriptions';

test('Incription Component renders without errors', async () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Inscription />
      </AuthProvider>
    </BrowserRouter>
  );

  // Wait for the presence of the test ID
  await waitFor(() => {
    expect(screen.getByTestId('inscription-component')).toBeInTheDocument();
  });
});
