/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {useParams } from "react-router-dom";

import { getWorkshop } from '../../../server/firebase/firebaseRead';

const WorkshopComponent = () => {
    const [workshop, setWorkshop] = useState(null);
    const {id}  = useParams();
  
    useEffect(() => {
      const fetchWorkshop = async () => {
        try {
           
          const workshopDb = await getWorkshop(id);
  
          const remainingStock = workshopDb.stock
          if (workshopDb.registereds) {
            const remainingStock = workshopDb.stock - workshopDb.registereds.length;
            workshopDb.remainingStock = remainingStock;
          }
  
          setWorkshop(workshopDb);
        } catch (error) {
          console.error('Error al obtener el workshop:', error);
        }
      };
  
      fetchWorkshop();
    }, [id]);
  
    if (!workshop) {
      return <div>Cargando taller...</div>;
    }
  
    return (
      <div>
        <h2>{workshop.title}</h2>
        <p>Description: {workshop.description}</p>
        <p>Stock: {workshop.stock}</p>
        {workshop.remainingStock > 0 && (
            <button>Inscribirme</button>
        )}
      </div>
    );
  };
  
  export default WorkshopComponent;