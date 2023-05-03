import React, {useState} from 'react';
import EditComment from './EditComment';
import { Link } from 'react-router-dom';

function CommentBubble( {id, comment, handleDeleteComment, handleUpdateComment }){

    const [isEditing, setIsEditing] = useState(false);
    const { description, username } = comment

    function handleDelete(){
        fetch(`http://127.0.0.1:3000/comments/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        handleDeleteComment(id)
      }

      return (
        <div className="bubble">
          {isEditing ? (
           <EditComment
             id={id}
             comment={comment}
             setIsEditing={setIsEditing}
             handleUpdateComment={handleUpdateComment}
           />
          ) : (
            <div className="comment-container">
              <button className="delete-button" onClick={handleDelete}>🗑️</button>
              <button className="edit-btn" onClick={() => setIsEditing((isEditing) => !isEditing)}>
                 <span role="img" aria-label="edit">
                   ✏️
                 </span>
               </button>
               <br/>
              <h3 className="comment">{description}
              <p className="username">- {username}</p>
              <Link className="full-comment-button" exact to={`/comments/${id}`}>Full Comment</Link></h3>
              </div>
          )
         }
         </div>
     )


}

export default CommentBubble