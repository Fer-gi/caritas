import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";
import { getWorkshopByStudentRegistered } from '../../firebase/firebaseRead';

export const MyWorkshopsComponent = () =>{
    const [myWorkshops, setMyWorkshops] = useState(null);
    const {workshopId} = useParams ();

    useEffect(() => {
        const fetchWorkshops = async () => {
            try {
            const workshopsDB = await getWorkshopByStudentRegistered(workshopId);
            setMyWorkshops(workshopsDB)  
        
            }catch (error){
                console.error(' error al obtener los talleres',error);
        }
    };

    fetchWorkshops();

    }, [workshopId])

    if (!myWorkshops) {
        return <div>Cargando Talleres...</div>;
    }

    return (
      <>
      <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link>
      </Card.Body>
    </Card>
      </>
    )
}
