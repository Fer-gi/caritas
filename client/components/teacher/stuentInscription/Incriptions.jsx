import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchWorkshopDetails } from "../../../../server/firebase/controllers/teacher/inscription/inscription";
import "./Inscriptions.css";

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
    <div data-testid="inscription-component">
<<<<<<< HEAD
      <h2 style={{ color: "#cd222c", textAlign: "center" }}>
        Detalles del Taller
      </h2>
      {workshop ? (
        <div>
          <div>
            <h3 style={{ color: "#cd222c", textAlign: "center" }}>
              Lista de Estudiantes Inscritos:
            </h3>
=======
      <h2 style={{color:'#cd222d', textAlign:'center'}}>Detalles del Taller</h2>
      {workshop ? (
        <div>
          <div>
            <h3 style={{color:'#cd222d', textAlign:'center'}}>Lista de Estudiantes Inscritos:</h3>
>>>>>>> 17b80788e0df36e09cb827126e57e72fb4bf1930
            <ul>
              {workshop.students &&
                Object.entries(workshop.students).map(
                  ([studentId, student]) => (
                    <li key={studentId}>
                      {student.userName}
                      <Link
                        to={`/teacherHome/${workshopId}/students/${studentId}`}
                      >
                        <button className="ShowDetails">Ver Detalles</button>
                      </Link>
                    </li>
                  )
                )}
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
