
import React from 'react';
import './multimedia.css';

const mediaData = {
  Beach: {
    audio: '/multimedia/audio/beach.mp3',
    video: '/multimedia/videos/beach.mp4',
    audioTitle: 'Ocean Waves',
  },
  Mountain: {
    audio: '/multimedia/audio/mountain.mp3',
    video: '/multimedia/videos/mountain.mp4',
    audioTitle: 'Mountain Ambience',
  },
  Island: {
    audio: '/multimedia/audio/island.mp3',
    video: '/multimedia/videos/island.mp4',
    audioTitle: 'Island Ambience',
  },
  Nature: {
    audio: '/multimedia/audio/nature.mp3',
    video: '/multimedia/videos/nature.mp4',
    audioTitle: 'Nature Sounds',
  },
};

const MultimediaSection = ({ photo, title, city, category }) => {
  const selectedMedia = mediaData[category] || mediaData.Nature;

  return (
    <section className="multimedia-section">
      <div className="multimedia-heading">
        <span>EXPLORE THROUGH MULTIMEDIA</span>
        <h2>Experience {title || city}</h2>
        <p>
          Discover the destination through stunning visuals,
          natural sounds and travel videos.
        </p>
      </div>

      {/* Destination image */}
      <div className="multimedia-image">
        <img
          src={photo}
          alt={title || city || 'Travel destination'}
        />
        <div className="image-overlay">
          <h3>{city}</h3>
          <p>Discover the beauty of this destination</p>
        </div>
      </div>

      {/* Category-based audio */}
      <div className="multimedia-card">
        <h3>🎵 Listen to {selectedMedia.audioTitle}</h3>
        <p>
          Enjoy relaxing sounds inspired by this destination.
        </p>

        <audio key={selectedMedia.audio} controls preload="metadata">
          <source src={selectedMedia.audio} type="audio/mpeg" />
          Your browser does not support audio playback.
        </audio>
      </div>

      {/* Category-based video */}
      <div className="multimedia-card">
        <h3>🎬 {city} Destination Video</h3>
        <p>Watch a visual journey through the destination.</p>

        <video
          key={selectedMedia.video}
          controls
          preload="metadata"
          poster={photo}
          className="destination-video"
        >
          <source src={selectedMedia.video} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      </div>
    </section>
  );
};

export default MultimediaSection;
