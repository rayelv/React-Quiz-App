import React, { useState } from 'react';

const HomeForm = ({ onSubmit, setQuestionData }) => {
  const [formData, setFormData] = useState({ //Set up a state to track form inputs
    name: '',
    category: '',
    difficulty: ''
  });

  const [error, setError] = useState('');//set error if form is incomplete

  const categories = [
    { id: 9, name: 'General Knowledge' },
    { id: 11, name: 'Film' },
    { id: 17, name: 'Science & Nature' },
    { id: 23, name: 'History' }
  ];
  const difficulties = [
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' }
  ];


  const handleChange = (e) => { //takes care of current input typed or selected
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value // [name of the input:name,ategory,,difficulty] : new value that was typed/selected
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents the page from submitting by default when page loads

    const { name, category, difficulty } = formData;
    if (!name || !category || !difficulty) { //if any area is empty, error will run
      setError('All fields are required.');
      return;
    }

    try {
      const res = await fetch( //fetching input data from API
        `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`
      );
      const data = await res.json(); //returning data in json data we can use
      if (data.response_code !== 0) {
        setError('Failed to fetch question. Try again.');
        return;
      }

      setQuestionData(data.results[0]); //grabs the first question from the results
      onSubmit(formData); // Set userData in App
    } catch (error) {
      console.error(error);
      setError('Network error. Please try again later.');
    }
  };

  return (
    <div>
      <h1>🎓 Welcome to the Trivia Quiz!</h1>
      <p>Fill out the form to start your quiz question.</p>

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input name="name" type="text" value={formData.name} onChange={handleChange} />
        </label>

        <label>
          Category:
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">--Choose a category--</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </label>

        <label>
          Difficulty:
          <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
          <option value="">--Choose difficulty--</option>
          {difficulties.map(diff => (
            <option key={diff.id} value={diff.id}>{diff.name}</option>
          ))}
        </select>
        </label>

        <button type="submit">Start Quiz</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default HomeForm;
