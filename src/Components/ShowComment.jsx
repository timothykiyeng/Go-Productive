import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ShowComment() {
  const [currentComment, setCurrentComment] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/comments/${id}`)
      .then((res) => res.json())
      .then((current) => {
        setCurrentComment(current);
      });
  }, [id]);

  return <div className="show-comment">{currentComment.description}</div>;
}

export default ShowComment;