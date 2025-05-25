import React, { useState } from 'react';
import HomeForm from './components/home';
import QuestionCard from './components/question';
import ResultScreen from './components/results';
import './App.css'

function App() {
  const [userData, setUserData] = useState(null);        // { name, category, difficulty }
  const [questionData, setQuestionData] = useState(null); // API response with question
  const [userAnswer, setUserAnswer] = useState(null);     // User’s selected answer
  const [isCorrect, setIsCorrect] = useState(null);       // true / false

  const startOver = () => {
    setUserData(null);
    setQuestionData(null);
    setUserAnswer(null);
    setIsCorrect(null);
  };

  // Show HomeForm when no userData yet
  if (!userData) {
    return (
      <div className="App">
        <HomeForm 
          onSubmit={setUserData}
          setQuestionData={setQuestionData}
        />
      </div>
    );
  }

  // Show QuestionCard when userData exists but no answer selected
  if (userData && !userAnswer) {
    return (
      <div className="App">
        <QuestionCard 
          userData={userData}
          questionData={questionData}
          setUserAnswer={setUserAnswer}
          setIsCorrect={setIsCorrect}
        />
      </div>
    );
  }

  // Show result once user has answered
  return (
    <div className="App">
      <ResultScreen 
        userData={userData}
        questionData={questionData}
        userAnswer={userAnswer}
        isCorrect={isCorrect}
        startOver={startOver}
      />
    </div>
  );
}

export default App;
