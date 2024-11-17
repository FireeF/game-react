import React, { useState } from "react";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    background: "linear-gradient(to right, #e8f0ff, #f0e6ff)",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  questionCount: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#5b21b6",
  },
  score: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#059669",
  },
  questionContainer: {
    marginBottom: "24px",
  },
  questionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },
  icon: {
    fontSize: "32px",
  },
  question: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#1f2937",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  optionButton: {
    padding: "16px",
    textAlign: "left",
    borderRadius: "8px",
    border: "2px solid #e5e7eb",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "all 0.2s ease",
    fontSize: "16px",
  },
  animation: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    fontSize: "64px",
    animation: "ping 1s cubic-bezier(0, 0, 0.2, 1)",
  },
  resultsContainer: {
    textAlign: "center",
  },
  resultsTitle: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#5b21b6",
    marginBottom: "16px",
  },
  resultsScore: {
    fontSize: "20px",
    marginBottom: "24px",
  },
  perfectScore: {
    fontSize: "48px",
    animation: "spin 2s linear infinite",
  },
  resetButton: {
    padding: "12px 24px",
    backgroundColor: "#5b21b6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.2s ease",
  },
};

// Add hover effects
const hoverStyles = {
  optionButton: {
    ":hover": {
      borderColor: "#a78bfa",
      transform: "scale(1.02)",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
  },
  resetButton: {
    ":hover": {
      backgroundColor: "#7c3aed",
    },
  },
};

// Add keyframe animations
const keyframes = `
  @keyframes ping {
    75%, 100% {
      transform: translate(-50%, -50%) scale(2);
      opacity: 0;
    }
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const QuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  // Add styles to head
  React.useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = keyframes;
    document.head.appendChild(styleSheet);
    return () => styleSheet.remove();
  }, []);

  const questions = [
    {
      question: "Где се најчешће изводе експерименти?",
      options: ["У природи", "У лабораторијама", "У учионици", "У парку"],
      correct: 1,
      icon: "🧪",
    },
    {
      question: "Шта научници користе да би проучавали природу?",
      options: [
        "Само посматрање",
        "Само експерименте",
        "Различите методе и поступке",
        "Само цртање",
      ],
      correct: 2,
      icon: "🔬",
    },
    {
      question: "Да ли су све лабораторије исто опремљене?",
      options: [
        "Да, све су исте",
        "Не, различито су опремљене",
        "Зависи од дана",
        "Нема разлике",
      ],
      correct: 1,
      icon: "⚗️",
    },
    {
      question: "Шта може да се нађе у лабораторијама?",
      options: [
        "Само хемикалије",
        "Само животиње",
        "Само биљке",
        "Апарати, хемикалије и жива бића",
      ],
      correct: 3,
      icon: "🧫",
    },
  ];

  const handleAnswer = (selectedAnswer: number) => {
    const isCorrect = selectedAnswer === questions[currentQuestion].correct;

    if (isCorrect) {
      setScore(score + 1);
      setShowAnimation(true);
    }

    setTimeout(() => {
      setShowAnimation(false);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  if (showScore) {
    return (
      <div style={styles.container}>
        <div style={styles.resultsContainer}>
          <h2 style={styles.resultsTitle}>Квиз је завршен! 🎉</h2>
          <p style={styles.resultsScore}>
            Освојили сте {score} од {questions.length} бодова!
          </p>
          {score === questions.length && (
            <div>
              <span style={styles.perfectScore}>⭐</span>
            </div>
          )}
          <button
            style={{ ...styles.resetButton }}
            onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) =>
              Object.assign(e.currentTarget.style, hoverStyles.resetButton[":hover"])
            }
            onClick={resetQuiz}
          >
            Играј поново
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <span style={styles.questionCount}>
          Питање {currentQuestion + 1}/{questions.length}
        </span>
        <span style={styles.score}>Бодови: {score}</span>
      </div>

      <div style={styles.questionContainer}>
        <div style={styles.questionHeader}>
          <span style={styles.icon}>{questions[currentQuestion].icon}</span>
          <h2 style={styles.question}>{questions[currentQuestion].question}</h2>
        </div>

        <div style={styles.optionsGrid}>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              style={{ ...styles.optionButton }}
              onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) =>
                Object.assign(
                  e.currentTarget.style,
                  hoverStyles.optionButton[":hover"]
                )
              }
              onMouseOut={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.currentTarget.style.borderColor = "#e5e7eb";
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showAnimation && <div style={styles.animation}>⭐</div>}
    </div>
  );
};

export default QuizGame;
