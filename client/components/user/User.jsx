import { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";

import { getUser } from '../../firebase/firebaseRead';

const StudentComponent = () => {
    const [student, setStudent] = useState(null)
    const{id} = useParams()

    useEffect(() => {
        const fetchStudent= async () => {
            try{
                const studentDb = await getUser(id)
                console.log(studentDb)
                setStudent(studentDb)
            } catch (error) {
                console.error ('Error al obtener los usuarios', error)
            }
        }

        fetchStudent()
    }, [id])

    if (!student) {
        return <div>Cargando usuario...</div>
    }

    return (
        <div>
            <p>Nombre: {student.name}</p>
            <p>Teléfono: {student.telephone}</p>
            <p>Email: {student.email}</p>
            <ul>
        {student.workshops.map((workshop) => (
          <li key={workshop.id}>{workshop.name}</li>
        ))}
      </ul>
        </div>
    )
}

export default StudentComponent