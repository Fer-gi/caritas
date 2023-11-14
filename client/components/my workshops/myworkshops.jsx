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
      {myWorkshops.map((myworkshop) => (
      <Card.Body key={myworkshop.id}>
        <Card.Title>{myworkshop.name}</Card.Title>
        <Card.Subtitle className="">plazas: {myworkshop.spots}</Card.Subtitle>
        <Card.Text className= "location">
         {myworkshop.location} {myworkshop.mandatory}
        </Card.Text>
        <Card.Text className = "days">
          <img className='img_icon' src="" alt="" />
         {myworkshop.days} {myworkshop.time}
        </Card.Text>
      </Card.Body>
      ))}
    </Card>

    <section>
      <button>chat</button>
    </section>
  
      </>
    )
}
