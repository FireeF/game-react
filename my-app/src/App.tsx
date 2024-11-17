import React, { useState } from 'react';

const AdaptationsGame = () => {
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [dragging, setDragging] = useState<number | null>(null);

  const gameStyles: Record<string, React.CSSProperties> = {
    container: {
      minHeight: '100vh',
      padding: '2rem',
      background: '#d5d4e7',
      fontFamily: 'Comic Sans MS, cursive',
      overflow: 'hidden'
    },
    gameBox: {
      maxWidth: '1000px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.9)',
      borderRadius: '20px',
      padding: '2rem',
      border: '4px solid #d8b4fe',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    title: {
      fontSize: '3rem',
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: '2rem',
      background: 'linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'pulse 2s infinite'
    },
    scoreBoard: {
      fontSize: '1.5rem',
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#6b21a8',
      fontWeight: 'bold'
    },
    questionContainer: {
      display: 'flex',
      flexDirection: 'row',
      gap: '2rem',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  };

  const questions = [
    {
      term: "Environment",
      definitions: [
        "The living and nonliving things in a place",
        "An area with specific climate",
        "A body part or behavior aiding survival"
      ],
      correct: 0,
      background: 'linear-gradient(to right, #86efac, #6ee7b7, #5eead4)',
      emoji: "🌍 🌿 🦋 🌸"
    },
    {
      term: "Biome",
      definitions: [
        "A body part that helps animals survive",
        "An area with specific climate, plants, and animals",
        "The process of moving to warmer areas"
      ],
      correct: 1,
      background: 'linear-gradient(to right, #93c5fd, #7dd3fc, #818cf8)',
      emoji: "🌊 🏝️ 🌴 🐠"
    },
    {
      term: "Adaptation",
      definitions: [
        "The weather in a specific area",
        "The type of soil in an environment",
        "A body part or behavior aiding survival"
      ],
      correct: 2,
      background: 'linear-gradient(to right, #d8b4fe, #f0abfc, #f9a8d4)',
      emoji: "🦁 🐘 🦒 🦮"
    },
    {
      term: "Desert Biome",
      definitions: [
        "Has many tall trees",
        "Is hot and dry",
        "Has lots of rainfall"
      ],
      correct: 1,
      background: 'linear-gradient(to right, #fde047, #fcd34d, #fdba74)',
      emoji: "🏜️ 🌵 🦂 🐪"
    },
    {
      term: "Plant Needs",
      definitions: [
        "Only sunlight and water",
        "Just carbon dioxide",
        "Water, light, carbon dioxide, and nutrients"
      ],
      correct: 2,
      background: 'linear-gradient(to right, #a3e635, #86efac, #6ee7b7)',
      emoji: "🌱 🌺 🌳 🍀"
    }
  ];

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDragging(index);
    e.dataTransfer.setData('text/plain', '');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (dragging === questions[currentQuestion].correct) {
      setShowAnimation(true);
      setScore(score + 1);
      setTimeout(() => {
        setShowAnimation(false);
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          setGameComplete(true);
        }
      }, 1000);
    }
    setDragging(null);
  };

  const restart = () => {
    setScore(0);
    setCurrentQuestion(0);
    setGameComplete(false);
    setShowAnimation(false);
  };

  const celebrationEmojis = ['🎉', '🎈', '🎊', '✨', '💫', '🌟', '⭐', '🎯'];

  const questionBoxStyle: React.CSSProperties = {
    width: '48%',
    padding: '1.5rem',
    borderRadius: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    background: questions[currentQuestion].background,
    transform: 'scale(1)',
    transition: 'transform 0.3s ease',
    border: '4px solid white'
  };

  const dropZoneStyle: React.CSSProperties = {
    height: '160px',
    border: '4px dashed #a855f7',
    borderRadius: '15px',
    background: 'rgba(255, 255, 255, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    color: '#4b5563',
    transition: 'all 0.3s ease'
  };

  const answerStyle = (index: number) => ({
    padding: '1.25rem',
    borderRadius: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    cursor: 'move',
    background: 'white',
    opacity: dragging === index ? '0.5' : '1',
    transform: 'translateY(0)',
    transition: 'all 0.2s ease',
    border: '4px solid transparent',
    marginBottom: '1rem',
    fontSize: '1.125rem',
    fontWeight: 'bold',
    ':hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      borderColor: '#a855f7'
    }
  });

  const completeScreenStyle: React.CSSProperties = {
    textAlign: 'center',
    padding: '2rem',
    background: 'linear-gradient(to right, #fce7f3, #f3e8ff, #e0f2fe)',
    borderRadius: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    border: '4px solid white'
  };

  const buttonStyle: React.CSSProperties = {
    background: 'linear-gradient(to right, #ec4899, #8b5cf6, #6366f1)',
    color: 'white',
    padding: '1rem 2rem',
    borderRadius: '9999px',
    fontSize: '1.5rem',
    border: '4px solid white',
    cursor: 'pointer',
    transform: 'translateY(0)',
    transition: 'all 0.2s ease'
  };

  return (
    <div style={gameStyles.container}>
      <div style={gameStyles.gameBox}>
        <h1 style={gameStyles.title}>
          🎮 Awesome Adaptations Game! 🎮
        </h1>
      
        {!gameComplete ? (
          <div>
            <div style={gameStyles.scoreBoard}>
              Score: {score} / {questions.length} {celebrationEmojis[score]}
            </div>
          
            <div style={gameStyles.questionContainer}>
              <div style={questionBoxStyle}>
                <div style={{fontSize: '2rem', marginBottom: '1rem', animation: 'bounce 1s infinite'}}>
                  {questions[currentQuestion].emoji}
                </div>
                <h2 style={{fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1f2937'}}>
                  {questions[currentQuestion].term}
                </h2>
                <div 
                  style={dropZoneStyle}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  🎯 Drop Your Answer Here! 🎯
                </div>
              </div>
            
              <div style={{width: '48%'}}>
                {questions[currentQuestion].definitions.map((definition, index) => (
                  <div
                    key={index}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    style={answerStyle(index)}
                  >
                    {definition}
                  </div>
                ))}
              </div>
            </div>
          
            {showAnimation && (
              <div style={{
                position: 'fixed',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)',
                zIndex: 50
              }}>
                <div style={{textAlign: 'center'}}>
                  <div style={{fontSize: '5rem', animation: 'bounce 1s infinite', marginBottom: '1rem'}}>
                    {celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]}
                  </div>
                  <div style={{fontSize: '3rem', animation: 'pulse 1s infinite', color: 'white', fontWeight: 'bold'}}>
                    Amazing! You got it right! 
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={completeScreenStyle}>
            <h2 style={{fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#7c3aed'}}>
              🎉 Woohoo! Game Complete! 🎉
            </h2>
            <p style={{fontSize: '1.875rem', marginBottom: '1.5rem', color: '#4b5563'}}>
              Your awesome score: {score} / {questions.length}
            </p>
            {score === questions.length ? (
              <div style={{fontSize: '3rem', marginBottom: '1.5rem', animation: 'bounce 1s infinite'}}>
                🏆 Perfect Score! You're a STAR! 🌟
              </div>
            ) : (
              <p style={{marginBottom: '1.5rem', fontSize: '1.5rem', color: '#4b5563'}}>
                So close! Try again to become a champion! 🌟
              </p>
            )}
            <button
              onClick={restart}
              style={buttonStyle}
            >
              🎮 Play Again! 🎮
            </button>
          </div>
        )}
      </div>

      <style>
        {`
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            overflow: hidden;
            position: fixed;
            width: 100%;
          }

          /* Hide scrollbar for all browsers */
          ::-webkit-scrollbar {
            display: none;
          }
          
          * {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }

          @media (max-width: 768px) {
            .questionContainer {
              flex-direction: column !important;
            }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
};

export default AdaptationsGame;