import React from 'react';

function Home() {
    return (
        <div className='video-container'>
            <video
                autoPlay // starts playing the video automatically
                muted // mutes the audio
                loop // plays the video in a loop
                src='/videos/background_sky.mp4' // the URL of the video file
                className="video" // a CSS class for styling the video element
                style={{width: '100%', height: 'auto'}}
            />
                <h1>Hello!</h1>
        </div>
    );
}
  
export default Home;
  