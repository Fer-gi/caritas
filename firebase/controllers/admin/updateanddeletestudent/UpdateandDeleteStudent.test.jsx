import { getDatabase, ref, get, update, remove } from 'firebase/database';
import {getStudents, updateStudentType,deleteStudent,} from './updateanddeletestudent'; // Update the path accordingly

  // Mock Firebase functions
  jest.mock('firebase/database', () => ({
    getDatabase: jest.fn(),
    ref: jest.fn(),
    get: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }));
  
  describe('studentController functions', () => {
    // Mock data for testing
    const mockSnapshotWithData = {
      exists: jest.fn(() => true),
      val: jest.fn(() => ({
        userId1: { type: 'student', name: 'John Doe' },
        userId2: { type: 'student', name: 'Jane Doe' },
      })),
    };
  
    const mockSnapshotWithoutData = {
      exists: jest.fn(() => false),
    };
  
    test('getStudents returns array of students', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      get.mockResolvedValue(mockSnapshotWithData);
  
      // Call the function and expect the result
      const students = await getStudents();
      expect(students).toEqual([
        { id: 'userId1', type: 'student', name: 'John Doe' },
        { id: 'userId2', type: 'student', name: 'Jane Doe' },
      ]);
    });
  
test('getStudents returns empty array when no data available', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      get.mockResolvedValue(mockSnapshotWithoutData);
  
      // Call the function and expect the result
      const students = await getStudents();
      expect(students).toEqual([]);
    });
  
    test('getStudents handles error', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      get.mockRejectedValue(new Error('Test error'));
  
      // Call the function and expect it to throw an error
      await expect(getStudents()).rejects.toThrow('Test error');
    });
  
    test('updateStudentType updates user type successfully', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      update.mockResolvedValue();
  
      // Call the function and expect it to complete without error
      await expect(updateStudentType('userId1', 'newType')).resolves.not.toThrow();
    });
  
    test('updateStudentType handles error', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      update.mockRejectedValue(new Error('Test error'));
  
      // Call the function and expect it to throw an error
      await expect(updateStudentType('userId1', 'newType')).rejects.toThrow('Test error');
    });
  
    test('deleteStudent deletes user successfully', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      remove.mockResolvedValue();
  
      // Call the function and expect it to complete without error
      await expect(deleteStudent('userId1')).resolves.not.toThrow();
    });
  
    test('deleteStudent handles error', async () => {
      // Mock the necessary functions
      getDatabase.mockReturnValue({});
      ref.mockReturnValue({});
      remove.mockRejectedValue(new Error('Test error'));
  
          // Mockear console.error
          const originalConsoleError = console.error;
          console.error = jest.fn();

      // Call the function and expect it to throw an error
      await expect(deleteStudent('userId1')).rejects.toThrow('Test error');
      expect(console.error).toHaveBeenCalledWith('Error deleting user', expect.any(Error));

    });
  });
  