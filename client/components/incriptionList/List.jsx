import { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { ListGroup, Table } from 'react-bootstrap';
import { db } from '../../firebase/firebase';

const List = () => {
    const [activities, setActivities] = useState([]);

    const getActivities = () => {
        const activitiesRealtimeRef = ref(db, 'activities');

        onValue(activitiesRealtimeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const activitiesArray = Object.keys(data).map((key) => {
                    const activity = {
                        ...data[key],
                        id: key,
                    };

        
                    if (activity.students) {
                    
                        const studentsArray = Object.keys(activity.students).map((studentKey) => ({
                            id: studentKey,
                            ...activity.students[studentKey],
                        }));

                        activity.students = studentsArray;
                    } else {
                        // Set an empty array if no students data
                        activity.students = [];
                    }

                    return activity;
                });

                setActivities(activitiesArray);
            } else {
                setActivities([]);
            }
        });
    };

    useEffect(() => {
        getActivities();
    }, []);

    return (
        <div className='p-3 d-flex flex-wrap'>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Students</th>
                    </tr>
                </thead>
                <tbody>
                    {activities.map((activity) => (
                        <tr key={activity.id}>
                            <td>{activity.courseName}</td>
                            <td>
                                {activity.students.map((student) => (
                                    <div key={student.id}>
                                        <p className='mb-0'><strong>Cursante:</strong> {`${student.studentName}`}</p>
                                        <p className='mb-0'><strong>Gmail:</strong> {`${student.gmail}`}</p>
                                        <br></br>
                                    </div>
                                ))}
                                {activity.students.length === 0 && <p className='mb-0'>No students data</p>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default List;
