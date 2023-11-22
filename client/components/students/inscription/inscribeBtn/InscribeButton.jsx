import { ref, get, update } from 'firebase/database';
import { toast } from 'react-toastify';
import { auth, db } from '../../../../../server/firebase/firebase';
import { Button } from 'react-bootstrap';

const decrementStock = async (workshopId) => {
    try {
      console.log('Decrementando stock para workshopId:', workshopId);
  
      const stockRef = ref(db, `workshops/${workshopId}/stock`);
      const stockSnapshot = await get(stockRef);
  
      if (stockSnapshot.exists()) {
        const currentStock = Number(stockSnapshot.val()?.count);
  
        const updatedStock = Math.max(0, currentStock - 1);
  
        console.log('Nuevo stock:', updatedStock);
  
        if (!isNaN(updatedStock)) {
          await update(stockRef, {
            count: updatedStock,
          });
          console.log('Stock actualizado correctamente.');
        } else {
          console.error('El nuevo stock es NaN');
        }
      }
    } catch (error) {
      console.error('Error al decrementar el stock:', error);
    }
  };
  
const InscribeButton = ({ workshopId }) => {
  const handleInscribeClick = async () => {
    try {
      const currentUser = auth.currentUser;
      const userId = currentUser.uid;

      const userRef = ref(db, `users/${userId}`);
      const userSnapshot = await get(userRef);

      if (userSnapshot.exists()) {
        const userName = userSnapshot.val().username;

        const workshopRef = ref(db, `workshops/${workshopId}`);
        const userWorkshopsRef = ref(db, `users/${userId}/workshops`);

        // Realizar todas las actualizaciones de manera asíncrona
        await Promise.all([
          update(workshopRef, {
            [`students/${userId}`]: {
              email: currentUser.email,
              userName: userName,
            },
            inscription: true,
          }),
          update(userWorkshopsRef, {
            [`${workshopId}/inscription`]: true,
          }),
          decrementStock(workshopId),
        ]);

        toast.success('Inscripción exitosa', {
          autoClose: 2000,
          onClose: () => {
            // Callback después de cerrar el mensaje de éxito
            console.log('Inscripción exitosa cerrada');
          },
        });
      } else {
        console.error('El usuario no existe');
      }
    } catch (error) {
      console.error('Error al inscribirse al taller:', error);
    }
  };

  return (
    <Button
      className='cardbtn'
      variant='danger'
      onClick={handleInscribeClick}
    >
      Inscribirse
    </Button>
  );
};

export default InscribeButton;
