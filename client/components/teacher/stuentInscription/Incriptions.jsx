import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
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
              {workshop.students &&
                Object.entries(workshop.students).map(([studentId, student]) => (
                  <li key={studentId}>
                    {student.userName}
                    {/* Usamos Link para crear el enlace */}
                    <Link to={`/teacherHome/${workshopId}/students/${studentId}`}>
                      <button>Ver Detalles</button>
                    </Link>
                  </li>
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