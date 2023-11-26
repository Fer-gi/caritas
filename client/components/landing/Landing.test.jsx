import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Landing from './Landing';

test('Landing Component renders and redirects after delay', async () => {
  // Utiliza act para esperar a que se complete la transición de useEffect
  await act(async () => {
    render(
      <BrowserRouter>
        <Landing />
      </BrowserRouter>
    );
  });

  // Verifica que el componente se haya renderizado
  const landingContainer = screen.getByAltText('Logo');
  expect(landingContainer).toBeInTheDocument();

  // Utiliza waitFor para esperar a que ocurra la redirección
  await screen.findByTestId('welcome-page'); // Asegúrate de que este atributo esté presente en el componente de destino

  // Puedes agregar más aserciones según sea necesario
});
