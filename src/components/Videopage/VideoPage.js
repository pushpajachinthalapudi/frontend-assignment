import React, { useState } from 'react';
import './Videopage.css'; 
import video3 from '../../Videos/video3.mp4'
import video2 from '../../Videos/video2.mp4'
import video1 from '../../Videos/video1.mp4'

function VideoPage() {
    const [count, setCount] = useState(0);
    const [shareCount, setShareCount] = useState(0);
    const [dislikeCount, setDislikeCount] = useState(0);
  const [mainVideoSrc, setMainVideoSrc] = useState('https://www.youtube.com/embed/VIDEO_ID');

  
  const loadVideo = (videoId) => {
    setMainVideoSrc(`https://www.youtube.com/embed/${videoId}`);
  };

  return (
    <div className="video-page">
    

      <div className="main-video">
       
       
        <iframe
        style={{
          marginLeft: '10px',
         marginTop: '50px',
          borderRadius: '5px',
          
        }}
          className='iframe-video'
          objectFit="fill"
          src={video3}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
         
        >
          
        </iframe>
        <span className='videotitle' style={{
        marginRight: '70%',
       
        backgroundColor: 'white',
        color: 'black'
        }}>Cartoon anime videos</span>
      </div>
      
      <div className='video-details'>
      
      <button
            className="button-control"
            onClick={() => setCount(count + 1)}
            style={{
              marginTop: '460px',
              marginLeft: '-150px',
              marginRight: '-10px',
            }}
          >
            Like {count}
          </button>
          <button
            className="button-control"
            onClick={() => setShareCount(shareCount + 1)}
            style={{
              marginTop: '460px',
              marginLeft: '-140px',
              marginRight: '-10px',
            }}
          >
            Share {shareCount}
          </button>
          <button
            className="button-control"
            onClick={() => setDislikeCount(dislikeCount + 1)}
            style={{
              marginTop: '460px',
              marginLeft: '-158px',
              marginRight: '-10px',
            }}
          >
            Dislike {dislikeCount}
          </button>
       
        </div>
        
        
      <div className="recommended-videos">
      
        
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video2}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
          
          <h3>Video Title 1</h3>
        </div>
        
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video1}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
         
          <h3>Video Title 2</h3>

        </div>
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video2}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
          
          <h3>Video Title 1</h3>
        </div>
        
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video1}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
         
          <h3>Video Title 2</h3>
          
        </div>
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video2}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
          
          <h3>Video Title 1</h3>
        </div>
        
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video1}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
         
          <h3>Video Title 2</h3>
          
        </div>
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video2}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
          
          <h3>Video Title 1</h3>
        </div>
        
        <div className="video-thumbnail video1" onClick={() => loadVideo('VIDEO_ID_2')}>
        <iframe
         
          src={video1}
          frameBorder="0"
          allowFullScreen
          title="Main Video"
        ></iframe>
         
          <h3>Video Title 2</h3>
          
        </div>
        
      </div>
    </div>
  );
}

export default VideoPage;