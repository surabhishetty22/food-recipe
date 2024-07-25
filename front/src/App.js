import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Recipes from './Recipes';
import Home from './Home';
import CreateRecipe from './CreateRecipe';
import ViewRecipes from './ViewRecipe';
import FeedbackForm from './FeedbackForm';
import CheckFeedback from './CheckFeedback';
function App() {
    return (
        <Router>
            <div>
                <Routes>
                   <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/create-recipe" element={<CreateRecipe />} />
                    <Route path="/view-recipes" element={<ViewRecipes />} />
                    <Route path="/view-feedback" element={<FeedbackForm />} />
                    <Route path="/check-feedback" element={<CheckFeedback />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
