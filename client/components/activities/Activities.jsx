import { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';

const onDeleteActivities = async (id) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      const activitiesRef = doc(collection(db, 'activities'), id);
      await deleteDoc(activitiesRef);
      toast('Activities delete successfully', {
        type: 'error', 
        autoClose: 2000
    });
    }
  };

const Activities = () => {
  const [activities, setActivities] = useState([]);

  const getActivities = async () => {
    const activitiesCollection = collection(db, 'activities');

    onSnapshot(activitiesCollection, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setActivities(docs);
    });
  };

  useEffect(() => {
    getActivities();
  }, []);

  return (
    <div className='col-md-8'>
      {activities.map((activity) => (
        <Card className='mb-3' key={activity.id} style={{ backgroundColor: '#800020', color: 'white' }}>
          <Card.Body>
            <img src={activity.img} alt="Imagen del curso" className='mb-3' width={150} height={150} />
            <p>{activity.courseName}</p>
            <p>{activity.description}</p>
            <p>{activity.date}</p>
            <div>
              <i className='text-danger' onClick={() => onDeleteActivities(activity.id)}>close</i>
            </div>
            <div>
              <i className='text-danger' onClick={() => currentId(activity.id)}>close</i>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Activities;
