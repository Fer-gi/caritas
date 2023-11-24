
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchWorkshopDetails } from '../../../../server/firebase/controllers/teacher/inscription/inscription';

const Inscription = () => {
  const { id: workshopId } = useParams();
  const [workshop, setWorkshop] = useState(null);

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const workshopDetails = await fetchWorkshopDetails(workshopId);
        setWorkshop(workshopDetails);
      } catch (error) {
        // Handle error
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
