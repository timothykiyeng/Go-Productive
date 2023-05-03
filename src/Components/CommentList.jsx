import React, { useState, useEffect } from 'react';
import CommentBubble from './CommentBubble';
import axios from "axios";

function CommentList( {user} ) {

    const [commentData, setCommentData] = useState([])
    const [description, setDescription] = useState("")
    const [dataIndex, setDataIndex] = useState(0)
    const [showComment, setShowComment] = useState("")


    useEffect(() => {
        fetch("http://127.0.0.1:3000/comments")
        .then((res) => res.json())
        .then((comments) => { setCommentData(comments) });


    }, []);


    function handleShowComment(singleComment){
      setShowComment(singleComment)
    }


    function addNewComment(newComment){
        setCommentData((prevState) => [...prevState, newComment])
      }

      function handleDeleteComment(commentToDelete){
        const updatedComments = commentData.filter((comment) => {
          if (comment.id !== commentToDelete.id) {
            return comment
          } else {
            return null
          }
        });
        setCommentData(updatedComments);
      }

      function handleUpdateComment(updatedCommentObj) {
        const editedComments = commentData.map((comment) => {
          if (comment.id === updatedCommentObj.id) {
            return updatedCommentObj;
          } else {
            return comment;
          }
        });
        setCommentData(editedComments);
      }

     const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:3000/comments", {
        description: description,
        user_id: user.id,
      });
      setCommentData([...commentData, response.data]);
      setDescription("");
      alert("Submitted successfully.");
    } catch (error) {
      console.log(error);
    }
  };


      const commentList = [...commentData]
      .slice(dataIndex, dataIndex + 3)
      .map((comment) =>
            <CommentBubble
              key={comment.id}
              id={comment.id}
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleUpdateComment={handleUpdateComment}
              handleShowComment={handleShowComment}
            />
        )

        function handleCommentChange(e){
            setDescription(e.target.value)
            }

        function handleClickMore() {
                setDataIndex((dataIndex) => (dataIndex + 3) % commentData.length);
              }

        function handleClickLess() {
              setDataIndex((dataIndex) => (dataIndex - 3) % commentData.length);
            }

            return (
                <>
                <div className="comment-page-title">
                  <p>Your Thoughts?</p>
                </div>
                <div className="comment-page-intro">
                  <p>Join others in sharing your experiences on this platform.<br/>How are you finding things?<br/> Take your time and check out what others think.</p>
                </div>
                <div className="comments-div">{commentList}</div>
                <div className="float-container">
                      <div className="next-container">
                            <button
                            className="back-button"
                            onClick={handleClickLess}><i className="gg-chevron-left"></i></button>
                      </div>
                      <div className="next-container">
                          <button
                            className="next-button"
                            onClick={handleClickMore}><i className="gg-chevron-right"></i></button>
                        </div>
                    </div>
                <form className="create-comment" onSubmit={handleSubmit} >
                  <label className="comment-label" htmlFor="comment"> New Comment: </label>
                  <input
                    className="comment-input"
                    name="comment"
                    type="text"
                    placeholder="Share with us your thoughts..."
                    value={description}
                    onChange={handleCommentChange}
                    ></input>
                    <input className="submit-button" type="submit" value="Post" />
                </form>

                </>
              )


}

export default CommentList