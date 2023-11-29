import { getDatabase, ref, onValue } from 'firebase/database';

export const getUsername = async (uid) => {
  const db = getDatabase();
  const userRef = ref(db, `users/${uid}`);

  return new Promise((resolve, reject) => {
    onValue(userRef, (snapshot) => {
      const userData = snapshot.val();
      if (userData && userData.username) {
        resolve(userData.username);
      } else {
        reject(new Error('Username not found'));
      }
    });
  });
};
