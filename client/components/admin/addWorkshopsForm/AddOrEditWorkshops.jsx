import { getDatabase, ref, set, push } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const database = getDatabase();

const addOrEditWorkshops = async (workshopsObject, editing) => {
  try {
    if (editing) {
      const workshopsRef = ref(database, `workshops/${workshopsObject.id}`);
      await set(workshopsRef, workshopsObject);
      toast('Workshops updated successfully', {
        type: 'success'
      });
    } else {
      const workshopsRef = ref(database, "workshops");
      await push(workshopsRef, workshopsObject);
      toast('Workshops added successfully', {
        type: 'success'
      });
    }
  } catch (e) {
    console.error('Error adding/editing document: ', e);
  }
};

export default addOrEditWorkshops;
