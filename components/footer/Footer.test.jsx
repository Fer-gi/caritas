import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import Footer from './Footer';

test('Footer Component renders without errors', () => {
  render(<Footer />);

  const completeFooter = screen.getByTestId('complete-footer');
  expect(completeFooter).toBeInTheDocument();

  const logoFooter = screen.getByAltText('logoFooter');
  expect(logoFooter).toBeInTheDocument();
});
