/*
import workshopController from './AddWorkshop.controller';
import { dbRef, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';

// Mockear los módulos de firebase/database y firebase/storage
jest.mock('firebase/database');
jest.mock('firebase/storage');

describe('workshopController', () => {
  test('findTeacherIdByEmail returns correct teacher ID', async () => {
    // Configurar el valor que se espera que devuelva la función get
    const snapshot = {
      val: () => ({
        teacher1: { email: 'teacher1@example.com' },
        teacher2: { email: 'teacher2@example.com' },
      }),
    };

    // Mockear dbRef y get para devolver valores esperados
    dbRef.mockReturnValue({});
    get.mockResolvedValue(snapshot);

    // Llamar a la función findTeacherIdByEmail con un email específico
    const teacherId = await workshopController.findTeacherIdByEmail('teacher1@example.com');

    // Verificar que devolvió el ID correcto
    expect(teacherId).toEqual('teacher1');
  });

  // Test similar para findUsernameByEmail y handleImageUpload según sea necesario
});
*/
