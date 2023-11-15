// activities.jsx
import  { useState, useEffect } from 'react';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Card } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../firebase/firebase';
import { deleteObject, ref } from 'firebase/storage';
import { BsTrash, BsPencil } from 'react-icons/bs'; 

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();

  const onDeleteActivities = async (id, imgUrl) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      try {

        const storageRef = ref(storage, imgUrl);
        await deleteObject(storageRef);
  
  
        const activitiesRef = doc(collection(db, 'activities'), id);
        await deleteDoc(activitiesRef);
  
        toast('Activities deleted successfully', {
          type: 'error',
          autoClose: 2000,
        });
      } catch (error) {
        console.error('Error deleting activities:', error);
      }
    }
  };
  

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
    <div className='col-md-3'> 
    {activities.map((activity) => (
      <Card className='mb-3' key={activity.id} style={{ backgroundColor: '#800020', color: 'white', borderRadius: '10px', padding: '10px', marginBottom: '20px' }}>
        <Card.Body>
          <img src={activity.img} alt="Imagen del curso" className='mb-3' />
          <p>{activity.courseName}</p>
          <p>{activity.description}</p>
          <p>{activity.date}</p>
          <div className="d-flex justify-content-between   mt-3">
            <div>
              <BsTrash className='text-white mr-2' onClick={() => onDeleteActivities(activity.id, activity.img)} />
            </div>
            <div>
              <BsPencil className='text-white' onClick={() => { setCurrentId(activity.id); navigate(`/addactivities/${activity.id}`); }} />
            </div>
          </div>
        </Card.Body>
      </Card>
    ))}
  </div>
);
};

export default Activities;




