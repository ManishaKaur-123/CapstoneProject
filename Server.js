const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://myApp:Password@cluster0.5eso0fn.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(success => console.log('Mongo connected'))
  .catch(err => console.log(err));

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  recipes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Recipe',
  },
});

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      type: String,
      required: true,
    },
  ],
  preparationSteps: [
    {
      type: String,
      required: true,
    },
  ],
  cookingTime: {
    type: Number,
    required: true,
  },
  servingPortions: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // You can store the image URL as a string
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

const User = mongoose.model('User', UserSchema);

app.use(express.json());

app.post('/register', async (req, res) => {
  try {
    const {username, email, password} = req.body;
    // const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();

    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }
});

app.post('/login', async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    console.log(email + '  ' + password);
    if (!user) {
      return res.status(401).json({error: 'User not found'});
    }

    if (password !== user.password) {
      return res.status(401).json({error: 'Invalid password'});
    } else {
      return res.status(200).json({message: 'User logged in successfully'});
    }
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }
});
// ... (other imports and server setup)

app.get('/getrecipes', async (req, res) => {
  try {
    const recipes = await Recipe.find(); // Fetch all recipes from the database
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }
});

app.post('/addrecipe', async (req, res) => {
  try {
    const {
      title,
      ingredients,
      preparationSteps,
      cookingTime,
      servingPortions,
      rating,
      image,
    } = req.body;

    const newRecipe = new Recipe({
      title,
      ingredients,
      preparationSteps,
      cookingTime,
      servingPortions,
      rating,
      image,
    });
    await newRecipe.save();

    res.status(201).json({message: 'User registered successfully'});
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).json({error: 'An error occurred'});
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
