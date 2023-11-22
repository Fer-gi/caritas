// Inscription.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ref, get } from 'firebase/database';
import { db } from '../../../../server/firebase/firebase';

const Inscription = () => {
  const { id: workshopId } = useParams();
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const workshopRef = ref(db, `workshops/${workshopId}`);
        const workshopSnapshot = await get(workshopRef);

        if (workshopSnapshot.exists()) {
          setWorkshop(workshopSnapshot.val());
        } else {
          setWorkshop(null);
        }
      } catch (error) {
        console.error('Error al obtener taller:', error);
      }
    };

    fetchWorkshop();
  }, [workshopId]);

  return (
    <div>
      <h1>Detalles del Taller</h1>
      {workshop ? (
        <div>
          <div>
            <h3>Lista de Estudiantes Inscritos:</h3>
            <ul>
              {Object.values(workshop.students).map((student) => (
                <li key={student.userName}>{student.userName}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>No se encontró el taller</p>
      )}
    </div>
  );
};

export default Inscription;
