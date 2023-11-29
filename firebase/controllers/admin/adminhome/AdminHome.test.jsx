import AdminHomeController from './AdminHome';
import { getDatabase, ref, onValue } from 'firebase/database';
// Mockear el módulo de firebase/database
jest.mock('firebase/database');
describe('AdminHomeController', () => {
  test('fetchUsername updates state with the correct username', async () => {
    // Configurar un usuario de ejemplo
    const user = { uid: 'testUserId' };
    // Configurar el valor que se espera que devuelva el método onValue
    const expectedUsername = 'testUsername';
    const snapshot = { val: () => ({ username: expectedUsername }) };
    // Mockear getDatabase y onValue para devolver valores esperados
    getDatabase.mockReturnValue({});
    ref.mockReturnValue({});
    onValue.mockImplementationOnce((userRef, callback) => {
      callback(snapshot);
    });
    // Configurar una función de estado para simular el setState
    const setUsername = jest.fn();
    // Llamar a la función fetchUsername con el usuario y la función setState mockeada
    await AdminHomeController.fetchUsername(user, setUsername);
    // Verificar que la función de estado se llamó con el valor esperado
    expect(setUsername).toHaveBeenCalledWith(expectedUsername);
  });
  test('fetchUsername does not update state if user is falsy', async () => {
    // Configurar un usuario falsy (null en este caso)
    const user = null;
    // Mockear getDatabase y onValue para devolver valores esperados
    getDatabase.mockReturnValue({});
    ref.mockReturnValue({});
    onValue.mockImplementationOnce(() => {});
    // Configurar una función de estado para simular el setState
    const setUsername = jest.fn();
    // Llamar a la función fetchUsername con el usuario y la función setState mockeada
    await AdminHomeController.fetchUsername(user, setUsername);
    // Verificar que la función de estado no se llamó
    expect(setUsername).not.toHaveBeenCalled();
  });
});