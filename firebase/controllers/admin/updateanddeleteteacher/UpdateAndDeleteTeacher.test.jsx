import { getTeachers,updateTeacherType,deleteTeacher} from './updateanddeleteteacher'; // Asegúrate de que la ruta sea correcta
  import { getDatabase, ref, get, update, remove } from 'firebase/database';


// Mock de las funciones de Firebase
jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }));
  
  describe('Teacher Controller Tests', () => {
    // Restablecer mocks antes de cada prueba
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    // Prueba para getTeachers
    describe('getTeachers', () => {
      test('returns an array of teachers', async () => {
        // Configurar el mock de Firebase para devolver datos simulados
        const mockSnapshotWithData = {
          exists: jest.fn(() => true),
          val: jest.fn(() => ({
            userId1: {
              type: 'teacher', /* otros datos */
            },
            userId2: {
              type: 'student', /* otros datos */
            },
          })),
        };
  
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        get.mockResolvedValue(mockSnapshotWithData);
  
        // Ejecutar la función y verificar el resultado
        const result = await getTeachers();
        expect(result).toHaveLength(1); // Solo debería devolver al profesor
        expect(result[0]).toHaveProperty('type', 'teacher');
      });
  
      test('returns an empty array when no data is available', async () => {
        // Configurar el mock de Firebase para devolver datos simulados
        const mockSnapshotWithoutData = {
          exists: jest.fn(() => false),
        };
  
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        get.mockResolvedValue(mockSnapshotWithoutData);
  
        // Ejecutar la función y verificar el resultado
        const result = await getTeachers();
        expect(result).toHaveLength(0);
      });
  
      test('handles error when getting data', async () => {
        // Configurar el mock de Firebase para devolver un error simulado
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        get.mockRejectedValue(new Error('Test error'));

      // Mockear console.error
      const originalConsoleError = console.error;
      console.error = jest.fn();
        // Ejecutar la función y verificar que lanza un error
        await expect(getTeachers()).rejects.toThrow('Test error');
        expect(console.error).toHaveBeenCalledWith('Error getting data', expect.any(Error));
      });
    });
  
    // Prueba para updateTeacherType
    describe('updateTeacherType', () => {
      test('updates user type successfully', async () => {
        // Configurar el mock de Firebase para indicar una actualización exitosa
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        update.mockResolvedValue();

                 // Mockear console.log
    const originalConsolelog = console.log;
    console.log = jest.fn();

  
        // Ejecutar la función y verificar el resultado
        await updateTeacherType('userId', 'newType');
        expect(update).toHaveBeenCalledWith(expect.any(Object), {
          type: 'newType'
        });
        expect(console.log).toHaveBeenCalledWith('Tipo de usuario actualizado exitosamente');
      });
  
      test('handles error when updating user type', async () => {
        // Configurar el mock de Firebase para devolver un error simulado
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        update.mockRejectedValue(new Error('Test error'));

            // Mockear console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();
  
        // Ejecutar la función y verificar que lanza un error
        await expect(updateTeacherType('userId', 'newType')).rejects.toThrow('Test error');
        expect(console.error).toHaveBeenCalledWith('Error updating user type', expect.any(Error));
      });
    });
  
    // Prueba para deleteTeacher
    describe('deleteTeacher', () => {
      test('deletes user successfully', async () => {
        // Configurar el mock de Firebase para indicar una eliminación exitosa
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        remove.mockResolvedValue();

          // Mockear console.log
    const originalConsolelog = console.log;
    console.log = jest.fn();

  
        // Ejecutar la función y verificar el resultado
        await deleteTeacher('userId');
        expect(remove).toHaveBeenCalledWith(expect.any(Object));
        expect(console.log).toHaveBeenCalledWith('Usuario eliminado exitosamente');
      });
  
      test('handles error when deleting user', async () => {
        // Configurar el mock de Firebase para devolver un error simulado
        getDatabase.mockReturnValue({});
        ref.mockReturnValue({});
        remove.mockRejectedValue(new Error('Test error'));
  
          // Mockear console.error
    const originalConsoleError = console.error;
    console.error = jest.fn();

        // Ejecutar la función y verificar que lanza un error
        await expect(deleteTeacher('userId')).rejects.toThrow('Test error');
        expect(console.error).toHaveBeenCalledWith('Error deleting user', expect.any(Error));
      });
    });
  });