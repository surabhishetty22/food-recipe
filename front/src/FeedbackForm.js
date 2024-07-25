

import React, { useState } from 'react';
import axios from 'axios';

function FeedbackForm({ onClose }) {
    const [recipeName, setRecipeName] = useState('');
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [feedbackError, setFeedbackError] = useState(null);

    const handleFeedbackSubmit = async (event) => {
        event.preventDefault();
        try {
            if (rating < 1 || rating > 5) {
                setFeedbackError('Rating must be between 1 and 5');
                return;
            }
            await axios.post('http://localhost:5000/feedback', { recipeName, rating, review });
            setFeedbackError(null);
            alert('Feedback submitted successfully');
            onClose(); // Close the feedback form after submission
        } catch (error) {
            if (error.response) {
                setFeedbackError(error.response.data.message);
            } else if (error.request) {
                setFeedbackError('No response received from the server');
            } else {
                setFeedbackError('An error occurred');
            }
        }
    };

    return (
        <div>
            <h2>Provide Feedback</h2>
            <form onSubmit={handleFeedbackSubmit}>
                <div>
                    <label>Recipe Name:</label>
                    <input
                        type="text"
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Rating:</label>
                    <input
                        type="number"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        required
                    />
                    {feedbackError && <p>{feedbackError}</p>}
                </div>
                <div>
                    <label>Review:</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
