const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors package

const app = express();

// Enable CORS middleware
// Enable CORS middleware with specific origins
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your frontend URL
  }));  
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

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});