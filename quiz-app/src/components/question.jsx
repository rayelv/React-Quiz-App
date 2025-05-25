import React, { useState, useEffect } from 'react';

const shuffleAnswers = (correct, incorrect) => { //shuffles choices shown to user for the question
  const options = [...incorrect, correct];
  return options.sort(() => Math.random() - 0.5);
};

const decodeHTML = html => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const QuestionCard = ({ userData, questionData, setUserAnswer, setIsCorrect }) => { //storing user data and input
  const [selected, setSelected] = useState('');
  const [error, setError] = useState('');
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const answers = shuffleAnswers( // 4 choices for each question, answers will be shuffled
      questionData.correct_answer, // gets data from the question, i.e the correct answer
      questionData.incorrect_answers // gets the incorrect answers
    );
    setShuffledAnswers(answers);
  }, [questionData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) { //error if no answer is selectedd on submition
      setError('Please select an answer.');
      return;
    }
    setUserAnswer(selected);
    setIsCorrect(selected === questionData.correct_answer);//checks if answer is correct
  };

  return (
    <div >
      <h2>Good luck, {userData.name}!</h2>
      <p>{decodeHTML(questionData.question)}</p> 

      <form onSubmit={handleSubmit}>
        {shuffledAnswers.map((ans, index) => (
          <label key={index} >
            <input
              type="radio"
              name="answer"
              value={ans}
              checked={selected === ans}
              onChange={() => setSelected(ans)}
            />
            {decodeHTML(ans)} 
          </label>
        ))}

        <button type="submit">Submit Answer</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default QuestionCard;
