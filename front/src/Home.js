import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h2>Welcome to Home Page</h2>
            <p>Content of your home page goes here...</p>
            <nav>
                <ul>
                    <li><Link to="/contact">Contact Us</Link></li>
                </ul>
            </nav>
            <div>
                <Link to="/create-recipe">
                    <button>Create Recipe</button>
                </Link>
                <Link to="/view-recipes">
                    <button>View Recipes</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
