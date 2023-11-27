import { render } from '@testing-library/react';
import Workshops from './Workshops';
import { test } from 'vitest';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../../context/authContext';

test('renders Workshops component without crashing', () => {
  render(
  <BrowserRouter>
    <AuthProvider>
      <Workshops />
    </AuthProvider>
  </BrowserRouter>);
});
