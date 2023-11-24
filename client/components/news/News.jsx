/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { ref, onValue, remove, getDatabase } from "firebase/database";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { db } from "../../../server/firebase/firebase";
import { BsTrash, BsPencil } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Card, Button } from "react-bootstrap";
import "./News.css"

const News = () => {
  const [news, setNews] = useState([]);
  const [currentNewId, setCurrentNewId] = useState("");
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setCurrentNewId("");
  };

  const onDeleteNews = async (id) => {
    if (window.confirm("¿Quieres eliminar esta Noticia?")) {
      try {
        const database = getDatabase();
        const newsRealtimeRef = ref(database, `news/${id}`);
        await remove(newsRealtimeRef);

        toast("New deleted successfully", {
          type: "error",
          autoClose: 2000,
        });
        handleCloseModal();
      } catch (error) {
        console.error("Error deleting new:", error);
      }
    }
  };

  const getNews = () => {
    const newsRealtimeRef = ref(db, "news");

    onValue(newsRealtimeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const newsArray = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        setNews(newsArray);
      } else {
        setNews([]);
      }
    });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
    <h2 className="newsTitle">Noticias</h2>
    <div className="containerCard">
       
      {news.map((itemNew) => (
         <div className="cardNew">
        <Card key={itemNew.id} >
          <Card.Img className="card_img" variant="top" src={itemNew.img} />

          <Card.Body>
            <Card.Title>{itemNew.title}</Card.Title>
            <p>{itemNew.description}</p>
          </Card.Body>

          <div className="edit-delete">
            <div>
              <BsTrash
                className="textblack-mr-2-news"
                onClick={() => onDeleteNews(itemNew.id)}
              />
            </div>
            <div>
              <BsPencil
                className="textblack-news"
                onClick={() => navigate(`addnews/${itemNew.id}`)}
              />
            </div>
          </div>
        </Card>
        </div>
        
      ))}
      
      <div style={{ position: "fixed", bottom: "10vh", right: "20px" }}>
        <Button variant="danger" onClick={() => navigate("addnews")}>
          <FaPlus />
        </Button>
      </div>
    </div>
    </>
  );
};

export default News;
