import React, { useState, useRef, useEffect } from 'react';
import './Bottomsheet.css';

const snapPoints = {
  closed: 'closed',
  halfOpen: 'half-open',
  fullyOpen: 'fully-open',
};

const BottomSheet = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [displayOptions, setDisplayOptions] = useState(false);
  const [selectedCommentIndex, setSelectedCommentIndex] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [editCommentIndex, setEditCommentIndex] = useState(null);
  const [editedCommentText, setEditedCommentText] = useState('');
  const [reactionCounts, setReactionCounts] = useState({});
  const [showReactions, setShowReactions] = useState(false); 

  const emojiList = ['👍', '👎', '😃', '😂', '❤️', '😍', '😊']; 

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments([...comments, { text: newComment, replies: [], reactions: {} }]);
      setNewComment('');
    }
  };

  const handleButtonClick = (newPosition) => {
    setPosition(newPosition);
  };

  const [position, setPosition] = useState(snapPoints.closed);
  const [startY, setStartY] = useState(null);
  const sheetRef = useRef(null);

  useEffect(() => {
    sheetRef.current.style.transition = 'transform 0.3s cubic-bezier(0.77, 0.2, 0.05, 1.0)';
    switch (position) {
      case snapPoints.closed:
        sheetRef.current.style.transform = 'translateY(50%)';
        break;
      case snapPoints.halfOpen:
        sheetRef.current.style.transform = 'translateY(20%)';
        break;
      case snapPoints.fullyOpen:
        sheetRef.current.style.transform = 'translateY(0)';
        break;
      default:
        break;
    }
  }, [position]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    if (position === snapPoints.closed || position === snapPoints.fullyOpen) {
      return;
    }

    const deltaY = e.touches[0].clientY - startY;
    const newHeight = sheetRef.current.clientHeight - deltaY;

    if (newHeight > window.innerHeight * 0.8) {
      setPosition(snapPoints.fullyOpen);
    } else if (newHeight < window.innerHeight * 0.2) {
      setPosition(snapPoints.closed);
    } else {
      setPosition(snapPoints.halfOpen);
    }
  };

  const handleTouchEnd = () => {
    const translateY = sheetRef.current.style.transform.match(/translateY\((-?\d+)%\)/);
    if (translateY) {
      const translateYValue = parseInt(translateY[1], 10);
      if (translateYValue >= 40) {
        setPosition(snapPoints.closed);
      } else if (translateYValue >= 10) {
        setPosition(snapPoints.halfOpen);
      } else {
        setPosition(snapPoints.fullyOpen);
      }
    }
  };

  const toggleCommentOptions = (index) => {
    setSelectedCommentIndex(index);
    setDisplayOptions(!displayOptions);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (replyText.trim() !== '' && replyingTo !== null) {
      const updatedComments = [...comments];
      updatedComments[replyingTo].replies.push(replyText);
      setComments(updatedComments);
      setReplyText('');
      setReplyingTo(null);
    }
  };

  const handleEditComment = (index) => {
    setEditCommentIndex(index);
    setEditedCommentText(comments[index].text);
  };

  const handleSaveEdit = () => {
    if (editedCommentText.trim() !== '') {
      const updatedComments = [...comments];
      updatedComments[editCommentIndex].text = editedCommentText;
      setComments(updatedComments);
      setEditCommentIndex(null);
    }
  };

  const handleDeleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleReact = (index, reaction) => {
    const updatedComments = [...comments];
    const comment = updatedComments[index];
    if (!comment.reactions[reaction]) {
      comment.reactions[reaction] = 1;
    } else {
      comment.reactions[reaction]++;
    }
    setComments(updatedComments);

    const updatedReactionCounts = { ...reactionCounts };
    if (!updatedReactionCounts[reaction]) {
      updatedReactionCounts[reaction] = 1;
    } else {
      updatedReactionCounts[reaction]++;
    }
    setReactionCounts(updatedReactionCounts);
  };

  const handleReactionButtonClick = () => {
    setShowReactions(!showReactions);
  };

 
  const handleEmojiClick = (emoji) => {
    if (selectedCommentIndex !== null) {
      const updatedComments = [...comments];
      const comment = updatedComments[selectedCommentIndex];
      if (!comment.reactions[emoji]) {
        comment.reactions[emoji] = 1;
      } else {
        comment.reactions[emoji]++;
      }
      setComments(updatedComments);
      setShowReactions(false); 
    }
  };

  return (
    <div
      className={`bottom-sheet ${position}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      ref={sheetRef}
    >
      <h3 style={{ marginRight: '300px', marginTop: '15px', marginLeft: '15px' }}>Comments...</h3>
      <div className="control-buttons">
        <button onClick={() => handleButtonClick(snapPoints.closed)}>Close</button>
        <button onClick={() => handleButtonClick(snapPoints.halfOpen)}>Half Open</button>
        <button onClick={() => handleButtonClick(snapPoints.fullyOpen)}>Fully Open</button>
      </div>
      <div className="content">
        <div className="comment-section">
          <h2>Comments</h2>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>
                {editCommentIndex === index ? (
                  <>
                    <textarea
                      value={editedCommentText}
                      onChange={(e) => setEditedCommentText(e.target.value)}
                    ></textarea>
                    <button onClick={handleSaveEdit}>Save</button>
                  </>
                ) : (
                  <>
                    <div className="comment-text">
                      {comment.text}
                       
                      {showReactions && selectedCommentIndex === index && (
                            <div className="emoji-reactions">
                              {emojiList.map((emoji) => (
                                <span className='emoji-options' key={emoji} onClick={() => handleEmojiClick(emoji)}>
                                  {emoji}
                                </span>
                              ))}
                            </div>
                          )}
                             <div className="comment-reactions">
                        {Object.entries(comment.reactions).map(([reaction, count]) => (
                          <button className='emoji' key={reaction} onClick={() => handleReact(index, reaction)}>
                            {reaction} ({count})
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="comment-actions">
                      <button className='options' onClick={() => toggleCommentOptions(index)}>
                        Options
                      </button>
                      {selectedCommentIndex === index && displayOptions && (
                        <div className="comment-options">
                          <button onClick={() => handleEditComment(index)}>
                            Edit
                          </button>
                          <button onClick={() => handleDeleteComment(index)}>
                            Delete
                          </button>
                          <button onClick={() => setReplyingTo(index)}>
                            Reply
                          </button>
                          
                          <button onClick={handleReactionButtonClick}>Reaction</button>
                         
                        </div>
                      )}
                   
                    </div>
                  </>
                )}
                {replyingTo === index && (
                  <form onSubmit={handleReplySubmit}>
                    <textarea
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    ></textarea>
                    <button type="submit">Submit Reply</button>
                  </form>
                )}
                {comment.replies.length > 0 && (
                  <ul>
                    {comment.replies.map((reply, replyIndex) => (
                      <li key={replyIndex}>{reply}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={handleCommentChange}
            ></textarea>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default BottomSheet;
