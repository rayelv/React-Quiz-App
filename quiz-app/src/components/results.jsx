import React from 'react';

const decodeHTML = html => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};
// changing data into JSON format to be able to use in JavaScript

const ResultScreen = ({ userData, questionData, userAnswer, isCorrect, startOver }) => {
  return (
    <div>
      <h2>Results for {userData.name}:</h2> 
      {isCorrect ? (
        <p>Correct! That was too easy! Lets try another one 🤔</p>
      ) : (
        <>
          <p>❌ Incorrect.</p>
          <p>You answered: <strong>{decodeHTML(userAnswer)}.</strong>The correct answer was: <strong>{decodeHTML(questionData.correct_answer)}</strong></p>
        </>
      )}
      <button onClick={startOver}>Try Another Question</button> 
      {/* reset */}
    </div>
  );
};

export default ResultScreen;
