import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import Footer from './Footer';

test('Footer Component renders without errors', () => {
  render(<Footer />);

  // Verifica que el componente se haya renderizado
  const completeFooter = screen.getByTestId('complete-footer');
  expect(completeFooter).toBeInTheDocument();

  // También puedes verificar otros elementos dentro del Footer si es necesario
  const logoFooter = screen.getByAltText('logoFooter');
  expect(logoFooter).toBeInTheDocument();
});
