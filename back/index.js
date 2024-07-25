

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb+srv://surabhishetty:surabhi@cluster0.khusgtu.mongodb.net/foodRecipeApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

// Set up middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define the schemas and models
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: [String],
    steps: [String],
    imageUrl: String,
    ratings: [Number],  // Add this line
    reviews: [String]   // Add this line
});

const feedbackSchema = new mongoose.Schema({
    recipeName: String,
    rating: Number,
    review: String
});

const User = mongoose.model('User', userSchema);
const Recipe = mongoose.model('Recipe', recipeSchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Set up Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Authentication routes
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.send('User registered');
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username, password });
    if (user) {
        res.send('Login successful');
    } else {
        res.send('Invalid credentials');
    }
});

// Recipe routes
app.post('/recipes', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No image uploaded' });
    }

    const { name, ingredients, steps } = req.body;
    const imageUrl = req.file.path;

    try {
        const recipe = new Recipe({
            name,
            ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
            steps: steps.split('\n').map(step => step.trim()),
            imageUrl
        });
        await recipe.save();

        res.json({ message: 'Recipe added successfully', imageUrl });
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).json({ message: 'Error adding recipe', error: error.message });
    }
});

app.get('/view-recipe/:name', async (req, res) => {
    const recipeName = req.params.name;
    try {
        const recipes = await Recipe.find({ name: recipeName });
        if (recipes.length > 0) {
            res.json(recipes);
        } else {
            res.status(404).json({ message: 'Recipes not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recipes', error: error.message });
    }
});

// Feedback route
app.post('/feedback', async (req, res) => {
    const { recipeName, rating, review } = req.body;
    try {
        const recipe = await Recipe.findOne({ name: recipeName });
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        recipe.ratings.push(rating);
        recipe.reviews.push(review);
        await recipe.save();

        // Optionally, calculate the average rating based on all feedback entries
        const totalRatings = recipe.ratings.length;
        const sumRatings = recipe.ratings.reduce((sum, rate) => sum + rate, 0);
        const avgRating = totalRatings ? sumRatings / totalRatings : 0;

        res.json({ message: "Feedback saved successfully", avgRating });
    } catch (error) {
        res.status(500).json({ message: "Error saving feedback", error: error.message });
    }
});
 app.get('/feedback/:name', async (req, res) => {
   const recipeName = req.params.name;
    try {
      const recipe = await Recipe.findOne({ name: recipeName });
      console.log(`Found recipe: ${recipe}`);
      if (!recipe) {
        console.log(`Recipe not found: ${recipeName}`);
        return res.status(404).json({ message: "Recipe not found" });
      }
      const feedback = {
        ratings: recipe.ratings,
        reviews: recipe.reviews
      };
      console.log(`Feedback: ${feedback}`);
      res.json(feedback);
    } catch (error) {
      console.error(`Error retrieving feedback: ${error.message}`);
      res.status(500).json({ message: "Error retrieving feedback", error: error.message });
    }
  });

// Check feedback route
app.get('/check-feedback/:recipeName', async (req, res) => {
    const recipeName = req.params.recipeName;
    try {
        const feedbacks = await Recipe.find({ recipeName: recipeName });
        if (feedbacks.length > 0) {
            res.json(feedbacks);
        } else {
            res.status(404).json({ message: 'Feedback not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedback', error: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

