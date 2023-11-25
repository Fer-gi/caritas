import { getDatabase, ref, onValue } from 'firebase/database';

const fetchUsername = async (user, setUsername) => {
  try {
    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);

      onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        if (userData && userData.username) {
          setUsername(userData.username);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching username:', error);
  }
};

const StudentHomeController = {
  fetchUsername,
};

export default StudentHomeController;