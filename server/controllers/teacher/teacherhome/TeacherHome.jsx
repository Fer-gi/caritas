import { getDatabase, ref, onValue } from 'firebase/database';

const fetchUsername = async (user, setUsername) => {
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
};

const TeacherHomeController = {
  fetchUsername,
};

export default TeacherHomeController;
