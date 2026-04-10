import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Entity from './components/Entity';
import StoryPopup from './components/StoryPopup';
import InteractiveOverlay from './components/InteractiveOverlay';
import Fireflies from './components/Fireflies';
import CustomCursor from './components/CustomCursor';
import PterosaurCanvas from './components/PterosaurCanvas';
import { stories } from './data/stories';

function App() {
  const [selectedStory, setSelectedStory] = useState(null);

  const handleEntityClick = (story) => {
    setSelectedStory(story);
  };

  const closePopup = () => {
    setSelectedStory(null);
  };

  return (
    <div id="app-root">
      <CustomCursor />
      <InteractiveOverlay />
      
      <div className="field-container">
        {/* Environmental AR Effects */}
        <Fireflies />
        <PterosaurCanvas onBirdClick={handleEntityClick} />
        
        {/* Media Art Effects */}
        <div className="projector-beam" />
        
        {/* Dynamic Entities */}
        {stories.map((story) => (
          <Entity 
            key={story.id} 
            story={story} 
            onClick={handleEntityClick} 
          />
        ))}

        {/* Story Popup Component */}
        <AnimatePresence>
          {selectedStory && (
            <StoryPopup 
              story={selectedStory} 
              onClose={closePopup} 
            />
          )}
        </AnimatePresence>

        {/* Media Art Exhibit Label */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            background: 'rgba(0,0,0,0.4)',
            backdropFilter: 'blur(20px)',
            padding: '20px 30px',
            borderRadius: '25px',
            border: '1px solid rgba(255,215,0,0.3)',
            zIndex: 100,
            textAlign: 'right',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5), inset 0 0 20px rgba(255,215,0,0.05)'
          }}
        >
          <h1 style={{ fontSize: '1.2rem', color: '#FFD700', marginBottom: '8px', fontWeight: '400', letterSpacing: '4px', textShadow: '0 0 10px rgba(255,215,0,0.5)' }}>DIGITAL MEDIA EXHIBIT</h1>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '2px' }}>Interactive Projection Mapping</p>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
