import { useState, useEffect } from "react";
import { ref, onValue, remove, getDatabase } from "firebase/database";
import { Card } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { db } from "../../../server/firebase/firebase";
import "./News.css";

const NewsBlogs = () => {
  const [news, setNews] = useState([]);
  const navigate = useNavigate();

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
          <div className="cardNew" key={itemNew.id}>
            <Card>
              <Card.Img className="card_img" variant="top" src={itemNew.img} />
              <Card.Body>
                <Card.Title>{itemNew.title}</Card.Title>
                <p>{itemNew.description}</p>
              </Card.Body>
            </Card>
          </div>
        ))}
        <div style={{ position: "fixed", bottom: "10vh", right: "20px" }}>
        </div>
      </div>
    </>
  );
};

export default NewsBlogs;