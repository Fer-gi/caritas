import { getDatabase, ref, set, push } from "firebase/database";
import { toast } from "react-toastify";

const database = getDatabase();

const addOrEditNews = async (newsObject, editing) => {
  try {
    if (editing) {
      const newsRef = ref(database, `news/${newsObject.id}`);
      await set(newsRef, newsObject);
      toast('News updated successfully', {
        type: 'success'
      });
    } else {
      const newsRef = ref(database, 'news');
      await push(newsRef, newsObject);
      toast('News added successfully', {
        type: 'success'
      });
    }
  } catch (e) {
    console.error('Error adding/editing document: ', e);
  }
};

export default addOrEditNews;
