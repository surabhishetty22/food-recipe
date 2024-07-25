

import React, { useState } from 'react';
import axios from 'axios';

function CheckFeedback() {
    const [name, setName] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/feedback/${name}`);
            setFeedback(response.data);
            setError(null); // Reset any previous error
        } catch (error) {
            setError('Feedback not found for this recipe');
            setFeedback(null); // Reset feedback data
        }
    };

    return (
        <div>
            <h2>Check Feedback</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Recipe Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Check Feedback</button>
            </form>
            {error && <p>{error}</p>}
            {feedback && (
                <div>
                    <h3>Feedback for {name}</h3>
                    <div>
                        <h4>Ratings:</h4>
                        <ul>
                            {feedback.ratings.map((rating, index) => (
                                <li key={index}>Rating: {rating}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4>Reviews:</h4>
                        <ul>
                            {feedback.reviews.map((review, index) => (
                                <li key={index}>{review}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CheckFeedback;
