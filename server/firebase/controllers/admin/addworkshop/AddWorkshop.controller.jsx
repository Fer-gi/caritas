// workshopController.js
import { ref as dbRef, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../firebase';


const findTeacherIdByEmail = async (email) => {
  const teachersRef = dbRef(db, 'users');
  const snapshot = await get(teachersRef);

  for (const teacherKey in snapshot.val()) {
    if (Object.prototype.hasOwnProperty.call(snapshot.val(), teacherKey)) {
      const teacherData = snapshot.val()[teacherKey];
      if (teacherData.email === email) {
        return teacherKey;
      }
    }
  }

  return null;
};

const findUsernameByEmail = async (email) => {
  const usersRef = dbRef(db, 'users');
  const snapshot = await get(usersRef);

  for (const userKey in snapshot.val()) {
    if (Object.prototype.hasOwnProperty.call(snapshot.val(), userKey)) {
      const userData = snapshot.val()[userKey];
      if (userData.email === email) {
        return userData.username;
      }
    }
  }

  return null;
};

const handleImageUpload = async (file) => {
  const storageReference = storageRef(storage, `images/${file.name}`);

  await uploadBytes(storageReference, file);

  const imgUrl = await getDownloadURL(storageReference);

  return imgUrl;
};

const workshopController = {
  findTeacherIdByEmail,
  findUsernameByEmail,
  handleImageUpload,
};

export default workshopController;
