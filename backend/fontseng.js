const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package

const app = express();

app.use(cors({
  origin: 'http://localhost:3000' // Adjust the frontend URL
}));

// Middleware to parse JSON requests
app.use(express.json());
// Connect to MongoDB
mongoose.connect("mongodb+srv://abdullahmalhi361:G7IaXyHnpgEprnj8@fonts.gts2djm.mongodb.net/?retryWrites=true&w=majority&appName=Fonts")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));
// Define a Font schema
const fontSchema = new mongoose.Schema({
  family: String,
  id: String,
  subsets: [String],
  weights: [Number],
  styles: [String],
  variants: mongoose.Schema.Types.Mixed,
  defSubset: String,
  lastModified: String,
  version: String,
  category: String
});
// Create a Font model for the 'english_fonts' collection
const Font = mongoose.model('Font', fontSchema, 'fonts');
const userFavoritesSchema = new mongoose.Schema({
  email: String,
  fontFamily: String,
});

const UserFavorites = mongoose.model('UserFavorites', userFavoritesSchema);

app.post('/api/user-favorites', async (req, res) => {
  const { email, fontFamily } = req.body;

  try {
    const favoriteFont = new UserFavorites({ email, fontFamily });
    await favoriteFont.save();

    res.status(201).json({ message: 'Font added to favorites successfully' });
  } catch (error) {
    console.error('Error adding font to favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to fetch user favorites based on email
app.get('/api/user-favorites/:email', async (req, res) => {
  const { email } = req.params;

  try {
    // Find all user favorites matching the provided email
    const userFavorites = await UserFavorites.find({ email });

    if (!userFavorites || userFavorites.length === 0) {
      return res.status(404).json({ error: 'User favorites not found' });
    }

    // Extract font families from the user favorites and create an array
    const favoriteFonts = userFavorites.map(favorite => favorite.fontFamily);

    res.json({ favorites: favoriteFonts });
  } catch (error) {
    console.error('Error fetching user favorites:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/fonts', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page number from query params
  const pageSize = 12; // Set the number of fonts per page
  const category = req.query.category; // Get the requested font category

  try {
    let query = {}; // Initialize the query object

    // If category is specified, add it to the query
    if (category && category !== 'all') {
      query.category = category;
    }

    const fonts = await Font.find(query).skip((page - 1) * pageSize).limit(pageSize); // Query fonts based on category

    // Transform fonts data to include font URLs
    const transformedFonts = fonts.map(font => {
      const woff2Url = font.variants['400'].normal['latin'].url.woff2;
      const woffUrl = font.variants['400'].normal['latin'].url.woff;
      const ttfUrl = font.variants['400'].normal['latin'].url.truetype;

      return {
        family: font.family,
        variants: [woff2Url, woffUrl, ttfUrl] // Assuming you want both WOFF2 and WOFF URLs
      };
    });

    res.json(transformedFonts); // Send fonts as JSON response
  } catch (err) {
    console.error('Error fetching fonts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});



app.get('/api/font-family', async (req, res) => {
  const fontFamilyName = req.query.search; // Correctly retrieve the font family name from query params
  console.log(fontFamilyName)

  try {
    const fontFamily = await Font.findOne({ family: fontFamilyName }); // Find fontFamily in the database

    if (!fontFamily) {
      return res.status(404).json({ error: 'Font family not found' });
    }

    // Extract woff2, woff, and ttf URLs from the fontFamily data
    const woff2Url = fontFamily.variants['400'].normal['latin'].url.woff2;
    const woffUrl = fontFamily.variants['400'].normal['latin'].url.woff;
    const ttfUrl = fontFamily.variants['400'].normal['latin'].url.truetype;

    // Return the URLs as JSON response
    res.json({
      fontFamily: fontFamily.family,
      woff2Url,
      woffUrl,
      ttfUrl
    });
  } catch (err) {
    console.error('Error fetching font family:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/arabic-fonts', async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page number from query params
  const pageSize = 12; // Set the number of fonts per page

  try {
    const fonts = await Font.find({ 'subsets': 'arabic' }).skip((page - 1) * pageSize).limit(pageSize); // Query fonts with Arabic subset

    // Transform fonts data to include font URLs
    const transformedFonts = fonts.map(font => {
      const arabicVariant = font.variants['400'].normal['arabic']; // Fetch Arabic variant with weight 400
      if (!arabicVariant) {
        return null; // If Arabic variant doesn't exist, return null
      }
      const woff2Url = arabicVariant.url.woff2;
      const woffUrl = arabicVariant.url.woff;
      const ttfUrl = arabicVariant.url.truetype;

      return {
        family: font.family,
        variants: [woff2Url, woffUrl, ttfUrl] // Assuming you want both WOFF2 and WOFF URLs
      };
    }).filter(font => font !== null); // Filter out null values

    res.json(transformedFonts); // Send fonts as JSON response
  } catch (err) {
    console.error('Error fetching Arabic fonts:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.delete('/api/user-favorites/:email/:fontFamily', async (req, res) => {
  const { email, fontFamily } = req.params;
  console.log('Deleting favorite for email:', email);
  console.log('Font family:', fontFamily);

  try {
    const deletedFavorite = await UserFavorites.findOneAndDelete({ email, fontFamily });

    if (deletedFavorite) {
      res.json({ message: 'Favorite deleted successfully' });
    } else {
      res.status(404).json({ error: 'Favorite not found for the given email and font family' });
    }
  } catch (error) {
    console.error('Error deleting favorite:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search-fonts', async (req, res) => {
  const { search } = req.query; // Retrieve the search query parameter

  try {
    const fonts = await Font.find({ family: { $regex: new RegExp(search, 'i') } }); // Search for fonts using regex for case-insensitive search

    if (!fonts || fonts.length === 0) {
      return res.status(404).json({ error: 'Fonts not found' });
    }

    // Extract font data as needed
    const fontData = fonts.map(font => ({
      family: font.family,
      variants: font.variants, // Modify this based on your font structure
    }));

    // Send the extracted font data as JSON response
    res.json(fontData);
  } catch (error) {
    console.error('Error fetching filtered fonts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/search-fonts', async (req, res) => {
  const { search } = req.query; // Retrieve the search query parameter

  try {
    const fonts = await Font.find({ family: { $regex: new RegExp(search, 'i') } }); // Search for fonts using regex for case-insensitive search

    // Extract font data as needed
    const fontData = fonts.map(font => ({
      family: font.family,
      variants: font.variants, // Modify this based on your font structure
    }));

    // Send the extracted font data as JSON response
    res.json(fontData);
  } catch (error) {
    console.error('Error fetching filtered fonts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

