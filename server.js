const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 16 * 1024 * 1024 }, // 16MB limit
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});

// Disease categories and their solutions
const diseaseInfo = {
    'leaf_blight': {
        name: 'Leaf Blight',
        solution: 'Remove infected leaves and apply fungicide. Improve air circulation around plants.'
    },
    'leaf_spot': {
        name: 'Leaf Spot',
        solution: 'Remove affected leaves and avoid overhead watering. Apply copper-based fungicide.'
    },
    'healthy': {
        name: 'Healthy Leaf',
        solution: 'Your plant looks healthy! Continue regular care and monitoring.'
    }
};

// Seasonal care tips by month
const seasonalTips = {
    0: { // January
        commonIssues: 'Frost damage, overwatering in cold conditions',
        careTips: 'Reduce watering frequency, protect from frost, maintain good air circulation'
    },
    1: { // February
        commonIssues: 'Dormancy issues, root rot from cold soil',
        careTips: 'Check soil moisture carefully, avoid fertilizing, protect from cold drafts'
    },
    2: { // March
        commonIssues: 'Early spring pests, sudden temperature changes',
        careTips: 'Start regular inspection for pests, gradually increase watering, prepare for spring growth'
    },
    3: { // April
        commonIssues: 'Aphids, spring growth problems',
        careTips: 'Begin regular fertilizing, increase watering as temperatures rise, watch for new pest activity'
    },
    4: { // May
        commonIssues: 'Heat stress, increased pest activity',
        careTips: 'Provide shade during hottest hours, increase watering frequency, start regular pest control'
    },
    5: { // June
        commonIssues: 'Drought stress, spider mites',
        careTips: 'Water deeply but less frequently, check for spider mites, provide afternoon shade'
    },
    6: { // July
        commonIssues: 'Heat damage, fungal diseases',
        careTips: 'Maintain consistent moisture, improve air circulation, watch for fungal signs'
    },
    7: { // August
        commonIssues: 'Summer stress, nutrient deficiencies',
        careTips: 'Continue regular watering, apply balanced fertilizer, monitor for stress signs'
    },
    8: { // September
        commonIssues: 'Transition stress, early fall pests',
        careTips: 'Begin reducing fertilizer, prepare for fall, check for new pest activity'
    },
    9: { // October
        commonIssues: 'Temperature fluctuations, reduced light',
        careTips: 'Adjust watering schedule, clean up fallen leaves, prepare for winter'
    },
    10: { // November
        commonIssues: 'Cold stress, overwatering',
        careTips: 'Reduce watering, protect from cold, clean up garden debris'
    },
    11: { // December
        commonIssues: 'Winter dormancy issues, low light stress',
        careTips: 'Minimize watering, protect from cold drafts, maintain good air circulation'
    }
};

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// Routes
app.post('/api/analyze', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // For demo purposes, return a random result
        const predictions = Object.keys(diseaseInfo);
        const randomPrediction = predictions[Math.floor(Math.random() * predictions.length)];
        const result = diseaseInfo[randomPrediction];

        // Get current month's tips
        const currentMonth = new Date().getMonth();
        const monthlyTips = seasonalTips[currentMonth];

        res.json({
            filename: req.file.filename,
            disease: result.name,
            solution: result.solution,
            monthlyTips: monthlyTips
        });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: error.message });
    }
});

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 16MB.' });
        }
        return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Test the server at: http://localhost:${port}/api/test`);
}); 