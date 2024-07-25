
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function ViewRecipe() {
    const [name, setName] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/view-recipe/${name}`);
            setRecipes(response.data);
            setError(null);
        } catch (error) {
            setError('Recipes not found');
            setRecipes([]);
        }
    };

    const handleCheckFeedback = (recipeName) => {
        navigate(`/check-feedback?name=${recipeName}`);
    };

    return (
        <div>
            <h2>View Recipe</h2>
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
                <button type="submit">View Recipe</button>
            </form>
            {error && <p>{error}</p>}
            {recipes.length > 0 ? (
                <div>
                    {recipes.map((recipe, index) => (
                        <div key={index}>
                            <h3>{recipe.name}</h3>
                            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
                            <p>Steps: {recipe.steps.join(', ')}</p>
                            <img src={`http://localhost:5000/${recipe.imageUrl}`} alt={recipe.name} />
                            <Link to="/view-feedback">
                                <button>Give Feedback</button>
                            </Link>
                            <button onClick={() => handleCheckFeedback(recipe.name)}>Check Feedback</button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No recipes found</p>
            )}
        </div>
    );
}

export default ViewRecipe;
