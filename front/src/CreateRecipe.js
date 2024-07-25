

import React, { useState } from 'react';
import axios from 'axios';

function CreateRecipe() {
    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('ingredients', ingredients);
            formData.append('steps', steps);
            formData.append('image', image);
    
            const response = await axios.post('http://localhost:5000/recipes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log(response.data);
            alert('Recipe added successfully');
            // Reset the form after successful submission
            setName('');
            setIngredients('');
            setSteps('');
            setImage(null);
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Error adding recipe');
        }
    };
    
    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
    };

    return (
        <div>
            <h2>Create Recipe</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ingredients (comma-separated):</label>
                    <input
                        type="text"
                        value={ingredients}
                        onChange={(e) => setIngredients(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Steps:</label>
                    <textarea
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Add Recipe</button>
            </form>
        </div>
    );
}

export default CreateRecipe;
