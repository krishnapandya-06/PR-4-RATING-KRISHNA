import React, { useState } from 'react';
import './App.css';
import { FaStar } from 'react-icons/fa';

const Card = ({ rating, feedback }) => {
  return (
    <div className="rating-card">
      <div className="star-rating">
        {Array.from({ length: rating }).map((_, index) => (
          <FaStar key={index} className="filled" />
        ))}
      </div>
      <p>{feedback}</p>
    </div>
  );
};

function App() {
  const [ratings, setRatings] = useState([]);
  const [currentRating, setCurrentRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [hoverRating, setHoverRating] = useState(0); 

  const handleRating = (rating) => {
    setCurrentRating(rating);
  };

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (currentRating > 0 && feedback) {
      setRatings([...ratings, { rating: currentRating, feedback }]);
      setCurrentRating(0);
      setFeedback('');
    } else {
      alert("Please provide a rating and feedback.");
    }
  };

  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const starArray = Array.from({ length: 5 }, (_, index) => index + 1);

  return (
    <div className="App">
      <h1>Rating & Comment with React.js</h1>
      
      <div className="star-rating">
        {starArray.map((star) => (
          <FaStar
            key={star}
            className={`star ${star <= (hoverRating || currentRating) ? 'filled' : ''}`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      <div className="feedback  -container">
        <textarea
          placeholder="Leave your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        />
        <br />
        <button onClick={handleSubmit}>Submit</button>
      </div>

      <div className="ratings-container">
        {ratings.map((ratingData, index) => (
          <Card key={index} rating={ratingData.rating} feedback={ratingData.feedback} />
        ))}
      </div>
    </div>
  );
}

export default App;
