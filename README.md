# Plant Health Checker 🌿

A modern web application that helps users identify plant diseases and provides seasonal care recommendations based on the current month.

## Features 🌟

- **Plant Disease Detection**: Upload plant leaf images to detect potential diseases
- **Seasonal Care Tips**: Get month-specific care recommendations
- **Real-time Analysis**: Quick and accurate disease identification
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **User-friendly Interface**: Drag-and-drop image upload and clear result display

## Tech Stack 💻

### Frontend
- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Responsive design with mobile-first approach

### Backend
- Node.js
- Express.js
- Multer (for file uploads)
- CORS enabled for cross-origin requests

## Project Structure 📁

```
plant-health-checker/
├── index.html          # Main frontend interface
├── server.js           # Backend server implementation
├── package.json        # Node.js dependencies
├── uploads/           # Directory for uploaded images
└── README.md          # Project documentation
```

## Installation 🚀

1. Clone the repository:
```bash
git clone <repository-url>
cd plant-health-checker
```

2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
node server.js
```

4. Start the frontend server (in a new terminal):
```bash
python -m http.server 8000
```

5. Open your browser and navigate to:
```
http://localhost:8000
```

## Usage Guide 📖

1. **Testing Server Connection**
   - Click the "Test Server Connection" button to verify backend connectivity
   - A success message indicates the server is running properly

2. **Uploading Images**
   - Drag and drop an image onto the upload area, or
   - Click the upload area to select a file
   - Supported formats: JPG, JPEG, PNG
   - Maximum file size: 16MB

3. **Viewing Results**
   - Disease analysis results
   - Recommended solutions
   - Current month's seasonal care tips
   - Common issues for the current month

## API Endpoints 🔌

### 1. Test Connection
```
GET /api/test
```
Response:
```json
{
    "message": "Server is running!"
}
```

### 2. Analyze Plant
```
POST /api/analyze
```
Request:
- Content-Type: multipart/form-data
- Body: image file

Response:
```json
{
    "filename": "timestamp-filename.jpg",
    "disease": "Disease Name",
    "solution": "Recommended Solution",
    "monthlyTips": {
        "commonIssues": "Month-specific issues",
        "careTips": "Month-specific care recommendations"
    }
}
```

## Seasonal Care System 📅

The application provides month-specific care recommendations:

- **Winter Months (Dec-Feb)**
  - Focus on frost protection
  - Reduced watering
  - Cold stress management

- **Spring Months (Mar-May)**
  - Pest prevention
  - Growth management
  - Temperature adaptation

- **Summer Months (Jun-Aug)**
  - Heat stress prevention
  - Water management
  - Disease prevention

- **Fall Months (Sep-Nov)**
  - Winter preparation
  - Temperature adjustment
  - Fall cleanup

## Error Handling ⚠️

The application handles various error scenarios:
- File size limits (16MB max)
- Invalid file types
- Server connection issues
- Upload failures

## Security Features 🔒

- CORS configuration for secure cross-origin requests
- File type validation
- File size restrictions
- Secure file naming

## Browser Support 🌐

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing 🤝

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Future Enhancements 🎯

- [ ] Machine learning model integration for accurate disease detection
- [ ] User authentication system
- [ ] Plant care history tracking
- [ ] Community features for sharing experiences
- [ ] Mobile app version
- [ ] Multiple language support

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Support 💬

For support, please open an issue in the repository or contact the development team.

---

Made with ❤️ for plant lovers everywhere 