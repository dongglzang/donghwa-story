import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, VolumeX } from 'lucide-react';

const StoryPopup = ({ story, onClose }) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [isMuted, setIsMuted] = useState(false);
  const synth = window.speechSynthesis;
  const utteranceRef = useRef(null);

  useEffect(() => {
    // Play story when component mounts
    playStory();

    return () => {
      // Clean up speech when component unmounts
      if (synth) synth.cancel();
    };
  }, []);

  const playStory = async () => {
    if (!synth) return;
    synth.cancel();

    for (let i = 0; i < story.story.length; i++) {
      setCurrentLineIndex(i);
      await speakLine(story.story[i]);
    }
  };

  const speakLine = (text) => {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      utterance.volume = isMuted ? 0 : 1;
      utteranceRef.current = utterance;

      utterance.onend = () => {
        resolve();
      };

      utterance.onerror = () => {
        resolve();
      };

      synth.speak(utterance);
    });
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (utteranceRef.current) {
      if (!isMuted) {
        // Muting now
        synth.cancel();
      } else {
        // Unmuting - restart current line or just proceed
        playStory();
      }
    }
  };

  return (
    <motion.div 
      className="popup-overlay"
      initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
      animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      transition={{ duration: 0.5 }}
      onClick={onClose}
    >
      <motion.div 
        className="popup-content"
        initial={{ scale: 0.85, y: 80, opacity: 0, rotateX: 15 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.85, y: 80, opacity: 0, rotateX: -15 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        onClick={(e) => e.stopPropagation()}
        style={{ 
          transformStyle: "preserve-3d",
          perspective: 1200 
        }}
      >
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="popup-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '2rem', color: '#2E7D32', fontStyle: 'italic' }}>{story.name}</h2>
          <button 
            onClick={toggleMute}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer', 
              color: isMuted ? '#999' : '#4CAF50',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            <span style={{ fontWeight: 600 }}>{isMuted ? '음소거됨' : '소리 켜짐'}</span>
          </button>
        </div>

        <div className="popup-image-container">
          <img src={story.storyImg} alt={story.name} className="popup-image" />
          
          <AnimatePresence mode="wait">
            {currentLineIndex >= 0 && (
              <motion.div 
                key={currentLineIndex}
                className="subtitle-container"
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <div className="subtitle-box">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.05 }}
                  >
                    {story.story[currentLineIndex]}
                  </motion.span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="popup-footer" style={{ textAlign: 'center', color: '#666' }}>
          <p>화면을 클릭하면 닫힙니다.</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StoryPopup;
