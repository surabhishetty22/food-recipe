import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [review, setReview] = useState({ user: '', rating: 0, comment: '' });

    useEffect(() => {
        const fetchRecipe = async () => {
            const response = await axios.get(`http://localhost:5000/recipes/${id}`);
            setRecipe(response.data);
        };
        fetchRecipe();
    }, [id]);

    const handleReviewSubmit = async () => {
        await axios.post(`http://localhost:5000/recipes/${id}/review`, review);
        setReview({ user: '', rating: 0, comment: '' });
        const updatedRecipe = await axios.get(`http://localhost:5000/recipes/${id}`);
        setRecipe(updatedRecipe.data);
    };

    return (
        <div>
            {recipe && (
                <div>
                    <h2>{recipe.name}</h2>
                    <ul>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h3>Reviews</h3>
                    <ul>
                        {recipe.reviews.map((review, index) => (
                            <li key={index}>{review.user}: {review.rating} - {review.comment}</li>
                        ))}
                    </ul>
                    <h3>Add a Review</h3>
                    <input
                        type="text"
                        placeholder="User"
                        value={review.user}
                        onChange={(e) => setReview({ ...review, user: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Rating"
                        value={review.rating}
                        onChange={(e) => setReview({ ...review, rating: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Comment"
                        value={review.comment}
                        onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    />
                    <button onClick={handleReviewSubmit}>Submit Review</button>
                </div>
            )}
        </div>
    );
}

export default RecipeDetails;
