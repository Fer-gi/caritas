// AddWorkshopsController.js
import { ref as dbRef, update, push, set, onValue, get } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { toast } from 'react-toastify';

// Estado inicial para los valores del taller
export const initialStateValues = {
  img: '',
  courseName: '',
  description: '',
  date: '',
  type: '',
  workshopType: '',
  time: '',
  orientation: '',
  teacherEmail: '', // Elimina el campo teacherEmail
};

// Función para encontrar el ID del profesor por correo electrónico
export const findTeacherIdByEmail = async (email) => {
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

// Función para encontrar el nombre de usuario por correo electrónico
export const findUsernameByEmail = async (email) => {
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

// Función para cargar la imagen y obtener la URL
export const handleImageUpload = async (file) => {
  const storageReference = storageRef(storage, `images/${file.name}`);

  await uploadBytes(storageReference, file);

  const imgUrl = await getDownloadURL(storageReference);

  return imgUrl;
};

// Función para manejar el envío del formulario
export const handleSubmit = async (values, image, id, setValues, setImage, setEditing, navigate) => {
  try {
    const imgUrl = image ? await handleImageUpload(image) : null;

    // Encuentra el ID del profesor por correo electrónico
    const teacherId = await findTeacherIdByEmail(values.teacherEmail);

    if (!teacherId) {
      toast.error('Profesor no encontrado con el correo proporcionado.', { autoClose: 2000 });
      return;
    }

    // Busca el nombre de usuario basado en el correo electrónico del profesor
    const teacherUsername = await findUsernameByEmail(values.teacherEmail);

    const workshopsObject = {
      ...values,
      img: imgUrl,
      teacher: {
        [teacherId]: {
          email: values.teacherEmail,
          userName: teacherUsername,
        },
      },
    };

    // Elimina teacherEmail de values
    const { teacherEmail, ...workshopData } = workshopsObject;

    if (id) {
      await update(dbRef(db, `workshops/${id}`), workshopData);
      toast.success('Taller actualizado correctamente', { autoClose: 2000 });
    } else {
      const newWorkshopRef = push(dbRef(db, 'workshops'));
      await set(newWorkshopRef, workshopData);
      toast.success('Taller creado correctamente', { autoClose: 2000 });
    }

    setValues({ ...initialStateValues });
    setImage(null);
    setEditing(false);
    navigate('/workshops');
  } catch (error) {
    console.error('Error al manejar el envío del formulario:', error);
    toast.error('Error al procesar la solicitud. Por favor, inténtalo de nuevo.', { autoClose: 2000 });
  }
};
